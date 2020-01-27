export default function authHeader() {
	let token = localStorage.getItem('refreshToken');
	if (token) {
		return { Authorization: `Bearer ${token}` };
	} else {
		return { Authorization: `Bearer null` };
	}
}
