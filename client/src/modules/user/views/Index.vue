<template>
  <div>
    <page-header>
      <template v-slot:actions>
        <v-text-field
          label="Search"
          v-model="resources.options.search"
          hide-details
          class="mr-3"
          @input="getResources(resources.options)"
        >

        </v-text-field>
        <bulk-delete-dialog v-model="selected"  @input="getResources(resources.options)"></bulk-delete-dialog>
        <create-dialog @input="getResources(resources.options)"></create-dialog>
      </template>
    </page-header>

    <v-data-table
      :disabled="resources.isFetching"
      :headers="headers"
      :items="resources.data"
      :loading="resources.isFetching"
      :server-items-length="resources.options.totalItems"
      @update:options="optionChange"
      item-key="id"
      loading-text="Loading... Please wait"
      show-select
      v-model="selected"
    >
      <template v-slot:item.actions="{ item }">
        <edit-dialog :value="item" @input="optionChange(resources.options)"></edit-dialog>
        <delete-dialog :value="item" @input="optionChange(resources.options)"></delete-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '../config/api'
import Resources from '@/core/models/Resources'
import { mapActions } from 'vuex'

export default {
  components: {
    CreateDialog: () => import('../views/partials/CreateDialog'),
    EditDialog: () => import('../views/partials/EditDialog'),
    DeleteDialog: () => import('../views/partials/DeleteDialog'),
    BulkDeleteDialog: () => import('../views/partials/BulkDeleteDialog')
  },

  created() {
    this.resources.options = this.$route.query
  },

  data: () => ({
    resources: new Resources,
    headers: [
      { text: 'Full name', value: 'display_name' },
      { text: 'Role', value: 'role.title' },
      { text: 'E-mail', value: 'email' },
      { text: 'Actions', value: 'actions', align: 'end', sortable: false }
    ], 
    selected: [],
    optionsInit: false
  }),

  methods: {
    ...mapActions({
      setDialog: 'dialog/set'
    }),

    getResources(options) {
      console.log(options)
      this.resources.getResources({
          url: api.main(),
          params: { 
            page: options.page,
            itemsPerPage: options.itemsPerPage,
            search: options.search,
            sortBy: options.sortBy,
            sortDesc: options.sortDesc
          }
        }, (options) => {
          const { page, itemsPerPage, search } = options
          
          this.$router.push({ query: { page, itemsPerPage, search }}).catch(() => {})

          this.optionsInit = true
      })
    },

    optionChange (options) {
      if(!this.optionsInit) return

      this.getResources(options)
    }
  },

  mounted() { 
    this.getResources(this.resources.options)
  },
}
</script>