<template>
    <div class="header">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense >
          <v-list-item v-for="(item, index) in menuItems" :key="index" link router :to="item.link" class="text-decoration-none">
            <v-list-item-action>
              <v-icon>mdi-{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onLogout" v-if="userIsAuthenticated">
            <v-list-item-action >
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon  class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title><router-link :to="'/'" class="white--text text-decoration-none">MEET UP APP</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-only hidden-xs-only" >
          <v-btn v-for="(item, index) in menuItems" :key="index" text router :to="item.link" class="text-decoration-none">
            <v-icon left >mdi-{{item.icon}}</v-icon> {{item.title}}
          </v-btn>
          <v-btn text v-if="userIsAuthenticated" @click="onLogout">
            <v-icon left >mdi-logout</v-icon> Logout
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    source: String
  },

  data: () => ({
    drawer: false
  }),
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'account-group', title: 'View Meetups', link: '/meetups' },
          { icon: 'settings', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'account', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      const user = this.$store.getters.user
      return user !== null && user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
