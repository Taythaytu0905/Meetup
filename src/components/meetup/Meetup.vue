/* eslint-disable eqeqeq */
<template>
    <div>
        <v-container>
            <v-row>
                <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                    <v-card>
                        <v-card-title>
                            <h2 class="red--text">{{meetup.title}}</h2>
                            <v-spacer></v-spacer>
                            <app-edit-dialog v-if="userIsCreator" :meetup="meetup"></app-edit-dialog>
                        </v-card-title>
                        <v-img
                        :src="meetup.imageUrl"
                        height="400px"
                        ></v-img>
                        <v-card-text primary-title>
                            <h6 class="info--text">{{meetup.date | date}} - {{meetup.location}}</h6>
                        </v-card-text>
                        <v-card-text class="black--text">
                            {{meetup.description}}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <app-register-dialog v-if="!userIsCreator" :meetupId="meetup.id"></app-register-dialog>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  computed: {
    ...mapGetters(['loadedMeetup']),
    meetup () {
      return this.loadedMeetup(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null &&
      this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
