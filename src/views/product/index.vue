<template>
  <div>
    <el-form :model="form" inline>
      <el-form-item :label="$t('product.状态')">
        <m-checkbox-group v-model="form.saleStates" :options="saleStateOptions" />
      </el-form-item>
      <el-row>
        <el-col :span="5">
          <el-form-item :label="$t('product.商品名称')">
            <el-input v-model="form.spuName" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="spuId">
            <el-input v-model="form.spuId" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="skuId">
            <el-input v-model="form.skuId" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('product.商品编码')">
            <el-input v-model="form.skuCode" />
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" @click="initSpuList">{{$t('global.搜索')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <add-spu-dialog ref="addSpuDialog" />
    <div>
      <el-button type="primary" size="mini" @click="openAddDialog">{{$t('global.新增')}}</el-button>
      <el-button type="success" size="mini" @click="puawaySelection">{{$t('product.上架')}}</el-button>
      <el-button type="danger" size="mini" @click="soldOutSelection">{{$t('product.下架')}}</el-button>
    </div>
    <m-table :labels="labels" :datas="spuList" border @selection-change="selectionChange">
      <m-img slot="spuImage" slot-scope="{row}" :src="row.spuImage.spuImagePath" />
      <template slot="operate" slot-scope="{row}">
        <el-button type="text">{{$t('global.详情')}}</el-button>
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
  </div>
</template>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
import { productSpuList, productSpuUpdateState } from '@/api/product';
import AddSpuDialog from './components/add-spu-dialog.vue';

export default {
  components: {
    AddSpuDialog,
  },
  data() {
    return {
      headers: {
        token: '345038b05aa4dafa4329b9577d5f7e38',
      },
      spuList: [],
      selectionSpuList: [],
      pageParmas: {
        curPage: 1,
        pageSize: 10,
      },
      form: {
        saleStates: [],
      },
    };
  },

  computed: {
    labels() {
      return [
        {
          type: 'selection',
        },
        {
          label: 'spuId',
          prop: 'spuId',
        },
        {
          label: this.$t('product.图片'),
          prop: 'spuImage',
          slotName: 'spuImage',
        },
        {
          label: this.$t('product.商品名称'),
          prop: 'spuName',
        },
        {
          label: this.$t('product.价格'),
          prop: 'spuPrice',
        },
        {
          label: this.$t('product.状态'),
          prop: 'saleState',
          formatter: ({ saleState }) => this.$t(this.getStateText(saleState)),
        },
        {
          label: '操作',
          slotName: 'operate',
        },
      ];
    },
    saleStateOptions() {
      return [
        {
          key: 1,
          value: this.$t('product.上架'),
        },
        {
          key: 0,
          value: this.$t('product.下架'),
        },
      ];
    },
  },
  async created() {
    this.initSpuList();
  },
  methods: {
    async initSpuList() {
      const { data } = await productSpuList({
        ...this.pageParmas,
        ...this.form,
      });
      const { list } = data;
      this.spuList = list;
    },
    getStateText(saleState) {
      const saleStateMap = {
        0: '下架',
        1: '上架',
      };
      return `product.${saleStateMap[saleState]}`;
    },
    async updateState(spuList, saleState) {
      const spuIds = spuList.map(({ spuId }) => spuId);
      await productSpuUpdateState({
        spuIds: spuIds.join(','),
        saleState,
      });
    },
    puawaySuccess() {
      this.$message.success(this.$t('product.上架成功'));
      this.initSpuList();
    },
    soldOutSucess() {
      this.$message.success(this.$t('product.下架成功'));
      this.initSpuList();
    },
    selectionChange(selectionSpuList) {
      this.selectionSpuList = selectionSpuList;
    },
    async puawaySelection() {
      await this.updateState(this.selectionSpuList, 1);
      this.puawaySuccess();
    },
    async soldOutSelection() {
      await this.updateState(this.selectionSpuList, 0);
      this.puawaySuccess();
    },
    async puawaySingle(spu) {
      await this.updateState([spu], 1);
      this.puawaySuccess();
    },
    async soldOutSingle(spu) {
      await this.updateState([spu], 0);
      this.soldOutSucess();
    },
    openAddDialog() {
      this.$refs.addSpuDialog.open();
    },
  },
};
</script>
