import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies';
import store from '@/store';

export enum DeviceType {
    Mobile,
    Desktop,
}

enum SidebarState {
    Opened = 'opened',
    Closed = 'closed',
}

export interface AppState {
    device: DeviceType;
    sidebar: {
        opened: boolean;
        withoutAnimation: boolean;
    };
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements AppState {
    public device = DeviceType.Desktop;
    public sidebar = {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false,
    };

    // mutation
    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = withoutAnimation;
        if (this.sidebar.opened) {
            setSidebarStatus(SidebarState.Opened);
        } else {
            setSidebarStatus(SidebarState.Closed);
        }
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = false;
        this.sidebar.withoutAnimation = withoutAnimation;
        setSidebarStatus(SidebarState.Closed);
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
        this.device = device;
    }

    // action
    @Action({ rawError: true })
    public ToggleSideBar(withoutAnimation: boolean) {
        this.TOGGLE_SIDEBAR(withoutAnimation);
    }

    @Action({ rawError: true })
    public CloseSideBar(withoutAnimation: boolean) {
        this.CLOSE_SIDEBAR(withoutAnimation);
    }

    @Action({ rawError: true })
    public ToggleDevice(device: DeviceType) {
        this.TOGGLE_DEVICE(device);
    }
}

export const AppModule = getModule(App);
