<template>
  <v-row justify="center">
    <v-btn class="mx-2" fab dark large color="grey"  @click.stop="dialog = true">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-btn class="mx-2" fab dark large color="grey"  @click="deleteMeetup">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title class="headline">Update Meetup</v-card-title>
        <v-row>
            <v-col xs="12">
                <form @submit.prevent="onCreateMeetup">
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            v-model="editedTitle"
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
                            v-model="editedLocation"
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
                            v-model="editImageUrl"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <img :src="editImageUrl" alt="" height="150">
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-textarea
                            name="description"
                            id="description"
                            v-model="editedDecription"
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
                            <v-date-picker v-model="editDate" color="green lighten-1" header-color="primary"></v-date-picker>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-time-picker v-model="editTime" format="24h"></v-time-picker>
                        </v-col>
                    </v-row>
                </form>
            </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="updateMeetup"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedLocation: this.meetup.location,
      editImageUrl: this.meetup.imageUrl,
      editedDecription: this.meetup.description,
      editTime: new Date(),
      editDate: this.meetup.date.substr(0, 10)
    }
  },
  computed: {
    submittableDateTime () {
      const date = new Date(this.editDate)
      if (typeof this.editTime === 'string') {
        const hours = this.editTime.match(/^(\d+)/)[1]
        const minutes = this.editTime.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.editTime.getHours())
        date.setMinutes(this.editTime.getMinutes())
      }
      return date
    }
  },
  methods: {
    updateMeetup () {
      this.dialog = false
      const updateMeetup = {
        id: this.meetup.id,
        title: this.editedTitle,
        location: this.editedLocation,
        imageUrl: this.editImageUrl,
        description: this.editedDecription,
        date: this.submittableDateTime
      }
      this.$store.dispatch('editMeetup', updateMeetup)
    },
    deleteMeetup () {
      this.$store.dispatch('deleteMeetup', this.meetup.id)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
