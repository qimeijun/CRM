export default {
    head: {
        title: "全球本地化营销管理系统",
        account: "账号管理",
        logout: "退出",
        today: "今日工作"
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
            leaveMessage: "留言内容"
        },
        rules: {
            projectName: "请选择项目",
            type: "请选择日志类型",
            title: "请填写日志标题",
            leaveMessage: "留言内容不能为空"
        },
        diarType: {
            daily: "日报",
            weekly: "周报",
            monthly: "月报",
            order: "订单"
        },
        uploadChatLog: "上传图片",
        chatLog: "聊天记录",
        attachment: "附件(产品目录)",
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
            avatar: ["上传工作照", "工作照"],
            username: "姓名",
            usernameEn: "英文名",
            gender: "性别",
            telphone: "手机",
            email: "邮箱",
            country: "国家",
            city: "城市",
            role: "角色",
            team: "团队",
            region: "区域经理",
            account: "登录账号",
            password: "登录密码"
        },
        rules: {
            avatar: "请上传工作照",
            username: "请输入成员名称",
            email: "请输入成员邮箱",
            role: "请选择成员角色",
            team: "请选择团队",
            region: "请选择区域经理",
            account: ["请输入登录账号", "请输入正确的邮箱"],
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
            confirmAdd: "确认添加",
            reUpload: "重新上传"
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
        placeholder: {
            new: "密码不得少于8位字符，且不能有特殊符号",
            confirm: "密码不得少于8位字符，且不能有特殊符号"
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
        table: ["成员", "身份", "团队名称", "跟进项目", "私海客户", "添加时间", "操作"],
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
            modify: "编辑",
            handOver: "移交",
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
            confirm: "确认修改",
            add: "添加"
        }
    },
    public: {
        btn: {
            submit: "提交",
            cancel: "取消",
            upload: "上传附件",
            save: "保存"
        },
        dollar: "美元",
        role: {
            superAdministrator: "超级管理员",
            regionalManager: "区域经理",
            projectManager: "项目经理",
            member: "成员",
            customer: "客户"
        },
        tips: {
            success: "操作成功!",
            error: "操作失败，请稍后再试!",
            noData: "暂无数据"
        },
        page: {
            prePage: "上一页",
            nextPage: "下一页"
        }
    },
    workBench: {
        title: "工作台",
        btn: {
            addProject: "添加新项目"
        },
        briefreport: {
            title: "日程简报",
            loading:"加载中...",
            noMore:"没有更多了",
            btn: {
                all: "全部日志",
                submit: "提交日志"
            }

        },
        overview: {
            title: "项目概览",
            targetNum: "目标公司数",
            vlinkNum: "已拜访目标公司数",
            intentionNum: "意向目标公司数",
            orderNum: "取得订单数量",
            btn:"编辑"
        },
        variables: {
            title: "本月工作",
            dataX: ["第一周", "第二周", "第三周", "第四周"],
        },
        calendar: {
            title: "日程安排",
            btn: {
                redact: "编辑",
                delete: "删除",
            }
        },
        remind:{
            title:"日程提醒",
           add:"添加提醒",
           loading:"加载中...",
           noMore:"没有更多了",
           dialogTitle:"添加日程提醒",
           addPeople:"添加人"
        },
        addremind:{
            form:{
                date:"起止日期",
                remindTime:"提醒时间",
                email:"邮箱",
                target:"目标公司",
                people:"参与人员",

            },
            placeholder:{
                content:"请输入日程内容",
                startDate:"开始日期",
                endDate:"结束日期",
                remindTime:"是否提醒",
                email:"提醒内容和时间将发送至本邮箱",
                target:"请输入日程内容",
                people:"请输入日程内容",
            },
           save:"保存",
        }
    },
    tag: {
        title: "标签管理",
        groupTitle: "分组管理",
        project: "项目标签",
        target: "目标公司标签",
        add: "添加标签",
        btn: {
            add: "新增标签",
            confirm: "确定",
            groupMange: "分组管理",
            delete: "删除",
            addGroup: "新增分组",
            ok: "完成"
        },
        deleteTagTip: {
            title: "提示",
            content: "您确定要删除此标签吗?",
            btn: {
                ok: "确定",
                cancel: "取消"
            }
        },
        operate: "操作",
        operateList: ["移动至分组", "重命名", "删除"],
        addGroupTip: {
            title: "提示",
            content: ["无法新增", "目前您的分组已到达最多数量，请点击管理分组进行管理！"]
        },
        deleteTips: "已有标签分组将无法删除，请将标签删除或移至其他分组再删除",
        nextPage: "下一页",
        addTagPlaceholder: "添加新标签"
    },
    setting: {
        title: ["个人资料", "修改密码"],
        form: {
            companyName: "公司名称",
            companyShortName: "公司简称",
            telphone: "联系电话",
            email: "邮箱",
            country: "国家",
            account: ["账号", "暂时无法修改"]
        },
        rules: {
            companyName: "请输入公司名称",
            companyShortName: "请输入公司简称"
        },
        btn: {
            save: "保存"
        }
    },
    highseas: {
        title: "公海管理",
        placeholder: {
            seek: "搜索目标公司名称、ID、地址、关键人",
            country: "请选择国家",
            sort: "请选择分类",
            tag: "请选择标签"
        },
        table: {
            target: "目标公司",
            importance: "重要程度",
            updatedate: "更新时间",
            projectNum: "已分项目数",
            whenCreated: "创建时间",
            orderNum: "成单量",
            operate: "操作",
            details: "查看详情"
        }
    },
    project: {
        title: "项目管理",
        add: "添加新项目",
        allot:"分配",
        invalid:"作废",
        transfer:"移交",
        intoSea:"移入公海",
        view:"查看详情",
        placeholder: {
            seek: "搜索项目名称、地址",
            tag: "选择标签",
            projectTitle: "请输入项目名称",
            companyName: "请输入企业名称",
            tmt: "请选择行业",
            site: "请输入地址",
            url: "Https://",
            email: "请输入电子邮箱",
            intro:"请输入公司简介",
            strength: "请说明优势",
            productName: "请输入产品名称",
            describe: "请输入产品描述",
        },
        from: {
            firstTitle: "添加项目",
            secondTitle: "项目资料",
            thirdlyTitle: "产品资料",
            account: "登录账号",
            password: "登录密码",
            projectTitle: "项目名称",
            companyName: "企业名称",
            tmt: "行业",
            site: "地址",
            url: "网址",
            email: "电子邮箱",
            intro:"公司简介",
            strength: "优势",
            productName: "产品名称",
            productImg: "产品图片",
            productVideo: "产品视频",
            accessory: "附件(产品目录)",
            study: "学习资料"
        },
        btn: {
            uploadImg: "上传图片",
            uploadVideo: "上传视频",
            uploadAccessory: "上传附件",
            perfect: "完善资料",
            continue: "继续完善",
            ok: "完成",
            edit:"编辑"
        },
        tableHeader:["ID","项目名称","状态","管理员","标签","进行天数","添加时间","操作"]
    },
    projectInfo:{
        title:"项目详情",
        endProject:"结束项目",
        menu:["资料","产品","公海客户","成员私海","工作日志"],
        member:{
            title:"工作成员",
            add:"添加成员",
            target:["目标公司","家"],
            time:["进行时间","天"]
        },
        commonality:{
            tableHeader:["目标公司","重要程度","更新时间","状态","创建时间","资料完整度","操作"]
        },
        importTarget:{
            add:"新增目标公司",
            import:"导入目标公司",
            textTip:["按导入模板，填写表格","表格大小控制在 5M 以内","目标公司正在导入中，请耐心等待···"],
            uploadBtn:["点击上传","重新上传","一键导入"],
            dialogTitle:"提示",
            noimport:"不导入",
            coverage:"覆盖"
        },
        tag:{
            title:"标签",
            detele:"删除",
            ok:"完成",
            dialogTitle:"添加标签"
        },
        product:{
            accessory:"附件(产品目录)",
            study:"学习资料",
            view:"编辑"
        }
    },
    notice: {
        menu: ["全部通知", "项目公司", "目标公司", "成员", "日志", "系统"],
        box: "消息盒子",
        read: "全部已读",
        checkAll: "查看全部"
    },
    login: {
        title: "登录",
        placeholder: {
            email: "请输入邮箱账号",
            password: "请输入您的密码"
        },
        rules: {
            email: "请输入邮箱账号",
            password: "请输入您的密码"
        },
        autoLogin: "7天内自动登录",
        link: ["联系我们", "关于我们"],
        ownership: "© 2019 IWORKU CO., LTD，保留所有权利",
        btn: "登录"
    },
    target:{
        title:"目标公司详情",
        menu:["资料","调研报告","工作日志","所在项目"],
        form:{
            companyTitle:"公司信息",
            keymenTitle:"关键人",
            otherTitle:"其他",
            companyName:"公司名称",
            country:"国家",
            site:"地址",
            url:"网址",
            phone:"电话",
            keymenName:"姓名",
            position:"职位",
            keymenPhone:"关键人电话",
            email:"电子邮件",
            social:"社交账户",
            source:"客户来源",
            clientType:"客户类型",
            purchaseScale:"预计采购",
            hsCode:"海关编码",
            importance:"重要程度",
            introduce:"介绍",
            remark:"备注",
            btn:"完成"
        },
        info:{
            companyTitle:"目标公司资料",
            keymenTitle:"关键人信息",
            otherTitle:"其他",
            overviewTitle:"目标公司概览",
            companyName:"公司名称",
            country:"国家",
            site:"地址",
            url:"网址",
            phone:"联系电话",
            keymenName:"关键人",
            position:"职位",
            keymenPhone:"联系电话",
            email:"邮件",
            social:"社交账户",
            source:"客户来源",
            clientType:"客户类型",
            purchaseScale:"预计采购规模",
            hsCode:"海关编码",
            importance:"重要程度",
            introduce:"介绍",
            remark:"备注",
            btn:"编辑",
        },
        next:"下一步",
        finish:"完成添加",
        probe:{
            upload:"上传报告",
            update:"修改报告",
            delete:"删除",
            title:"调研报告",
            textTip:["按上传模板，填写表格","表格大小控制在 5M 以内","目标公司正在导入中，请耐心等待···"],
            uploadBtn:["点击上传","重新上传","开始上传"],
            dialogTitle:"提示"  
        },
        loca:{
            tableHeader:["ID","项目名称","状态","管理员","标签","进行天数","添加时间","操作"],
            view:"查看详情"
        }
    }
}