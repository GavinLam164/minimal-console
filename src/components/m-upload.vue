<template>
  <div class="m-upload">
    <el-upload
      action="/api/upload/uploadFile"
      list-type="picture-card"
      :headers="headers"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      v-bind="$attrs"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
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
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    const token = window.localStorage.getItem('token') || '';
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        token,
      },
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.$emit('input', this.value.filter((u) => u.url !== file.url));
    },
    handleSuccess(response, file, fileList) {
      // eslint-disable-next-line no-param-reassign
      file.url = response.data;
      this.fileList = fileList;
      this.$emit('input', this.value.concat(response.data));
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    setFileList(fileList) {
      this.fileList = fileList;
    },
  },
};
</script>
