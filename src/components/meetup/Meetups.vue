<template>
    <div>
        <v-container>
            <v-row v-for="meetUp in meetUps" :key="meetUp.id">
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
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
  computed: {
    meetUps () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
