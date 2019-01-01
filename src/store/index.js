
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    city: '定位中',
    tabIsShow: 0,

    cBscrollDis: 0,  //用来记录 Cinamebody.vue 组件的滚动高度，以便解决路由切换 滚动高度重置问题，存vuex的方法，就不用依托于keep-alive了。

  },
  mutations: {
    setCity(store, city){
      store.city = city;
    },
    setTabIsShow(store, index){
      store.tabIsShow = index;
    },

    //store 是 vuex 提供的参数， 第二个参数action ,commit 传过来的参数
    mcBscrollDis(store, dis){
      console.log(store, dis);
      store.cBscrollDis = dis;
    }



  },
  actions: {
    setStateCity({commit}, city){
      commit('setCity', city);
    },

    setStateTabIsShow({commit}, index){
      commit('setTabIsShow', index);
    },

/*    setcBscrollDis(context){
      console.log(context);
    }*/
    //解构出 commit 时vuex提供的参数context 上的， 第二个参数是你调用这个函数传的参数
    setcBscrollDis({commit}, dis){
      // console.log(commit, dis);
      // 通过commit提交给mutation里对应的方法，从而改变state状态
      commit('mcBscrollDis' , dis);
    }

  }
});

export default store;
