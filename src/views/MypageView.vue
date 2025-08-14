<style>
.mypage li {
  list-style: none;
}

</style>

<template>
  <v-container>
    <div class="mypage">
      <h1 style="text-align: center;">マイページ</h1>
      <v-card flat outlined max-width="1000" class="mx-auto" style="position: relative; left: 11px;">
        <v-card-title>
          <v-list-item class="pl-0">
            <v-list-item>
              <v-list-item-avatar color="grey" size="40">
                <v-img />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ accountInfo.ID }}</v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">{{ accountInfo.Name }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-spacer />
            <v-list-item-action>
            </v-list-item-action>
          </v-list-item>
        </v-card-title>
      </v-card>

      <br>

      <v-row class="mx-auto" justify="space-around">
        <v-btn depressed :disabled="postShow" @click="favoriteShow = !favoriteShow; postShow = !postShow;">
          Post
        </v-btn>
        <v-btn depressed :disabled="favoriteShow" @click="favoriteShow = !favoriteShow; postShow = !postShow;">
          いいね
        </v-btn>
      </v-row>

      <br>
      <ul>
        <li>
      <div v-for="(favorite, key) in $store.state.favoriteM.favoriteList" :key="key" v-show="favoriteShow">
        <v-card flat outlined max-width="1000" class="mx-auto">
          <v-card-title>
            <v-list-item class="pl-0">
              <v-list-item>
                <v-list-item-avatar color="grey" size="40">
                  <v-img />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ favorite.PostAccountID }}</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light">{{ favorite.Name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer />
              <v-list-item-action>
                <v-btn v-show="$store.state.accountM.account.ID === favorite.PostAccountID" icon color="gray"
                  @click="deletePost(favorite.PostID)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card-title>

          <v-card-text class="text--primary">{{ favorite.Contents }}</v-card-text>
          <v-card-actions>
            <v-btn
              icon
            >
            </v-btn>
            <v-spacer>
              <v-btn v-if="hasFavorite(favorite.PostID)" icon color="pink" style="float: left;"
                @click="deleteFavorite($store.state.accountM.account.ID, favorite.PostID)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn v-else icon color="pink" style="float: left;"
                @click="insertFavorite($store.state.accountM.account.ID, favorite.PostID)">
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>

              <div style="color: #f8a0a0; float: left; position: relative; top:5.5px"
                v-show="totalFavorite(favorite.PostID) !== 0">{{ totalFavorite(favorite.PostID) }}</div>


            </v-spacer>
            <span class="body-2 font-weight-light">{{ favorite.PostTime }}</span>
          </v-card-actions>
        </v-card>
        <br>
      </div>
      
      </li>
      </ul>
      
      <ul>
        <li>
        <div v-for="(post, key) in $store.state.postM.postList" :key="key" v-show="postShow">
        <div v-if="post.PostAccountID === $store.state.accountM.account.ID">
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

              <div style="color: #f8a0a0; float: left; position: relative; top:5.5px" 
              v-show="totalFavorite(post.PostID) !== 0">{{ totalFavorite(post.PostID) }}</div>


            </v-spacer>
            <span class="body-2 font-weight-light">{{ post.PostTime }}</span>
          </v-card-actions>
        </v-card>
        </div>
        <br>
      </div>
      </li>
      </ul>

    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    postShow: true,
    favoriteShow: false,
  }),
  mounted() {
    this.favoriteList(this.$store.state.accountM.account.ID);
    this.favoriteAll();
    this.postList()
  },
  computed: {
    accountInfo() {
      return this.$store.state.accountM.account;
    },
  },
  methods: {
    postList() {
      if (this.$store.state.accountM.loginState)
        return this.$store.dispatch('postM/postList');
    },
    deleteFavorite(accountID, postID) {
      const param = {
        FavoriteAccountID: accountID,
        FavoritePostID: postID,
      };
      this.$store.commit('favoriteM/prevPathHolder', '/mypage')
      this.$store.dispatch('favoriteM/deleteFavorite', param);
    },

    insertFavorite(accountID, postID){
      const param ={
        FavoriteAccountID: accountID,
        FavoritePostID: postID,
      };
      this.$store.commit('favoriteM/prevPathHolder', '/home')
      this.$store.dispatch('favoriteM/insertFavorite', param);
    },
    favoriteList(accountID) {
      const param = {
        FavoriteAccountID: accountID,
      }
      return this.$store.dispatch('favoriteM/selectFavorite', param);
    },
    hasFavorite(postID) {
      for (let i = 0; i < this.$store.state.favoriteM.favoriteList?.length ?? 0; i++) {
        if (this.$store.state.favoriteM.favoriteList[i].PostID === postID) { return true; }
      }
      return false;
    },
    favoriteAll() {
      return this.$store.dispatch('favoriteM/favoriteAll');
    },
    totalFavorite(postID) {
      let result = 0;
      for (let i = 0; i < this.$store.state.favoriteM.favoriteAllList?.length ?? 0; i++) {
        if (this.$store.state.favoriteM.favoriteAllList[i].FavoritePostID === postID) {
          result++;
        }
      }
      return result;
    },
    deletePost(postID) {
      const param = {
        PostID: postID,
      };
      this.$store.commit('postM/prevPathHolder', '/mypage')
      this.$store.dispatch('postM/deletePost', param);
    }

  }
};
</script>
