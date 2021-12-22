<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>

    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name="actions"> </slot>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      toggleSidebar: 'sidebar/toggle'
    })
  }
};
</script>