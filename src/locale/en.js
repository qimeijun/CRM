export default {
    head: {
        // title: "Global Localization Marketing Management System",
        title: "CRM project management system",
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
            leaveMessageNow: "Reply",
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
            account: "Create Account",
            password: "Create Password",
            country: "Country",
            city: "City",
            region: "Regional Manager",
            regional: "Region"
        },
        rules: {
            avatar: "Please upload the work photo",
            username: "Please input a member name",
            email: "Please input a member email",
            role: "Please select a member role",
            team: "Please select a team",
            account: ["Please input a account", "please input your vaild email"],
            password: ["Please input a password", "Password cannot be less than eight digits and cannot have special characters"],
            gender: "Please select a member gender",
            country: "Please select a country",
            region: "Please select a regional manager",
            regional: "Please select a region"
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
            country: "Please select a country",
            regional: "Please select a region"
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
        clientModify: "Change the Client Password",
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
        menu: ["Personal Information", "Team", "Follow Up Project", "Private customer", "Work Log"],
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
        statistics1: ["Single customer", "Follow up with customers", "Private customer"],
        deleteTip: "Are you sure you want to delete this area?"
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
        title: "Work Panel",
        noInvolved:"Not involved in the project",
        btn: {
            addProject: "Add New Project",
            selectItem:"Please select item"
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
            targetNum: "Sales Leads",
            vlinkNum: "Follow-Up",
            intentionNum: "Potential Clients",
            orderNum: "Order",
            btn: "Edit"
        },
        variables: {
            title: "Work of this Month",
            dataX: ["1st Week", "2st Week", "3st Week", "4st Week"],
        },
        calendar: {
            title: "Schedule",
            remaining:"There is{number}item...",
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
            selectTarget:"Select target company",
            remindTypes:["Reminder the day before","Reminder two days ago","Don't remind"],
            rules:{
                content:"Please enter a reminder",
                date:"Please select a start date",
                remindType:"Please select the reminder type",
                email:"Please enter email",
                target:"Please select the target company",
                users:"Please select participants"
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
        },
        loca:"Where the project"
    },
    project: {
        title: "Project Management",
        add: "Add New Projects",
        allot: "Assign",
        redistribution: "redistribution",
        invalid: "Cancel",
        delete: "Delete",
        activation: "The activation",
        transfer: "Transfer",
        intoSea: " Move to Public",
        Private: "Move into private",
        view: "View",
        updateTitle:"Modify the data",
        placeholder: {
            seek: "Search Project, Address",
            tag: "Tag",
            projectTitle: "Project Name",
            companyName: "Company Name",
            tmt: "Industry",
            site: "Address",
            url: "Website",
            email: "Email",
            tel:"Please enter your company phone number",
            intro: "Introduction",
            strength: "Advantages",
            productName: "Product",
            describe: "Description",
        },
        from: {
            firstTitle: "Add Project",
            secondTitle: "Project Info",
            thirdlyTitle: "Product Info",
            account: "Add customer account",
            password: "Customer account login password",
            projectTitle: "Project",
            companyName: "Company",
            tmt: "Industry",
            site: "Address",
            url: "Website",
            email: "Email",
            tel:"The phone company",
            intro: "Introduction",
            strength: "Advantages",
            productName: "Product",
            productImg: "Picture",
            productVideo: "Video",
            accessory: "Attachment (Catalogue)",
            study: "Reference Info"
        },
        rules:{
            account:"Please enter your account number",
            accountPassword:"Please enter password",
            projectTitle:"Please enter a project name",
            companyName:"Please enter business name",
            tmt:"Select industry",
            site:"Please enter address",
            url:"Please enter website",
            email:"Please enter email",
            tel:"Please enter telephone number",
            intro:"Please enter introduction",
            productName:"Please enter product name",
            img:"Upload image size cannot exceed 3MB!",
            video:"Upload video size cannot exceed 20MB!",
            accessory:"Upload attachment size cannot exceed 5MB!",
            uploadSuccess:"Video uploaded successfully",
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
            continueUpload:"Continue to upload",
            UploadAgain:"Upload again",
            cancelUpload: "Cancel Upload"
        },
        tableHeader: ["ID", "Project", "Status", "Administrator", "Tag", "Working Days", "Add date", "Operate"],
        status: ["ongoing", "Has ended", "Restart the project", "The new project"]
    },
    projectInfo: {
        title: "Details",
        endProject: "End the Project",
        restartProject: "Restart the project",
        menu: ["Info", "Product", "Public Client", "Private", "Work Log"],
        member: {
            title: "Member",
            add: "Add Project Member",
            target: ["Target", "Home"],
            time: ["Working time", "days"],
            population:"A total of {number} people",
            dialogTitle:"Add project members"
        },
        commonality: {
            tableHeader: ["Target", "Responsible Person", "Importance", "Update date", "status", "Creat Time", "Completeness", "Operate", "Area"]
        },
        importTarget: {
            add: "Add new Target",
            import: "Import Target",
            templateName:"Customer information.xls",
            textTip: ["Fill in the Form according to the Templat", "Size not exceeding 5M", "Importing , please wait...","Import complete!","There are some duplicates in the uploaded content, please download and modify and re-upload!"],
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
            btn: "Done",
            area: "Area"
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
            logTotal:"Total number of logs",
            MonthlyTotal:"Monthly quantity",
            weeksTotal:"Weekly number",
            orderTotal:"The order number"
        },
        placeholder:{
            companyName:"Please enter company name",
            country:"Please select the country",
            keymenName:"Please enter the key name",
            type:"Please select the company type",
            seek:"Search for target company name, ID, address, key person",
            customType: "Please enter a custom type",
            customTip: "Didn't want it? Click to add",
            customTip2: "Back to selection" 
        },
        next: "Next",
        finish: "Finish",
        probe: {
            templateName:"Research Report Template.xls",
            upload: "Upload a Report",
            update: "Edit the Report",
            delete: "Delete",
            title: "Research Report",
            textTip: ["Fill in Form according to Template", "Size not exceeding 5M", "Importing, please Wait···"],
            uploadBtn: ["Click to Upload", "Upload Again", "Upload Now"],
            dialogTitle: "Prompt",
            updateContent:"Modified to complete",
            addContent:"The import is complete",
            ok:"OK"
        },
        loca: {
            tableHeader: ["ID", "Project", "Status", "Administration", "Tag", "Working days", "Add date", "Operate"],
            view: "View"
        },
        status: ["To follow up", "In the follow up", "Did not follow up", "invalid"],
        importanceStatus: ["To follow up", "Information to perfect", "Follow up record", "General intended customers", "Focus on customer follow-up", "Existing customers"]
    },
    targetStatus:{
        title:"prompt",
        success:"Operation is successful",
        catch:"Cancelled operation",
        Private:{
            messageText:"Are you sure you want to invalidate the target company?"
        },
        invalid:{
            messageText:"Are you sure you want to activate this target company?"
        },
        intoSea:{
            messageText:"The target company is following up. Are you sure you want to move to the high seas?"
        },
        probe:{
            messageText:"Are you sure you want to delete the research report?"
        },
        btn:{
            determine:"determine",
            cancel:"cancel"
        }
    },
    projectStatus:{
        title:"prompt",
        catch:"Cancel the operation",
        end:{
            messageText:"Are you sure you want to end this project?",
            success:"Closed project"
        },
        restart:{
            messageText:"Are you sure you want to restart this project?",
            success:"Project restart"
        },
        btn:{
            determine:"determine",
            cancel:"cancel"
        }
    },
    page404: {
        btn: "Try back to the home page"
    },
    layout: {
        workBench: "Work Panel",
        project: "Project",
        public: "Public",
        member: "Member",
        tag: "Tag",
        comapnyInfo: "Company Inforation",
        companyProduct: "Product",
        target: "Target Company",
        workDiary: "Work Diary"
    },
    addRegion: {
        title: "Add Region",
        modify: "Modify Region",
        form: {
            name: "Region Name",
            country: "Country",
            city: "City"
        },
        rules: {
            name: "Please input the region name",
            country: "Please select country",
            city: "Please select city"
        },
        btn: {
            add: "Confirm & Add",
            modify: "Config & Modify",
            delete: "Delete",
            modify2: "Modify"
        }
    }
}