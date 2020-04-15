<template>
  <m-table :labels="categoryLabels" :datas="categoryList" highlight-current-row />
</template>
<script>
export default {
  data() {
    return {
      categoryLabels: [
        {
          label: 'name',
          prop: 'name',
        },
      ],
      categoryList: [
        {
          name: '王小虎',
        },
        {
          name: '王小虎',
        },
      ],
    };
  },
};
</script>
