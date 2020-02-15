import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import defaultSettings from '@/settings';

export interface SettingsState {
    showSettings: boolean;
    fixedHeader: boolean;
    sidebarLogo: boolean;
}

export enum SettingKey {
    FixedHeader = 'fixedHeader',
    SidebarLogo = 'sidebarLogo',
}

@Module({ dynamic: true, store, name: 'settings', namespaced: true })
class Settings extends VuexModule implements SettingsState {
    public showSettings = defaultSettings.showSettings;
    public fixedHeader = defaultSettings.fixedHeader;
    public sidebarLogo = defaultSettings.sidebarLogo;

    @Mutation
    private CHANGE_SETTING(payload: { key: SettingKey; value: any }) {
        const { key, value } = payload;
        if (Object.prototype.hasOwnProperty.call(this, key.toString())) {
            (this as any)[key.toString()] = value;
        }
    }

    @Action({ rawError: true })
    public ChangeSetting(payload: { key: SettingKey; value: any }) {
        this.CHANGE_SETTING(payload);
    }
}

export const SettingsModule = getModule(Settings);
