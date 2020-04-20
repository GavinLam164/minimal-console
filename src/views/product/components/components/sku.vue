<template>
  <div></div>
</template>
<script>
import { productSkuList } from '@/api/product';

export default {
  props: ['spuId'],
  data() {
    return {

    };
  },
  async created() {
    await productSkuList(this.spuId);
  },
};
</script>
