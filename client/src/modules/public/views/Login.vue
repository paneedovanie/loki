<template>
  <div>
    <h1>Login</h1>
    <v-text-field
      label="Username"
      v-model="resource.data.username"
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="resource.data.password"
    ></v-text-field>
    <v-btn @click="submit">Login</v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Resource from "@/core/models/Resource";

export default {
  data: () => ({
    resource: new Resource(),
  }),

  methods: {
    ...mapActions({
      login: "auth/login",
    }),

    async submit() {
      try {
        await this.login(this.resource.data);

        const to = this.$route.query.to;

        this.$router.push(to ? to : { name: "dashboard" });
        this.resource.setData();
      } catch (error) {
        console.log(error);
        this.resource.setErrorMessage(error.response.data.message);
        this.$refs.validation.setErrors(error.response.data.details);
      }

      this.resource.load(false);
    },
  },
};
</script>