<template>
  <div class="m-checkbox-group">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >{{$t('global.全选')}}</el-checkbox>
    <el-checkbox-group :value="value" @input="onChange" @change="handleCheckedChange">
      <el-checkbox name="type" v-for="({key, value}) in options" :label="key" :key="key">{{value}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<style lang="scss">
.m-checkbox-group {
  .el-checkbox-group {
    display: inline;

    > .el-checkbox:first-child {
      margin-left: 30px;
    }
  }
}
</style>
<script>
export default {
  componentName: 'MCheckboxGroup',
  props: {
    value: {
      required: true,
      type: Array,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
    };
  },
  methods: {
    setAllOptions() {
      this.$emit('input', this.options.map(({ key }) => key));
    },
    clearOptions() {
      this.$emit('input', []);
    },
    handleCheckAllChange(val) {
      if (val) {
        this.setAllOptions();
      } else {
        this.clearOptions();
      }
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    },
    onChange(val) {
      this.$emit('input', val);
    },
  },
};
</script>
