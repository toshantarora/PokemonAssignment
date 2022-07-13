import userApiClient, { interceptorRequest, interceptorResponse } from './ApiClient';
import { is, curryN, gte } from 'ramda';
const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number);
	return (
		isNumber(min)
		&& isNumber(max)
		&& isNumber(value)
		&& gte(value, min)
		&& gte(max, value)
	);
});
const in200s = isWithin(200, 299);

function getPokedexList() {
	return userApiClient
		.get('pokemon')
		.then((response) => {
			if (in200s(response.status)) {
				return response.data;
			}

			return null;
		})
		.catch((error) => error.response);
}
function getPokedexStats(name) {
	return userApiClient
		.get(`pokemon/${name}`)
		.then((response) => {
			if (in200s(response.status)) {
				return response.data;
			}

			return null;
		})
		.catch((error) => error.response);
}

export const pokedexService = {
    getPokedexList,
    getPokedexStats
};