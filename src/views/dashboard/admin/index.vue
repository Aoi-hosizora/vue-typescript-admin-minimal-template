<template>
    <div class="dashboard-container">
        <h1>Admin</h1>
        <div class="clearfix">
            <div class="dashboard-text">
                Your roles:
                <span v-for="item in roles" :key="item" class="info-roles">
                    {{ item }}
                </span>
            </div>
            <div class="dashboard-text">
                Your name: {{ name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { UserModule } from '@/store/modules/user';

    @Component({
        name: 'DashboardEditor',
    })
    export default class extends Vue {
        get name() {
            return UserModule.name;
        }

        get avatar() {
            return UserModule.avatar;
        }

        get roles() {
            return UserModule.roles;
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-editor-container {
        background-color: #e3e3e3;
        min-height: 100vh;
        padding: 50px 60px 0;

        .info-roles {
            font-size: 12px;
            font-weight: 700;
            color: #333;
            display: block;
        }
    }

    .dashboard {
        &-container {
            margin: 30px;
        }

        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
