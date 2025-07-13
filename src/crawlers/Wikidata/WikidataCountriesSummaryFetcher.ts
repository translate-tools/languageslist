import z from 'zod';

import { CountrySummary, CountrySummaryScheme } from '../../types/countries';

import { SummaryFetcher } from '..';

const query = `
SELECT ?countryLabel ?isoCode ?population (GROUP_CONCAT(DISTINCT ?langCode; separator=",") AS ?languages)
WHERE {
  ?country wdt:P31 wd:Q6256.                  # Country
  OPTIONAL { ?country wdt:P297 ?isoCode. }    # ISO 3166-1 alpha-2
  OPTIONAL { ?country wdt:P1082 ?population. }

  OPTIONAL {
    ?country wdt:P37 ?language.               # Official languages
    ?language wdt:P218 ?langCode.             # ISO 639-1
  }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
GROUP BY ?countryLabel ?isoCode ?population
ORDER BY DESC(?population)
`;

const RowScheme = z
	.object({
		isoCode: z.object({ value: z.string() }).optional(),
		population: z.object({ value: z.coerce.number() }).optional(),
		languages: z.object({ value: z.string() }),
	})
	.transform(({ population, isoCode, languages }) => ({
		code: isoCode ? isoCode.value.toLowerCase() : null,
		population: population ? population.value : 0,
		languages: languages.value ? languages.value.toLowerCase().split(',') : [],
	}));

const ResponseScheme = z.object({
	results: z.object({
		bindings: RowScheme.array(),
	}),
});

export class WikidataCountriesSummaryFetcher implements SummaryFetcher<CountrySummary[]> {
	constructor(private readonly options: { apiEndpoint?: string } = {}) {}
	public async fetch() {
		const pageSize = 500;
		const countriesSummary: CountrySummary[] = [];

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

			countriesSummary.push(
				...CountrySummaryScheme.array().parse(
					bindings.filter((country) => country.code && country.population > 0),
				),
			);
			offset += pageSize;
		}

		// Sort results
		return countriesSummary.sort((a, b) => b.population - a.population);
	}
}
