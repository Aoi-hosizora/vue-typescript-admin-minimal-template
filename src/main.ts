import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import 'normalize.css'; // A modern alternative to CSS resets
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';
import '@/icons/components/index';
import '@/permission'; // permission control

Vue.use(ElementUI);
Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    defaultWidth: '1em',
    defaultHeight: '1em',
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
