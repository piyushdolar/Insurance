import axios from 'axios';
import authHeader from './authHeader';
const config = axios.create({
	baseURL: 'https://www.lcpi.la/api',
	headers: authHeader()
});
export default config;
