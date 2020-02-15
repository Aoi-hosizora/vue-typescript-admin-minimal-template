import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { RouteConfig } from 'vue-router';
import { asyncRoutes, constantRoutes } from '@/router';
import store from '@/store';

function hasPermission(roles: string[], route: RouteConfig) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        // undefined meta or roles => all allowed
        return true;
    }
}

/**
 * Filter by route meta.role
 */
function filterAsyncRoutes(routes: RouteConfig[], roles: string[]) {
    const res: RouteConfig[] = [];
    routes.forEach(route => {
        const r = { ...route };
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles);
            }
            res.push(r);
        }
    });
    return res;
}

export interface PermissionState {
    routes: RouteConfig[];
    dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'permission', namespaced: true })
class Permission extends VuexModule implements PermissionState {
    public routes: RouteConfig[] = [];
    public dynamicRoutes: RouteConfig[] = [];

    @Mutation
    private SET_ROUTES(routes: RouteConfig[]) {
        this.routes = constantRoutes.concat(routes);
        this.dynamicRoutes = routes;
    }

    @Action({ rawError: true })
    public GenerateRoutes(roles: string[]) {
        this.SET_ROUTES(filterAsyncRoutes(asyncRoutes, roles));
    }
}

export const PermissionModule = getModule(Permission);
