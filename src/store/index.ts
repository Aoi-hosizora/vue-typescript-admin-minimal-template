import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from './modules/app';
import { UserState } from './modules/user';
import { TagsViewState } from './modules/tags-view';
import { ErrorLogState } from './modules/error-log';
import { PermissionState } from './modules/permission';
import { SettingsState } from './modules/settings';

Vue.use(Vuex);

export interface RootState {
    app: AppState;
    user: UserState;
    tagsView: TagsViewState;
    errorLog: ErrorLogState;
    permission: PermissionState;
    settings: SettingsState;
}

export default new Vuex.Store<RootState>({});
