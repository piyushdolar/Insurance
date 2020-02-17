const rules = {
    admin: ['read', 'write', 'delete'],
    users: ['read', 'write', 'delete'],
    agent: ['read', 'write'],
}
export default function checkAuth(userType = null) {
    console.log(rules);
    return userType;
}