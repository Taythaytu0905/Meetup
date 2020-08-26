<template>
    <v-dialog v-model="registerDialog" max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          large
          v-bind="attrs"
          v-on="on"
        >
          {{userIsRegistered ? 'Unregister' : 'Register'}}
        </v-btn>
      </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
          <v-card-title class="headline grey lighten-2" v-else>Register for Meetup?</v-card-title>
          <v-card-text class="pt-6">You can always change your decision later on.</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  @click="registerDialog =false">Cancel</v-btn>
            <v-btn @click="onAgree">Confirm</v-btn>
          </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
      this.registerDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
