<template>
  <div>
    <img :src="src" />
  </div>
</template>
<script>
export default {
  componentName: 'MImg',
  props: {
    src: {
      type: String,
    },
  },
};
</script>
