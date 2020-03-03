import moment from "moment";

export const AdminMixin = {
    data() {
        return {
            showDialog: false,
            defaultImage: "/images/avatars/default.png",
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
                imagePreview: null,
                userType: 2
            },
            formModal: {
                title: "CREATE NEW USER",
                btn: "CREATE",
                isEdit: false
            },
            sending: false,
            image: null,
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
                    name: "__sequence",
                    title: "#"
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
                        return moment(String(value)).format("MM/DD/YYYY hh:mm a");
                    }
                },
                {
                    name: "updatedAt",
                    title: "Updated Date",
                    sortField: "updatedAt",
                    callback: function (value) {
                        return moment(String(value)).format("MM/DD/YYYY hh:mm a");
                    }
                },
                {
                    name: "__slot:actions", // <----
                    title: "Actions"
                }
            ]
        }
    },
    methods: {
        checkAuthorization(rule) {
            this.$checkAuth(rule);
        },
        onFileSelected(event) {
            this.form.image = event.target.files[0];
            this.form.imagePreview = URL.createObjectURL(this.form.image);
        },
        onAction(action, data, index) {
            if (action == "edit") {
                this.form.id = data.id;
                this.form.firstName = data.firstName;
                this.form.lastName = data.lastName;
                this.form.gender = data.gender;
                this.form.phone = data.phone;
                this.form.email = data.email;
                this.form.address = data.address;
                this.form.loginStatus = data.userStatus == 1 ? true : false;
                if (data.picture != null) {
                    this.form.imagePreview = `/images/avatars/users/${data.picture}`;
                }
                this.formModal.title = "EDIT USER DATA";
                this.formModal.btn = "UPDATE";
                this.formModal.isEdit = true;
                this.showDialog = true;
            } else if (action == "delete") {
                if (confirm("Are you sure?")) {
                    this.$store
                        .dispatch("deleteUser", {
                            userId: data.id
                        })
                        .then(response => {
                            this.$alert("success", response);
                            this.onFilterReset();
                        })
                        .catch(error => {
                            this.$alert("danger", error);
                        });
                }
            }
        },
        // validation only
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];
            if (field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty
                };
            }
        },
        openDialog() {
            this.showDialog = true;
            this.formModal.btn = "CREATE";
            this.formModal.isEdit = false;
            this.form.imagePreview = this.defaultImage;
            this.clearForm();
        },
        clearForm() {
            this.$v.$reset();
            this.form.firstName = null;
            this.form.lastName = null;
            this.form.phone = null;
            this.form.gender = null;
            this.form.email = null;
            this.form.address = null;
            this.form.password = null;
            this.form.repeatPassword = null;
            this.form.image = null;
            this.form.loginStatus = false;
        },
        validateUser(e) {
            this.$v.$touch();
            if (this.form.image != null && this.form.image.size >= 5000000) {
                this.$alert("info", "Image maximum file size is 5Mb");
                return false;
            } else {
                if (this.formModal.isEdit) {
                    if (
                        !this.$v.form.firstName.$invalid &&
                        !this.$v.form.lastName.$invalid &&
                        !this.$v.form.gender.$invalid &&
                        !this.$v.form.phone.$invalid &&
                        !this.$v.form.email.$invalid &&
                        !this.$v.form.address.$invalid
                    ) {
                        this.saveUser("edit");
                    }
                } else {
                    if (!this.$v.form.$invalid) {
                        this.saveUser("add");
                    }
                }
            }
        },
        async saveUser(type, btnText) {
            this.sending = true;
            this.form.sessionId = this.$session.get("userProfile").id;
            if (type == "add") {
                await this.$store
                    .dispatch("addUser", this.form)
                    .then(response => {
                        this.$alert("success", response);
                        this.showDialog = false;
                        this.clearForm();
                        this.onFilterReset();
                    })
                    .catch(error => {
                        this.$alert("danger", error);
                    });
            } else if (type == "edit") {
                delete this.form['password'];
                await this.$store
                    .dispatch("editUser", this.form)
                    .then(response => {
                        this.$alert("success", response);
                        this.showDialog = false;
                        this.clearForm();
                        this.onFilterReset();
                    })
                    .catch(error => {
                        this.$alert("danger", error);
                    });
            }
            this.sending = false;
        }
    },
};
