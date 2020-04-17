<template>
  <el-dialog width="400px" :title="$t('category.新增类目')" :visible.sync="visible">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item :label="$t('category.类目名称')" prop="categoryName">
        <el-input v-model="form.categoryName" />
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="submit">{{$t('global.提交')}}</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import { categoryBackAdd } from '@/api/category';

export default {
  data() {
    return {
      visible: false,
      parentId: null,
      form: {},
    };
  },
  computed: {
    rules() {
      return {
        categoryName: [
          {
            required: true,
            message: this.$t('category.请输入类目名称'),
          },
        ],
      };
    },
  },
  methods: {
    open(parentId) {
      this.parentId = parentId;
      this.visible = true;
    },
    close() {
      this.parentId = null;
      this.visible = false;
    },
    async submit() {
      await this.$refs.form.validate();
      const { categoryName } = this.form;
      const { parentId } = this;
      await categoryBackAdd({
        categoryName,
        parentId,
      });
      this.$refs.form.resetFields();
      this.$emit('submit');
      this.$message.success(this.$t('global.新增成功'));
      this.close();
    },
  },
};
</script>
