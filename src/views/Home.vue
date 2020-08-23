<template>
  <div>
    <v-container>
      <v-row>
        <v-col xs="12" sm="6" class="text-xs-center text-sm-left ">
          <v-btn large router to="/meetups" class="indigo white--text text-decoration-none">Explore Meetups</v-btn>
        </v-col>
         <v-col xs="12" sm="6" class="text-xs-center text-sm-right">
          <v-btn large router to="/meetup/new" class="indigo white--text text-decoration-none">Organize Meetup</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12" sm="6" xl="6" offset-xl="3" class="text-center">
          <v-progress-circular
          :width="7"
          :size="70"
          indeterminate
          v-if="loading"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row class="mt-2" v-if="!loading">
        <v-col >
          <v-carousel class="click">
            <v-carousel-item
              v-for="meetup in meetUps"
              :key="meetup.id"
              :src="meetup.imageUrl"
              @click="onLoadMeetup(meetup.id)"
            >
            <div class="title"><h2>{{meetup.title}}</h2></div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col xs="12" sm="6" xl="6" offset-xl="3">
          <h2 class="ma-3 text-center">Join our awesome meetup!</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    meetUps () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      return this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.css';
</style>
