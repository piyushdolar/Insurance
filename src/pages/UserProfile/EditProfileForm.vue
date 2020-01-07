<template>
	<form>
		<md-card class="md-card-profile">
			<div class="md-card-avatar">
				<img class="img" :src="cardUserImage" />
			</div>

			<md-card-content>
				<div class="md-layout">
					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>First Name</label>
							<md-input v-model="userData.firstName" type="text"></md-input>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100 md-size-50">
						<md-field>
							<label>Last Name</label>
							<md-input v-model="userData.lastName" type="text"></md-input>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100 md-size-100">
						<md-field>
							<label>Email Address</label>
							<md-input v-model="userData.email" type="email"></md-input>
						</md-field>
					</div>
					<div class="md-layout-item md-size-100 text-right">
						<md-button class="md-raised md-success">Update Profile</md-button>
					</div>
				</div>
			</md-card-content>
		</md-card>
	</form>
</template>
<script>
export default {
	name: 'edit-profile-form',
	props: {
		cardUserImage: {
			type: String,
			default: require('@/assets/img/faces/marc.jpg')
		}
	},
	data() {
		return {
			userData: this.$session.get('userProfile')
		};
	}
};
</script>
<style></style>
