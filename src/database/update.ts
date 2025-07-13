import { WikidataCountriesSummaryFetcher } from '../crawlers/Wikidata/WikidataCountriesSummaryFetcher';
import { WikidataLanguagesInfoFetcher } from '../crawlers/Wikidata/WikidataLanguagesInfoFetcher';
import { writeFile } from 'fs/promises';
import { COUNTRIES_DB_PATH, LANGUAGES_DB_PATH } from './const';

new WikidataCountriesSummaryFetcher()
	.fetch()
	.then(async (countries) => {
		await writeFile(COUNTRIES_DB_PATH, JSON.stringify(countries, null, 2));
	})
	.catch((error) => {
		throw error;
	});

new WikidataLanguagesInfoFetcher()
	.fetch()
	.then(async (languages) => {
		await writeFile(LANGUAGES_DB_PATH, JSON.stringify(languages, null, 2));
	})
	.catch((error) => {
		throw error;
	});
