<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
                <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
                    {{ item.meta.title }}
                </span>
                <a v-else @click.prevent="handleLink(item)">
                    {{ item.meta.title }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
    import { compile } from 'path-to-regexp';
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { RouteRecord } from 'vue-router';
    import { dashBoardRoute } from '@/router';

    @Component({
        name: 'Breadcrumb',
    })
    export default class extends Vue {
        private breadcrumbs: RouteRecord[] = [];

        @Watch('$route')
        private onRouteChange() {
            // route: Route
            this.getBreadcrumb();
        }

        created() {
            this.getBreadcrumb();
        }

        private getBreadcrumb() {
            // only show routes with meta.title
            let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
            const first = matched[0];
            if (!this.isDashboard(first)) {
                matched = [dashBoardRoute as RouteRecord].concat(matched);
            }
            this.breadcrumbs = matched.filter((item) => {
                return item.meta && item.meta.title && item.meta.breadcrumb !== false;
            });
        }

        private isDashboard(route: RouteRecord) {
            const name = route && route.name;
            if (!name) {
                return false;
            }
            return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
        }

        private pathCompile(path: string) {
            // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
            const { params } = this.$route;
            const toPath = compile(path);
            return toPath(params);
        }

        private handleLink(item: any) {
            // Throw Error "NavigationDuplicated"
            // https://github.com/vuejs/vue-router/issues/2872
            const { redirect, path } = item;
            if (redirect) {
                this.$router.push(redirect).catch(_err => {});
                return;
            }
            this.$router.push(this.pathCompile(path)).catch(_err => {});
        }
    }
</script>

<style lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
