<template>
  <!-- 标签管理操作界面 -->
  <section class="tag-main">
    <div class="tag-main__top">
      <ul class="tag-main__group">
        <li v-for="(item, index) in groupList" :key="index" :class="activeGroup == item.id ? 'active': ''" @click="onChangeGroup(item)">{{ item.groupNameEn }}</li>
      </ul>
      <el-button
        type="primary"
        @click="groupManageDialogVisible=true;"
      >{{ $t("tag.btn.groupMange") }}</el-button>
    </div>
    <div class="tag-main__content">
      <div class="tag-main__operate">
        <div class="tag-main__operate-top">
           <el-input
            class="add-input"
            :placeholder="$t('tag.addTagPlaceholder')"
            v-model="addTagName">
            <i slot="suffix" class="el-input__icon el-icon-circle-plus" @click="addTag"></i>
          </el-input>
          
          <el-cascader
            class="tag-main__operate-input"
            :placeholder="$t('tag.operate')"
            @change="onChangeOperate"
            :options="operateList" props.expandTrigger="click"></el-cascader>
        </div>
        <!-- 标签 list -->
        <ul class="tag-main__tag-list">
          <li v-for="(item, index) in 20" :key="index" :class="[activeTag == item ? 'active-tag' : '']" @click="onChangeTag(item)">标签{{ item }}</li>
        </ul>
        <!-- 标签 list -->
      </div>
      <div class="tag-main__items">
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
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
  components: {
    Group: () => import("@/components/tag/Group.vue"),
    Item: () => import("@/components/tag/Item.vue")
  },
  data() {
    return {
      groupManageDialogVisible: false,
      groupList: [
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "1"
        },
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "2"
        },
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "3"
        },
        {
          groupNameEn: "分组一",
          groupNameZh: "分组一",
          id: "4"
        }
      ],
      activeGroup: '1',
      activeTag: 1,
      addTagName: ""
    };
  },
  computed: {
    operateList: {
      get: function() {
        return [{
          value: '1',
          label: this.$t("tag.operateList[0]"),
          children: this.groupList
        },
        {
          value: '2',
          label: this.$t("tag.operateList[1]"),
        },
        {
          value: '3',
          label: this.$t("tag.operateList[2]"),
        }]
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
      this.activeTag = item;
    },
    /**
     *  点击操作
     */
    onHandleCommand(command) {

    },
    /**
     *  添加标签
     */
    addTag() {},
    onChangeOperate(item) {
      console.log(item);
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
      color: #4937EA;
    }
  }

  &__content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__items {
    flex: 5;
    display: flex;
    flex-wrap: wrap;
  }

  &__operate {
    flex: 1;
    margin-right: .15rem;
    background-color: white;
    border-radius: $--default-border-radius;
    &-top {
      width: 90%;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-icon-circle-plus {
        color: #E50054;
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
    li {
      width: 80%;
      margin: 10px auto;
      padding: 10px 0;
      cursor: pointer;
    }
    li:hover, .active-tag {
      background-color: #8D43FF;
      color: white;
      border-radius: 15px;
      transition: background-color 0s cubic-bezier(1,-0.03,1,.28) 0s;
    }
  }
}
</style>
<style lang="scss">
.add-input {
  .el-input__inner {
    border-radius:19px;
    background-color: #EBEAEE;
    border: 1px solid #BBBBBB;
  }
}
.tag-main__operate-input {
  .el-input__inner {
    border: none;
    width: 90px;
    color: #4937EA;
  }
}
</style>
