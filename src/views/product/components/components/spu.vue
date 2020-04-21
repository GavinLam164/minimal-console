<template>
  <el-form :disabled="isDetail" :model="form" ref="form" :rules="rules" inline label-width="100px">
    <el-form-item :label="$t('product.商品类目')" prop="categoryIds" required>
      <m-select-category ref="mSelectCategory" v-model="form.categoryIds" :disabled="!isAdd" />
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
        <m-upload ref="mBannerImageList" v-if="visible" v-model="form.bannerImageList" />
      </el-form-item>
    </div>
    <div>
      <el-form-item :label="$t('product.详情图')" prop="detailImageList" required>
        <m-upload ref="mDetailImageList" v-if="visible" v-model="form.detailImageList" />
      </el-form-item>
    </div>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">{{$t('global.提交')}}</el-button>
    </el-row>
  </el-form>
</template>
<script>
import { productSpuAdd, productSpuQuery } from '@/api/product';

export default {
  props: ['isDetail', 'isAdd', 'isEdit', 'spuId', 'visible'],
  data() {
    return {
      form: {
        categoryIds: [],
        bannerImageList: [],
        detailImageList: [],
      },
    };
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.initSpuInfo();
      } else {
        this.resetFields();
      }
    },
  },
  computed: {
    rules() {
      return {
      };
    },
  },
  created() {
    this.initSpuInfo();
  },
  methods: {
    async initSpuInfo() {
      if (this.isAdd) return;
      const { data } = await productSpuQuery(this.spuId);
      const categoryIds = await this.$refs.mSelectCategory.getCategoryIds(data.categoryId);
      data.categoryIds = categoryIds;
      const bannerImageList = data.bannerImageList.map(({ spuImagePath }) => spuImagePath);
      const detailImageList = data.detailImageList.map(({ spuImagePath }) => spuImagePath);
      this.$refs.mBannerImageList.setFileList(
        data.bannerImageList.map(({ spuImagePath }) => ({ name: spuImagePath, url: spuImagePath })),
      );
      this.$refs.mDetailImageList.setFileList(
        data.detailImageList.map(({ spuImagePath }) => ({ name: spuImagePath, url: spuImagePath })),
      );
      data.bannerImageList = bannerImageList;
      data.detailImageList = detailImageList;
      this.form = data;
    },
    async submit() {
      await this.$refs.form.validate();
      const categoryId = this.form.categoryIds[2];
      const bannerImageList = this.convertImageObject(this.form.bannerImageList);
      const detailImageList = this.convertImageObject(this.form.detailImageList);
      await productSpuAdd({
        ...this.form,
        categoryId,
        bannerImageList,
        detailImageList,
      });
      if (this.isAdd) {
        this.resetFields();
        this.$emit('submit');
        this.$message.success(this.$t('global.新增成功'));
      } else {
        this.$message.success(this.$t('global.修改成功'));
      }
    },
    resetFields() {
      this.$refs.form.resetFields();
    },
    convertImageObject(arr) {
      return arr.map((spuImagePath, spuImageIndex) => ({ spuImagePath, spuImageIndex }));
    },
  },
};
</script>
