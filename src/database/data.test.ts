import { getCountriesList, getLanguagesList } from '.';

test('DB returns a lot of languages', async () => {
	const promise = getLanguagesList();
	await expect(promise).resolves.not.toThrow();
	expect((await promise).length).greaterThan(500);
});

test('DB returns a lot of countries', async () => {
	const promise = getCountriesList();
	await expect(promise).resolves.not.toThrow();
	expect((await promise).length).greaterThan(180);
});
