<template>
    <v-container>
        <v-row v-if="error">
            <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-col>
        </v-row>
        <v-row >
            <v-col xs="12" sm="10" md="8" xl="8" offset-xl="2" offset-md="2" offset-sm="1">
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form @submit.prevent="onSignup">
                                <v-row>
                                    <v-col xs="12">
                                        <v-text-field
                                        name="email"
                                        label="Email"
                                        id="email"
                                        v-model="email"
                                        prepend-icon="mdi-account"
                                        type="email"
                                        required
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col xs="12">
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        required
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col xs="12">
                                        <v-text-field
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        required
                                        :rules=[comparePassword]
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col xs="12">
                                        <v-btn
                                        type="submit"
                                        @click="loader = 'loading'"
                                        :loading="loading"
                                        :disabled="loading"
                                        >Sign Up</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      loader: null
    }
  },
  computed: {
    comparePassword () {
      return this.password !== this.confirmPassword ? 'Password do not match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
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
    onSignup () {
      this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
