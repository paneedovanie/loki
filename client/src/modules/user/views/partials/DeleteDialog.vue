<template>
  <div class="d-inline">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          color="error"
          v-bind="attrs"
          v-on="on"
          @click="dialog = true"
          icon
          >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Delete</span>
    </v-tooltip>

    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title>
          Delete User
        </v-card-title>

        <v-card-text>
          Are you sure to delete {{ value.display_name }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
            :disabled="user.isLoading"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="user.isLoading"
            color="error"
            @click="submit"
            :disabled="user.isLoading || !value.id"
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
import User from '../../models/User'
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
    user: new User
  }),

  methods: {
    ...mapActions({
      setSnackbar: 'snackbar/set'
    }),

    submit() {
      this.user.load()

      this.axios.put(
          api.trash(this.value.id)
        ).then( () => {
          this.dialog = false
    
          this.setSnackbar({
            model: true,
            text: 'User deleted',
            color: 'error',
            timeout: -1
          })

          this.$emit('input')
        }).catch( error => {
          this.user.setErrorMessage(error.response.data.message);
          this.$refs.validation.setErrors(error.response.data.details);
        }).finally(() => {
          this.user.load(false)
        })
    }
  },
}
</script>