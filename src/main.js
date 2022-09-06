import Vue from 'vue';
import 'devextreme/dist/css/dx.light.css';
import 'epcs-style-hub/assets/css/global.scss'

import App from './App.vue';
import localStore from "./js/store"
// import {storeActive} from "epcs-store-redux";
// let storeSubscribe = null;
Vue.config.silent = true
Vue.config.productionTip = false;
Vue.prototype.store = localStore
Vue.prototype.$bus = new Vue();

class initDisps {
  constructor(element, options) {
    //Vue.prototype.store.dispatch('dispStore/setGmiloUrl', options.gmilourl);
    Vue.prototype.$redux = options.reduxStore
    Vue.prototype.configDisps = options.serviceConfig
    new Vue({
      render: h => h(App, {
        props: {
          eventBus: Vue.prototype.$bus,
          //store: localStore.commit,
          store: localStore,
          configDisps: options.serviceConfig
        }
      }),
    }).$mount(element)
  }
}

// const apps = new initDisps('#app', {
//   serviceConfig: {urlMNS: 'http://10.20.30.102:3000'},
//   gmilourl: '0.0.0.0',
//   reduxStore: new storeActive({urlForLoopback: '10.20.30.102:3000'})
// })

export {initDisps}
