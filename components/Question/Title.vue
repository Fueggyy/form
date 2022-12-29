<template>
  <v-text-field
    placeholder="title"
    :value="title"
    @input="typing($event)"
  ></v-text-field>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('forms', ['id', 'title']),
  },
  methods: {
    typing(value) {
      try {
        let payload = {
          id: this.id,
          title: value,
        }

        const forms = this.$store.dispatch('forms/update', payload)
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>
