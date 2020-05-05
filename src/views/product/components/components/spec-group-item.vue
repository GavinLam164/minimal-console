<template>
  <div class="spec-group-item">
    <el-form inline :model="form" size="small">
      <el-form-item :label="$t('product.规格')">
        <el-select v-model="form.specGroupId" size="small">
          <el-option
            v-for="{specGroupId, specGroupName} in specGroupOptions"
            :key="specGroupId"
            :label="specGroupName"
            :value="specGroupId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-tag
        v-for="(specValue, index) in specValueList"
        :key="index"
        @close="close(specValue)"
        closable
      >{{specValue.specValueName}}</el-tag>
      <el-form-item class="spec-value-input">
        <el-input v-model="form.specValueName" size="small" />
      </el-form-item>
      <el-button type="primary" @click="addSpecValue" size="small">{{$t('global.新增')}}</el-button>
    </el-form>
  </div>
</template>
<style lang="scss">
.spec-group-item {
  .el-tag.el-tag--light {
    margin-left: 10px;
  }
  .spec-value-input {
    margin-left: 10px;
    width: 100px;
  }
  .el-input--small {
    line-height: normal;
  }
}
</style>
<script>
import { specValueAdd, specValueDel } from '@/api/product';

export default {
  props: ['spuId', 'specValueList', 'specGroupId', 'specGroupOptions', 'specGroupIndex'],
  data() {
    return {
      form: {
        specGroupId: '',
        specValueName: '',
      },
    };
  },
  watch: {
    specGroupId: {
      immediate: true,
      handler(newV) {
        this.form.specGroupId = newV;
      },
    },
  },
  methods: {
    async addSpecValue() {
      await specValueAdd({
        ...this.form,
        spuId: this.spuId,
        specValueIndex: this.specValueList.length,
        specGroupIndex: this.specGroupIndex,
      });
      this.form.specValueName = '';
      this.$emit('submit');
    },
    async close(specValue) {
      await specValueDel(this.spuId, specValue.specValueId);
      this.$emit('submit');
    },
  },
};
</script>
