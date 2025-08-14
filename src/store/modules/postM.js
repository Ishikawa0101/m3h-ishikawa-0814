import axios from 'axios'
import router from '@/router';

export default{
    namespaced: true,
    state: {
        postList: null,
        log: null,
        deleteLog: null,
        searchAccount: null,
        searchPost: null,
        prevPath: null,
    },
    getters: {
        searchAccountG(state){
            return state.searchAccount;
        },
        searchPostG(state){
            return state.searchPost
        }
    },
    mutations: {
        postList(state, rs){
            state.postList = rs.slice().reverse();
            console.log(state.postList);
        },
        insertPost(state, rs){
            state.log = rs;
            state.prevPath = '/home'
            console.log(state.log);
        },
        selectAccount(state, rs){
            state.searchPost = null;
            state.searchAccount = rs;
            console.log(state.searchAccount);
        },
        selectPost(state, rs){
            state.searchAccount = null;
            state.searchPost = rs.slice().reverse();
            console.log(state.searchPost);
        },
        prevPathHolder(state, path){
            state.prevPath = path;
            console.log(state.prevPath);
        },
        deletePost(state, rs){
            state.deleteLog = rs;
            console.log(state.deleteLog);
        },
        deleteSearch(state, param){
            state.searchPost = state.searchPost.filter(post => post.PostID !== param.PostID);
            console.log(state.searchPost)
        }

    },
    actions: {
        async postList({commit}){//IDの入力チェック
            
            //投稿一覧用のAPIを呼び出し
            const response = await axios.get('https://m3h-ishikawa-functiontask.azurewebsites.net/api/PostList?');
            commit('postList', response.data.List);
            },

        async insertPost({commit}, param){//IDの入力チェック
            
            //投稿追加用のAPIを呼び出し
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/InsertPost?', param);
            router.push('/dummy');
            commit('insertPost', response.data);
            },

        async selectAccount({commit}, name){//IDの入力チェック
            
            const param = {
                Name: name
                }

            //アカウント検索用のAPIを呼び出し
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/SelectAccount?', param);
            commit('selectAccount', response.data.List);
            },

        async selectPost({commit}, contents){//IDの入力チェック
            
            //投稿検索用のAPIを呼び出し
            const param ={
                Contents: contents
            }
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/SelectPost?', param);
            commit('selectPost', response.data.List);
            },

        async deletePost({commit}, param){
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/DeletePost?', param);
            router.push('/dummy');
            commit('deletePost', response.data);
        },
    }
}