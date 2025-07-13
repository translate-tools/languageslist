/* eslint-disable camelcase */
import z from 'zod';

import { LanguageInfoScheme } from '../types/languages';
import { LanguageInfoFetcher } from '.';

const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT DISTINCT ?item ?numberOfSpeakers ?speakersTime ?iso639_1 ?iso639_3 ?itemLabel ?itemLabel_en
WHERE {
  ?item wdt:P31 wd:Q1288568;
        wdt:P220 ?iso639_3.

  ?item p:P1098 ?numberOfSpeakersStatement.
  ?numberOfSpeakersStatement ps:P1098 ?numberOfSpeakers.
  OPTIONAL {
    ?numberOfSpeakersStatement pq:P585 ?speakersTime.
    FILTER(datatype(?speakersTime) = xsd:dateTime)
  }

  OPTIONAL {
    ?item wdt:P218 ?iso639_1.
    ?item rdfs:label ?itemLabel_1.
    FILTER(lang(?itemLabel_1) = ?iso639_1)
  }
  OPTIONAL {
    ?item rdfs:label ?itemLabel_3.
    FILTER(lang(?itemLabel_3) = ?iso639_3)
  }

  BIND(
    IF(BOUND(?itemLabel_3), ?itemLabel_3,
       IF(BOUND(?itemLabel_1), ?itemLabel_1, "")
    ) AS ?itemLabel
  )

  OPTIONAL {
    ?item rdfs:label ?itemLabel_en.
    FILTER(lang(?itemLabel_en) = "en")
  }
}
ORDER BY DESC(?numberOfSpeakers) DESC(?speakersTime)
`;

export type LanguageInfo = z.TypeOf<typeof LanguageInfoScheme>;

const RowScheme = z
	.object({
		iso639_1: z.object({ value: z.string() }).optional(),
		iso639_3: z.object({ value: z.string() }).optional(),
		numberOfSpeakers: z.object({ value: z.coerce.number() }),
	})
	.transform(({ numberOfSpeakers, iso639_1, iso639_3 }) => ({
		codes: { iso639_1: iso639_1?.value, iso639_3: iso639_3?.value },
		speakers: {
			total: numberOfSpeakers.value,
		},
	}));

const ResponseScheme = z.object({
	results: z.object({
		bindings: RowScheme.array(),
	}),
});

export class WikidataLanguagesInfoFetcher implements LanguageInfoFetcher {
	constructor(private readonly options: { apiEndpoint?: string } = {}) {}
	public async fetch() {
		const pageSize = 500;
		const languagesInfo: LanguageInfo[] = [];

		// Collect data
		let offset = 0;
		while (true) {
			console.log(`Download data with offset ${offset}`);
			const paginatedQuery = `${query}\nLIMIT ${pageSize} OFFSET ${offset}`;
			const url =
				(this.options.apiEndpoint ?? 'https://query.wikidata.org/sparql') +
				'?query=' +
				encodeURIComponent(paginatedQuery);

			const res = await fetch(url, {
				headers: {
					'User-Agent': 'LanguageDataCollector/1.0 (your@email.com)',
					Accept: 'application/sparql-results+json',
				},
			});
			if (!res.ok) {
				throw new Error(`Wikidata error ${res.status}: ${res.statusText}`);
			}

			const json = await res.json().then((rawJson) => {
				return ResponseScheme.parse(rawJson);
			});
			const bindings = json.results.bindings;
			if (bindings.length === 0) break;

			languagesInfo.push(...bindings);
			offset += pageSize;
		}

		const languagesStats: Record<string, LanguageInfo> = {};
		for (const language of languagesInfo) {
			const langCode = language.codes.iso639_3 || language.codes.iso639_1;

			// Skip languages with no code
			if (!langCode) continue;

			// Set instantly for empty language code
			const currentLanguage = languagesStats[langCode];
			if (!currentLanguage) {
				languagesStats[langCode] = language;
				continue;
			}

			if (language.speakers.total > currentLanguage.speakers.total) {
				languagesStats[langCode] = language;
			}
		}

		// Sort results
		return Object.entries(languagesStats)
			.map(([_key, lang]) => lang)
			.sort((a, b) => b.speakers.total - a.speakers.total);
	}
}
