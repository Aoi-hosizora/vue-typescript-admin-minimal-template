import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import '@/styles/index.scss';
import '@/icons/components';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

import { AppModule } from '@/store/modules/app';

Vue.use(ElementUI, {
    size: AppModule.size,
});

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
