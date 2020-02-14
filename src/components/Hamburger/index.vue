<template>
    <div :class="[{'is-active': isActive}]" @click="toggleClick">
        <svg-icon name="hamburger" width="20" height="20" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        name: 'Hamburger',
    })
    export default class extends Vue {
        @Prop({ default: false }) private isActive!: boolean;

        private toggleClick() {
            this.$emit('toggleClick');
        }
    }
</script>

<style lang="scss" scoped>
    .hamburger {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
    }

    .hamburger.is-active {
        transform: rotate(180deg);
    }
</style>
