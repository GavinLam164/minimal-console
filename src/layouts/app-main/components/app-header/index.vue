<template>
  <el-header>
    <app-breadcrumb />
    <app-setting />
  </el-header>
</template>
<style lang="scss">
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #e6e6e6;
}
</style>
<script>
import AppBreadcrumb from './components/app-breadcrumb.vue';
import AppSetting from './components/app-setting.vue';

export default {
  components: {
    AppBreadcrumb,
    AppSetting,
  },
};
</script>
