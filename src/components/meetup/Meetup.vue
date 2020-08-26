/* eslint-disable eqeqeq */
<template>
    <div>
        <v-container>
            <v-row>
                <v-col xs="12">
                    <v-card>
                        <v-card-title>
                            <h6 class="primary--text">{{meetup.title}}</h6>
                        </v-card-title>
                        <v-img
                        :src="meetup.imageUrl"
                        height="400px"
                        ></v-img>
                        <v-card-text primary-title>
                            <div class="info--text">{{meetup.date | date}} - {{meetup.location}}</div>
                            <div>{{meetup.description}}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <app-register-dialog :meetupId="meetup.id"></app-register-dialog>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  props: ['id'],
  data () {
    return {
      meetup: ''
    }
  },
  created () {
    this.meetup = cloneDeep(this.loadedMeetup(this.id))
  },
  computed: {
    ...mapGetters(['loadedMeetup'])
  }
}
</script>

<style lang="scss" scoped>

</style>
