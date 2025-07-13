/* eslint-disable camelcase */
import z from 'zod';

export const LANGUAGE_2LETTER_CODE = z.string().lowercase().length(2);
export const LANGUAGE_3LETTER_CODE = z.string().lowercase().length(3);

export const LanguageCodesScheme = z.object({
	iso639_1: LANGUAGE_2LETTER_CODE.optional(),
	iso639_3: LANGUAGE_3LETTER_CODE.optional(),
});

export const LanguageSummaryScheme = z.object({
	codes: LanguageCodesScheme,
	speakers: z.object({
		total: z.number(),
	}),
});

export type LanguageSummary = z.TypeOf<typeof LanguageSummaryScheme>;
