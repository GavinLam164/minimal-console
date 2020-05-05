<template>
  <div :class="`m-upload ${componentClass}`">
    <el-upload
      action="/api/upload/uploadFile"
      list-type="picture-card"
      :headers="headers"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :limit="limit"
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

  .none {
    display: none;
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
    limit: {
      type: Number,
      default: 5,
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
  computed: {
    componentClass() {
      // eslint-disable-next-line no-underscore-dangle
      return `m-upload-${this._uid}`;
    },
  },
  updated() {
    this.toggleAddIcon();
  },
  methods: {
    toggleAddIcon() {
      const addIcon = document.querySelector(`.${this.componentClass} div.el-upload--picture-card`);
      if (!addIcon) return;
      if (this.value.length >= this.limit) {
        addIcon.classList.add('none');
      } else {
        addIcon.classList.remove('none');
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.$emit('input', this.value.filter((u) => u !== file.url));
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
