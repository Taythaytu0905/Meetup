<template>
    <div class="header">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense v-for="(item, index) in menuItems" :key="index">
          <v-list-item link router :to="item.link">
            <v-list-item-action>
              <v-icon>mdi-{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
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
          <v-toolbar-title><router-link :to="'/'">Meet Up App</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-only hidden-xs-only" v-for="(item, index) in menuItems" :key="index">
          <v-btn text router :to="item.link" >
            <v-icon left >mdi-{{item.icon}}</v-icon> {{item.title}}
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
  }
}
</script>

<style lang="scss" scoped>

</style>
