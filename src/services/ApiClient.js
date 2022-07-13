import axios from 'axios';

const ApiClient = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: 3000,
});




export const interceptorResponse = (response) => {
	console.log(
		`Response from network request -> ${response.status} : ${response.config.url}`,
	);
	return response;
};
ApiClient.interceptors.response.use(interceptorResponse);

export default ApiClient;