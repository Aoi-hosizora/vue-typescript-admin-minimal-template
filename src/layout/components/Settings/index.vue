<template>
    <div class="drawer-container">
        <div>
            <h3 class="drawer-title">系统布局配置</h3>

            <div class="drawer-item">
                <span>显示侧边栏 Logo</span>
                <el-switch v-model="showSidebarLogo" class="drawer-switch" />
            </div>

            <div class="drawer-item">
                <span>固定头部</span>
                <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { SettingsModule, SettingKey } from '@/store/modules/settings';

    @Component({
        name: 'Settings',
    })
    export default class extends Vue {
        get fixedHeader() {
            return SettingsModule.fixedHeader;
        }

        set fixedHeader(value) {
            SettingsModule.ChangeSetting({ key: SettingKey.FixedHeader, value });
        }

        get showSidebarLogo() {
            return SettingsModule.sidebarLogo;
        }

        set showSidebarLogo(value) {
            SettingsModule.ChangeSetting({ key: SettingKey.SidebarLogo, value });
        }
    }
</script>

<style lang="scss" scoped>
    .drawer-container {
        padding: 24px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;

        .drawer-title {
            margin-bottom: 12px;
            color: rgba(0, 0, 0, .85);
            font-size: 14px;
            line-height: 22px;
        }

        .drawer-item {
            color: rgba(0, 0, 0, .65);
            font-size: 14px;
            padding: 12px 0;
        }

        .drawer-switch {
            float: right
        }
    }
</style>
