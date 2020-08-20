<template>
  <v-app id="inspire">
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Header from './layout/Header'
import Footer from './layout/Footer'

export default {
  name: 'App',
  components: {
    Footer,
    Header
  }

}
</script>
