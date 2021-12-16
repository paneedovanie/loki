<template>
  <v-app>
    <v-app-bar app flat>
      <v-container class="d-flex">
        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link :to="{ name: 'home' }" class="">Home</router-link>
        <router-link :to="{ name: 'login' }" class="ml-3">Login</router-link>
      </v-container>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app> Footer </v-footer>
  </v-app>
</template>