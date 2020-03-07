<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <chart-card
          :chart-data="getDashboardCharts.policy_holders"
          :chart-options="charts.options"
          :chart-responsive-options="charts.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Number Of Customers</h4>
            <p class="category">Last Campaign Performance</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>Last updated recently
            </div>
          </template>
        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="getDashboardCharts.daily_sales"
          :chart-options="charts.options"
          :chart-type="'Line'"
          data-background-color="blue"
          :chart-responsive-options="charts.responsiveOptions"
        >
          <template slot="content">
            <h4 class="title">Daily Sales Performance</h4>
            <p class="category">
              <span class="text-success">
                <i class="fas fa-long-arrow-alt-up"></i> Updated
              </span>
              increase in today sales.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>Last updated recently
            </div>
          </template>
        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="getDashboardCharts.agents"
          :chart-options="charts.options"
          :chart-type="'Line'"
          data-background-color="green"
          :chart-responsive-options="charts.responsiveOptions"
        >
          <template slot="content">
            <h4 class="title">Number Of Agents</h4>
            <p class="category">Last Campaign Performance</p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>Last updated recently
            </div>
          </template>
        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>verified_user</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total System Admins</p>
            <h3 class="title">{{ getDashboard.users }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>Last updated recently
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>supervised_user_circle</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Agents</p>
            <h3 class="title">{{ getDashboard.agents }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>Last updated recently
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="red">
          <template slot="header">
            <i class="fa fa-users"></i>
          </template>

          <template slot="content">
            <p class="category">Total Customers</p>
            <h3 class="title">{{ getDashboard.policy_holders }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>Tracked from live server
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>assignment</md-icon>
          </template>

          <template slot="content">
            <p class="category">Total Policies</p>
            <h3 class="title">{{ getDashboard.policies }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
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
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
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
