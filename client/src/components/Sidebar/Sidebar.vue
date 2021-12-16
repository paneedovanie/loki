<template>
  <v-navigation-drawer v-model="dataset" app>
    <v-list-item>
      <v-list-item-content>
        <v-toolbar-title>{{
          user.first_name + " " + user.last_name
        }}</v-toolbar-title>
        <v-list-item-subtitle>{{ user.role.title }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <!-- <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
      <v-list-item @click="logoutUser" link>
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

export default {
  props: ["value"],

  computed: {
    ...mapGetters({
      auth: "auth/auth",
    }),

    user() {
      return this.auth.user;
    },

    dataset: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },

  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),

    logoutUser() {
      this.$router.push({ name: "home" });
      this.logout();
    },
  },
};
</script>