<template>
    <v-container>
        <v-row>
            <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1" class="text-center">
                <h4>Create a new meetup</h4>
            </v-col>
        </v-row>
        <v-row>
            <v-col xs="12">
                <form @submit.prevent="onCreateMeetup">
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            v-model="title"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-text-field
                            name="location"
                            label="Location"
                            id="location"
                            v-model="location"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-text-field
                            name="imageUrl"
                            label="ImageUrl"
                            id="imageUrl"
                            v-model="imageUrl"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <img :src="imageUrl" alt="" height="150">
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-textarea
                            name="description"
                            id="description"
                            v-model="description"
                            counter
                            required
                            >
                                <template v-slot:label>
                                    <div>
                                    Description
                                    </div>
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-date-picker v-model="date" color="green lighten-1" header-color="primary"></v-date-picker>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-time-picker v-model="time" format="24h"></v-time-picker>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { CREATE_MEETUP } from '../../store/modules/mutation-types'

export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: new Date()
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch(CREATE_MEETUP, meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
