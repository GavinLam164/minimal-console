<template>
  <el-table :data="datas" v-bind="$attrs" v-on="$listeners">
    <el-table-column v-for="(label, index) in labels" :key="index" v-bind="label">
      <template v-if="label.slotName" slot-scope="scope">
        <slot :name="label.slotName" v-bind="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  componentName: 'MTable',
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    datas: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
