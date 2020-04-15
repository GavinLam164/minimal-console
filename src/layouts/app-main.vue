<template>
  <el-container>
    <app-slide />
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script>
import AppSlide from './app-slide.vue';

export default {
  components: {
    AppSlide,
  },
};
</script>
