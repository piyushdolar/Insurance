<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-50 mx-auto md-small-size-100">
          <md-empty-state
            md-icon="rowing"
            md-label="Successfully Logged out!"
            md-description="Your session has been terminated, Login to access again the Insurance portal.">
            <router-link to="login"><h4><md-icon class="md-primary">rotate_left</md-icon>Login Now</h4></router-link>
            <!-- <md-button class="md-primary md-raised" to="/login"><md-icon>rotate_left</md-icon>Login</md-button> -->
          </md-empty-state>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      localStorage.removeItem("refreshToken");
    }
  }
};
</script>

<style lang="scss" scoped>
.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.md-card {
  margin-top: 50px;
}

.table-responsive {
  overflow: auto;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;

  thead tr th {
    font-size: 1.063rem;
    border-top-width: 0;
    font-weight: 300;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  & > tbody > tr > td,
  & > tbody > tr > th,
  & > tfoot > tr > td,
  & > tfoot > tr > th,
  & > thead > tr > td,
  & > thead > tr > th {
    padding: 12px 8px;
    vertical-align: middle;
  }

  & > tbody > tr {
    position: relative;
  }

  td,
  th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
