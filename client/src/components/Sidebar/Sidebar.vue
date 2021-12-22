<template>
  <v-navigation-drawer v-model="model" app>
    <v-list-item v-if="user">
      <v-list-item-content>
        <v-toolbar-title v-text="user.first_name + ' ' + user.last_name"></v-toolbar-title>
        <v-list-item-subtitle v-text="user.role.title"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group
        color="primary"
      >
      <template v-for="(item, i) in config">
        <template v-if="item.children">
          <v-list-group :key="i"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </template>

            <v-list-item
              v-for="(child, j) in item.children"
              :key="i + '-' + j"
              link
              exact-path
              :to="{name: child.name}"
            >
              <v-list-item-title v-text="child.title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="child.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :key="i" link exact-path :to="{ name: item.name }" v-if="hasPermission(item.permission)">
            <v-list-item-icon>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
      </v-list-item-group>
      
      <v-list-item @click="logoutUser">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import config from './config'

export default {
  computed: {
    ...mapGetters({
      sidebarModel: 'sidebar/model',
      auth: "auth/auth",
      hasPermission: "auth/hasPermission"
    }),

    model: {
      get() {
        return this.sidebarModel
      },
      set(val) {
        return this.setModel(val)
      }
    },

    user() {
      return this.auth.user;
    },

    config () { return config }
  },

  methods: {
    ...mapActions({
      logout: "auth/logout",
      setModel: "sidebar/setModel"
    }),

    logoutUser() {
      this.$router.push({ name: "home" });
      this.logout();
    },
  },
};
</script>