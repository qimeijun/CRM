export default {
    head: {
        title: "Global Localization Marketing Management System",
        account: "Account",
        logout: "Log Out",
        today: "Work Today"
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
            leaveMessage: "Message",
            orderNo: "Order No",
            orderName: "Product",
            orderNum: "Number",
            orderPrice: "Price",
            orderDescription: "Description",
            orderType: "Order Type"
        },
        rules: {
            projectName: "Please select a project",
            type: "Please select the work log type",
            title: "Please input a title",
            leaveMessage: "Leave a Message",
            orderDescription: "Please input the order description"
        },
        diarType: {
            daily: "Daily",
            weekly: "Weekly",
            monthly: "Monthly",
            order: "Order"
        },
        uploadChatLog: "Upload",
        attachment: "Attachment(Catalogue)",
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
        },
        orderType: ["Normal", "Abnormal"],
        translateTip: "Translated content is",
        targetCompany: "target Company"
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
            country: "Country",
            city: "City",
            region: "Regional Manager",
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
            country: "Please select a country",
            region: "Please select a regional manager",
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
        search: "Administrator name",
        btn: {
            handOver: "Hand Over",
            add: "Assign",
            addMember: "New Project Manager"
        }
    },
    password: {
        modify: "Change Password",
        form: {
            new: "New Password",
            confirm: "Re-enter"
        },
        rules: {
            new: ["Please input a new password", "The entered password cannot be lower than 8 digits"],
            confirm: ["Please input a confirmation password", "The passwords are inconsistent twice, please re-enter"]
        },
        placeholder: {
            new: "At least 8 characters,no special characters",
            confirm: "PAt least 8 characters,no special characters"
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
        searchInput: "Search members, team names",
        regionalManagement: "Regional Manager Management",
        deleteTip: {
            title: "Tip",
            content: ["Are you sure you want to delete this member?", "Unable to Delete", "This member still has the target company to follow up, please hand in the task and delete it!"],
            btn: ["OK", "Cancel"]
        }
    },
    memberInfo: {
        modifyInfo: "Modify",
        menu: ["Information", "Team", "Follow Up Project", "Private customer", "Work Log"],
        priviteTable: {
            targetCompany: "Tartget Company",
            importance: "Importance",
            updateTime: "Update Time",
            status: "Status",
            createTime: "Create Time",
            informationIntegrity: "Information Integrity",
            operate: "Operate"
        },
        projectTable: ["Project Name", "Status", "Administrator", "Tag", "Number of days", "Add Time", "Operate"],
        btn: {
            shiftIn: "Move into public",
            shiftOut: "Out",
            modify: "Edit",
            handOver: "Hand Over",
            password: "Edit Password",
            shiftOutProject: "Out",
            addDiary: "Add Work Log"
        },
        priviteShiftInTip: {
            title: "Tip",
            content: ["The target company is following up, are you sure you want to move to public?"],
            btn: ["Ok", "Cancel"]
        },
        memberShiftOutTip: {
            title: "Tip",
            btn: ["Ok", "Cancel", "Handover Task", "Moved into the public"],
            content: ["Are you sure you want to move this member out of the project?", "Can't move out!", "This member still has the target company to follow up, please hand over the task and move it.!", "This member is the project manager and must be assigned a new project manager before moving out.!"]
        },
        operate: "Operate",
        teamOperate: ["Edit Team", "Handover Team", "Freeze Team", "Activation team"],
        teamMemberOperate: ["View", "Handover Team", "Delete"],
        noTeam: "No Team",
        account: "Account",
        password: "Password",
        workDiaryMenu: ["All", "Project", "Target Company"],
        statistics: ["Task Overview", "Performance of this month"],
        joinTime: "Join Time",
        handOverTeam: "Hand Over",
        teamStatistics: ["All Member Performance", '1V1 Performance'],
        teamStatisticsTime: ["Month", "Year"],
        privateOperate: ["View", "Move into public", "Hand Over"],
        statistics: ["Single customer", "Follow up with customers", "Private customer"]
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
        },
        statistics: ['Monthly Champion']
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
            error: "Failed, please try again later!",
            noData: "No Datas"
        },
        page: {
            prePage: "Previous Page",
            nextPage: "Next Page"
        }
    },
    workBench: {
        title: "Work Bench",
        noInvolved:"暂未参与项目en",
        btn: {
            addProject: "Add New Project",
            selectItem:"请选择项目en"
        },
        briefreport: {
            title: "Briefing Schedule",
            loading: "Loading...",
            noMore: "No More",
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
            orderNum: "Order",
            btn: "Edit"
        },
        variables: {
            title: "Work of this Month",
            dataX: ["1st Week", "2st Week", "3st Week", "4st Week"],
        },
        calendar: {
            title: "Schedule",
            remaining:"还有{number}项...en",
            btn: {
                redact: "Edit",
                delete: "Delete",
            }
        },
        remind: {
            title: "Schedule reminder",
            modify: "Edit reminder",
            add: "Add a reminder",
            loading: "Loading...",
            noMore: "No More",
            dialogTitle: "Add a schedule reminder",
            addPeople: "Added by",
        },
        addremind: {
            form: {
                date: "Start & Finish date",
                remindTime: "Remind Time",
                email: "Email",
                target: "Target",
                people: "Person",
            },
            placeholder: {
                content: "Title",
                startDate: "Start Date",
                endDate: "Finish Date",
                remindTime: "Remind or Not",
                email: "Send an Email",
                target: "Select a Target",
                people: "People",
            },
            selectTarget:"选择目标公司en",
            remindTypes:["前一天提醒en","前两天提醒en","不提醒en"],
            rules:{
                content:"请输入提醒内容en",
                date:"请选择起始日期en",
                remindType:"请选择提醒类型en",
                email:"请输入邮箱en",
                target:"请选择目标公司en",
                users:"请选择参与人员en"
            },
            save: "Save",
            modify: "Modify"
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
            content: "Are you sure you want to delete this tag?",
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
        deleteTips: "Can not delete existing tag groupings. Delete tag, or move tags to other groups.",
        nextPage: "Next Page",
        addTagPlaceholder: "Add New Tag"
    },
    setting: {
        title: ["Information", "Change Password"],
        form: {
            companyName: "Company Name",
            companyShortName: "Short Name",
            telphone: "Tel",
            email: "Email",
            country: "Country",
            account: ["Account", "Temporarily unable to modify"]
        },
        rules: {
            companyName: "Company name",
            companyShortName: "Short name"
        },
        btn: {
            save: "Save"
        }
    },
    highseas: {
        title: "Public Management",
        placeholder: {
            seek: "Search Target, ID, Address, Key Person",
            country: " Country",
            sort: "Category",
            tag: "Tag "
        },
        table: {
            target: "Target",
            importance: "Importance",
            updatedate: "Update Date",
            projectNum: "Number of Projects",
            whenCreated: "Creat Time",
            orderNum: "Order",
            operate: "Operate",
            details: "View"
        }
    },
    project: {
        title: "Project Management",
        add: "Add New Projects",
        allot: "Assign",
        redistribution: "再分配en",
        invalid: "Cancel",
        activation: "激活en",
        transfer: "Transfer",
        intoSea: " Move to Public",
        view: "View",
        updateTitle:"修改资料en",
        placeholder: {
            seek: "Search Project, Address",
            tag: "Tag",
            projectTitle: "Project Name",
            companyName: "Company Name",
            tmt: "Industry",
            site: "Address",
            url: "Website",
            email: "Email",
            tel:"请输入公司电话en",
            intro: "Introduction",
            strength: "Advantages",
            productName: "Product",
            describe: "Description",
        },
        from: {
            firstTitle: "Add Project",
            secondTitle: "Project Info",
            thirdlyTitle: "Product Info",
            account: "Account",
            password: "Password",
            projectTitle: "Project",
            companyName: "Company",
            tmt: "Industry",
            site: "Address",
            url: "Website",
            email: "Email",
            tel:"公司电话en",
            intro: "Introduction",
            strength: "Advantages",
            productName: "Product",
            productImg: "Picture",
            productVideo: "Video",
            accessory: "Attachment (Catalogue)",
            study: "Reference Info"
        },
        rules:{
            account:"请输入账号en",
            accountPassword:"请输入密码en",
            projectTitle:"请输入项目名称en",
            companyName:"请输入企业名称en",
            tmt:"请选择行业en",
            site:"请输入地址en",
            url:"请输入网址en",
            email:"请输入邮箱en",
            tel:"请输入电话en",
            intro:"请输入简介en",
            productName:"请输入产品名称en",
            img:"上传图片大小不能超过 3MB!en",
            video:"上传视频大小不能超过 20MB!en",
            accessory:"上传附件大小不能超过 5MB!en",
            uploadSuccess:"视频上传成功en",
        },
        btn: {
            uploadImg: "Upload a Picture",
            uploadVideo: "Upload a Video",
            uploadAccessory: "Upload an Attachment",
            perfect: "Complete Your Profile",
            continue: "Continue",
            ok: "Completed",
            edit: "Edit",
            detele:"detele",
            continueUpload:"继续上传en",
            UploadAgain:"重新上传en"
        },
        tableHeader: ["ID", "Project", "Status", "Administrator", "Tag", "Working Days", "Add date", "Operate"],
        status: ["进行中", "已结束", "重启项目", "新项目"]
    },
    projectInfo: {
        title: "Details",
        endProject: "End the Project",
        restartProject: "重启项目en",
        menu: ["Info", "Product", "Public Client", "Private", "Work Log"],
        member: {
            title: "Member",
            add: "Add Member",
            target: ["Target", "Home"],
            time: ["Working time", "days"],
            population:"共{number}人en",
            dialogTitle:"添加项目成员en"
        },
        commonality: {
            tableHeader: ["Target", "Importance", "Update date", "status", "Creat Time", "Completeness", "Operate"]
        },
        importTarget: {
            add: "Add new Target",
            import: "Import Target",
            templateName:"客户模板.xlsen",
            textTip: ["Fill in the Form according to the Templat", "Size not exceeding 5M", "Importing , please wait...","导入完成！en","上传内容存在重复，请下载并修改后重新上传！en"],
            uploadBtn: ["Upload", "Upload again", "Click to Import"],
            dialogTitle: "Prompt",
            noimport: "Not import",
            coverage: "Cover"
        },
        tag: {
            title: "Tag",
            detele: "Delete",
            ok: "Completed",
            dialogTitle: "Add Tag"
        },
        product: {
            accessory: "Attachment (Catalogue)",
            study: "Reference Info",
            view: "Edit"
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
        ownership: "© 2019 IWORKU CO., LTD，All rights reserved",
        btn: "Log In"
    },
    target: {
        title: "Details of Target",
        menu: ["Info", "Research Report", "Work Log", "Project"],
        form: {
            companyTitle: "Company",
            keymenTitle: "Key Person",
            otherTitle: "Other",
            companyName: "Company Name",
            country: "Country",
            site: "Address",
            url: "Website",
            phone: "Tel",
            keymenName: "Name",
            position: "Position",
            keymenPhone: "Tel",
            email: "Email",
            social: "Social Account",
            source: "Source",
            clientType: "Type",
            purchaseScale: "Purchasing Product ",
            hsCode: "HS Code",
            importance: "Importance",
            introduce: "Introduction",
            remark: "Remark",
            btn: "Done"
        },
        info: {
            companyTitle: "Target profile",
            keymenTitle: "Key Person",
            otherTitle: "Other",
            overviewTitle: "Overview",
            companyName: "Company Name",
            country: "Country",
            site: "Address",
            url: "Website",
            phone: "Tel",
            keymenName: "Key Person",
            position: "Position",
            keymenPhone: "Tel",
            email: "Email",
            social: "Social Account",
            source: "Source",
            clientType: "Type",
            purchaseScale: "Purchase Scale",
            hsCode: "HS Code",
            importance: "Importance",
            introduce: "Introduction",
            remark: "Remark",
            btn: "Edit",
            editorTitle:"Edit",
            logTotal:"日志总数量en",
            MonthlyTotal:"月报数量en",
            weeksTotal:"周报数量en",
            orderTotal:"订单数量en"
        },
        placeholder:{
            companyName:"请输入公司名称en",
            country:"请选择国家en",
            keymenName:"请输入关键人名en",
            type:"请选择公司类型en",
            seek:"搜索目标公司名称、ID、地址、关键人en"
        },
        next: "Next",
        finish: "Finish",
        probe: {
            templateName:"调研报告模板.xlsen",
            upload: "Upload a Report",
            update: "Edit the Report",
            delete: "Delete",
            title: "Research Report",
            textTip: ["Fill in Form according to Template", "Size not exceeding 5M", "Importing, please Wait···"],
            uploadBtn: ["Click to Upload", "Upload Again", "Upload Now"],
            dialogTitle: "Prompt",
            updateContent:"修改完成en",
            addContent:"导入完成en",
            ok:"OK"
        },
        loca: {
            tableHeader: ["ID", "Project", "Status", "Administration", "Tag", "Working days", "Add date", "Operate"],
            view: "View"
        },
        status: ["待跟进", "跟进中", "未跟进", "作废"],
        importanceStatus: ["待跟进", "资料完善", "有跟进记录", "一般意向客户", "重点跟进客户", "已有成交客户"]
    },
    targetStatus:{
        title:"提示en",
        success:"操作成功en",
        catch:"已取消操作en",
        Private:{
            messageText:"您确定要将这个目标公司作废吗？en"
        },
        invalid:{
            messageText:"您确定要将这个目标公司激活吗？en"
        },
        intoSea:{
            messageText:"目标公司正在跟进中，您确定要移入公海吗？en"
        },
        probe:{
            messageText:"您确定要删除调研报告吗？en"
        },
        btn:{
            determine:"确定en",
            cancel:"取消en"
        }
    },
    projectStatus:{
        title:"提示en",
        catch:"取消操作en",
        end:{
            messageText:"您确定要结束此项目吗？en",
            success:"已结束项目en"
        },
        restart:{
            messageText:"您确定要重启此项目吗？en",
            success:"已重启项目en"
        },
        btn:{
            determine:"确定en",
            cancel:"取消en"
        }
    },
    page404: {
        btn: "Try back to the home page"
    },
    layout: {
        workBench: "Work Bench",
        project: "Project",
        public: "Public",
        member: "Member",
        tag: "Tag",
        comapnyInfo: "Company Inforation",
        companyProduct: "Product",
        target: "Target Company",
        workDiary: "Work Diary"
    }
}