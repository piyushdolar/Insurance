export const getAdminUsers = ({ commit }) => {
	return [
		{
			id: 1,
			name: "Noelia O'Kon",
			nickname: 'asperiores',
			email: 'otho.smitham@example.com',
			birthdate: '1978-06-28 00:00:00',
			gender: 'F',
			salary: '13098.00',
			group_id: 2,
			created_at: '2017-01-01 07:21:10',
			updated_at: '2017-01-01 07:21:10',
			age: 41,
			group: {
				id: 2,
				name: 'Exec',
				description: 'Executives'
			}
		}
	];
};
