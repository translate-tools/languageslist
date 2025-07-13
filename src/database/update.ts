import { WikidataLanguagesInfoFetcher } from '../LanguageInfoFetcher/WikidataLanguagesInfoFetcher';
import { writeFile } from 'fs/promises';
import { LANGUAGES_DB_PATH } from './const';

new WikidataLanguagesInfoFetcher()
	.fetch()
	.then(async (languages) => {
		await writeFile(LANGUAGES_DB_PATH, JSON.stringify(languages, null, 2));
	})
	.catch((error) => {
		throw error;
	});
