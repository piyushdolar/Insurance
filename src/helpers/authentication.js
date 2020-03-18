/* 
    R.B.A.C Module:
    Users type 1-Master Admin, 2-Admin, 3-Agent.
*/

const rules = [
	{
		path: '/dashboard',
		roles: {
			read: [1, 2, 3],
			write: [1, 2],
			delete: [1, 2]
		}
	},
	{
		path: '/my-profile',
		roles: {
			read: [1, 2, 3],
			write: [1, 2, 3],
			delete: [1, 2]
		}
	},
	{
		path: '/admins',
		roles: {
			read: [1, 2],
			write: [1],
			delete: [1]
		}
	},
	{
		path: '/agents',
		roles: {
			read: [1, 2],
			write: [1, 2],
			delete: [1, 2]
		}
	},
	{
		path: '/customers',
		roles: {
			read: [1, 2, 3],
			write: [1, 2],
			delete: [1]
		}
	},
	{
		path: '/policies',
		roles: {
			read: [1, 2],
			write: [1, 2],
			delete: [1, 2]
		}
	},
	{
		path: '/reports',
		roles: {
			read: [1, 2],
			write: [1, 2],
			delete: [1, 2]
		}
	},
	{
		path: '/customer-policies',
		roles: {
			read: [3],
			write: [3],
			delete: [3]
		}
	},
	{
		path: '/customer-policies-create',
		roles: {
			read: [3],
			write: [3],
			delete: []
		}
	},
	{
		path: '/customer-policies-edit',
		roles: {
			read: [3],
			write: [3],
			delete: []
		}
	},

	// Reports Module
	{
		path: '/reports',
		roles: {
			read: [1, 2],
			write: [1, 2],
			delete: [1, 2]
		}
	},
	{
		path: '/reports/admin',
		roles: {
			read: [1, 2]
		}
	},
	{
		path: '/reports/agent',
		roles: {
			read: [1, 2]
		}
	},
	{
		path: '/reports/policy',
		roles: {
			read: [1, 2]
		}
	},
	{
		path: '/reports/customer',
		roles: {
			read: [1, 2]
		}
	},
	// Changelogs
	{
		path: '/changelog',
		roles: {
			read: [1, 2, 3],
			write: [1, 2],
			delete: [1, 2]
		}
	},
	{
		path: '/logs',
		roles: {
			read: [1],
			write: [1],
			delete: [1]
		}
	}
];

export default function checkAuth(permission, path, userType) {
	let actualPath = path.lastIndexOf('/') ? path.substr(0, path.lastIndexOf('/')) : path;
	let state = false;
	rules.find(rule => {
		if (rule.path == actualPath) {
			state =
				permission == 'read'
					? rule.roles.read.includes(userType)
					: permission == 'write'
					? rule.roles.write.includes(userType)
					: permission == 'delete'
					? rule.roles.delete.includes(userType)
					: false;
		}
	});
	return state;
}
