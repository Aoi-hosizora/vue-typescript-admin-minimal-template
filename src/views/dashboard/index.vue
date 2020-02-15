<template>
    <div class="dashboard-container">
        <component :is="currentRole" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { UserModule } from '@/store/modules/user';
    import AdminDashboard from './admin/index.vue';
    import EditorDashboard from './editor/index.vue';

    @Component({
        name: 'Dashboard',
        components: {
            AdminDashboard,
            EditorDashboard,
        },
    })
    export default class extends Vue {
        private currentRole = '';

        get roles() {
            return UserModule.roles;
        }

        created() {
            this.currentRole = this.roles.includes('admin') ? 'admin-dashboard' : 'editor-dashboard';
        }
    }
</script>
