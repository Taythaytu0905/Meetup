<template>
   <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row v-if="error">
          <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-form @submit.prevent="onSignin">
                    <v-row>
                      <v-col xs="12">
                        <v-text-field
                          label="Email"
                          name="email"
                          v-model="email"
                          prepend-icon="mdi-account"
                          type="email"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col xs="12">
                        <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          v-model="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col xs="12">
                        <v-btn
                        type="submit"
                        @click="loader = 'loading'"
                        :loading="loading"
                        :disabled="loading"
                        >Sign in</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
