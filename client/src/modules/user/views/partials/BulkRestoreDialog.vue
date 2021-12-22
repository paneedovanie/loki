<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          color="info"
          v-bind="attrs"
          v-on="on"
          class="mr-3"
          @click="dialog = true"
          >
          <v-icon>mdi-restore</v-icon>
          <span class="d-none d-md-inline">Restore</span>
        </v-btn>
      </template>
      <span>Bulk Restore</span>
    </v-tooltip>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>
          Restore Users
        </v-card-title>
        <v-card-text>
          Are you sure to restore {{ value.length }} items
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
            :disabled="resources.isLoading"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="resources.isLoading"
            color="info"
            @click="submit"
            :disabled="resources.isLoading || !value.length"
          >
            <v-icon>mdi-restore</v-icon>
            <span v-text="'Restore'"></span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '../../config/api'
import Resources from '@/core/models/Resources'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value'],

  computed: {
    ...mapGetters({
      snackbar: 'snackbar/snackbar'
    }),
  },

  data: () => ({
    dialog: false,
    resources: new Resources
  }),

  methods: {
    ...mapActions({
      setSnackbar: 'snackbar/set'
    }),

    submit() {
      this.resources.load()

      this.axios.put(
          api.restore(),
          { ids: this.value.map(item=>item.id)}
        ).then( () => {
          this.dialog = false
    
          this.setSnackbar({
            model: true,
            text: 'Users restored',
            color: 'info',
            timeout: -1
          })

          this.$emit('input')
        }).catch( error => {
          this.resources.setErrorMessage(error.response.data.message);
          this.$refs.validation.setErrors(error.response.data.details);
        }).finally(() => {
          this.resources.load(false)
        })
    }
  },
}
</script>