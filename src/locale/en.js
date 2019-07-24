export default {
    head: {
        title: "Global Localization Marketing Management System"
    },
    workDiary: {
        title: "Work Log",
        modify: "Edit Log",
        add: "Add Log",
        form: {
            projectName: "Project",
            type: "Type",
            targetCompany: "Target",
            title: "Title",
            description: "Work Description",
            chatLog: "Chat Record",
            attachment: "Attachment",
            leaveMessage: "Message Content",
            orderNo: "Order No",
            orderName: "Product Name",
            orderNum: "Number",
            orderPrice: "Price",
            orderDescription: "Order Description"
        },
        rules: {
            projectName: "Please select a project",
            type: "Please select the work log type",
            title: "Please input the title",
            leaveMessage: "Please input the message content",
            orderDescription: "Please input the order description"
        },
        diarType: {
            daily: "Daily",
            weekly: "Weekly",
            monthly: "Monthly",
            order: "Order"
        },
        uploadChatLog: "Upload",
        attachment: "Attachment(Product List)",
        chatLog: "Chat Record",
        operate: "Operate",
        btn: {
            translate: "Translate",
            leaveMessage: "Leave a Message",
            modifyDiary: "Edit Log",
            leaveMessageNow: "Leave a Message Now",
            delete: "Delete Log",
            reply: "Reply"
        },
        order: {
            no: "Order No",
            total: "Total Order",
            price: "Order Price",
            description: "Order Description"
        }
    },
    member: {
        add: "Add New Member",
        regional: "Regional Member",
        form: {
            avatar: ["Upload Work Photo", "Work Photo"],
            username: "Name",
            usernameEn: "English Name",
            gender: "Gender",
            telphone: "Mobile Phone",
            email: "Email",
            role: "Role",
            team: "Team",
            account: "Login Account",
            password: "Login Password",
            country: "Country"
        },
        rules: {
            avatar: "Please upload the work photo",
            username: "Please input a member name",
            email: "Please input a member email",
            role: "Please select a member role",
            team: "Please select a team",
            account: ["Please input a login account", "please input your vaild email"],
            password: ["Please input a login password", "Password cannot be less than eight digits and cannot have special characters"],
            gender: "Please select a member gender",
            country: "Please select a country"
        },
        placeholder: {
            account: "Please input a email",
            username: "Please input a member name",
            usernameEn: "Please input a member English name",
            gender: "Please select a member gender",
            email: "Please input a member email",
            telphone: "Please enter the member's mobile number",
            role: "Please select the level of the member",
            search: "Search target company name, ID, address, key person",
            country: "Please select a country"
        },
        gender: {
            male: "Male",
            female: "Female"
        },
        btn: {
            regional: "Regional Manager Management",
            addRegional: "Add Regional Manager",
            ok: "OK",
            fillInformation: "Fill In The Information",
            confirmAdd: "Confirm Add",
            reUpload: "Re-upload"
        },
        dialogMenu: {
            account: "Account Settings",
            information: "Member Information"
        }
    },
    changeAdministrator: {
        title: "Change Manager",
        search: "Input the administrator name",
        btn: {
            handOver: "Hand Over",
            add: "Assign",
            addMember: "New Project Manager"
        }
    },
    password: {
        modify: "Change Password",
        form: {
            new: "New Pasword",
            confirm: "Re-enter"
        },
        rules: {
            new: ["Please input a new password", "The entered password cannot be lower than 8 digits"],
            confirm: ["Please input a confirmation password", "The passwords are inconsistent twice, please re-enter"]
        },
        placeholder: {
            new: "Password must be at least 8 characters and cannot have special symbols",
            confirm: "Password must be at least 8 characters and cannot have special symbols"
        },
        btn: {
            cancel: "OK"
        }
    },
    selectRegionalManager: {
        title: "Add Regional Manager",
        placeholder: "Please select a regional manager"
    },
    memberManagement: {
        title: "Member Management",
        table: ["Member", "Role", "Team Name", "Follow Up Project", "Private", "Add Time", "Operate"],
        operate: ["View", "Handover Administrator ", "Delete"],
        btn: {
            addMember: "Add New Member",
            ok: "OK"
        },
        searchInput: "Search for members, team names",
        regionalManagement: "Regional Manager Management",
        deleteTip: {
            title: "Tip",
            content: ["Are you sure you want to delete this member?", "Unable to Delete", "This member still has the target company to follow up, please hand in the task and delete it!"],
            btn: ["OK", "Cancel"]
        }
    },
    memberInfo: {
        menu: ["Information", "Team", "Follow Up Project", "Private customer", "Work Log"],
        priviteTable: ["Tartget Company", "Importance", "Update Time", "Status", "Create Time", "Information Integrity", "Operate"],
        projectTable: ["Project Name", "Status", "Administrator", "Tag", "Number of days", "Add Time", "Operate"],
        btn: {
            shiftIn: "Move into the public",
            shiftOut: "Out",
            handOver: "Hand Over",
            modify: "Edit",
            password: "Edit Password",
            shiftOutProject: "Out",
            addDiary: "Add Work Log"
        },
        priviteShiftInTip: {
            title: "Tip",
            content: ["The target company is following up, are you sure you want to move to the public?"],
            btn: ["Ok", "Cancel"]
        },
        memberShiftOutTip: {
            title: "Tip",
            btn: ["Ok", "Cancel", "Handover Task", "Moved into the public"],
            content: ["Are you sure you want to move this member out of the project?", "Can't move out!", "This member still has the target company to follow up, please hand over the task and remove it.!", "This member is the project manager and must be assigned a new project manager before moving out.!"]
        },
        operate: "Operate",
        teamOperate: ["Edit Team", "Handover Team", "Freeze Team"],
        teamMemberOperate: ["View", "Handover Team", "Delete"],
        noTeam: "No Team",
        account: "Account",
        password: "Password",
        workDiaryMenu: ["All", "Project", "Target Company"],
        statistics: ["Task Overview", "This month's performance"],
        joinTime: "Join Time",
        handOverTeam: "Hand Over",
        teamStatistics: ["All Member Performance", '1V1 Performance'],
        teamStatisticsTime: ["Month", "Year"],
        privateOperate: ["View", "Move into the public", "Hand Over"]
    },
    team: {
        add: "Add Team",
        modify: "Edit Team",
        form: {
            name: "Team Name",
            country: "Country",
            color: "Color"
        },
        rules: {
            name: "Please input the team name",
            country: "Please select the country of the team"
        },
        btn: {
            confirm: "Confirm Modification",
            add: "Add"
        }
    },
    public: {
        btn: {
            submit: "Submit",
            cancel: "Cancel",
            upload: "Upload Attachment",
            save: "Save"
        },
        dollar: "Dollar",
        role: {
            superAdministrator: "Super Administrator",
            regionalManager: "Regional Manager",
            projectManager: "Project Manager",
            member: "Member",
            customer: "Customer"
        },
        tips: {
            success: "Successful!",
            error: "The operation failed, please try again later!",
            noData: "No Datas"
        },
        page: {
            prePage: "Previous Page",
            nextPage: "Next Page"
        }
    },
    workBench: {
        title: "工作台",
        btn: {
            addProject: "Add New Project"
        },
        briefreport: {
            title: "Briefing Schedule",
            loading: "加载中...",
            noMore: "没有更多了",
            btn: {
                all: "All Logs",
                submit: "Submit Log"
            }

        },
        overview: {
            title: "Project Overview",
            targetNum: "Target Company",
            vlinkNum: "Number of Target Companies Visited",
            intentionNum: "Intention Target Company",
            orderNum: "Get order quantity",
            btn:"编辑"
        },
        variables: {
            title: "Work This Month",
            dataX: ["1st Week", "2st Week", "3st Week", "4st Week"],
        },
        calendar: {
            title: "日程安排",
            btn: {
                redact: "编辑",
                delete: "删除",
            }
        },
        remind: {
            title: "日程提醒",
            add: "添加提醒",
            loading: "加载中...",
            noMore: "没有更多了",
            dialogTitle: "添加日程提醒",
            addPeople: "添加人"
        },
        addremind: {
            form: {
                date: "起止日期",
                remindTime: "提醒时间",
                email: "邮箱",
                target: "目标公司",
                people: "参与人员",

            },
            placeholder: {
                content: "请输入日程内容",
                startDate: "开始日期",
                endDate: "结束日期",
                remindTime: "是否提醒",
                email: "提醒内容和时间将发送至本邮箱",
                target: "请输入日程内容",
                people: "请输入日程内容",
            },
            save: "保存",
        }
    },
    tag: {
        title: "Tag Management",
        groupTitle: "Group Management",
        project: "Project",
        target: "Target Company",
        add: "Add Tag",
        btn: {
            add: "Add Tag",
            confirm: "Ok",
            groupMange: "Group Management",
            delete: "Delete",
            addGroup: "Add Group",
            ok: "Ok"
        },
        deleteTagTip: {
            title: "Tip",
            content: "Are you sure you want to delete this tag??",
            btn: {
                ok: "Ok",
                cancel: "Cancel"
            }
        },
        operate: "Operate",
        operateList: ["Move To Group", "Re-name", "Delete"],
        addGroupTip: {
            title: "Tip",
            content: ["Can't add", "Currently your group has reached the maximum number, please click Manage Group to manage!"]
        },
        deleteTips: "Existing tag groupings cannot be deleted. Please delete or move tags to other groups and delete them.",
        nextPage: "Next Page",
        addTagPlaceholder: "Add New Tag"
    },
    setting: {
        title: ["Information", "Change Password"],
        form: {
            companyName: "Company Name",
            companyShortName: "Company Short Name",
            telphone: "Contact Number",
            email: "Email",
            country: "Country",
            account: ["Account", "Temporarily unable to modify"]
        },
        rules: {
            companyName: "Please input the company name",
            companyShortName: "Please input the company short name"
        },
        btn: {
            save: "Save"
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
        menu: ["All Notice", "Project", "Target", "Member", "Log", "System"],
        box: "Message Box",
        read: "All Read",
        checkAll: "View All"
    },
    login: {
        title: "Log In",
        placeholder: {
            email: "Please input your login email address",
            password: "Please input your login password"
        },
        rules: {
            email: "Please input your login email address",
            password: "Please input your login password"
        },
        autoLogin: "Automatic login within 7 days",
        link: ["Contact Us", "About Us"],
        ownership: "© 2019 IWORKU CO., LTD，保留所有权利",
        btn: "Log In"
    },
    target: {
        title:"目标公司详情",
        menu:["资料","调研报告","工作日志","所在项目"],
        form: {
            companyTitle: "公司信息",
            keymenTitle: "关键人",
            otherTitle: "其他",
            companyName: "公司名称",
            country: "国家",
            site: "地址",
            url: "网址",
            phone: "电话",
            keymenName: "姓名",
            position: "职位",
            keymenPhone: "关键人电话",
            email: "电子邮件",
            social: "社交账户",
            source: "客户来源",
            clientType: "客户类型",
            purchaseScale: "预计采购",
            hsCode: "海关编码",
            importance: "重要程度",
            introduce: "介绍",
            remark: "备注",
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
            btn:"编辑"
        },
        next: "下一步",
        finish: "完成添加",
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