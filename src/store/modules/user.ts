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

@Module({ dynamic: true, store, name: 'user' })
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
    @Action
    public async Login(userInfo: { username: string; password: string }) {
        let { username, password } = userInfo;
        username = username.trim();
        const { data } = await login({ username, password });
        setToken(data.accessToken);
        this.SET_TOKEN(data.accessToken);
    }

    @Action
    public ResetToken() {
        removeToken();
        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }

    @Action
    public async GetUserInfo(state: UserState) {
        if (this.token === '') {
            throw Error('GetUserInfo: token is undefined!');
        }
        const { data } = await getUserInfo(state.token);
        if (!data) {
            throw Error('Verification failed, please Login again.');
        }
        const { roles, name, avatar } = data.user;
        if (!roles || roles.length <= 0) {
            throw Error('GetUserInfo: roles must be a non-null array!');
        }
        this.SET_ROLES(roles);
        this.SET_NAME(name);
        this.SET_AVATAR(avatar);
    }

    @Action
    public async LogOut() {
        if (this.token === '') {
            throw Error('LogOut: token is undefined!');
        }
        await logout();
        removeToken();
        resetRouter();

        this.SET_TOKEN('');
        this.SET_ROLES([]);
    }
}

export const UserModule = getModule(User);
