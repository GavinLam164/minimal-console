<template>
  <el-dialog width="800px" :title="$t('product.新增商品')" :visible.sync="visible" append-to-body>
    <spu
      ref="spu"
      :is-add="isAdd"
      :is-detail="isDetail"
      :is-edit="isEdit"
      :spu-id="spuId"
      :visible="visible"
    />
    <spec-group-list :spu-id="spuId" />
    <sku :spu-id="spuId" />
  </el-dialog>
</template>

<script>
import Spu from './components/spu.vue';
import SpecGroupList from './components/spec-group-list.vue';
import Sku from './components/sku.vue';

export default {
  components: {
    Spu,
    SpecGroupList,
    Sku,
  },
  data() {
    return {
      spuId: '',
      visible: false,
      isDetail: false,
    };
  },
  computed: {
    isAdd() {
      return !this.isEdit && !this.isDetail;
    },
    isEdit() {
      return this.spuId;
    },
  },
  methods: {
    async open(spuId = '', isDetail = false) {
      this.spuId = spuId;
      this.isDetail = isDetail;
      this.visible = true;
    },
    close() {
      this.spuId = '';
      this.isDetail = false;
      this.visible = false;
    },
  },
};
</script>
