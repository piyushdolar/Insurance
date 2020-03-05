import moment from "moment";
import { mapGetters } from 'vuex';

export const ReportMixin = {
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
                    name: '__slot:fullName',
                    sortField: "firstName",
                    title: 'Full Name'
                },
                {
                    name: "email",
                    sortField: "email",
                    title: "Email"
                },
                {
                    name: "lastLogin",
                    sortField: "lastLogin",
                    title: "Last Login",
                    callback: value => {
                        return (value == null) ? '-' : moment(String(value)).format("MM/DD/YYYY hh:mm a");
                    }
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
            ]
        }
    },
};
