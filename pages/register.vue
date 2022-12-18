<template>
  <v-row>
    <v-col cols="10" offset-sm="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar dark color="primary">Register</v-toolbar>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              name="fullname"
              label="Full Name"
              type="text"
              :rules="rules.fullName"
              v-model="form.fullname"
            />
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              @keydown="resetEmailExist"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
            <v-text-field
              name="retype_password"
              label="Re-Password"
              type="password"
              :rules="rules.retype_password"
              v-model="form.retype_password"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onSubmit" :loading="isLoading">
            Register
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="d-flex align-baseline">
        <p>Already have an account?</p>
        <v-btn
          text
          plain
          :ripple="false"
          :to="localePath('/login')"
          color="primary"
          class="pl-1"
          >Login</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['unauthenticated'],
  layout: 'auth',
  head() {
    return {
      title: 'Register',
    }
  },
  data() {
    return {
      emailExist: false,
      isLoading: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        retype_password: '',
      },
      rules: {
        fullName: [(v) => !!v || 'Name is required'],
        email: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          (v) => !this.emailExist || 'E-mail already exist',
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) =>
            v.length >= 6 ||
            'Password must be equal or greater than 6 characters',
        ],
        retype_password: [
          (v) => !!v || 'Retype password is required',
          (v) => v == this.form.password || 'Password not match',
        ],
      },
    }
  },
  methods: {
    resetEmailExist() {
      this.emailExist = false
    },
    async onSubmit() {
      try {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          const response = await this.$axios.$post(
            '/register',
            this.form
          )
          if (response.message == 'USER_CREATED_SUCCESSFULLY') {
            this.$store.commit('auth/setFullname', response.user.fullname)
            this.$store.commit('auth/setAccessToken', response.accessToken)
            this.$store.commit('auth/setRefreshToken', response.refreshToken)
            this.$router.push({ path: this.localePath('/') })
          }

          this.isLoading = false
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.data.message == 'EMAIL_ALREADY_EXIST') {
          this.emailExist = true
          this.$refs.form.validate()
        }

        this.isLoading = false
      }
    },
  },
}
</script>
