<template>
    <div class="app-container">
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
        >
            <el-table-column label="ID" align="center" width="95">
                <template slot-scope="scope">
                    <!-- {{ scope.$index }} -->
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column label="Title">
                <template slot-scope="scope">
                    {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column label="Author" width="180" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Viewer" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.viewerCount }}
                </template>
            </el-table-column>
            <el-table-column label="Status" class-name="status-col" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Created at" align="center" prop="created_at" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time" />
                    <span>{{ scope.row.createAt }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { getArticles } from '@/api/articles';
    import { Article } from '@/api/types';

    @Component({
        name: 'Table',
        filters: {
            statusFilter: (status: string) => {
                const statusMap: { [key: string]: string } = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger',
                };
                return statusMap[status];
            },
        },
    })
    export default class extends Vue {
        private list: Article[] = [];
        private listLoading = true;

        created() {
            this.getList();
        }

        private async getList() {
            this.listLoading = true;
            const { data } = await getArticles();
            this.list = data.data!.data;
            this.listLoading = false;
        }
    }
</script>
