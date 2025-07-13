import { CountrySummaryScheme } from '../types/countries';
import { LanguageSummaryScheme } from '../types/languages';
import { readFile } from 'fs/promises';
import { COUNTRIES_DB_PATH, LANGUAGES_DB_PATH } from './const';

export const getLanguagesList = async () => {
	const rawJson = await readFile(LANGUAGES_DB_PATH, { encoding: 'utf8' });

	return LanguageSummaryScheme.array().parse(JSON.parse(rawJson));
};

export const getCountriesList = async () => {
	const rawJson = await readFile(COUNTRIES_DB_PATH, { encoding: 'utf8' });

	return CountrySummaryScheme.array().parse(JSON.parse(rawJson));
};
