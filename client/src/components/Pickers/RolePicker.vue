<template>
  <v-select
    :error-messages="errorMessages"
    :items="resources.data"
    item-text="title"
    item-value="id"
    label="Role"
    v-model="dataset"
  ></v-select>
</template>

<script>
import Resources from '@/core/models/Resources'

export default {
  props: ['value', 'errorMessages'],

  computed: {
    dataset: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  data: () => ({
    resources: new Resources,
  }),

  async mounted () {
    this.axios('/api/v1/roles/getAll')
    .then(response => {
      this.resources.data = response.data
    })
  }
}
</script>