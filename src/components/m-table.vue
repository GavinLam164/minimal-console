<template>
  <el-table :data="datas" v-bind="$attrs" v-on="$listeners">
    <template v-for="(label, index) in labels" v-bind="label">
      <el-table-column v-if="label.slotName" v-bind="label" :key="index">
        <slot slot-scope="scope" :name="label.slotName" v-bind="scope" />
      </el-table-column>
      <el-table-column v-else v-bind="label" :key="index" />
    </template>
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
