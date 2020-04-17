<template>
  <div class="m-upload">
    <el-upload
      action="/api/upload/uploadFile"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>
<style lang="scss">
.m-upload {
  .el-upload--picture-card, .el-upload-list__item  {
    width: 80px;
    height: 80px;
    line-height: 90px;
  }
}
</style>
<script>
export default {
  componentName: 'MUpload',
};
</script>
