<template>
  <div>
    <v-container fluid class="pa-0">
      <Toolbar />
    </v-container>

    <v-container>
      <v-row>
        <v-col md="8" offset-md="2" sm="10" offset-sm="1">
          <v-card>
            <v-card-text> <QuestionTitle /> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="8" offset-md="2" sm="10" offset-sm="1">
          <v-card>
            <v-card-text> TES 2 </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Form',
    }
  },
  async asyncData({ params, redirect }) {
    try {
      if (!params.id) {
        throw { message: 'FORM_ID_EMPTY' }
      }

      return { formId: params.id }
    } catch (error) {
      redirect('/404')
      return false
    }
  },
  methods: {
    async fetchForm() {
      try {
        const response = await this.$store.dispatch('forms/show', this.formId)
      } catch (error) {
        if (error.response) {
          this.$nuxt.error({
            statusCode: error.response.status,
            message: error.response.data.message,
          })
        } else {
          this.$store.commit('alerts/show', {
            type: 'error',
            show: true,
            message: this.$t('SERVER_ERROR'),
          })
        }
      }
    },
  },
  mounted() {
    this.fetchForm()
  },
}
</script>
