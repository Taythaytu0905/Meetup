<template>
    <v-dialog v-model="registerDialog" max-width="400">
          <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{userIsRegistered ? 'Unregister' : 'Register'}}
        </v-btn>
      </template>
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                        <v-card-title v-else>Register for Meetup?</v-card-title>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <v-card-text>You can always change your decision later on.</v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card-action>
                            <v-btn @click="registerDialog =false">Cancel</v-btn>
                            <v-btn @click="onAgree">Confirm</v-btn>
                        </v-card-action>
                    </v-col>
                </v-row>
            </v-container>
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
