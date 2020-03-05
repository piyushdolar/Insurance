import moment from "moment";
import { mapGetters } from 'vuex';

export const ReportCustomerMixin = {
    data() {
        return {
            defaultImage: "/images/avatars/default.png",
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
                    name: "fullName",
                    title: "Customer Name"
                },
                {
                    name: "gender",
                    title: "Gender",
                    callback: value => {
                        return (value == 1) ? 'Male' : (value == 2) ? "Female" : (value == 3) ? "Other" : "-";
                    }
                },
                {
                    name: "phone",
                    title: "Phone"
                },
                {
                    name: "email",
                    title: "Email",
                    callback: value => {
                        return (value) ? value : '-';
                    }
                },
                {
                    name: "status",
                    title: "Status",
                    callback: value => {
                        return value == 1 ? 'Inactive' : value == 2 ? 'Active' : value == 3 ? 'Deleted' : '-';
                    }
                },
                {
                    name: "createdBy",
                    title: "Created By",
                    callback: value => {
                        return value.name != null ? value.name : '-';
                    }
                },
                {
                    name: "createdAt",
                    title: "Created At",
                    callback: value => {
                        return moment(String(value)).format("MM/DD/YYYY hh:mm a")
                    }
                },
                {
                    name: "updatedBy",
                    title: "Updated By",
                    callback: value => {
                        return value.name != null ? value.name : '-';
                    }
                },
            ]
        }
    },
};
