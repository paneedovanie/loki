<template>
   <v-dialog
      :value="true"
    >
      <component :is="dialog.component"></component>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      dialog: 'dialog/dialog'
    })
  },

  methods: {
    ...mapActions({
      toggle: 'dialog/toggle'
    })
  }
}
</script>