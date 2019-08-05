<template>
  <el-upload
  class="upload-demo"
  action="http://172.25.4.159:8769/api-crm/target/company/resolve"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :headers="{Authorization: userInfo.jwtValue}"
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList"
  :data="{isCover: 1, itemId: '0ff0bc40-3d40-4c92-92dd-a6eaa3e58977' }">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    props: {
    itemid: {
      type: String,
      default() {
        return "";
      }
    }
  },
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    computed: {
      ...mapGetters('ipublic', ['userInfo'])
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>