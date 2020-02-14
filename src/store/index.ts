import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from '@/store/modules/app';
import { UserState } from '@/store/modules/user';
import { PermissionState } from '@/store/modules/permission';

Vue.use(Vuex);

export interface RootState {
    app: AppState;
    user: UserState;
    permission: PermissionState;
}

export default new Vuex.Store<RootState>({});
