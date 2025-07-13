import { LanguageInfoScheme } from '../types/languages';
import { readFile } from 'fs/promises';
import { LANGUAGES_DB_PATH } from './const';

export const getLanguagesList = async () => {
	const rawJson = await readFile(LANGUAGES_DB_PATH, { encoding: 'utf8' });

	return LanguageInfoScheme.array().parse(JSON.parse(rawJson));
};
