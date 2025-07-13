/* eslint-disable camelcase */
import z from 'zod';

export const LanguageCodesScheme = z.object({
	iso639_1: z.string().length(2).optional(),
	iso639_3: z.string().length(3).optional(),
});

export const LanguageInfoScheme = z.object({
	codes: LanguageCodesScheme,
	speakers: z.object({
		total: z.number(),
	}),
});

export type LanguageInfo = z.TypeOf<typeof LanguageInfoScheme>;
