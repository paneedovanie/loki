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
    <div class="mt-3">
      <v-btn @click="loginUsersSSO">Login using Users SSO</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Resource from "@/core/models/Resource";

export default {
  data: () => ({
    resource: new Resource(),
    ssoVars: {
      // Initialize required data
      USERS_DOMAIN: "https://user-s.herokuapp.com", // Define Users API domain
      APP_ID: "61ba9a34ffc2610016b75bb0", // Define your app id here
      APP_KEY: "fa4c9db6f1e0ea67c11e9ae0ed23fc5c", // Define your app key here
      YOUR_APP_DOMAIN: window.location.origin, // Define your app domain
    },
    ssoWindow: null,
  }),

  methods: {
    ...mapActions({
      login: "auth/login",
      sso: "auth/sso",
    }),

    async submit() {
      try {
        await this.login(this.resource.data);

        const to = this.$route.query.to;

        this.$router.push(to ? to : { name: "dashboard" });
        this.resource.setData();
      } catch (error) {
        this.resource.setErrorMessage(error.response.data.message);
        this.$refs.validation.setErrors(error.response.data.details);
      }

      this.resource.load(false);
    },

    initUsersSSO() {
      // Listen to window incoming messages
      window.addEventListener("message", async (e) => {
        if (e.origin !== this.ssoVars.USERS_DOMAIN) return; // Ignore message if not coming from Users domain
        const { user } = e.data; // Extract token and user details from message

        // You may now process the token and user details
        // Please use token on request header like "Authorization: Bearer Token_Here"
        try {
          await this.sso(user);

          const to = this.$route.query.to;

          this.$router.push(to ? to : { name: "dashboard" });
        } catch (error) {
          console.log(error);
          // this.resource.setErrorMessage(error.response.data.message);
          // this.$refs.validation.setErrors(error.response.data.details);
        }

        this.resource.load(false);
        this.ssoWindow.close();
      });
    },

    loginUsersSSO() {
      // Open the Users SSO page to new window
      // You may edit the second and the third arguments based on your need
      this.ssoWindow = window.open(
        `${this.ssoVars.USERS_DOMAIN}/sso?appId=${this.ssoVars.APP_ID}&appKey=${this.ssoVars.APP_KEY}&domain=${this.ssoVars.YOUR_APP_DOMAIN}`, // URL to access Users SSO page
        "",
        "toolbar=yes,scrollbars=no,resizable=yes,top=100,left=500,width=600,height=800"
      );
    },
  },

  mounted() {
    this.initUsersSSO();
  },
};
</script>