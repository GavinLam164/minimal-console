<template>
  <div>
    <el-button type="primary" @click="addSpecGroup">{{$t('product.新增规格')}}</el-button>
    <spec-group-item
      v-for="({specValueList, specGroupId},index) in specGroupList"
      :key="index"
      :spec-group-index="index"
      :spu-id="spuId"
      :spec-value-list="specValueList"
      :spec-group-id="specGroupId"
      :spec-group-options="specGroupOptions"
      @submit="initSpecGroupList"
    />
  </div>
</template>
<script>
import { specGroupListSelect, specGroupList } from '@/api/product';
import SpecGroupItem from './spec-group-item.vue';

export default {
  components: {
    SpecGroupItem,
  },
  props: ['spuId'],
  data() {
    return {
      specGroupList: [],
    };
  },
  async created() {
    await this.initSpecGroupOptions();
    await this.initSpecGroupList();
  },
  methods: {
    async initSpecGroupList() {
      if (!this.spuId) return;
      const { data } = await specGroupListSelect(this.spuId);
      this.specGroupList = data;
      this.$emit('init-spec-group-list');
    },
    async initSpecGroupOptions() {
      const { data } = await specGroupList();
      this.specGroupOptions = data;
    },
    addSpecGroup() {
      this.specGroupList = this.specGroupList.concat([{
        specGroupId: '',
        specValueList: [],
      }]);
    },
  },
};
</script>
