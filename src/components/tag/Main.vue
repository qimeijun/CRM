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
      <el-button
        type="primary"
        @click="groupManageDialogVisible=true;"
      >{{ $t("tag.btn.groupMange") }}</el-button>
      <!-- 头部 分组list end -->
    </div>
    <div class="tag-main__content">
      <div class="tag-main__operate">
        <div class="tag-main__operate-top">
          <!-- 添加标签 start -->
          <el-input
            class="add-input"
            :placeholder="$t('tag.addTagPlaceholder')"
            v-model="addTagName"
          >
            <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="addTag"></i>
          </el-input>
          <!-- 添加标签 end -->
          <!-- 操作选择 start -->
          <el-button v-if="tagRename && tagRename.id" type="primary" size="mini" @click="onConfirmTagRename">{{ $t("tag.btn.ok") }}</el-button>
          <div v-else style="display: relative;">
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
        </ul>
        <!-- 标签 list -->
        <!-- 分页 start -->
        <div v-if="pagination.total > pagination.pageSize * pagination.pageNum" class="tag-main__page">
          <span >
            <i class="el-icon-caret-left"></i>
            上一页
          </span>
          <span>
            下一页
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
        <!-- 分页 end -->
      </div>
      <div style="flex: 5">
        <div class="tag-main__items">
          <template v-for="index in 27">
            <ItemProject v-if="type == 'project'" :key="index"></ItemProject>
            <ItemTarget v-else :key="index"></ItemTarget>
          </template>
        </div>
        <el-pagination
          style="text-align: center; margin-top: 20px;"
          :background="true"
          layout="prev, pager, next"
          :total="1000"
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
      width="30%"
    >
      <el-scrollbar>
        <Group :data="groupList"></Group>
      </el-scrollbar>
    </el-dialog>
    <!-- 分组管理 dialog end -->
  </section>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default() {
        return "";
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
      groupList: [
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          value: "1",
          label: "分组一",
          id: "1"
        },
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "2",
          value: "2",
          label: "分组二"
        },
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "3",
          value: "3",
          label: "分组三"
        },
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "4",
          value: "4",
          label: "分组四"
        }
      ],
      tagList: [
        {
          labelNameZh: "标签一",
          labelNameEn: "标签一",
          id: 1
        },
        {
          labelNameZh: "标签二",
          labelNameEn: "标签二",
          id: 2
        },
        {
          labelNameZh: "标签三",
          labelNameEn: "标签三",
          id: 3
        },
        {
          labelNameZh: "标签四",
          labelNameEn: "标签四",
          id: 4
        },
        {
          labelNameZh: "标签五",
          labelNameEn: "标签五",
          id: 5
        },
        {
          labelNameZh: "标签六",
          labelNameEn: "标签六",
          id: 6
        },
        {
          labelNameZh: "标签七",
          labelNameEn: "标签七",
          id: 7
        }
      ],
      activeGroup: "1",
      activeTag: 1,
      addTagName: "",
      isShowOperateMenu: false,
      tagRename: {name: "", id: ""},
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 20
      }
    };
  },
  computed: {
    operateList: {
      get: function() {
        return [
          {
            value: "move",
            label: this.$t("tag.operateList[0]"),
            children: this.groupList
          },
          {
            value: "rename",
            label: this.$t("tag.operateList[1]")
          },
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
     *  切换分组
     */
    onChangeGroup(item) {
      this.activeGroup = item.id;
    },
    /**
     *  切换标签
     */
    onChangeTag(item) {
      this.activeTag = item.id;
    },
    /**
     *  点击操作
     */
    onHandleCommand(command) {},
    /**
     *  添加标签, 不能超过20个
     */
    addTag() {
      if (this.addTagName) {
        this.tagList.push({
          labelNameZh: this.addTagName,
          labelNameEn: this.addTagName,
          id: Math.floor(Math.random() * 100)
        });
        this.addTagName = "";
      }
    },
    /**
     *  切换操作菜单
     */
    onChangeOperate(item) {
      switch (item[0]) {
        case 'move':
           // 标签移动
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
              let index = this.tagList.findIndex(val => val.id == this.activeTag);
              this.tagList.splice(index, 1);
              this.activeTag = this.tagList[0].id;
            });
            break;
      }
      this.isShowOperateMenu = false;
    },
    /**
     *  确定修改标签名称
     */
    onConfirmTagRename() {
      let res = this.tagList.find(val => val.id == this.tagRename.id);
      if (res) {
        res.labelNameZh = this.tagRename.name;
        res.labelNameEn = this.tagRename.name;
      }
      this.tagRename = {name: "", id: ""};
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
        width: 80%;
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
      border-radius: 15px;
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
