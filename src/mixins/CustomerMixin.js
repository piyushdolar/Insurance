import moment from "moment";

export const CustomerMixin = {
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
                image: null,
                status: false,
                imagePreview: null
            },
            formModal: {
                title: "CREATE NEW CUSTOMER",
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
                    name: "__slot:gender",
                    sortField: "gender",
                    title: "Gender"
                },
                {
                    name: "email",
                    sortField: "email",
                    title: "Email"
                },
                {
                    name: "__slot:status",
                    sortField: "status",
                    title: "Status"
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
                this.form.status = data.status == 1 ? true : false;
                if (data.picture != null) {
                    this.form.imagePreview = `/images/avatars/${data.picture}`;
                }
                this.formModal.title = "EDIT CUSTOMER DATA";
                this.formModal.btn = "UPDATE";
                this.formModal.isEdit = true;
                this.showDialog = true;
            } else if (action == "delete") {
                if (confirm("Are you sure?")) {
                    this.$store
                        .dispatch("deleteCustomer", {
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
            this.form.image = null;
            this.form.status = false;
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
        async saveUser(type) {
            this.sending = true;
            this.form.sessionId = this.$session.get("userProfile").id;
            if (type == "add") {
                await this.$store
                    .dispatch("addCustomers", this.form)
                    .then(response => {
                        this.$alert("success", response);
                        this.showDialog = false;
                    })
                    .catch(error => {
                        this.$alert("danger", error);
                    });
            } else if (type == "edit") {
                await this.$store
                    .dispatch("editCustomer", this.form)
                    .then(response => {
                        this.$alert("success", response);
                        this.showDialog = false;
                    })
                    .catch(error => {
                        this.$alert("danger", error);
                    });
            }
            this.onFilterReset();
            this.sending = false;
        }
    }
}