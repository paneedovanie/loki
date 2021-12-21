<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="dialog = true"
          class="mr-3"
          color="error"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-delete</v-icon>
        <span class="d-none d-md-inline">Delete</span>
        </v-btn>
      </template>
      <span>Bulk Delete</span>
    </v-tooltip>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>
          Delete Users
        </v-card-title>
        <v-card-text>
          Are you sure to delete {{ value.length }} items
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
            color="error"
            @click="submit"
            :disabled="resources.isLoading || !value.length"
          >
            <v-icon>mdi-delete</v-icon>
            <span v-text="'Delete'"></span>
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
          api.trash(),
          { ids: this.value.map(item=>item.id)}
        ).then( () => {
          this.dialog = false
    
          this.setSnackbar({
            model: true,
            text: 'Users deleted',
            color: 'error',
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