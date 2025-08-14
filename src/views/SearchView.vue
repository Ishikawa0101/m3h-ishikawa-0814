<style>

.search{
  width: 100%;
  text-align: center;
}

.search .btn{
  float: right;
}

.search .clear{
  clear: both;
}

</style>

<template>
  <v-container>
    <div class="search">
      <h1>検索画面</h1>
      <v-text-field
          v-model="text"
          label="検索内容"
          ></v-text-field>

          <v-btn
          :disabled="textLength < 1"
          class="m-10 btn"
          fab
          dark
          @click="searchword(text);"
          >
          <v-icon dark style="float: right;">
            mdi-magnify
        </v-icon>
          </v-btn>

          <div class="clear"></div>
    </div>
     <div v-for="(account, key) in resultAccount" :key="key" class="content">
     <v-card flat outlined max-width="1000" class="mx-auto" >
      <v-card-title>
        <v-list-item class="pl-0">
          <v-list-item>
            <v-list-item-avatar color="grey" size="40">
              <v-img  />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ account.ID }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-light">{{ account.Name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer />
          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>
      </v-card> 
      <br>
      </div>
    
     <div v-for="(post, key) in resultPost" :key="key" class="content">
      <v-card flat outlined max-width="1000" class="mx-auto" >
      <v-card-title>
        <v-list-item class="pl-0">
          <v-list-item>
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

            <div style="color: #f8a0a0; 
            float: left; 
            position: relative; 
            top:5.5px" 
            v-show="totalFavorite(post.PostID) !== 0">
              {{ totalFavorite(post.PostID) }}</div>


          </v-spacer>
          <span class="body-2 font-weight-light">{{ post.PostTime }}</span>
        </v-card-actions>
      </v-card>
      <br>
     </div>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    text: ""
  }),
  computed:{
    resultAccount(){return this.$store.getters['postM/searchAccountG']},
    resultPost(){return this.$store.getters['postM/searchPostG']},
    textLength(){
      return this.text.length;
    },
    
  },
  mounted(){
    this.favoriteList(this.$store.state.accountM.account.ID);
    this.favoriteAll();
  },
  methods: {
    searchword(text){
      if(text.charAt(0) === '@'){
        text = text.slice(1);
        this.$store.dispatch('postM/selectAccount', text)
      }
      else{this.$store.dispatch('postM/selectPost', text)}
    },
    insertFavorite(accountID, postID){
      const param ={
        FavoriteAccountID: accountID,
        FavoritePostID: postID,
      };
      this.$store.commit('favoriteM/prevPathHolder', '/search')
      this.$store.dispatch('favoriteM/insertFavorite', param);
    },
    deleteFavorite(accountID, postID){
      const param ={
        FavoriteAccountID: accountID,
        FavoritePostID: postID,
      };
      this.$store.commit('favoriteM/prevPathHolder', '/search')
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
      this.$store.commit('postM/prevPathHolder', '/search')
      this.$store.commit('postM/deleteSearch', param)
      this.$store.dispatch('postM/deletePost', param);
    },
  }
};
</script>
