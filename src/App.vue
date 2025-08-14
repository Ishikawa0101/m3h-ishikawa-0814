<style>
  .logo .v-img{
    filter: hue-rotate(90deg);
  }
</style>

<template>
  <v-app>
    <v-app-bar
      app
      color="#181878"
      dark
    >
      <div class="d-flex align-center">
        <v-icon>mdi-chat</v-icon>
          <h1> Osabetter</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn text to="/home" tag="router-link" v-show="loginState">HOME</v-btn>
      <v-btn text to="/search" tag="router-link" v-show="loginState">検索</v-btn>
      <v-btn text to="/mypage" tag="router-link" v-show="loginState">マイページ</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    loginState(){
      console.log(this.$store.state.accountM.loginState);
      return this.$store.state.accountM.loginState;
    },
  }
};
</script>
