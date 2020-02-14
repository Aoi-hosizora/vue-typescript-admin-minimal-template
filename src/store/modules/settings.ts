import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import defaultSettings from '@/settings';

export interface SettingsState {
    showSettings: boolean;
    fixedHeader: boolean;
    sidebarLogo: boolean;
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements SettingsState {
    public showSettings = defaultSettings.showSettings;
    public fixedHeader = defaultSettings.fixedHeader;
    public sidebarLogo = defaultSettings.sidebarLogo;

    @Mutation
    private CHANGE_SETTING(payload: { key: string; value: any }) {
        const { key, value } = payload;
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            (this as any)[key] = value;
        }
    }

    @Action
    public ChangeSetting(payload: { key: string; value: any }) {
        this.CHANGE_SETTING(payload);
    }
}

export const SettingsModule = getModule(Settings);
