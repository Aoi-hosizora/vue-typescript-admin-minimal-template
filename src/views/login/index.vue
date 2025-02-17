<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">登录</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon name="user" />
                </span>
                <el-input
                    placeholder="用户名" v-model="loginForm.username" ref="username" name="username"
                    type="text" tabindex="1" autocomplete="on"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon name="password" />
                </span>
                <el-input
                    placeholder="密码" v-model="loginForm.password" ref="password" name="password"
                    :type="passwordType" tabindex="2" autocomplete="on" :key="passwordType" @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPassword">
                    <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
                </span>
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%; margin-bottom:30px;" @click.native.prevent="handleLogin">
                登录
            </el-button>

            <div class="tips">
                <span style="margin-right:20px;">username: admin</span>
                <span>password: 111111</span>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { ElForm } from 'element-ui/types/form';
    import { Dictionary, Route } from 'vue-router/types/router';
    import { Input } from 'element-ui';
    import { UserModule } from '@/store/modules/user';

    @Component({
        name: 'Login',
    })
    export default class extends Vue {
        private validateUsername = (rule: any, value: string, callback: Function) => {
            if (value.length < 5) {
                callback(new Error('The username can not be less than 6 digits'));
            } else {
                callback();
            }
        };

        private validatePassword = (rule: any, value: string, callback: Function) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'));
            } else {
                callback();
            }
        };

        private loginForm = {
            username: 'admin',
            password: '111111',
        };

        private loginRules = {
            username: [{ validator: this.validateUsername, trigger: 'blur' }],
            password: [{ validator: this.validatePassword, trigger: 'blur' }],
        };

        private loading = false;
        private passwordType = 'password';
        private redirect?: string;
        private otherQuery: Dictionary<string> = {};

        @Watch('$route', { immediate: true })
        private onRouteChange(route: Route) {
            const query = route.query as Dictionary<string>;
            if (query) {
                this.redirect = query.redirect;
                this.otherQuery = this.getOtherQuery(query);
            }
        }

        private showPassword() {
            this.passwordType = this.passwordType === 'password' ? '' : 'password';
            this.$nextTick(() => (this.$refs.password as Input).focus());
        }

        private handleLogin() {
            (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
                if (valid) {
                    this.loading = true;
                    await UserModule.Login(this.loginForm);
                    await this.$router.push({
                        path: this.redirect || '/',
                        query: this.otherQuery,
                    });
                    this.loading = false;
                } else {
                    this.loading = false;
                    return false;
                }
            });
        }

        private getOtherQuery(query: Dictionary<string>) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {} as Dictionary<string>);
        }
    }
</script>

<style lang="scss">
    @import '../../styles/variables';

    // References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
    @supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
        .login-container .el-input {
            input {
                color: $loginCursorColor;
            }

            input::first-line {
                color: $lightGray;
            }
        }
    }

    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                height: 47px;
                background: transparent;
                border: 0;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: $lightGray;
                caret-color: $loginCursorColor;
                -webkit-appearance: none;

                &:-webkit-autofill {
                    box-shadow: 0 0 0 1000 $loginBg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    @import '../../styles/variables';

    .login-container {
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: $loginBg;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $darkGray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $lightGray;
                margin: 0 auto 40px auto;
                text-align: center;
                font-weight: bold;
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0;
                cursor: pointer;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $darkGray;
            cursor: pointer;
            user-select: none;
        }

    }
</style>
