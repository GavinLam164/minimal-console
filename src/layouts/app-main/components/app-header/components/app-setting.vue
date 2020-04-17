<template>
  <el-menu mode="horizontal">
    <el-submenu index="2">
      <template slot="title">{{userInfo.nickName}}</template>
      <el-menu-item index="2-1" @click="logout">{{$t('user.退出')}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import { consoleUserLogout } from '@/api/user';

export default {
  data() {
    return {
      userInfo: null,
    };
  },
  created() {
    const json = localStorage.getItem('userInfo');
    this.userInfo = JSON.parse(json);
  },
  methods: {
    async logout() {
      await consoleUserLogout();
      localStorage.removeItem('userInfo');
      localStorage.removeItem('toekn');
      this.$message.success(this.$t('user.退出成功'));
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
