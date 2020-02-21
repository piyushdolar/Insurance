<template>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    // Error
    let error = this.$session.flash.get("error");
    if (error != undefined) {
      this.$notify({
        message: error,
        icon: "add_alert",
        verticalAlign: "top",
        horizontalAlign: "right",
        type: "danger"
      });
    }

    // Success
    let success = this.$session.flash.get("success");
    if (success != undefined) {
      this.$notify({
        message: success,
        icon: "add_alert",
        verticalAlign: "top",
        horizontalAlign: "right",
        type: "success"
      });
    }
  }
};
</script>
