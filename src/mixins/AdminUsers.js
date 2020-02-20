export const AdminMixin = {
    data() {
        return {
            showDialog: false,
            defaultImage: "/images/avatars/default.png",
            // users: [],
            form: {
                firstName: null,
                lastName: null,
                gender: null,
                phone: null,
                email: null,
                address: null,
                password: null,
                repeatPassword: null,
                loginStatus: false,
                image: null,
                imagePreview: null
            },
            formModal: {
                title: "CREATE NEW USER",
                btn: "CREATE",
                isEdit: false
            },
            sending: false,
            image: null,
            // vuetable
            fireEvent: null,
            sortOrder: [
                {
                    field: "id",
                    sortField: "id",
                    direction: "desc"
                }
            ],
            fields: [
                {
                    name: "id",
                    title: "User ID"
                },
                {
                    name: "__slot:picture",
                    title: "Image"
                },
                {
                    name: "fullName",
                    sortField: "firstName",
                    title: "Full Name"
                },
                {
                    name: "gender",
                    sortField: "gender",
                    title: "Gender",
                    callback: function (value) {
                        return value == 1 ? "Male" : value == 2 ? "Female" : "Other";
                    }
                },
                {
                    name: "email",
                    sortField: "email",
                    title: "Email"
                },
                {
                    name: "__slot:userStatus",
                    title: "Status",
                    sortField: "userStatus"
                },
                {
                    name: "createdAt",
                    title: "Created Date",
                    sortField: "createdAt",
                    callback: function (value) {
                        return moment(String(value)).format("DD/MM/YYYY hh:mm a");
                    }
                },
                {
                    name: "updatedAt",
                    title: "Updated Date",
                    sortField: "updatedAt",
                    callback: function (value) {
                        return moment(String(value)).format("DD/MM/YYYY hh:mm a");
                    }
                },
                {
                    name: "__slot:actions", // <----
                    title: "Actions"
                }
                /* {
                  name: "__component:custom-actions", // <----
                  title: "Actions"
                } */
            ]
        }
    },
    methods: {

        onFileSelected(event) {
            this.form.image = event.target.files[0];
            this.form.imagePreview = URL.createObjectURL(this.form.image);
        },
    },
};
