<template>
  <div>
    <v-btn class="mx-2" fab dark color="grey"  @click.stop="dialog = true">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-btn class="mx-2" fab dark color="grey"  @click="deleteDialog = true">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="1000"
    >
      <v-card>
        <v-card-title class="headline red--text">Update Meetup</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="editedTitle"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="location"
                  label="Location"
                  id="location"
                  v-model="editedLocation"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="imageUrl"
                  label="ImageUrl"
                  id="imageUrl"
                  v-model="editImageUrl"
                  required
                >
                </v-text-field>
               </v-col>
              <v-col cols="12" class="text-center">
                <img :src="editImageUrl" alt="" height="200">
              </v-col>
              <v-col cols="12">
                <v-textarea
                  name="description"
                  id="description"
                  v-model="editedDecription"
                  label="Description"
                  counter
                  required
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="6" class="text-center">
                <v-date-picker v-model="editDate" color="indigo" header-color="indigo"></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6" class="text-center">
                <v-time-picker v-model="editTime" format="24h" color="indigo" header-color="indigo"></v-time-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Close</v-btn>
          <v-btn @click="updateMeetup">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deleteDialog"
      width="200"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2 text-center">
          Are you sure ?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="deleteMeetup"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      dialog: false,
      deleteDialog: false,
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
