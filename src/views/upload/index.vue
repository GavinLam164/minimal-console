<template>
  <div>
    <m-upload v-model="pathList" />
    <div v-for="path in pathList" :key="path">{{path}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pathList: [],
    };
  },
};
</script>
