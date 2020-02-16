<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
        <Sidebar class="sidebar-container" />
        <div class="main-container">
            <div :class="{'fixed-header': fixedHeader}">
                <Navbar />
            </div>
            <AppMain />
            <RightPanel v-if="showSettings">
                <Settings />
            </RightPanel>
            <BackToTop />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component } from 'vue-property-decorator';
    import { mixins } from 'vue-class-component';
    import ResizeMixin from './mixin/resize';
    import { AppModule } from '@/store/modules/app';
    import { SettingsModule } from '@/store/modules/settings';
    import Sidebar from '@/layout/components/Sidebar/index.vue';
    import Navbar from '@/layout/components/Navbar/index.vue';
    import AppMain from '@/layout/components/AppMain.vue';
    import RightPanel from '@/components/RightPanel/index.vue';
    import Settings from '@/layout/components/Settings/index.vue';
    import BackToTop from '@/components/BackToTop/index.vue';

    @Component({
        name: 'Layout',
        components: {
            BackToTop,
            Settings,
            AppMain,
            Navbar,
            Sidebar,
            RightPanel,
        },
    })
    export default class extends mixins(ResizeMixin) {
        get classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
            };
        }

        get showSettings() {
            return SettingsModule.showSettings;
        }

        get fixedHeader() {
            return SettingsModule.fixedHeader;
        }

        private handleClickOutside() {
            AppModule.CloseSideBar(false);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/mixin';
    @import '../styles/variables';

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>
