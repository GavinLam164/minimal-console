<template>
  <div>
    <m-table :labels="labels" :datas="skuList" border>
      <m-upload
        slot="skuImage"
        slot-scope="{row, $index}"
        :ref="`skuImage${$index}`"
        v-model="row.skuImage"
        :limit="1"
      />
      <el-input slot="skuCode" slot-scope="{row}" v-model="row.skuCode" />
      <el-input slot="skuPrice" slot-scope="{row}" v-model="row.skuPrice" />
      <template slot="operate" slot-scope="{row}">
        <el-button
          type="text"
          v-if="row.saleState === 0"
          @click="puawaySingle(row)"
        >{{$t('product.上架')}}</el-button>
        <el-button
          type="text"
          v-if="row.saleState === 1"
          @click="soldOutSingle(row)"
        >{{$t('product.下架')}}</el-button>
      </template>
    </m-table>
    <el-row type="flex" justify="center">
      <el-button @click="saveSkuList" type="primary">{{$t('global.提交')}}</el-button>
    </el-row>
  </div>
</template>
<script>
import {
  productSkuList, specGroupListSelect, productSkuUpdate, productSkuUpdateState,
} from '@/api/product';

export default {
  props: ['spuId'],
  data() {
    return {
      skuList: [],
      specGroupList: [],
    };
  },
  computed: {
    labels() {
      const specLables = this.specGroupList.map(({ specGroupName }) => ({
        label: specGroupName,
        prop: specGroupName,
        formatter: ({ specGroupList }) => specGroupList
          .find(({ specGroupName: name }) => name === specGroupName)
          .specValueList[0]
          .specValueName,
      }));
      return [{
        label: 'skuId',
        prop: 'skuId',
      }, ...specLables, {
        label: this.$t('product.编码'),
        prop: 'skuCode',
        slotName: 'skuCode',
      }, {
        label: this.$t('product.价格'),
        prop: 'skuPrice',
        slotName: 'skuPrice',
      }, {
        label: this.$t('product.图片'),
        prop: 'skuImage',
        slotName: 'skuImage',
      }, {
        label: this.$t('global.操作'),
        slotName: 'operate',
      }];
    },
  },
  async created() {
    await this.initSpecGroupList();
    await this.initSkuList();
  },
  methods: {
    async initSpecGroupList() {
      if (!this.spuId) return;
      const { data } = await specGroupListSelect(this.spuId);
      this.specGroupList = data;
    },
    async initSkuList() {
      const { data } = await productSkuList(this.spuId);
      this.skuList = data.map((sku) => ({
        skuPrice: '',
        skuCode: '',
        ...sku,
        skuImage: sku.skuImage ? [sku.skuImage.skuImagePath] : [],
      }));
      this.$nextTick(this.setSkuImage);
    },
    setSkuImage() {
      this.skuList.forEach(({ skuImage }, index) => {
        const skuImages = skuImage.map((skuImagePath) => ({ name: skuImagePath, url: skuImagePath }));
        this.$refs[`skuImage${index}`].setFileList(
          skuImages,
        );
      });
    },
    async saveSkuList() {
      const skuList = this.skuList.map(
        (sku) => (
          {
            ...sku,
            skuImage: {
              skuImagePath: sku.skuImage[sku.skuImage.length - 1],
            },
          }),
      );
      await productSkuUpdate(skuList);
    },
    async updateState(skuList, saleState) {
      const skuIds = skuList.map(({ skuId }) => skuId);
      await productSkuUpdateState({
        skuIds: skuIds.join(','),
        saleState,
      });
    },
    puawaySuccess() {
      this.$message.success(this.$t('product.上架成功'));
      this.initSkuList();
    },
    soldOutSucess() {
      this.$message.success(this.$t('product.下架成功'));
      this.initSkuList();
    },
    async puawaySingle(sku) {
      await this.updateState([sku], 1);
      this.puawaySuccess();
    },
    async soldOutSingle(sku) {
      await this.updateState([sku], 0);
      this.soldOutSucess();
    },
  },

};
</script>
