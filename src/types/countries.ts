import z from 'zod';

import { LANGUAGE_2LETTER_CODE } from './languages';

export const COUNTRY_2LETTER_CODE = z.string().toUpperCase().length(2);

export const CountrySummaryScheme = z.object({
	code: COUNTRY_2LETTER_CODE,
	population: z.number(),
	languages: LANGUAGE_2LETTER_CODE.array(),
});

export type CountrySummary = z.TypeOf<typeof CountrySummaryScheme>;
