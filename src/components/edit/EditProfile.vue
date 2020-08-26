<template>
<div>
    <v-btn class="mx-2" fab dark color="grey"  @click.stop="dialog = true">
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">Update Meetup</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                <v-text-field
                  name="name"
                  label="Name"
                  id="name"
                  v-model="name"
                  required
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                <v-text-field
                  name="phone"
                  label="Phone"
                  id="phone"
                  v-model="phone"
                  required
                ></v-text-field>
              </v-col>
              <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                <v-text-field
                  name="location"
                  label="Location"
                  id="location"
                  v-model="location"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Close</v-btn>
          <v-btn @click="saveProfile">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      dialog: false,
      name: this.data.name,
      phone: this.data.phone,
      location: this.data.location
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
