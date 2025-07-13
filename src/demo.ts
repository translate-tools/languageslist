import { getLanguagesList } from './database';

getLanguagesList()
	.then((languages) => {
		console.log(`Top languages:`);

		let order = 0;
		for (const language of languages) {
			const { codes, speakers } = language;
			const code = codes.iso639_1 ?? codes.iso639_3;
			if (!code) continue;

			const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
			const displayName = languageNames.of(code);
			if (displayName === code) continue;

			console.log(
				`#${order++} ${languageNames.of(code)} (${[codes.iso639_1, codes.iso639_3].filter(Boolean).join(',')}) - total speakers: ${speakers.total}`,
			);
		}
	})
	.catch((error) => {
		throw error;
	});
