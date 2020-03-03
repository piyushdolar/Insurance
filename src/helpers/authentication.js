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
            write: [3],
            delete: [1]
        }
    },
    {
        path: '/policies',
        roles: {
            read: [1, 2, 3],
            write: [3],
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
        path: '/reports',
        roles: {
            read: [1, 2],
            write: [1, 2],
            delete: [1, 2]
        }
    },
    {
        path: '/changelogs',
        roles: {
            read: [1, 2, 3],
            write: [1, 2],
            delete: [1, 2]
        }
    }
];

export default function checkAuth(permission, path, userType) {
    let state = false;
    rules.find(rule => {
        if (rule.path == path) {
            state = (permission == 'read') ? rule.roles.read.includes(userType) : (permission == 'write') ? rule.roles.write.includes(userType) : (permission == 'delete') ? rule.roles.delete.includes(userType) : false;
        }
    });
    return state;
}