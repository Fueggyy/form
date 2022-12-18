<template>
  <v-row>
    <v-col cols="10" offset-sm="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar dark color="primary">Login</v-toolbar>
        <v-card-text>
          <v-alert v-if="isError" color="red lighten-2" dark>
            {{ $t(message) }}
          </v-alert>
          <v-form ref="form">
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onSubmit" :loading="isLoading">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="d-flex align-baseline">
        <p>Don't have an account?</p>
        <v-btn
          text
          plain
          :ripple="false"
          :to="localePath('/register')"
          color="primary"
          class="pl-1"
          >Register</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'unauthenticated',
  layout: 'auth',
  head() {
    return {
      title: 'Login',
    }
  },
  data() {
    return {
      isError: false,
      isLoading: false,
      message: null,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'email' }),
          (v) => /.+@.+\..+/.test(v) || this.$t('EMAIL_INVALID'),
        ],
        password: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'password' }),
          (v) => v.length >= 6 || this.$t('FIELD_MIN', { min: 6 }),
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
        const auth = await this.$store.dispatch('auth/login', this.form)

        this.$router.push({ path: this.localePath('/') })
      } catch (error) {
        this.isLoading = false
        this.isError = true

        this.message = error.response
          ? error.response.data.message
          : 'SERVER_ERROR'
      }
    },
  },
}
</script>
