<template>
  <div>
    <v-container>
      <v-row>
        <v-col xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn large router to="/meetups" class="green">Explore Meetups</v-btn>
        </v-col>
         <v-col xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn large router to="/meetup/new" class="green">Organize Meetup</v-btn>
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <v-carousel >
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            >
            <div class="title">{{item.title}}</div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row class="mt-2">
        <v-col xs12 sm6 class="text-center">
          <p>Join our awesome meetup!</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', title: 'Hello world1'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', title: 'Hello world2'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', title: 'Hello world3'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', title: 'Hello world4'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 30px;
}
</style>
