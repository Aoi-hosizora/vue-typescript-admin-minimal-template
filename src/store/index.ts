import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from '@/store/modules/app';
import { PermissionState } from '@/store/modules/permission';
import { SettingsState } from '@/store/modules/settings';
import { UserState } from '@/store/modules/user';

Vue.use(Vuex);

export interface RootState {
    app: AppState;
    permission: PermissionState;
    settings: SettingsState;
    user: UserState;
}

export default new Vuex.Store<RootState>({});
