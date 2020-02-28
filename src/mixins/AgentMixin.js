import moment from "moment";
import checkAuth from "../helpers/authentication";
import { mapGetters } from "vuex";

export const AgentMixin = {
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
                password: null,
                repeatPassword: null,
                address: null,
                status: false,
                image: null,
                imagePreview: null,
                dob: null,
                provinceId: null,
                districtId: null,
                faxNumber: null,
                bankName: null,
                bankAcNumber: null,
                familyBookNumber: null,
                familyBookDOI: null,
                familyBookDOIConfig: date => {
                    const today = new Date();
                    if (today < date) {
                        return true;
                    }
                },
                personalIdNumber: null,
                personalIdDOI: null,
                personalIdDOIConfig: date => {
                    const today = new Date();
                    if (today < date) {
                        return true;
                    }
                },
                villageName: null,
                userType: 3
            },
            formModal: {
                title: "CREATE NEW AGENT",
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
                    name: "__slot:status",
                    title: "Status",
                    sortField: "status"
                },
                {
                    name: "__slot:location",
                    title: "Province/District"
                },
                {
                    name: "address",
                    title: "Address"
                },
                {
                    name: "faxNumber",
                    title: "Fax"
                },
                {
                    name: "bankName",
                    title: "Bank Name"
                },
                {
                    name: "bankAcNumber",
                    title: "Bank A/c"
                },
                {
                    name: "familyBookNumber",
                    title: "Family Book"
                },
                {
                    name: "familyBookDOI",
                    title: "Family Book DOI"
                },
                {
                    name: "personalIdNumber",
                    title: "Personal Id"
                },
                {
                    name: "personalIdDOI",
                    title: "Personal Id DOI"
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
        onProvinceSelect(provinceId) {
            this.$store.dispatch("getLocation", provinceId);
        },
        checkAuthorization(rule) {
            return checkAuth(
                rule,
                this.$route.path,
                this.$session.get("userProfile").userType
            );
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
                this.form.faxNumber = data.faxNumber;
                this.form.provinceId = data.provinceId;
                this.$store.dispatch("getLocation", data.provinceId);
                this.form.districtId = data.districtId;
                this.form.villageName = data.villageName;
                this.form.bankName = data.bankName;
                this.form.bankAcNumber = data.bankAcNumber;
                this.form.familyBookNumber = data.familyBookNumber;
                this.form.familyBookDOI = data.familyBookDOI;
                this.form.personalIdNumber = data.personalIdNumber;
                this.form.personalIdDOI = data.personalIdDOI;
                this.form.address = data.address;
                this.form.status = data.status == 1 ? true : false;
                if (data.picture != null) {
                    this.form.imagePreview = `/images/avatars/agents/${data.picture}`;
                }
                this.formModal.title = "EDIT AGENT DATA";
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
            this.form.password = null;
            this.form.repeatPassword = null;
            this.form.address = null;
            this.form.image = null;
            this.form.status = false;
            this.form.provinceId = null;
            this.form.districtId = null;
            this.form.villageName = null;
            this.form.faxNumber = null;
            this.form.bankName = null;
            this.form.bankAcNumber = null;
            this.form.familyBookNumber = null;
            this.form.familyBookDOI = null;
            this.form.personalIdNumber = null;
            this.form.personalIdDOI = null;
        },
        validateUser(e) {
            this.$v.$touch();
            if (this.formModal.isEdit) {
                if (
                    !this.$v.form.firstName.$invalid &&
                    !this.$v.form.lastName.$invalid &&
                    !this.$v.form.gender.$invalid &&
                    !this.$v.form.phone.$invalid &&
                    !this.$v.form.email.$invalid &&
                    !this.$v.form.address.$invalid &&
                    !this.$v.form.provinceId.$invalid &&
                    !this.$v.form.districtId.$invalid &&
                    !this.$v.form.villageName.$invalid &&
                    !this.$v.form.bankName.$invalid &&
                    !this.$v.form.bankAcNumber.$invalid &&
                    !this.$v.form.familyBookNumber.$invalid &&
                    !this.$v.form.familyBookDOI.$invalid &&
                    !this.$v.form.personalIdNumber.$invalid &&
                    !this.$v.form.personalIdDOI.$invalid
                ) {
                    this.saveUser("edit");
                }
            } else {
                if (!this.$v.form.$invalid) {
                    this.saveUser("add");
                }
            }
        },
        async saveUser(type) {
            this.sending = true;
            this.form.sessionId = this.$session.get("userProfile").id;
            if (type == "add") {
                await this.$store
                    .dispatch("addUser", this.form)
                    .then(response => {
                        this.$alert("success", response);
                        this.showDialog = false;
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
                    })
                    .catch(error => {
                        this.$alert("danger", error);
                    });
            }
            this.onFilterReset();
            this.sending = false;
        }
    },
    mounted() {
        this.$store.dispatch("getLocation", 0);
    },
    computed: {
        ...mapGetters(["getLocationProvince", "getLocationDistrict"])
    }
}