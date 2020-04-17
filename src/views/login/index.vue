<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2 class="title">{{$t('user.EShop运营后台管理系统')}}</h2>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input :placeholder="$t('user.手机')" v-model="form.phone">
            <i class="el-icon-mobile-phone" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :placeholder="$t('user.密码')" type="password" v-model="form.password">
            <i class="el-icon-lock" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="login">{{$t('user.登录')}}</el-button>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  background: #2d3a4b;
}
.form-wrapper {
  padding-top: 200px;
  width: 400px;
}
.title {
  color: #eee;
  text-align: center;
}
</style>
<script>
import { consoleUserLogin } from '@/api/user';
import md5 from 'md5';

export default {
  data() {
    return {
      form: {
        phone: '',
        password: '',
      },
    };
  },
  computed: {
    rules() {
      return {
        phone: [
          {
            required: true,
            message: this.$t('user.请输入手机'),
          },
        ],
        password: [
          {
            required: true,
            message: this.$t('user.请输入密码'),
          },
        ],
      };
    },
  },
  methods: {
    async login() {
      await this.$refs.form.validate();
      const password = md5(this.form.password);
      const { data } = await consoleUserLogin({
        ...this.form,
        password,
      });
      const { accessToken, userInfo } = data;
      window.localStorage.setItem('token', accessToken);
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.$message.success(this.$t('user.登录成功'));
      this.$router.push({
        name: 'Category',
      });
    },
  },
};
</script>
