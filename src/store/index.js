
import Vue from 'vue'
import Vuex from 'vuex'
import accountM from './modules/accountM'
import postM from './modules/postM'
import favoriteM from './modules/favoriteM'

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    accountM,
    postM,
    favoriteM
  }
})
