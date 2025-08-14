import axios from 'axios'
import router from '@/router';

export default{
    namespaced: true,
    state: {
        loginState: false,                               //ログインしているかどうか
        account: {                                  //ログインしたアカウント情報
        ID: "",
        Name: "",
        },
        log:"",                                          //ログデータ
    },
    getters: {
    },
    mutations: {
        login(state, param){
        state.account.ID = param.ID;
        state.account.Name = param.Name;
        state.loginState = true;
        },
        register(state, param){
        state.log=param;
        console.log(state.log["SQL RESULT"])
        // if(data["SQL RESULT"].indexOf("1 行") == -1)      {state.log = 1;}
        // else if (data.indexOf("エラー") == -1)    {state.log = 2;}
        // else {state.log = 0;}
        }
    },
    actions: {
        async login({commit}, param){//IDの入力チェック
            
            //Login用のAPIを呼び出し
           
            const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/Login?',param);

            if(response.data.List.length > 0){
            const commitParam = {
                ID: response.data.List[0].ID,
                Name: response.data.List[0].Name,
            }
            router.push('/home');
            commit('login', commitParam);
            }
        },
        async register({commit}, param) {
        const response = await axios.post('https://m3h-ishikawa-functiontask.azurewebsites.net/api/RegisterAccount?',param);
        console.log(response)
        commit('register', response.data)
        }
    }
}