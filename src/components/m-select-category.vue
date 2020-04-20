<template>
  <el-cascader
    :value="value"
    :options="options"
    @input="change"
    v-bind="$attrs"
    :props="categoryOptions"
  ></el-cascader>
</template>
<script>
import { categoryBackTreeList, categoryBackFind } from '@/api/category';

export default {
  componentName: 'MSelectCategory',
  props: {
    value: {
      type: Array,
    },
  },
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
  async created() {
    const { data } = await categoryBackTreeList();
    this.options = data;
  },
  methods: {
    change(newV) {
      this.$emit('input', newV);
    },
    async getCategoryIds(id) {
      const { data } = await categoryBackFind(id);
      return data.path.split('_').map((v) => Number(v));
    },
  },
};
</script>
