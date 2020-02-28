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
                    title: 'Actions'
                },
                {
                    name: "email",
                    sortField: "email",
                    title: "Email"
                },
                {
                    name: "lastLogin",
                    sortField: "lastLogin",
                    title: "Last Login"
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
    methods: {
    },
    computed: {
        ...mapGetters({
            getUserReports: "getUserReports",

        })
    },
    mounted() {
        this.$store.dispatch("getUserReports", { user_type: 2, searchWord: "" });
    }
};
