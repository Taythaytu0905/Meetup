<template>
<v-container>
  <v-row>
    <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
      <v-card>
        <v-card-title>
          <h2 class="red--text">My profile</h2>
            <v-spacer></v-spacer>
          <app-edit-profile-dialog :data="profileUser"></app-edit-profile-dialog>
        </v-card-title>
    </v-card>
    <v-card-text>
        <v-list two-line>
            <v-list-item >
                <v-list-item-icon>
                <v-icon color="indigo">mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>{{profileUser.name}}</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
                <v-list-item-icon>
                <v-icon color="indigo">mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>{{profileUser.phone}}</v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
                <v-list-item-icon>
                <v-icon color="indigo">mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>{{profileUser.location}}</v-list-item-title>
                <v-list-item-subtitle>Viet Nam</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </v-list>
    </v-card-text>
    </v-col>
  </v-row>

  <v-row>
      <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
        <h2 class="red--text text-center">Created Meetup</h2>
      </v-col>
  </v-row>
  <v-row v-for="meetUp in meetUpsCreate" :key="meetUp.id">
    <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
      <v-card class="indigo lighten-4">
        <v-container>
          <v-row>
            <v-col xs="5" sm="4" md="3">
              <v-img :src='meetUp.imageUrl' height="130px"></v-img>
            </v-col>
            <v-col xs="7" sm="8" md="9">
              <v-card-title>
                <h3 class="mb-0">{{meetUp.title}}</h3>
              </v-card-title>
              <v-card-subtitle class="pb-0">{{meetUp.date | date }} - {{meetUp.location}}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn flat :to="'/meetups/' + meetUp.id" class="text-decoration-none">
                      <v-icon left >mdi-calendar</v-icon>
                      View Meetup
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteMeetup(meetUp.id)">
                      <v-icon left >mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

  <v-row>
      <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
        <h2 class="red--text text-center">Registered</h2>
      </v-col>
  </v-row>
  <v-row v-for="meetUp in meetups" :key="meetUp.id">
    <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
      <v-card class="indigo lighten-4">
        <v-container>
          <v-row>
            <v-col xs="5" sm="4" md="3">
              <v-img :src='meetUp.imageUrl' height="130px"></v-img>
            </v-col>
            <v-col xs="7" sm="8" md="9">
              <v-card-title>
                <h3 class="mb-0">{{meetUp.title}}</h3>
              </v-card-title>
              <v-card-subtitle class="pb-0">{{meetUp.date | date }} - {{meetUp.location}}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn flat :to="'/meetups/' + meetUp.id" class="text-decoration-none">
                      <v-icon left >mdi-calendar</v-icon>
                      View Meetup
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="unRegiser(meetUp.id)">
                      <v-icon left >mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user']),
    profileUser () {
      return this.user
    },
    meetUps () {
      return this.$store.getters.loadedMeetups
    },
    meetups () {
      const registeredMeetups = this.profileUser.registeredMeetups
      const meetups = this.meetUps
      const data = []
      for (let i = 0; i < meetups.length; i++) {
        for (let j = 0; j < registeredMeetups.length; j++) {
          if (registeredMeetups[j] === meetups[i].id) {
            data.push(meetups[i])
          }
        }
      }
      return data
    },
    meetUpsCreate () {
      const data = this.meetUps.filter(meetup => meetup.creatorId === this.profileUser.id)
      return data
    }
  },
  methods: {
    unRegiser (id) {
      this.$store.dispatch('unregisterUserFromMeetup', id)
    },
    deleteMeetup (id) {
      this.$store.dispatch('deleteMeetup', id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
