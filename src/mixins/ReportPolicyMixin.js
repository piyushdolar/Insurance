import moment from "moment";
import { mapGetters } from 'vuex';

export const ReportPolicyMixin = {
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
                    name: "policyNumber",
                    title: "Policy Number"
                },
                {
                    name: "policyName",
                    title: "Policy Name"
                },
                {
                    name: "date",
                    title: "Date Period",
                    callback: value => {
                        return (value == null) ? '-' : moment(String(value.startDate)).format("MM/DD/YYYY") + " to " + moment(String(value.endDate)).format("MM/DD/YYYY");
                    }
                },
                {
                    name: "policyType",
                    title: "Policy Type",
                    callback: value => {
                        return (value == 1) ? 'Motor' : (value == 2) ? "Non-Motor" : "-";
                    }
                },
                {
                    name: "sumInsured",
                    sortField: "sumInsured",
                    title: "Sum Insured"
                },
                {
                    name: "currencyType",
                    sortField: "currencyType",
                    title: "Currency Type"
                },
                {
                    name: "make",
                    sortField: "make",
                    title: "Make"
                },
                {
                    name: "vehicleType",
                    sortField: "vehicleType",
                    title: "Vehicle Type"
                },
                {
                    name: "status",
                    title: "Status",
                    callback: value => {
                        return (value == 1) ? 'Pending' : (value == 2) ? "Approved" : (value == 3) ? "Rejected" : (value == 4) ? "Un-Confirmed" : "-";
                    }
                },
                {
                    name: '__slot:customerName',
                    sortField: "customer.firstName",
                    title: 'Customer Name'
                },
                {
                    name: '__slot:agentName',
                    sortField: "agent.firstName",
                    title: 'Agent Name'
                },
                {
                    name: "comment",
                    sortField: "comment",
                    title: "Comment"
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
                }
            ]
        }
    },
};
