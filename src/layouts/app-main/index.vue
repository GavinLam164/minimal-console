<template>
  <el-container>
    <app-slide />
    <el-container class="main-container">
      <app-header />
      <el-main>
        <el-card>
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss">
.el-container {
  height: 100vh;
}
.main-container {
  flex-direction: column;
}
.el-card {
  height: 100%;
}
</style>
<script>
import AppSlide from './components/app-slide.vue';
import AppHeader from './components/app-header/index.vue';

export default {
  components: {
    AppSlide,
    AppHeader,
  },
};
</script>
