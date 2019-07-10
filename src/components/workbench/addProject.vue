<template>
  <div class="workbench-addProject">
    <el-button class="addProject_button" @click="show = true">添加新项目</el-button>
    <el-dialog title="添加项目" :visible.sync="show" width="610px">
      <ul class="addProject_ul">
        <li :class="activeName===1?'addProject_ul_li--current':''">添加项目</li>
        <li :class="activeName===2?'addProject_ul_li--current':''">项目资料</li>
        <li :class="activeName===3?'addProject_ul_li--current':''">产品资料</li>
      </ul>
      <!-- 第一步添加账号 start -->
      <el-form
        class="addProject_form"
        v-if="activeName===1"
        :model="firstForm"
        label-width="80px"
        label-position="top"
        ref="firstForm"
        :rules="firstRules"
      >
        <el-form-item label="登录账号" prop="username">
          <el-input v-model="firstForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="firstForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 第一步添加账号 end -->
      <!-- 第二步项目资料 start -->
      <el-form
        class="addProject_form"
        v-if="activeName===2"
        :model="secondForm"
        label-width="80px"
        label-position="top"
        ref="secondForm"
        :rules="secondRules"
      >
        <el-form-item label="项目名称" prop="projectTitle">
          <el-input v-model="secondForm.projectTitle" autocomplete="off" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="secondForm.companyName" autocomplete="off" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="行业" prop="tmt">
          <el-select v-model="secondForm.tmt" placeholder="请选择行业">
            <el-option
              v-for="item in tmts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="site">
          <el-input v-model="secondForm.site" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="secondForm.url" autocomplete="off" placeholder="Https://"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="secondForm.email" autocomplete="off" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="优势" prop="strength">
          <el-input
            v-model="secondForm.strength"
            autocomplete="off"
            placeholder="请说明优势"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 第二步项目资料 end -->
      <!-- 第三步产品资料 start -->
      <el-form
        class="addProject_form"
        v-if="activeName===3"
        :model="thirdlyForm"
        label-width="80px"
        label-position="top"
        ref="thirdlyForm"
        :rules="thirdlyRules"
      >
        <!-- 产品名称 -->
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="thirdlyForm.productName" autocomplete="off" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <!-- 产品图片 start -->
        <el-form-item label="产品图片">
          <el-row>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <!-- 上传图片 start -->
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="addProject-thirdly_upload"
              >
                <i class="el-icon-upload"></i>
                <p>上传图片</p>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="80px" :src="thirdlyForm.imageUrl" alt />
              </el-dialog>
              <!-- 上传图片 end -->
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <el-input v-model="thirdlyForm.password" autocomplete="off" placeholder="请输入产品描述"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 产品图片 end -->
        <!-- 产品视频 start -->
        <el-form-item label="产品视频">
          <el-row>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="addProject-thirdly_upload"
              >
                <i class="el-icon-video-camera-solid"></i>
                <p>上传视频</p>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="thirdlyForm.videoUrl" alt />
              </el-dialog>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <el-input v-model="thirdlyForm.password" autocomplete="off" placeholder="请输入产品描述"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 产品视频 end -->
        <!-- 附件（产品目录） start -->
        <el-form-item label="附件(产品目录)">
          <el-row>
            <el-col>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="addProject-thirdly_upload"
              >
                <i class="el-icon-paperclip"></i>
                <p>上传附件</p>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="thirdlyForm.attachmentUrl" alt />
              </el-dialog>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 附件（产品目录） end -->
        <!-- 学习资料 start -->
        <el-form-item label="学习资料">
          <el-row>
            <el-col>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="addProject-thirdly_upload"
              >
                <i class="el-icon-paperclip"></i>
                <p>上传附件</p>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="80px" :src="thirdlyForm.learnUrl" alt />
              </el-dialog>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 学习资料 end -->
      </el-form>
      <!-- 第三步产品资料 end -->
      <div slot="footer" class="dialog-footer">
        <el-button v-if="activeName===1" type="primary" @click="onSubmitForm('firstForm',2)">完善资料</el-button>
        <el-button
          v-else-if="activeName===2"
          type="primary"
          @click="onSubmitForm('secondForm',3)"
        >继续完善</el-button>
        <el-button
          v-else-if="activeName===3"
          type="primary"
          @click="onSubmitForm('thirdlyForm',4)"
        >完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 1,
      show: false,
      dialogVisible: false,
      tmts: [
        {
          value: "选项1",
          label: "纺织"
        },
        {
          value: "选项2",
          label: "金融"
        },
        {
          value: "选项3",
          label: "工业"
        },
        {
          value: "选项4",
          label: "印刷"
        },
        {
          value: "选项5",
          label: "餐饮"
        }
      ],
      firstForm: {
        username: "",
        password: ""
      },
      secondForm: {
        projectTitle: "",
        companyName: "",
        tmt: "",
        site: "",
        url: "",
        email: "",
        strength: ""
      },
      thirdlyForm: {
        productName: "",
        ImageUrl: "",
        videoUrl: "",
        attachmentUrl: "",
        learnUrl: ""
      },
      firstRules: {
        username: [
          {
            required: true,
            message:"请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message:"请输入密码",
            trigger: "blur"
          }
        ]
      },
      secondRules: {
           projectTitle: [
          {
            required: true,
            message:"请输入项目名称",
            trigger: "blur"
          }
        ],
        companyName: [
          {
            required: true,
            message:"请输入企业名称",
            trigger: "blur"
          }
        ],
        tmt: [
          {
            required: true,
            message:"请输入行业",
            trigger: "blur"
          }
        ],
        site:[
          {
            required: true,
            message:"请输入地址",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message:"请输入网址",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message:"请输入邮箱",
            trigger: "blur"
          }
        ],
        strength: [
          {
            required: true,
            message:"请输入优势",
            trigger: "blur"
          }
        ]
      },
      thirdlyRules: {
        productName: [
          {
            required: true,
            message:"请输入产品名称",
            trigger: "blur"
          }
        ]
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.thirdlyForm.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 保存每一步信息
     */
    onSubmitForm(formName, number) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.activeName = number;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.addProject_button {
  background-color: $--default-color;
  color: white;
}
.addProject_ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  li {
    margin: 0 20px;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    position: relative;
    color: #bbbbbbff;
  }
  li::after {
    content: "";
    display: block;
    width: 120%;
    height: 5px;
    border-radius: 2.5px;
    background-color: transparent;
    transform: translate(-50%, 0);
    position: absolute;
    bottom: -4px;
    left: 50%;
  }
  .addProject_ul_li--current {
    color: $--default-color;
  }
  .addProject_ul_li--current::after {
    background-color: $--default-color;
  }
  .addProject_ul_li--current::before {
    content: "";
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: $--default-color;
    transform: translate(-50%, 100%);
    position: absolute;
    bottom: -4px;
    left: 50%;
  }
}
.addProject_form {
  max-height: 450px;
  overflow-y: scroll;
}
.addProject-thirdly_upload {
  i {
    font-size: 30px;
    color: white;
    margin-top: 10px;
  }
  p {
    line-height: 20px;
    margin: 0;
    font-size: 12px;
    color: white;
  }
}
</style>
<style>
.addProject-thirdly_upload .el-upload--picture-card {
  width: 80px;
  height: 80px;
  background: rgba(73, 55, 234, 1);
  border-radius: 8px;
  border: 0;
  line-height: 30px;
}
</style>