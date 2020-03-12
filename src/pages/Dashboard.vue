<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <h2>Daily Report Charts</h2>
        <chart-card
          :chart-data="getDashboardCharts.daily_sales"
          :chart-options="charts.options"
          :chart-type="'Line'"
          data-background-color="blue"
          :chart-responsive-options="charts.responsiveOptions"
        >
          <template slot="content">
            <h4 class="title">Policy Sales</h4>
            <p class="category">
              Live data to check how many policy sold on specific day.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>Last updated recently
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <chart-card
          :chart-data="getDashboardCharts.agents"
          :chart-options="charts.options"
          :chart-type="'Line'"
          data-background-color="green"
          :chart-responsive-options="charts.responsiveOptions"
        >
          <template slot="content">
            <h4 class="title">Registered Agents</h4>
            <p class="category">
              Live data to check registered agent on specific day.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>Last updated recently
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <h2>Yearly Report Chart</h2>
        <chart-card
          :chart-data="getDashboardCharts.policy_holders"
          :chart-options="charts.options"
          :chart-responsive-options="charts.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Registered Customers</h4>
            <p class="category">
              Live data to check how many custoemre were registered on specific
              month.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>Last updated recently
            </div>
          </template>
        </chart-card>
      </div>

      <!-- Counters Stats -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <h2>Counter's Stats</h2>
      </div>

      <!-- Admin -->
      <div class="md-layout-item md-layout md-size-100">
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="blue">
            <template slot="header">
              <md-icon>verified_user</md-icon>
            </template>

            <template slot="content">
              <p class="category">Total Admins</p>
              <h3 class="title">{{ getDashboard.admins.totalAdmin }}</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>date_range</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="blue">
            <template slot="header">
              <md-icon>verified_user</md-icon>
            </template>

            <template slot="content">
              <p class="category">Logged In</p>
              <h3 class="title">
                {{ getDashboard.admins.totalAdminsLoggedInToday }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>date_range</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
      </div>

      <!-- Agents -->
      <div class="md-layout-item md-layout md-size-100">
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="orange">
            <template slot="header">
              <md-icon>work</md-icon>
            </template>

            <template slot="content">
              <p class="category">Total Agents</p>
              <h3 class="title">{{ getDashboard.agents.totalAgents }}</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>date_range</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="orange">
            <template slot="header">
              <md-icon>work</md-icon>
            </template>

            <template slot="content">
              <p class="category">Logged In</p>
              <h3 class="title">
                {{ getDashboard.agents.totalAgentsLoggedInToday }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>date_range</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
      </div>

      <div class="md-layout-item md-layout md-size-100">
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="purple">
            <template slot="header">
              <md-icon>emoji_people</md-icon>
            </template>

            <template slot="content">
              <p class="category">Total Customers</p>
              <h3 class="title">{{ getDashboard.customers.totalCustomers }}</h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>local_offer</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="purple">
            <template slot="header">
              <md-icon>emoji_people</md-icon>
            </template>

            <template slot="content">
              <p class="category">Active</p>
              <h3 class="title">
                {{ getDashboard.customers.totalActiveCustomers }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>local_offer</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="purple">
            <template slot="header">
              <md-icon>emoji_people</md-icon>
            </template>

            <template slot="content">
              <p class="category">In-Active</p>
              <h3 class="title">
                {{ getDashboard.customers.totalInactiveCustomers }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats">
                <md-icon>local_offer</md-icon>Updated recently
              </div>
            </template>
          </stats-card>
        </div>
      </div>

      <div class="md-layout-item md-layout md-size-100">
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="green">
            <template slot="header">
              <md-icon>assignment_ind</md-icon>
            </template>

            <template slot="content">
              <p class="category">Total Policies</p>
              <h3 class="title">{{ getDashboard.policy.totalPolicy }}</h3>
            </template>

            <template slot="footer">
              <div class="stats"><md-icon>update</md-icon>Updated recently</div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="green">
            <template slot="header">
              <md-icon>assignment_ind</md-icon>
            </template>

            <template slot="content">
              <p class="category">Active</p>
              <h3 class="title">
                {{ getDashboard.policy.totalPendingPolicies }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats"><md-icon>update</md-icon>Updated recently</div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="green">
            <template slot="header">
              <md-icon>assignment_ind</md-icon>
            </template>

            <template slot="content">
              <p class="category">Pending</p>
              <h3 class="title">
                {{ getDashboard.policy.totalActivePolicies }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats"><md-icon>update</md-icon>Updated recently</div>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
        >
          <stats-card data-background-color="green">
            <template slot="header">
              <md-icon>assignment_ind</md-icon>
            </template>

            <template slot="content">
              <p class="category">Rejected</p>
              <h3 class="title">
                {{ getDashboard.policy.totalRejectedPolicies }}
              </h3>
            </template>

            <template slot="footer">
              <div class="stats"><md-icon>update</md-icon>Updated recently</div>
            </template>
          </stats-card>
        </div>
      </div>

      <!-- Recent tables -->
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <h2>Recent Logins</h2>
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Recent User Logged In</h4>
            <p class="category">New recent user update list</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <h2>Recently Added</h2>
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">
              <i class="fa fa-users fa-2x"></i>
            </span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="Agents" md-icon="verified_user">
                <nav-tabs-table-agent></nav-tabs-table-agent>
              </md-tab>

              <md-tab id="tab-pages" md-label="Customers" md-icon="face">
                <nav-tabs-table-holders></nav-tabs-table-holders>
              </md-tab>

              <md-tab id="tab-posts" md-label="Policies" md-icon="assignment">
                <nav-tabs-table-policy></nav-tabs-table-policy>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTableAgent,
  NavTabsTableHolders,
  NavTabsTablePolicy,
  OrderedTable
} from "@/components";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTableAgent,
    NavTabsTableHolders,
    NavTabsTablePolicy,
    OrderedTable
  },
  data() {
    return {
      showSnackbar: true,
      charts: {
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          axisX: {
            showGrid: true
          },
          low: 0,
          high: 100,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  created() {
    this.$store.dispatch("fetchDashboard");
  },
  computed: {
    ...mapGetters(["getDashboard", "getDashboardCharts"])
  }
};
</script>
