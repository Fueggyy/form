<template>
  <v-row>
    <v-col cols="10" offset-sm="1" md="4" offset-md="4">
      <v-card>
        <v-card-text class="d-flex align-center">
          <h2>Logout</h2>
          <!-- <v-icon>mdi-loading</v-icon> -->
          <v-progress-circular
            class="ml-3"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import * as Cookies from 'js-cookie'

export default {
  middleware: 'authenticated',
  layout: 'auth',
  mounted() {
    // remove cookie

    setTimeout(() => {
      Cookies.remove('LuckQform')
      window.location.href = this.localePath('/login')
    }, 1000)

    // set cookie to null
    // this.$store.commit('auth/logout')
    // this.$router.push({ path: this.localePath('/login') })
  },
}
</script>
