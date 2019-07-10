export default {
    head: {
        title: "全球本地化营销管理系统"
    },
    workDiary: {
        title: "日志",
        modify: "编辑日志",
        add: "添加日志",
        form: {
            projectName: "项目名称",
            type: "类型",
            targetCompany: "目标公司",
            title: "标题",
            description: "工作描述",
            chatLog: "聊天记录",
            attachment: "附件"
        },
        rules: {
            projectName: "请选择项目",
            type: "请选择日志类型",
            title: "请填写日志标题",
        },
        diarType: {
            daily: "日报",
            weekly: "周报",
            monthly: "月报",
            order: "订单"
        },
        uploadChatLog: "上传图片"
    },
    member: {
        add: "添加新成员",
        regional: "区域成员",
        form: {
            avatar: "上传工作照",
            username: "姓名",
            usernameEn: "英文名",
            gender: "性别",
            telphone: "手机",
            email: "邮箱",
            country: "国家",
            city: "城市",
            role: "角色",
            team: "团队",
            region: "区域经理"
        },
        rules: {
            avatar: "请上传工作照",
            username: "请输入成员名称",
            email: "请输入成员邮箱",
            role: "请选择成员角色",
            team: "请选择团队",
            region: "请选择区域经理"
        },
        gender: {
            male: "男",
            female: "女"
        },
        btn: {
            regional: "区域经理管理",
            addRegional: "添加区域经理",
            ok: "完成"
        }
    },
    changeAdministration: {
        title: "更改管理员",
        search: "输入管理员名称",
        btn: {
            change: "更改"
        }
    },
    password: {
        modify: "修改密码",
        form: {
            new: "新密码",
            confirm: "再次输入"
        },
        rules: {
            new: ["请输入新密码", "输入的密码不能低于8位数"],
            confirm: ["请输入确认密码", "两次密码不一致，请重新输入"]
        },
        btn: {
            cancel: "完成修改"
        }
    },
    selectRegionalManager: {
        title: "添加区域经理",
        placeholder: "请选择区域经理"
    },
    memberManagement: {
        title: "成员管理",
        table: ["成员", "身份", "团队名称", "跟进项目", "目标公司", "添加时间", "操作"],
        operate: ["查看信息", "移交管理员", "删除"],
        btn: {
            addMember: "添加新成员",
            ok: "完成"
        },
        searchInput: "搜索成员、团队名称",
        regionalManagement: "区域经理管理",
        deleteTip: {
            title: "提示",
            content: ["您确定要删除该成员吗？", "无法删除", "此成员尚有目标公司正在跟进，请移交任务再删除！"],
            btn: ["确定", "取消"]
        }
    },
    memberInfo: {
        menu: ["资料", "团队", "项目", "私海客户", "工作日志"],
        priviteTable: ["目标公司", "重要程度", "更新时间", "状态", "创建时间", "操作"],
        projectTable: ["公司名称", "状态", "管理员", "标签", "进行时间", "添加时间", "操作"],
        btn: {
            shiftIn: "移入公海",
            shiftOut: "移出",
            modify: "编辑",
            password: "修改密码",
            addDiary: "添加工作日志"
        },
        priviteShiftInTip: {
            title: "提示",
            content: ["您确定要将目标公司移入公海吗？", "该目标公司正在跟进中，您确定要移入公海吗？"]
        },
        memberShiftOutTip: {
            title: "提示",
            btn: ["确定", "取消", "移交任务"],
            content: ["你确定要将此成员移出项目吗？", "无法移出!", "此成员尚有目标公司正在跟进，请移交任务在移出!", "此成员为项目经理，移出前必须分配新的项目经理!"]
        },
        operate: "操作",
        teamOperate: ["编辑团队", "移交团队", "冻结团队"],
        noTeam: "暂无团队",
        account: "账号",
        password: "密码",
        workDiaryMenu: ["全部日志", "项目日志", "目标公司日志"]
    },

    public: {
        btn: {
            submit: "提交",
            cancel: "取消",
            upload: "上传附件"
        }
    }
}