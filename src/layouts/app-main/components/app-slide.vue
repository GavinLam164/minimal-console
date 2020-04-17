<template>
  <el-aside width="240px">
    <el-scrollbar>
      <el-menu
        :router="true"
        active-text-color="#fff"
        backgroundColor="#001529"
        textColor="#909399"
      >
        <el-menu-item index="/category">
          <i class="el-icon-menu"></i>
          <span slot="title">{{$t('category.类目管理')}}</span>
        </el-menu-item>
        <el-menu-item index="/product">
          <i class="el-icon-menu"></i>
          <span slot="title">{{$t('product.商品管理')}}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<style lang="scss">
.el-aside {
  background-color: #001529;
  border-right: solid 1px #e6e6e6;
  .el-menu {
    border-right: none;
  }
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-menu-item.is-active {
    background-color: #1890ff !important;
  }
}
</style>
<script>
export default {};
</script>
