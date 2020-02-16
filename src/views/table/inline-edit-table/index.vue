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
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column label="Author" align="center" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>

            <el-table-column label="Viewer" align="center" width="110">
                <template slot-scope="scope">
                    {{ scope.row.viewerCount }}
                </template>
            </el-table-column>

            <el-table-column label="Status" align="center" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Created at" align="center" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time" />
                    <span>{{ scope.row.createAt }}</span>
                </template>
            </el-table-column>

            <el-table-column label="Title" min-width="250">
                <template slot-scope="{row}">
                    <template v-if="row.edit">
                        <el-input v-model="row.title" class="edit-input" size="small" />
                        <el-button type="success" size="small" class="ok-btn" icon="el-icon-check" @click="confirmEdit(row)">
                            Ok
                        </el-button>
                    </template>
                    <span v-else>{{ row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column label="Actions" align="center" width="120">
                <template slot-scope="{row}">
                    <el-button v-if="row.edit" type="warning" size="small" icon="el-icon-refresh" @click="cancelEdit(row)">
                        Cancel
                    </el-button>
                    <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="row.edit=!row.edit">
                        Edit
                    </el-button>
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
        name: 'InlineEditTable',
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
            const items = data.data!.data;
            this.list = items.map((v: any) => {
                this.$set(v, 'edit', false); // https://vuejs.org/v2/guide/reactivity.html
                v.originalTitle = v.title; // will be used when user click the cancel botton
                return v;
            });
            // Just to simulate the time of the request
            setTimeout(() => {
                this.listLoading = false;
            }, 0.5 * 1000);
        }

        private cancelEdit(row: any) {
            row.title = row.originalTitle;
            row.edit = false;
            this.$message({
                message: 'The title has been restored to the original value',
                type: 'warning',
            });
        }

        private confirmEdit(row: any) {
            row.edit = false;
            row.originalTitle = row.title;
            this.$message({
                message: 'The title has been edited',
                type: 'success',
            });
        }
    }
</script>

<style lang="scss" scoped>
    .edit-input {
        padding-right: 100px;
    }

    .ok-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
</style>
