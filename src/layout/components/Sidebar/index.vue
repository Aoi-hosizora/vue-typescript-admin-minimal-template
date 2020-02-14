<template>
    <div :class="{'has-logo': showLogo}">
        <sidebar-logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="menuActiveTextColor"
                :unique-opened="false"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :is-collapse="isCollapse"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { AppModule } from '@/store/modules/app';
    import { PermissionModule } from '@/store/modules/permission';
    import { SettingsModule } from '@/store/modules/settings';
    import SidebarItem from './SidebarItem.vue';
    import SidebarLogo from './SidebarLogo.vue';
    import variables from '@/styles/variables.scss';

    @Component({
        name: 'SideBar',
        components: {
            SidebarItem,
            SidebarLogo,
        },
    })
    export default class extends Vue {
        get sidebar() {
            return AppModule.sidebar;
        }

        get routes() {
            return PermissionModule.routes;
        }

        get showLogo() {
            return SettingsModule.sidebarLogo;
        }

        get menuActiveTextColor() {
            return variables.menuActiveText;
        }

        get variables() {
            return variables;
        }

        get activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }

        get isCollapse() {
            return !this.sidebar.opened;
        }
    }
</script>
