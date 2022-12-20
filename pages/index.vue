<template>
  <v-container class="mt-3">
    <v-row>
      <v-col cols="12" class="text-right">
        <BtnCreateForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  head() {
    return {
      title: 'HomePage',
    }
  },
  methods: {
    async fetchForms() {
      try {
        const response = await this.$axios.$get('/forms')

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.fetchForms()
  },
}
</script>
