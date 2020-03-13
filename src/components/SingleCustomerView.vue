<template>
	<div>
		<md-dialog :md-active.sync="showSingleCustomerDialog" :md-click-outside-to-close="false">
			<md-dialog-title>{{ singleUserForm.name }}'s Detail</md-dialog-title>
			<md-dialog-content>
				<md-list class="md-double-line">
					<div class="md-layout md-gutter">
						<div class="md-layout-item">
							<md-list-item>
								<md-icon class="md-primary">face</md-icon>
								<div class="md-list-item-text">
									<span>{{ singleUserForm.name }}</span>
									<span>Full Name</span>
								</div>
							</md-list-item>
							<md-list-item>
								<md-icon class="md-primary fas fa-gender">email</md-icon>
								<div class="md-list-item-text">
									<span>{{ singleUserForm.email ? singleUserForm.email : '-' }}</span>
									<span>Personal Email</span>
								</div>
							</md-list-item>
							<md-list-item>
								<md-icon class="md-primary">supervised_user_circle</md-icon>
								<div class="md-list-item-text">
									<span v-if="singleUserForm.gender == 1">Male</span>
									<span v-if="singleUserForm.gender == 2">Female</span>
									<span v-if="singleUserForm.gender == 3">Other</span>
									<span>Gender</span>
								</div>
							</md-list-item>
							<md-list-item>
								<md-icon class="md-primary">home</md-icon>
								<div class="md-list-item-text">
									<span>{{ singleUserForm.address }}</span>
									<span>Address</span>
								</div>
							</md-list-item>
						</div>
						<div class="md-layout-item">
							<md-list-item>
								<md-icon class="md-primary">phone</md-icon>
								<div class="md-list-item-text">
									<span>{{ singleUserForm.phone }}</span>
									<span>Phone</span>
								</div>
							</md-list-item>
							<md-list-item>
								<md-icon class="md-primary">fiber_manual_record</md-icon>
								<div class="md-list-item-text">
									<span v-if="singleUserForm.status == 1">Active</span>
									<span v-else>Deactive</span>
									<span>Status</span>
								</div>
							</md-list-item>
							<md-list-item>
								<md-icon class="md-primary">watch_later</md-icon>
								<div class="md-list-item-text">
									<span>{{ singleUserForm.createdAt }}</span>
									<span>Created At</span>
								</div>
							</md-list-item>
						</div>
					</div>
				</md-list>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary" @click="onClose()">Close</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>

<script>
export default {
	name: 'SingleCustomerView',
	props: {
		showSingleCustomerDialog: {
			type: Boolean
		},
		singleUserForm: {
			type: Object
		}
	},
	methods: {
		onClose() {
			this.$emit('onDialogClose');
		}
	}
};
</script>
