import axios from 'axios';
const config = axios.create({
	baseURL: 'http://119.8.40.98/api'
});
export default config;
