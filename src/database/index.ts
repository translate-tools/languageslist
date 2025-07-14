import { CountrySummaryScheme } from '../types/countries';
import { LanguageSummaryScheme } from '../types/languages';

export const getLanguagesList = async () => {
	return LanguageSummaryScheme.array().parse(
		(await import('./languages-list.json')).default,
	);
};

export const getCountriesList = async () => {
	return CountrySummaryScheme.array().parse(
		(await import('./countries-list.json')).default,
	);
};
