<template>
  <div>
    <div class="category-title">
      <slot name="title" />
    </div>
    <div class="category-title">
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-button type="primary" size="mini" @click="openAddCategoryDialog">{{$t('global.新增')}}</el-button>
        </el-col>
        <el-col>
          <el-button type="success" size="mini" @click="enable">{{$t('category.启用')}}</el-button>
        </el-col>
        <el-col>
          <el-button type="warning" size="mini" @click="disable">{{$t('category.禁用')}}</el-button>
        </el-col>
        <!-- <el-col>
          <el-button type="danger" size="mini">{{$t('category.删除')}}</el-button>
        </el-col>-->
      </el-row>
    </div>
    <m-table
      :labels="categoryLabels"
      :datas="categoryList"
      highlight-current-row
      border
      @current-change="currentChange"
    />
    <add-category-dialog ref="addCategoryDialog" @submit="initCategoryList" />
  </div>
</template>
<style lang="scss" scoped>
.category-title {
  text-align: center;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-bottom: none;
}
</style>
<script>
import { categoryBackFindByParentId, categoryBackUpdateState } from '@/api/category';
import AddCategoryDialog from './add-category-dialog.vue';

export default {
  componentName: 'CategoryTable',
  components: {
    AddCategoryDialog,
  },
  props: {
    level: {
      type: Number,
    },
    container: {},
  },
  data() {
    return {
      categoryList: [],
      currentCategory: null,
    };
  },
  async created() {
    this.container.appendTable(this);
  },
  methods: {
    async initCategoryList() {
      const { data } = await categoryBackFindByParentId(this.parentId);
      this.categoryList = data;
    },
    getStateText(state) {
      const stateMap = {
        0: '禁用',
        1: '启用',
      };
      return `category.${stateMap[state]}`;
    },
    currentChange(category) {
      this.currentCategory = category;
      this.initNextCategoryList();
    },
    initNextCategoryList() {
      if (this.next) {
        this.next.initCategoryList();
      }
    },
    openAddCategoryDialog() {
      this.$refs.addCategoryDialog.open(this.parentId);
    },
    async updateState(state) {
      const { categoryId, state: curState } = this.currentCategory;
      if (curState === state) {
        return;
      }
      await categoryBackUpdateState({
        categoryId,
        state,
      });
    },
    async enable() {
      await this.updateState(1);
      this.$message.success(this.$t('category.启用成功'));
      this.initCategoryList();
    },
    async disable() {
      await this.updateState(0);
      this.$message.success(this.$t('category.禁用成功'));
      this.initCategoryList();
    },
  },
  computed: {
    parentId() {
      return this.pre && this.pre.currentCategory ? this.pre.currentCategory.categoryId : '';
    },
    categoryLabels() {
      return [
        {
          label: 'ID',
          prop: 'categoryId',
        },
        {
          label: this.$t('category.类目名称'),
          prop: 'categoryName',
        },
        {
          label: this.$t('global.状态'),
          prop: 'state',
          formatter: ({ state }) => this.$t(this.getStateText(state)),
        },
      ];
    },
  },
};
</script>
