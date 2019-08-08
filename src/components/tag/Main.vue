<template>
  <!-- 标签管理操作界面 -->
  <section class="tag-main">
    <div class="tag-main__top">
      <!-- 头部 分组list start -->
      <ul class="tag-main__group">
        <li
          v-for="(item, index) in groupList"
          :key="index"
          :class="activeGroup == item.id ? 'active': ''"
          @click="onChangeGroup(item)"
        >{{ item.groupNameEn }}</li>
      </ul>
      <!-- 
        功能：分组管理
        权限：
          1、超级管理员、区域管理、项目经理
       -->
      <el-button
        v-if="userInfo.userRole != $global.userRole.member && userInfo.userRole != $global.userRole.customer"
        type="primary"
        @click="groupManageDialogVisible=true;"
      >{{ $t("tag.btn.groupMange") }}</el-button>
      <!-- 头部 分组list end -->
    </div>
    <div class="tag-main__content">
      <div class="tag-main__operate">
        <div class="tag-main__operate-top">
          <!-- 添加标签 start -->
          <template v-if="(type == 'project' && userInfo.userRole != $global.userRole.member) || type == 'target'">
            <el-input
              v-if="pagination.total < 20"
              class="add-input"
              :placeholder="$t('tag.addTagPlaceholder')"
              v-model="addTagName"
            >
              <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="addTag"></i>
            </el-input>
          </template>
          
          <!-- 添加标签 end -->
          <!-- 操作选择 start -->
          <el-button :style="pagination.total >= 20 ? `margin-left: auto`: null" v-if="tagRename && tagRename.id" type="primary" size="mini" @click="onConfirmTagRename">{{ $t("tag.btn.ok") }}</el-button>
          <div v-else :style="`display: relative; ${pagination.total >= 20 ? `margin-left: auto` : null }`">
            <span style="color: #4937EA; cursor: pointer;" @click="isShowOperateMenu=true;">
              {{ $t('tag.operate') }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <div
              style="position: absolute; background-color: white; z-index: 99;"
              @mouseleave="isShowOperateMenu = false;"
            >
              <el-cascader-panel
                v-if="isShowOperateMenu"
                :options="operateList"
                :props="{expandTrigger: 'click'}"
                @change="onChangeOperate"
              ></el-cascader-panel>
            </div>
          </div>
          <!-- 操作选择 start -->
        </div>
        <!-- 标签 list -->
        <ul class="tag-main__tag-list">
          <template v-for="(item, index) in tagList">
            <!-- 重命名的输入框 -->
            <el-input v-if="tagRename.id == item.id && tagRename.name" class="tag-rename-input" :key="index" v-model="tagRename.name"></el-input>
            <li v-else
                :key="index"
                :class="[activeTag == item.id ? 'active-tag' : '']"
                @click="onChangeTag(item)"
              >{{ item.labelNameZh }}
            </li>
          </template>
          <template v-if="tagList.length == 0">
            <div style="line-height: 100px;">
              {{ $t("public.tips.noData") }}
            </div>
          </template>
        </ul>
        <!-- 标签 list -->
        <!-- 分页 start -->
        <div v-if="pagination.allPage > 1" class="tag-main__page">
          <span v-if="pagination.pageNum > 1" @click="onPrePage">
            <i class="el-icon-caret-left"></i>
            {{ $t("public.page.prePage") }}
          </span>
          <span v-if="pagination.pageNum < pagination.allPage" @click="onNextPage">
            {{ $t("public.page.nextPage") }}
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
        <!-- 分页 end -->
      </div>
      
      <div style="flex: 5">
        <div class="tag-main__items">
          <template v-for="(item, index) in companyList">
            <ItemProject v-if="type == 'project'" :data="item" :key="index"></ItemProject>
            <ItemTarget v-else :data="item" :key="index"></ItemTarget>
          </template>
        </div>
        <el-pagination
          v-if="companyPage.total > companyPage.pageSize * companyPage.pageNum"
          style="text-align: center; margin-top: 20px;"
          :background="true"
          layout="prev, pager, next"
          :total="companyPage.total"
        ></el-pagination>
      </div>
    </div>

    <!-- 分组管理 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('tag.groupTitle')"
      :visible.sync="groupManageDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-scrollbar>
        <Group :data="groupList" :type="type" @onConfirmGroup="groupManageDialogVisible=false; getGroup()"></Group>
      </el-scrollbar>
    </el-dialog>
    <!-- 分组管理 dialog end -->
  </section>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  props: {
    /**
     *  project: 项目公司
     *  target: 目标公司
     */
    type: {
      type: String,
      default() {
        return "project";
      }
    }
  },
  components: {
    Group: () => import("@/components/tag/Group.vue"),
    ItemProject: () => import("@/components/tag/ItemProject.vue"),
    ItemTarget: () => import("@/components/tag/ItemTarget.vue")
  },
  data() {
    return {
      groupManageDialogVisible: false,
      groupList: [],
      tagList: [],
      companyList: [],
      activeGroup: null,
      activeTag: null,
      // 当前选中的标签的添加人， 删除标签权限需要
      currentTagAddUser: null,
      addTagName: "",
      isShowOperateMenu: false,
      tagRename: {name: "", id: ""},
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        allPage: 1
      },
      companyPage: {
        pageSize: 25,
        pageNum: 1,
        total: 0
      }
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"]),
    operateList: {
      get: function() {
        return [
          /**
           * 功能: 标签移动分组
           * 权限：
           *  1、超级管理员、区域经理、项目经理
           *  
           */
          {
            value: "move",
            label: this.$t("tag.operateList[0]"),
            disabled: (this.userInfo.userRole == this.$global.userRole.customer || this.userInfo.userRole == this.$global.userRole.member),
            children: []
          },
          /**
           * 功能： 标签重命名
           * 权限：
           *  1、区域经理
           *  2、超级管理员
           */
          {
            value: "rename",
            label: this.$t("tag.operateList[1]"),
            disabled: ![this.$global.userRole.superAdministrator, this.$global.userRole.regionalManager].includes(this.userInfo.userRole)
          },
          /**
           *  功能：标签删除
           *  权限：
           *   1、成员只能删除自己添加的
           *   2、超级管理员、区域经理、项目经理可以随意
           *  
           *  参见 onChangeTag 方法里面的 disabled 属性
           */
          {
            value: "delete",
            label: this.$t("tag.operateList[2]")
          }
        ];
      },
      set: function(newVal) {
        return newVal;
      }
    }
  },
  methods: {
    /**
     *  获取分组
     */
    getGroup() {
      let uri = '/customer/item/label/group/withoutpaginglist';
      if(this.type == 'target') {
        uri = '/target/label/group/withoutpaginglist';
      }
      this.$http.post(uri, { groupStatus: 1 }).then(res => {
        if (res.iworkuCode == 200) {
          this.groupList = res.datas;
          // 默认选中第一个
          this.groupList.length > 0 ? (this.activeGroup ? null : this.activeGroup = this.groupList[0].id) : null;
          
          this.appendOperateGroup();
          // 获取标签
          this.getTag();
        } 
      });
    },
    appendOperateGroup() {
      // 移动分组处理
      let operateChild = [];
      this.groupList.map(val => {
        operateChild.push({
          value: val.id,
          label: val.groupNameZh,
          disabled: this.activeGroup == val.id
        });
      });
      this.operateList[0].children = operateChild;
    },
    /**
     *  根据分组，获取标签
     */
    getTag() {
      let uri = '/customer/item/label/withpaginglist';
      if (this.type == 'target') {
        uri = '/target/label/withpaginglist';
      }
      this.$http.post(uri, {
        keyWord: '',
        labelGroupId: this.activeGroup,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.tagList = res.datas;
          this.pagination.total = res.total;
          this.pagination.allPage = res.pages;
          res.datas.length > 0 ? (this.activeTag ? null : this.onChangeTag(res.datas[0])) : null;
        }
      });
    },
    /**
     *  根据标签查询哪些公司在使用
     */
    getCompany() {
      if (!this.activeTag) {
        return false;
      }
      let uri = '/customer/item/withpaginglist';
      let params = {};
      if (this.type == 'project') {
        params = {
          itemLabelId: this.activeTag
        };
      } else if (this.type == 'target') {
        uri = '/target/company/label/withpaginglist';
        params = {
          labelId: this.activeTag
        };
      }
      this.$http.post(uri, {...params, ...{pageSize: this.companyPage.pageSize, pageNum: this.companyPage.pageNum}}).then(res => {
        if (res.iworkuCode == 200) {
          this.companyList = res.datas;
          if (this.companyList.length < this.companyPage.pageSize) {
            let count = this.companyPage.pageSize - this.companyList.length;
            for (let i = 0; i < count; i++) {
              this.companyList.push({});
            }
          }
          this.companyPage.total = res.total;
        }
      });
    },
    /**
     *  切换分组
     */
    onChangeGroup(item) {
      this.activeGroup = item.id;
      this.activeTag = "";
      this.pagination.pageNum = 1;
      this.companyList = [];
      for (let i = 0; i < this.companyPage.pageSize; i++) {
        this.companyList.push({});
      }
      this.getTag();
      this.appendOperateGroup();
    },
    /**
     *  切换标签
     */
    onChangeTag(item) {
      this.activeTag = item.id;
      // 权限设置
      this.operateList[2].disabled = !((item.addUserId == this.userInfo.id && this.userInfo.userRole == this.$global.userRole.member) ||
                                        ([this.$global.userRole.superAdministrator, this.$global.userRole.regionalManager, this.$global.userRole.projectManager].includes(this.userInfo.userRole)));
      this.companyPage.pageNum = 1;
      // 查看引用当前标签的公司
      this.getCompany();
    },
    /**
     *  添加标签, 不能超过20个
     */
    addTag() {
      if (!this.addTagName || this.tagList.length >= 20) {
        return false;
      }
      let params = {
        labelNameZh: this.addTagName,
        labelNameEn: this.addTagName,
        labelGroupId: this.activeGroup
      };
      let uri = '/customer/item/label/save';
      if (this.type == 'target') {
        uri = '/target/label/save';
      }
      this.$http.post(uri, params).then(res => {
        if (res.iworkuCode == 200) {
          this.tagList.unshift({...params, ...{id: res.datas}});
          this.activeTag = res.datas;
          // 如果一页中的标签多于10条，那么就删除最后一条
          if (this.tagList.length > 10) {
            this.tagList.pop();
          }
          this.$imessage({
            content: this.$t("public.tips.success"),
            type: "success"
          });
          this.addTagName = "";
        }
      });
    },
    /**
     *  切换操作菜单
     */
    onChangeOperate(item) {
      if (!this.activeTag) {
        return false;
      }
      switch (item[0]) {
        case 'move':
           // 标签移动
           this.moveTag(item);
           break;
        case 'rename':
            // 标签重命名
            let res = this.tagList.find(val => val.id == this.activeTag);
            if (res) {
              this.tagRename.name = res.labelNameZh;
              this.tagRename.id = res.id;
            }
            break;
        case 'delete':
            if (!this.activeTag) {
              return false;
            }
            res = this.tagList.find(val => val.id == this.activeTag);
              // 标签删除
              this.$confirm(
                `<i class="el-icon-question" style="color: #E50054; font-size: 48px;"></i><br/>${this.$t("tag.deleteTagTip.content")}`,
                this.$t("tag.deleteTagTip.title"),
                {
                  confirmButtonText: this.$t("tag.deleteTagTip.btn.ok"),
                  cancelButtonText: this.$t("tag.deleteTagTip.btn.cancel"),
                  confirmButtonClass: "iworku-confirm-button",
                  cancelButtonClass: "iworku-confirm-cancel-button",
                  center: true,
                  dangerouslyUseHTMLString: true
                }
              ).then(() => {
                // 确定删除
                this.deleteTag();
              }).catch(() =>{});
            break;
      }
      this.isShowOperateMenu = false;
    },
    /**
     *  确定修改标签名称
     */
    onConfirmTagRename() {
      let index = this.tagList.findIndex(val => val.id == this.tagRename.id);
      if (index > -1) {
        let uri = '/customer/item/label/update'
        if (this.type == 'target') {
          uri = '/target/label/update';
        }
        this.$http.post(uri, {
          id: this.tagList[index].id,
          labelNameZh: this.tagRename.name,
          labelNameEn: this.tagRename.name
        }).then(res => {
          if (res.iworkuCode == 200) {
            this.tagList[index].labelNameZh = this.tagRename.name;
            this.tagList[index].labelNameEn = this.tagRename.name;
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
            // 清空
            this.tagRename = {name: "", id: ""};
          }
        });
      }
    },
    /**
     *  删除标签
     */
    deleteTag() {
      let uri = '/customer/item/label/update';
      if (this.type == 'target') {
        uri = '/target/label/update';
      }
      this.$http.post(uri, { id: this.activeTag, labelStatus: 2 }).then(res => {
        if (res.iworkuCode == 200) {
          let index = this.tagList.findIndex(val => val.id == this.activeTag);
          this.tagList.splice(index, 1);
          this.activeTag = this.tagList[0].id;
        }
      });
    },
    /**
     *  移动标签
     */
    moveTag(item) {
      if (!item || !item[1]) return false;
      let uri = '/customer/item/label/update';
      if (this.type == 'target') {
        uri = '/target/label/update';
      }
      this.$http.post(uri, {id: this.activeTag, labelGroupId: item[1]}).then(res => {
        if (res.iworkuCode == 200) {
          let index = this.tagList.findIndex(val => val.id == this.activeTag);
          this.tagList.splice(index, 1);
          this.activeTag = this.tagList[0].id;
        }
      });
    },
    /**
     *  下一页
     */
    onNextPage() {
      this.pagination.pageNum++;
      this.pagination.pageNum > this.pagination.allPage ? this.pagination.pageNum = this.pagination.allPage : null;
      this.getTag();
    },
    /**
     *  上一页
     */
    onPrePage() {
      this.pagination.pageNum--;
      this.pagination.pageNum < 1 ? this.pagination.pageNum = 1 : null;
      this.getTag();
    }
  },
  watch: {
    type: {
      handler(newVal, oldVal) {
        this.getGroup();
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-main {
  &__top {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
  &__group {
    margin-right: 0.2rem;
    width: 100%;
    display: flex;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
    li {
      padding: 15px 20px;
      cursor: pointer;
    }
    .active {
      color: #4937ea;
    }
  }

  &__content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  &__operate {
    flex: 1;
    margin-right: 0.15rem;
    background-color: white;
    border-radius: $--default-border-radius;
    &-top {
      width: 90%;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-icon-circle-plus {
        color: #e50054;
        font-size: 30px;
        cursor: pointer;
      }
      .add-input {
        width: 70%;
      }
    }
  }
  &__tag-list {
    text-align: center;
    padding-bottom: 20px;
    li {
      width: 80%;
      margin: 10px auto;
      padding: 10px 0;
      cursor: pointer;
    }
    li:hover,
    .active-tag {
      background-color: #8d43ff;
      color: white;
      border-radius: 30px;
      transition: background-color 0s cubic-bezier(1, -0.03, 1, 0.28) 0s;
    }
  }

  &__page {
    margin-bottom: 20px;
    text-align: center;
    color: $--default-color;
    span {
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.add-input {
  .el-input__inner {
    border-radius: 19px;
    background-color: #ebeaee;
    border: 1px solid #bbbbbb;
  }
}
.tag-main__operate-input {
  .el-input__inner {
    border: none;
    width: 80px;
    color: #4937ea;
  }
}
.tag-rename-input {
  .el-input__inner {
    border-radius: 30px;
    width: 80%;
  }  
}
</style>
