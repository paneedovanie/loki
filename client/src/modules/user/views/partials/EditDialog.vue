<template>
  <div class="d-inline">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          color="warning"
          v-bind="attrs"
          v-on="on"
          icon
          @click="dialog = true"
          >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Edit</span>
    </v-tooltip>

  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <validation-observer ref="validation">
      <v-form
        :disabled="user.isLoading"
        @submit.prevent="submit"
        enctype="multipart/form-data"
        ref="form"
      >
        <v-card>
          <v-card-title>
            Edit User
          </v-card-title>

          <v-card-text>
            <validation-provider v-slot="{ errors }" vid="first_name">
              <v-text-field
                :error-messages="errors"
                label="First Name"
                v-model="user.data.first_name"
              ></v-text-field>
            </validation-provider>

            <validation-provider v-slot="{ errors }" vid="last_name">
              <v-text-field
                :error-messages="errors"
                label="Last Name"
                v-model="user.data.last_name"
              ></v-text-field>
            </validation-provider>

            <validation-provider v-slot="{ errors }" vid="email">
              <v-text-field
                :error-messages="errors"
                label="Email"
                v-model="user.data.email"
              ></v-text-field>
            </validation-provider>

            <validation-provider v-slot="{ errors }" vid="role_id">
              <role-picker
                :error-messages="errors"
                v-model="user.data.role_id"
              ></role-picker>
            </validation-provider>
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
              color="warning"
              type="submit"
              :disabled="user.isDisabled()"
            >
              <v-icon>mdi-pencil</v-icon>
              <span v-text="'Edit'"></span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </validation-observer>
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

  created() {
    this.user.setData({ ...this.value })
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

      this.axios.patch(
          api.indi(this.user.data.id),
          this.user.getData(['first_name', 'last_name', 'email', 'role_id'])
        ).then( () => {
          this.dialog = false
    
          this.setSnackbar({
            model: true,
            text: 'User updated',
            color: 'warning',
            timeout: -1
          })

          this.$emit('input')
        }).catch( error => {
          this.user.setErrorMessage(error.response.data.message);
          this.$refs.validation.setErrors(error.response.data.details);
        }).finally(() => {
          this.user.prestine()
          this.user.load(false)
        })
    }
  },

  watch: {
    'user.data': {
      handler() {
        this.user.prestine(false)
      }, deep: true
    }
  },
}
</script>