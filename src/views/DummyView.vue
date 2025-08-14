
<template>
  <v-container>
    {{ returnPath() }}
  </v-container>
</template>

<script>
import router from '@/router';
export default {
    
  data: () => ({
    
  }),
  computed:{

    },
  methods: {
    returnPath(){
      if (this.$store.state.favoriteM.prevPath === '/mypage' || this.$store.state.postM.prevPath === '/mypage'){
        this.$store.commit('favoriteM/prevPathHolder', '/');
        this.$store.commit('postM/prevPathHolder', '/');
        router.push('/mypage');
        return ;
      }
      else if (this.$store.state.favoriteM.prevPath === '/search' || this.$store.state.postM.prevPath === '/search'){
        this.$store.commit('favoriteM/prevPathHolder', '/');
        this.$store.commit('postM/prevPathHolder', '/');
        router.push('/search');
        return ;
      }
      else if(this.$store.state.postM.prevPath === '/home' || this.$store.state.favoriteM.prevPath === '/home' )
        {
          this.$store.commit('favoriteM/prevPathHolder', '/')
          this.$store.commit('postM/prevPathHolder', '/')
          router.push('/home');
          return;
        }
    }
  }
};
</script>
