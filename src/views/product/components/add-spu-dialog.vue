<template>
  <el-dialog width="600px" :title="$t('product.新增商品')" :visible.sync="visible">
    <el-form :model="form" ref="form" :rules="rules" inline label-width="100px">
      <el-form-item :label="$t('product.商品类目')" prop="categoryId" required>
        <m-select-category v-model="form.categoryId" />
      </el-form-item>
      <el-form-item :label="$t('product.商品名称')" prop="spuName" required>
        <el-input v-model="form.spuName" />
      </el-form-item>
      <el-form-item :label="$t('product.商品描述')" prop="spuDesc">
        <el-input v-model="form.spuDesc" type="textarea" />
      </el-form-item>
      <el-form-item :label="$t('product.商品价格')" prop="spuPrice" required>
        <el-input v-model="form.spuPrice" />
      </el-form-item>
      <div>
        <el-form-item label="Banner" prop="bannerImageList" required>
          <m-upload v-model="form.bannerImageList" />
        </el-form-item>
      </div>
      <div>
        <el-form-item :label="$t('product.详情图')" prop="detailImageList" required>
          <m-upload v-model="form.detailImageList" />
        </el-form-item>
      </div>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="submit">{{$t('global.提交')}}</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      form: {},
    };
  },
  computed: {
    rules() {
      return {
      };
    },
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    async submit() {
      await this.$refs.form.validate();
      this.$refs.form.resetFields();
      this.$emit('submit');
      this.$message.success(this.$t('global.新增成功'));
      this.close();
    },
  },
};
</script>
