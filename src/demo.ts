import { getCountriesList, getLanguagesList } from './database';

Promise.all([getLanguagesList(), getCountriesList()])

	.then(([languages, countries]) => {
		const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
		const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

		console.log(`Top languages:`);

		let order = 0;
		for (const language of languages.slice(0, 20)) {
			const { codes, speakers } = language;
			const code = codes.iso639_1 ?? codes.iso639_3;
			if (!code) continue;

			const displayName = languageNames.of(code);
			if (displayName === code) continue;

			const { iso639_1: shortLangCode } = codes;
			const countriesList = shortLangCode
				? countries
						.filter(({ languages }) => languages.includes(shortLangCode))
						.sort((a, b) => b.population - a.population)
						.map(({ code }) => countryNames.of(code))
						.slice(0, 10)
						.join(', ')
				: '';

			console.log(
				[
					`#${++order} ${languageNames.of(code)} (${[codes.iso639_1, codes.iso639_3].filter(Boolean).join(',')})`,
					`- Total speakers: ${speakers.total}`,
					countriesList && `- Top 10 countries where used: ${countriesList}`,
				]
					.filter(Boolean)
					.join('\n'),
			);
		}
	})
	.catch((error) => {
		throw error;
	});
