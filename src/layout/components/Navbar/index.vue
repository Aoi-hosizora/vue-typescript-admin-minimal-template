<template>
    <div class="navbar">
        <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />
        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <el-dropdown class="avatar-container hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" alt="avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link to="/">
                        <el-dropdown-item>首页</el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="https://github.com/Aoi-hosizora/vue-typescript-admin-min-template">
                        <el-dropdown-item>项目地址</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { AppModule } from '@/store/modules/app';
    import { UserModule } from '@/store/modules/user';
    import Breadcrumb from '@/components/Breadcrumb/index.vue';
    import Hamburger from '@/components/Hamburger/index.vue';

    @Component({
        name: 'Navbar',
        components: {
            Breadcrumb,
            Hamburger,
        },
    })
    export default class extends Vue {
        get sidebar() {
            return AppModule.sidebar;
        }

        get avatar() {
            return UserModule.avatar;
        }

        private toggleSideBar() {
            AppModule.ToggleSideBar(false);
        }

        private async logout() {
            await UserModule.LogOut();
            await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }
    }

</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            padding: 0 15px;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }

</style>
