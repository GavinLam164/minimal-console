<template>
  <el-row>
    <el-col :span="6">
      <category-table :level="1" :container="self">
        <template slot="title">{{$t('category.一级类目')}}</template>
      </category-table>
    </el-col>
    <el-col :span="6" :offset="3" v-show="categoryTables[0] && categoryTables[0].currentCategory">
      <category-table :level="2" :container="self">
        <template slot="title">{{$t('category.二级类目')}}</template>
      </category-table>
    </el-col>
    <el-col :span="6" :offset="3" v-show="categoryTables[1] && categoryTables[1].currentCategory">
      <category-table :level="3" :container="self">
        <template slot="title">{{$t('category.三级类目')}}</template>
      </category-table>
    </el-col>
  </el-row>
</template>

<script>
import CategoryTable from './components/category-table.vue';

export default {
  componentName: 'CategoryContainer',
  components: {
    CategoryTable,
  },
  data() {
    return {
      categoryTables: [],
      self: null,
    };
  },
  created() {
    this.self = this;
  },
  mounted() {
    this.initDeque();
  },
  methods: {
    appendTable(table) {
      this.categoryTables = this.categoryTables.concat(table);
    },
    initDeque() {
      let pre;
      this.categoryTables.forEach((table) => {
        if (pre) {
          pre.next = table;
        }
        // eslint-disable-next-line no-param-reassign
        table.pre = pre;
        pre = table;
      });
      this.categoryTables[0].initCategoryList();
    },
  },
};
</script>
