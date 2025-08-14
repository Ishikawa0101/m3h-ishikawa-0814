<style>


  .post .btn{
    position: fixed;
    bottom: 30px;
    right: 50px;
  }

  .postBtn {
    float: right;
  }

  .postContents{
    clear: both;
    width: 100%;
  }

  .post h1{
    text-align: center;
    color:"#555555";
    border-bottom: 1px solid #555555;
    border-radius: 10%;
    margin-bottom: 20px; 
  }

  .post .v-card {
    display: block;
  }


</style>

<template>
  <v-container>
    <div class="post">
      <h1>HOME <v-icon>mdi-home</v-icon></h1>

      <div v-for="(post, key) in $store.state.postM.postList " :key="key">
      <v-card flat outlined max-width="1000" class="mx-auto" >
      <v-card-title>
        <v-list-item class="pl-0">
          <v-list-item >
            <v-list-item-avatar color="grey" size="40">
              <v-img  />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.PostAccountID }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-light">{{ post.Name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer />
          <v-list-item-action>
            <v-btn
              v-show="$store.state.accountM.account.ID === post.PostAccountID"
              icon
              color="gray"
              @click="deletePost(post.PostID)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>

      <v-card-text class="text--primary">{{ post.Contents }}</v-card-text>
        <v-card-actions>
          <v-btn
            icon
          >
          </v-btn>
          <v-spacer>
            <v-btn
              v-if="hasFavorite(post.PostID)"
              icon
              color="pink"
              style="float: left;"
              @click="deleteFavorite($store.state.accountM.account.ID, post.PostID)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn
              v-else
              icon
              color="pink"
              style="float: left;"
              @click="insertFavorite($store.state.accountM.account.ID, post.PostID)"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>

            <div style="color: #f8a0a0; float: left; position: relative; top:5.5px" v-show="totalFavorite(post.PostID) !== 0">{{ totalFavorite(post.PostID) }}</div>


          </v-spacer>
          <span class="body-2 font-weight-light">{{ post.PostTime }}</span>
        </v-card-actions>
      </v-card>
        <br>
      </div>

      <v-btn
        class="mx-2 btn"
        fab
        dark
        color="indigo"
        @click="showModal=!showModal"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
      
      <v-dialog v-model="showModal" max-width="70%">
        <v-card>
          <v-card-title>{{ $store.state.accountM.account.ID }}</v-card-title>
          <v-card-text>
              <v-textarea
              v-model="text"
              label=""
              class="postContents"
              :counter="75"
              >
              </v-textarea>

              <v-btn
              :disabled="text.length < 1 || text.length > 75"
              class="postBtn"
              dark
              color="indigo"
              @click="
              insertPost($store.state.accountM.account.ID, text);
              showModal=!showModal;
              "
            >投稿する
            </v-btn>
            <br>
          </v-card-text>
        </v-card>
      </v-dialog>
      </div>
  </v-container>
</template>

<script>


export default {
  data: () => ({
    showModal: false,
    text: "",
    postData: null,
    mountedSkip: true,

    page: 1,
    perPage: 10,
  }),
  async mounted(){
      this.postList();
      this.favoriteList(this.$store.state.accountM.account.ID);
      this.favoriteAll();
  },

  computed:{
  },
  methods: {
    insertPost(id, contents){
      const param={
        PostAccountID: id,
        Contents: contents
      }
      this.$store.dispatch('postM/insertPost', param);
    },
    postList(){
      if(this.$store.state.accountM.loginState)
        return this.$store.dispatch('postM/postList');
    },
    insertFavorite(accountID, postID){
      const param ={
        FavoriteAccountID: accountID,
        FavoritePostID: postID,
      };
      this.$store.commit('favoriteM/prevPathHolder', '/home')
      this.$store.dispatch('favoriteM/insertFavorite', param);
    },
    deleteFavorite(accountID, postID){
      const param ={
        FavoriteAccountID: accountID,
        FavoritePostID: postID,
      };
      this.$store.commit('favoriteM/prevPathHolder', '/home')
      this.$store.dispatch('favoriteM/deleteFavorite', param);
    },
    favoriteList(accountID){
      const param = {
        FavoriteAccountID: accountID,
      }
      return this.$store.dispatch('favoriteM/selectFavorite', param);
    },
    hasFavorite(postID){
      for(let i=0; i < this.$store.state.favoriteM.favoriteList?.length ?? 0; i++){
        if(this.$store.state.favoriteM.favoriteList[i].PostID === postID){return true;}
      }
      return false;
    },
    favoriteAll(){
      return this.$store.dispatch('favoriteM/favoriteAll');
    },
    totalFavorite(postID){
      let result = 0;
      for(let i = 0; i < this.$store.state.favoriteM.favoriteAllList?.length ?? 0;i++){
        if(this.$store.state.favoriteM.favoriteAllList[i].FavoritePostID === postID){
          result++;
        }
      }
       return result;
    },
    deletePost(postID){
    const param ={
        PostID: postID,
      };
      this.$store.commit('postM/prevPathHolder', '/home')
      this.$store.dispatch('postM/deletePost', param);
    },
    
  }
};
</script>

