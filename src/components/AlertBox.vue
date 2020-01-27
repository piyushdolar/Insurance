<template>
	<div>
		<md-dialog-confirm :md-active.sync="alert.active" :md-title="alert.title" :md-content="alert.content" md-confirm-text="Agree" md-cancel-text="Disagree" @md-confirm="onConfirm" />
		<!-- @md-cancel="onCancel" -->
	</div>
</template>
<script>
export default {
	name: 'alert-box',
	props: ['alert'],
	methods: {
		onConfirm() {
			this.$parent.onAlertBoxConfirm();
		}
		/* onCancel() {
      this.$parent.onAlertBoxCancel();
    } */
	}
};

/*
// USAGE:
DATA:
  alertBox: {
      title: null,
      content: null,
      active: false
  }

TEMPLATE:
  <alert-box :alert="alertBox"></alert-box>

METHOD:
  onAlertBoxConfirm() {
    console.log("Confirmed.");
    this.alertBoxActive = false;
  } */
</script>
