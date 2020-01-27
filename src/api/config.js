import axios from 'axios';
import authHeader from './authHeader';
const config = axios.create({
	baseURL: 'http://119.8.40.98/api',
	headers: authHeader()
});
export default config;
