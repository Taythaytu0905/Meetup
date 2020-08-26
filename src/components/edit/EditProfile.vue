<template>
<div>
    <v-btn class="mx-2" fab dark large color="grey"  @click.stop="dialog = true">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">Update Meetup</v-card-title>
        <v-row>
            <v-col xs="12">
                <form @submit.prevent="onCreateMeetup">
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-text-field
                            name="name"
                            label="Name"
                            id="name"
                            v-model="name"
                            required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                            <v-text-field
                            name="phone"
                            label="Phone"
                            id="phone"
                            v-model="phone"
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
            @click="saveProfile"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      name: '',
      phone: '',
      location: ''
    }
  },
  computed: {
    profileUser () {
      return this.$store.getters.user
    }
  },
  methods: {
    saveProfile () {
      if (this.profileUser.name === '') {
        this.$store.dispatch('addProfileUser', {
          name: this.name,
          phone: this.phone,
          location: this.location
        })
        this.dialog = false
      } else {
        this.$store.dispatch('updateProfileUser', {
          name: this.name,
          phone: this.phone,
          location: this.location
        })
        this.dialog = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
