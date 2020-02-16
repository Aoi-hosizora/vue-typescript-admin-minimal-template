<template>
    <div class="back-to-top-container" :class="obj" @click="backToTop">
        <i class="el-icon-top"></i>
        <span style="margin-left: 2px">{{ percent }}%</span>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { SettingsModule } from '@/store/modules/settings';

    @Component({
        name: 'BackToTop',
    })
    export default class extends Vue {
        private percent = 0;
        private obj = {
            show: false,
        };

        @Prop({ default: 50 }) private scrollMin = 50;

        private scroll() {
            this.percent = Math.min(Math.floor(window.pageYOffset / window.innerHeight * 100), 100);
            this.obj.show = SettingsModule.backToTop && window.pageYOffset > this.scrollMin;
        }

        private backToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        created() {
            window.addEventListener('scroll', this.scroll);
        }

        beforeDestroy() {
            window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style lang="scss" scoped>
    .back-to-top-container {
        position: fixed;
        bottom: -50px;
        right: 20px;
        z-index: 999;
        padding: 3px 6px;
        background: #000;
        text-align: center;
        cursor: pointer;

        transition-property: bottom;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
        transition-delay: 0s;

        &.show {
            bottom: 15px;
        }

        i, span {
            color: #fff;
            font-size: 12px;
        }
    }
</style>
