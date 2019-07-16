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
            attachment: "附件",
            leaveMessage: "留言内容",
            orderNo: "订单编号",
            orderName: "产品名称",
            orderNum: "数量",
            orderPrice: "金额",
            orderDescription: "订单描述"
        },
        rules: {
            projectName: "请选择项目",
            type: "请选择日志类型",
            title: "请填写日志标题",
            leaveMessage: "请输入留言内容",
            orderDescription: "请输入订单描述"
        },
        diarType: {
            daily: "日报",
            weekly: "周报",
            monthly: "月报",
            order: "订单"
        },
        uploadChatLog: "上传图片",
        attachment: "附件(产品目录)",
        chatLog: "聊天记录",
        operate: "操作",
        btn: {
            translate: "翻译",
            leaveMessage: "留言",
            modifyDiary: "编辑日志",
            leaveMessageNow: "立即留言",
            delete: "删除日志",
            reply: "回复"
        },
        order: {
            no: "订单编号",
            total: "订单总量",
            price: "订单金额",
            description: "订单描述"
        }
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
            role: "角色",
            team: "团队",
            account: "登录账号",
            password: "登录密码"
        },
        rules: {
            avatar: "请上传工作照",
            username: "请输入成员名称",
            email: "请输入成员邮箱",
            role: "请选择成员角色",
            team: "请选择团队",
            account: "请输入登录账号",
            password: ["请输入登录密码", "密码不能少于八位数，且不能有特殊字符"],
            gender: "请选择成员角色"
        },
        placeholder: {
            account: "请输入邮箱",
            username: "请输入成员的姓名",
            usernameEn: "请输入成员的英文名",
            gender: "请选择成员的性别",
            email: "请输入成员的电子邮箱",
            telphone: "请输入成员的手机号码",
            role: "请选择成员的级别",
            search: "搜索目标公司名称、ID、地址、关键人"
        },
        gender: {
            male: "男",
            female: "女"
        },
        btn: {
            regional: "区域经理管理",
            addRegional: "添加区域经理",
            ok: "完成",
            fillInformation: "填写资料",
            confirmAdd: "确认添加"
        },
        dialogMenu: {
            account: "账号设置",
            information: "成员信息"
        }
    },
    changeAdministrator: {
        title: "更改管理员",
        search: "输入管理员名称",
        btn: {
            handOver: "移交",
            add: "分配",
            addMember: "新增项目经理"
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
        menu: ["资料", "团队", "跟进项目", "私海客户", "工作日志"],
        priviteTable: ["目标公司", "重要程度", "更新时间", "状态", "创建时间", "资料完整度", "操作"],
        projectTable: ["项目名称", "状态", "管理员", "标签", "进行天数", "添加时间", "操作"],
        btn: {
            shiftIn: "移入公海",
            shiftOut: "移出",
            handOver: "移交",
            modify: "编辑",
            password: "修改密码",
            shiftOutProject: "移出",
            addDiary: "添加工作日志"
        },
        priviteShiftInTip: {
            title: "提示",
            content: ["该目标公司正在跟进中，您确定要移入公海吗？"],
            btn: ["确定", "取消"]
        },
        memberShiftOutTip: {
            title: "提示",
            btn: ["确定", "取消", "移交任务", "移入公海"],
            content: ["你确定要将此成员移出项目吗？", "无法移出!", "此成员尚有目标公司正在跟进，请移交任务在移出!", "此成员为项目经理，移出前必须分配新的项目经理!"]
        },
        operate: "操作",
        teamOperate: ["编辑团队", "移交团队", "冻结团队"],
        teamMemberOperate: ["查看资料", "移交团队", "删除"],
        noTeam: "暂无团队",
        account: "账号",
        password: "密码",
        workDiaryMenu: ["全部日志", "项目日志", "目标公司日志"],
        statistics: ["任务概况", "本月业绩"],
        joinTime: "加入时间",
        handOverTeam: "移交",
        teamStatistics: ["所有成员业绩", '1V1业绩'],
        teamStatisticsTime: ["月份", "年份"],
        privateOperate: ["查看详情", "移入公海", "移交"]
    },
    team: {
        add: "添加团队",
        modify: "编辑团队",
        form: {
            name: "团队名称",
            country: "国家",
            color: "颜色"
        },
        rules: {
            name: "请输入团队名称",
            country: "请选择国家"
        },
        btn: {
            confirm: "确认修改"
        }
    },
    public: {
        btn: {
            submit: "提交",
            cancel: "取消",
            upload: "上传附件"
        },
        dollar: "美元"
    }
}