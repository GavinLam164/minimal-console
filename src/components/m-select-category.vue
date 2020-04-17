<template>
  <el-cascader :value="value" :options="options" :props="categoryOptions"></el-cascader>
</template>
<script>
import { categoryBackTreeList } from '@/api/category';

export default {
  componentName: 'MSelectCategory',
  data() {
    return {
      options: [],
      categoryOptions: {
        label: 'categoryName',
        value: 'categoryId',
        children: 'subList',
      },
    };
  },
  watch: {
    value(newV) {
      this.$emit('input', newV);
    },
  },
  async created() {
    const { data } = await categoryBackTreeList();
    this.options = data;
  },
  methods: {
  },
};
</script>
