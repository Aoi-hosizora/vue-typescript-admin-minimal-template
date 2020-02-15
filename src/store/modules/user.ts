import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { login, logout, getUserInfo } from '@/api/users';
import { getToken, setToken, removeToken } from '@/utils/cookies';
import { resetRouter } from '@/router';
import store from '@/store';

export interface UserState {
    token: string;
    name: string;
    avatar: string;
    roles: string[];
}

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule implements UserState {
    public token = getToken() || '';
    public name = '';
    public avatar = '';
    public roles: string[] = [];

    // mutation
    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token;
    }

    @Mutation
    private SET_NAME(name: string) {
        this.name = name;
    }

    @Mutation
    private SET_AVATAR(avatar: string) {
        this.avatar = avatar;
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles;
    }

    // action
    @Action({ rawError: true })
    public async Login(userInfo: { username: string; password: string }) {
        let { username, password } = userInfo;
        username = username.trim();
        const { data } = await login({ username, password });
        const token = data.data!.token;
        setToken(token);
        this.SET_TOKEN(token);
    }

    @Action({ rawError: true })
    public async GetUserInfo() {
        if (!this.token) {
            throw Error('GetUserInfo: token is undefined!');
        }
        const { data } = await getUserInfo();
        const { roles, name, avatar } = data.data!;
        this.SET_ROLES(roles);
        this.SET_NAME(name);
        this.SET_AVATAR(avatar);
    }

    @Action({ rawError: true })
    public async LogOut() {
        if (!this.token) {
            throw Error('LogOut: token is undefined!');
        }
        await logout();

        // must remove token first
        removeToken();
        resetRouter();
        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }

    @Action({ rawError: true })
    public ResetToken() {
        // must remove token first
        removeToken();
        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }
}

export const UserModule = getModule(User);
