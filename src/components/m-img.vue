<template>
  <div>
    <img :src="src" :style="`width:${width}px;height:${height}px;`" />
  </div>
</template>
<script>
export default {
  componentName: 'MImg',
  props: {
    src: {
      type: String,
    },
    width: {
      type: Number,
      default: 50,
    },
    height: {
      default: 50,
    },
  },
};
</script>
