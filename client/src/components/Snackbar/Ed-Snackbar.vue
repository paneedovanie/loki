<template>
  <v-snackbar
    v-model="snackbar.model"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="snackbar.color"
        @click="hideSnackbar"
        text
        v-bind="attrs"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      snackbar: 'snackbar/snackbar'
    }),

    model: {
      get() {
        return this.snackbar.model
      }, 
      set(value) {
        this.setSnackbar({
          model: value
        })
      }
    }
  },

  methods: {
    ...mapActions({
      setSnackbar: 'snackbar/set',
      hideSnackbar: 'snackbar/hide'
    })
  }
}
</script>