import axios from 'axios'
import router from '@/router';

export default{
    namespaced: true,
    state: {
        favoriteList: null,
        log: null,
        prevPath: null,
        favoriteAllList: null,
    },
    getters: {
        favoriteList(state){
            return state.favoriteList;
        },
    },
    mutations: {
        selectFavorite(state, rs){
            state.favoriteList = rs.slice().reverse();
            console.log(state.favoriteList);
        },
        insertFavorite(state, rs){
            state.log = rs;
            console.log(state.log);
        },
        deleteFavorite(state, rs){
            state.log = rs;
            console.log(state.log);
        },
        prevPathHolder(state, path){
            state.prevPath = path;
            console.log(state.prevPath);
        },
        favoriteAll(state, rs){
            state.favoriteAllList = rs;
            console.log(state.favoriteAllList);
        }


    },
    actions: {
        async selectFavorite({commit}, param){//IDの入力チェック
            //いいね一覧用のAPIを呼び出し
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/SelectFavorite?', param);
            commit('selectFavorite', response.data.List);
            },

        async insertFavorite({commit}, param){//IDの入力チェック
            
            //いいね追加用のAPIを呼び出し
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/InsertFavorite?', param);
            router.push('/dummy');
            commit('insertFavorite', response.data);
            },
        async deleteFavorite({commit}, param){//IDの入力チェック
            
            //いいね削除用のAPIを呼び出し
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/DeleteFavorite?', param);
            router.push('/dummy');
            commit('deleteFavorite', response.data);
            },
        
        async favoriteAll({commit}){//IDの入力チェック
            
            //いいね削除用のAPIを呼び出し
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/FavoriteTotal?');
            commit('favoriteAll', response.data.List);
            },    
        

    }
}