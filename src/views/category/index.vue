<template>
  <div>
    <el-row>
      <el-col :span="6">
        <category-table />
      </el-col>
      <el-col :span="6" :offset="3">
        <category-table />
      </el-col>
      <el-col :span="6" :offset="3">
        <category-table />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CategoryTable from './components/category-table.vue';

export default {
  components: {
    CategoryTable,
  },
};
</script>
