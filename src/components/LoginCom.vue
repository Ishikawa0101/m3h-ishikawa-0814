<style>
  .logo .v-img{
    filter: hue-rotate(90deg);
  }
</style>

<template>
  <v-app>
    <v-container>
    <v-main>

      <div v-show="!loginState && !registerView">
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >

          <v-text-field
          v-model="id"
          :counter="15"
          label="ID"
          :rules="idRules"
          required
          ></v-text-field>

          <v-text-field
          v-model="pass"
          label="Password"
          :rules="passRules"
          type="password"
          required
          ></v-text-field>

          <v-btn
          :disabled="!valid || id.length==0 || pass.length==0"
          color="success"
          class="mr-4"
          @click="validate();login(id, pass);"
          >
          ログイン
          </v-btn>

          <v-btn
          class="mr-4"
          @click="registerView=!registerView"
          >新規作成
          </v-btn>

        </v-form>
      </div>

      <div v-show="registerView">
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >

          <v-text-field
          v-model="registerId"
          :counter="15"
          label="ID"
          :rules="idRules"
          required
          ></v-text-field>

          <v-text-field
          v-model="registerName"
          :counter="15"
          label="Name"
          :rules="nameRules"
          required
          ></v-text-field>

          <v-text-field
          v-model="registerPass"
          label="Password"
          :rules="passRules"
          type="password"
          required
          ></v-text-field>

          <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate();register(registerId, registerName, registerPass);"
          >
          登録
          </v-btn>

          <v-btn
          class="mr-4"
          @click="registerView=!registerView; deleteLog();"
          >
          ログイン画面に戻る
          </v-btn>
          
          <v-alert
          v-show="this.$store.state.accountM.log['SQL RESULT'] == '1 行挿入されました'"
          type="success"
          >登録が完了しました</v-alert>

          <v-alert
          v-show="trueFalse"
          type="error"
          >登録ができませんでした</v-alert>

        </v-form>
      </div>
      
    </v-main>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
    id: "",
    pass: "",
    registerId: "",
    registerName: "",
    registerPass: "",
    registerView:false,

    valid: true,

    nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
      ],

    idRules: [
        v => !!v || 'ID is required',
        v => /@.+/.test(v) || 'ID must be valid',
      ],

    passRules: [
      v => !!v || 'Password is required',
    ],

  }),
  computed:{
    loginState(){
      console.log(this.$store.state.accountM.loginState);
      return this.$store.state.accountM.loginState;
    },
    trueFalse(){
      return (/DBエラー/.test(this.$store.state.accountM.log));
    }
  },
  methods: {
    login(id, pass){
      const param = {
        ID: id,
        Pass: pass,
      }
      this.$store.dispatch('accountM/login', param);
    },
    register(id, name, pass){
      const param ={
        ID: id,
        Name: name,
        Pass: pass,
      }
      console.log(param)
      this.$store.dispatch('accountM/register', param);
    },
    validate() {
        this.$refs.form.validate()
    },
    deleteLog(){
      this.$store.commit('accountM/register', "")
    },
  }
};
</script>
