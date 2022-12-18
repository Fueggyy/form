<template>
  <v-app dark>
    <v-main>
      <!-- <nuxt-link :to="switchLocalePath('id')">Indonesia </nuxt-link>
      <nuxt-link :to="switchLocalePath('en')">English </nuxt-link>
      <nuxt-link :to="switchLocalePath('ru')">Russian </nuxt-link> -->
      <v-container fill-height>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'auth',
}
</script>
