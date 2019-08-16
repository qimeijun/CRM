export default {
    head: {
        title: "Hệ thống quản lý kinh doanh bản địa hóa toàn cầu",
        account: "Quản lý tài khoản", 
        logout: "Thoát", 
        today: "Công việc hôm nay"
    },
    workDiary: {
        title: "Công việc hàng ngày",
        modify: "Chỉnh sửa công việc hàng ngày", 
        add: "Thêm công việc hàng ngày", 
        form: {
            projectName: "Tên dự án", 
            type: "Loại hình", 
            targetCompany: "Công ty mục tiêu", 
            title: "Tiêu đề",
            description: "Mô tả công việc",
            chatLog: "Nhật ký cuộc trò chuyện", 
            attachment: "Tệp đính kèm",
            leaveMessage: "Nội dung lời nhắn", 
            orderNo: "订单编号",
            orderName: "产品",
            orderNum: "订单数量",
            orderPrice: "订单价格",
            orderDescription: "订单描述",
            orderType: "Loại hình đơn hàng"
        },
        rules: {
            projectName: "Lựa chọn dự án", 
            type: "Lựa chọn loại hình công việc hàng ngày", 
            title: "Điền tiêu đề công việc hàng ngày", 
            leaveMessage: "Không được để trống nội dung lời nhắn" ,
             orderDescription: "Vui lòng nhập loại đơn đặt hàng"
        },
        diarType: {
            daily: "Báo cáo công việc hàng ngày", 
            weekly: "Báo cáo công việc hàng tuần", 
            monthly: "Báo cáo công việc hàng tuần", 
            order: "Đơn hàng" 
        },
        uploadChatLog: "Đăng tải hình ảnh", 
        attachment: "Tập đính kèm (Catalogue mẫu sản phẩm)",
        chatLog: "Nhật ký cuộc trò chuyện",
        operate: "Tiến hành", 
        btn: {
            translate: "Dịch",  
            leaveMessage: "Lời nhắn",  
            modifyDiary: "Chỉnh sửa công việc hàng ngày", 
            leaveMessageNow: "Lập tức để lại lời nhắn",  
            delete: "Xóa công việc hàng ngày",  
            reply: "Trả lời"
        },
        order: {
            no: "Mã đơn hàng",   
            total: "Tổng lượng đơn hàng",  
            price: "Giá trị đơn hàng",  
            description: "Mô tả đơn hàng"  
        },
        orderType: ["Bình thường", "Bất thường"],
        translateTip: "Nội dung dịch là",
        targetCompany: "Công ty mục tiêu"
    },
    member: {
        add: "Thêm thành viên mới", 
        regional: "Thành viên khu vực", 
        form: {
            avatar: ["Đăng tải ảnh công việc", "Ảnh công việc"], 
            username: "Họ tên",
            usernameEn: "Tên tiếng Anh",
            gender: "Giới tính",
            telphone: "Điện thoại",
            email: "Email",
            role: "Vai trò",
            team: "Nhóm",
            account: "Tài khoản đăng nhập", 
            password: "Mật khẩu đăng nhập",
            country: "Quốc gia",
            city: "Thành phố",
            region: "Giám đốc khu vực"
        },
        rules: {
            avatar: "Đăng tải ảnh công việc", 
            username: "Nhập tên thành viên", 
            email: "Nhập Email của thành viên", 
            role: "Lựa chọn vai trò của thành viên", 
            team: "Lựa chọn nhóm", 
            account: ["Nhập tài khoản đăng nhập", "Nhập Email chính xác"],
            password: ["Nhập mật khẩu đăng nhập, Mật khẩu không được ít hơn 8 kí tự", "không bao gồm các kí tự đặc biệt"],
            gender: "Lựa chọn vai trò của thành viên",
            country: "Vui lòng chọn quốc gia",
            region: "Lựa chọn giám đốc khu vực",
        },
        placeholder: {
            account: "Nhập Email", 
            username: "Nhập tên của thành viên", 
            usernameEn: "Nhập tên tiếng Anh của thành viên", 
            gender: "Lựa chọn giới tính của thành viên", 
            email: "Nhập Email của thành viên", 
            telphone: "Nhập số điện thoại của thành viên", 
            role: "Lựa chọn cấp bậc của thành viên",
            search: "Tìm kiếm tên, ID, địa chỉ, người chủ chốt của công ty mục tiêu",
            country: "Vui lòng chọn quốc gia"
        },
        gender: {
            male: "Nam", 
            female: "Nữ" 
        },
        btn: {
            regional: "Quản lý giám đốc khu vực", 
            addRegional: "Thêm giám đốc khu vực", 
            ok: "Hoàn thành", 
            fillInformation: "Điền thông tin", 
            confirmAdd: "Xác nhận thêm", 
            reUpload: "Đăng tải lại" 
        },
        dialogMenu: {
            account: "Cài đặt tài khoản", 
            information: "Thông tin thành viên"  
        }
    },
    changeAdministrator: {
        title: "Thay đổi người quản lý",
        search: "Nhập tên người quản lý", 
        btn: {
            handOver: "Bàn giao", 
            add: "Phân chia", 
            addMember: "Thêm giám đốc dự án"  
        }
    },
    password: {
        modify: "Chỉnh sửa mật khẩu", 
        form: {
            new: "Mật khẩu mới", 
            confirm: "Nhập lại" 
        },
        rules: {
            new: ["Nhập mật khẩu mới", "Mật khẩu không được ít hơn 8 kí tự"],
            confirm: ["Nhập xác nhận mật khẩu", "Hai mật khẩu không trùng khớp, hãy nhập lại"]
        },
        placeholder: {
            new: "Mật khẩu không được ít hơn 8 kí tự, không bao gồm các kí tự đặc biệt",
            confirm: "Mật khẩu không được ít hơn 8 kí tự, không bao gồm các kí tự đặc biệt"
        },
        btn: {
            cancel: "Chỉnh sửa xong" 
        }
    },
    selectRegionalManager: {
        title: "Thêm giám đốc khu vực", 
        placeholder: "Lựa chọn giám đốc khu vực" 
    },
    memberManagement: {
        title: "Quản lý thành viên", 
        table: ["Thành viên", "Vai trò", "Tên nhóm", "Dự án theo sát", "Khách hàng riêng tư", "Thêm thời gian", "Thao tác"],
        operate: ["Tra cứu thông tin", "Bàn giao cho người quản lý", "Xóa"],
        btn: {
            addMember: "Thêm thành viên mới", 
            ok: "Hoàn thành" 
        },
        searchInput: "Tìm kiếm thành viên, Tên nhóm", 
        regionalManagement: "Quản lý giám đốc khu vực", 
        deleteTip: {
            title: "Nhắc nhở", 
            content: ["Bạn chắc chắn muốn xóa thành viên này?", "Không xóa được", "Thành viên này vẫn đang theo sát công ty mục tiêu, hãy bàn giao nhiệm vụ trước khi xóa!"],
            btn: ["Xác nhận", "Hủy"], 
        }
    },
    memberInfo: {
        modifyInfo: "Chỉnh sửa thông tin",
        menu: ["Tài liệu", "Nhóm", "Dự án theo sát", "Khách hàng riêng tư", "Nhật ký công việc"], 
        priviteTable: {
            targetCompany: "Công ty mục tiêu",
            importance: "Mức độ quan trọng",
            updateTime: "Thời gian cập nhật",
            status: "Trạng thái",
            createTime: "Thời gian khởi tạo",
            informationIntegrity: "Toàn vẹn dữ liệu",
            operate: "Hoạt động"
        },
        projectTable: ["Tên dự án", "Trạng thái", "Người quản lý", "Nhãn", "Số ngày thực hiện", "Thêm thời gian", "Thao tác"],
        btn: {
            shiftIn: "Chuyển sang công khai", 
            shiftOut: "Rời khỏi", 
            modify: "Chỉnh sửa", 
            handOver: "Bàn giao", 
            password: "Chỉnh sửa mật khẩu", 
            shiftOutProject: "Rời khỏi", 
            addDiary: "Thêm nhật ký công việc" 
        },
        priviteShiftInTip: {
            title: "Nhắc nhở", 
            content: ["Công ty mục tiêu này đang được theo sát, bạn chắc chắn muốn chuyển sang công khai?"], 
            btn: ["Xác nhận", "Hủy"]
        },
        memberShiftOutTip: {
            title: "Nhắc nhở", 
            btn: ["Xác nhận", "Hủy", "Bàn giao nhiệm vụ", "Chuyển sang công khai"],
            content: ["Bạn chắc chắn muốn cho thành viên này rời khỏi dự án?", "Không rời khỏi được!", "Thành viên này vẫn đang theo sát công ty mục tiêu, hãy bàn giao nhiệm vụ trước khi rời khỏi nhóm!", "Thành viên này là giám đốc dự án, trước khi rời khỏi bắt buộc chọn quản lý dự án mới thay thế!"]
        },
        operate: "Tiến hành", 
        teamOperate: ["Chỉnh sửa nhóm", "Bàn giao nhóm", "Tạm ngừng hoạt động nhóm"], 
        teamMemberOperate: ["Xem chi tiết", "Bàn giao đội", "xóa bỏ"],
        noTeam: "Tạm thời chưa có nhóm", 
        account: "Tài khoản",
        password: "Mật khẩu", 
        workDiaryMenu: ["Tất cả công việc hàng ngày", "Công việc hàng ngày của dự án", "Công việc hàng ngày của công ty mục tiêu"], 
        statistics: ["Khái quát nhiệm vụ", "Thành tích tháng này"], 
        joinTime: "Thêm thời gian", 
        handOverTeam: "Bàn giao", 
        teamStatistics: ["Thành tích của tất cả thành viên", 'Thành tích 1V1'],
        teamStatisticsTime: ["Tháng", "Năm"],
        privateOperate: ["Xem thông tin chi tiết", "Di chuyển ra biển khơi", "Bàn giao"] , 
        statistics: ["Khách hàng độc thân", "Theo dõi khách hàng", "Khách hàng biển tư nhân"]
    },
    team: {
        add: "Thêm đội",
        modify: "Đội ngũ biên tập",
        form: {
            name: "Tên nhóm",
            country: "Quốc gia", 
            color: "Màu sắc" 
        },
        rules: {
            name: "Nhập tên nhóm",
            country: "Lựa chọn quốc gia" 
        },
        btn: {
            confirm: "Xác nhận chỉnh sửa", 
            add: "Thêm" 
        },
        statistics: ['Xuất sắc nhất tháng'] 
    },
    public: {
        btn: {
            submit: "Gửi", 
            cancel: "Hủy", 
            upload: "Đăng tải tệp đính kèm", 
            save: "Lưu" 
        },
        dollar: "Đô-la Mỹ", 
        role: {
            superAdministrator: "Quản lý cấp cao", 
            regionalManager: "Giám đốc khu vực", 
            projectManager: "Giám đốc dự án", 
            member: "Thành viên", 
            customer: "Khách hàng" 
        },
        tips: {
            success: "Thao tác thành công!",
            error: "Thao tác thất bại, hãy thử lại sau!", 
            noData: "Tạm thời không có dữ liệu" 
        },
        page: {
            prePage: "Trang trước", 
            nextPage: "Trang sau" 
        }
    },
    workBench: {
        title: "Bảng điều khiển",  
        noInvolved:"Chưa tham gia dự án",
        btn: {
            addProject: "Thêm dự án mới",
            selectItem:"Vui lòng chọn một dự án"
        },
        briefreport: {
            title: "Báo cáo vắn tắt lịch trình trong ngày",
            loading: "Đang tải…", 
            noMore: "Hết!", 
            btn: {
                all: "Tất cả công việc hàng ngày",
                submit: "Gửi công việc hàng ngày" 
            }
 
        },
        overview: {
            title: "Tình hình chung dự án", 
            targetNum: "Số công ty mục tiêu", 
            vlinkNum: "Số công ty mục tiêu đã gặp mặt", 
            intentionNum: "Số công ty mục tiêu có thiện chí", 
            orderNum: "Số lượng đơn hàng đạt được", 
            btn: "Chỉnh sửa" 
        },
        variables: {
            title: "Công việc tháng này", 
            dataX: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 5"],
        },
        calendar: {
            title: "Sắp xếp lịch trình trong ngày", 
            btn: {
                redact: "Chỉnh sửa", 
                delete: "Xóa", 
            }
        },
        remind: {
           title: "Nhắc nhở lịch trình trong ngày", 
            modify: "Chỉnh sửa lời nhắc",
           add: "Thêm nhắc nhở", 
           loading: "Đang tải…", 
           noMore: "Hết!", 
           dialogTitle:"Thêm nhắc nhở lịch trình trong ngày",
           addPeople:"Thêm người" 
        },
        addremind:{
            form:{
                date:"Thời gian bắt đầu và kết thúc", 
                remindTime:"Thời gian nhắc nhở",
                email:"Email", 
                target:"Công ty mục tiêu", 
                people:"Người tham gia"
            },
            placeholder:{
                content:"Nhập nội dung lịch trình trong ngày", 
                startDate:"Ngày bắt đầu",
                endDate:"Ngày kết thúc", 
                remindTime:"Nhắc nhở hay không?", 
                email:"Nội dung và thời gian nhắc nhở sẽ được gửi đến Email này.", 
                target:"Nhập nội dung lịch trình trong ngày", 
                people:"Nhập nội dung lịch trình trong ngày",
            },
            selectTarget:"Chọn công ty mục tiêu",
            remindTypes:["Nhắc nhở ngày trước","Nhắc nhở trong hai ngày đầu","Không nhắc nhở"],
            rules:{
                content:"Vui lòng nhập một lời nhắc",
                date:"Vui lòng chọn một ngày bắt đầu",
                remindType:"Vui lòng chọn một loại nhắc nhở",
                email:"Vui lòng nhập địa chỉ email của bạn",
                target:"Vui lòng chọn một công ty mục tiêu",
                users:"Vui lòng chọn người tham gia"
            },
            save: "Lưu lại",
            modify: "Chỉnh sửa"
        }
    },
    tag: {
        title: "Quản lý nhãn", 
        groupTitle: "Quản lý nhóm nhỏ", 
        project: "Nhãn dự án", 
        target: "Nhãn công ty ", 
        add: "Thêm nhãn", 
        btn: {
            add: "Thêm nhãn mới",
            confirm: "Xác nhận", 
            groupMange: "Quản lý nhóm nhỏ", 
            delete: "Xóa",
            addGroup: "Thêm nhóm nhỏ mới",
            ok: "Hoàn thành" 
        },
        deleteTagTip: {
            title: "Nhắc nhở", 
            content: "Bạn chắc chắn muốn xóa nhãn này?", 
            btn: {
                ok: "Xác nhận", 
                cancel: "Huỷ" 
            }
        },
        operate: "Tiến hành", 
        operateList: ["Di chuyển sang nhóm nhỏ", "Sửa tên", "Xóa"],
        addGroupTip: {
            title: "Nhắc nhở", 
            content: ["Không thêm mới được", "Hiện tại số lượng nhóm nhỏ của bạn đã đầy, nhấn vào phần Quản lý nhóm nhỏ để tiến hành quản lý!"], 
        },
        deleteTips: "Không thể xóa nhóm nhỏ đã có nhãn. Xóa nhãn hoặc chuyển sang nhóm nhỏ khác trước khi xóa!", 
        nextPage: "Trang sau", 
        addTagPlaceholder: "Thêm nhãn mới" 
    },
    setting: {
        title: ["Thông tin cá nhân", "Chỉnh sửa mật khẩu"], 
        form: {
            companyName: "Tên công ty", 
            companyShortName: "Tên viết tắt của công ty", 
            telphone: "Điện thoại liên hệ",
            email: "Email", 
            country: "Quốc gia", 
            account: ["Tài khoản", "Tạm thời không chỉnh sửa được"], 
        },
        rules: {
            companyName: "Nhập tên công ty", 
            companyShortName: "Nhập tên viết tắt công ty" 
        },
        btn: {
            save: "Lưu" 
        }
    },
    highseas: {
        title: "Quản lý vùng công khai",
        placeholder: {
            seek: "Tìm kiếm tên, ID, địa chỉ, người chủ chốt của công ty mục tiêu", 
            country: "Lựa chọn quốc gia", 
            sort: "Lựa chọn phân loại", 
            tag: "Lựa chọn nhãn"
        },
        table: {
            target: "Công ty mục tiêu", 
            importance: "Mức độ quan trọng", 
            updatedate: "Thời gian cập nhật", 
            projectNum: "Số dự án đã được phân chia", 
            whenCreated: "Thời gian khởi tạo", 
            orderNum: "Số đơn thành công", 
            operate: "Thao tác", 
            details: "Xem thông tin chi tiết" 
        }
    },
    project: {
        title: "Quản lý dự án", 
        add: "Thêm dự án mới", 
        allot:"Phân bổ",
        redistribution: "Phân phối lại",
        invalid:"vô hiệu hóa", 
        activation: "Kích hoạt",
        transfer:"Bàn giao", 
        intoSea:"Chuyển sang công khai", 
        Private: "Di chuyển vào biển tư nhân",
        view:"Xem thông tin chi tiết", 
        updateTitle:"Sửa đổi dữ liệu",
        placeholder: {
            seek: "Tìm kiếm tên, địa chỉ dự án", 
            tag: "Chọn nhãn", 
            projectTitle: "Nhập tên dự án", 
            companyName: "Nhập tên doanh nghiệp", 
            tmt: "Lựa chọn ngành nghề", 
            site: "Nhập địa chỉ", 
            url: "Https://", 
            email: "Nhập Email", 
            tel:"Vui lòng nhập số điện thoại của công ty",
            intro: "Nhập giới thiệu vắn tắt công ty", 
            strength: "Nêu rõ ưu điểm, lợi thế", 
            productName: "Nhập tên sản phẩm", 
            describe: "Nhập mô tả sản phẩm",
        },
        from: {
            firstTitle: "Thêm dự án", 
            secondTitle: "Thông tin dự án",
            thirdlyTitle: "Thông tin sản phẩm", 
            account: "Tài khoản đăng nhập", 
            password: " Mật khẩu đăng nhập", 
            projectTitle: " Tên dự án",
            companyName: "Tên doanh nghiệp", 
            tmt: "Ngàng nghề", 
            site: "Địa chỉ", 
            url: "Website", 
            email: "Email", 
            tel:"Điện thoại công ty",
            intro: "Giới thiệu vắn tắt công ty", 
            strength: "Ưu thế", 
            productName: "Tên sản phẩm", 
            productImg: "Ảnh sản phẩm", 
            productVideo: "Video sản phẩm", 
            accessory: "Tệp đính kèm (Catalogue sản phẩm)", 
            study: "Tài liệu học tập" 
        },
        rules:{
            account:"Vui lòng nhập số tài khoản",
            accountPassword:"Vui lòng nhập mật khẩu của bạn",
            projectTitle:"Vui lòng nhập mật khẩu của bạn",
            companyName:"Vui lòng nhập tên công ty",
            tmt:"Vui lòng chọn ngành",
            site:"Vui lòng nhập địa chỉ",
            url:"Vui lòng nhập một URL",
            email:"Vui lòng nhập địa chỉ email của bạn",
            tel:"Vui lòng nhập số điện thoại",
            intro:"Vui lòng nhập phần giới thiệu",
            productName:"Vui lòng nhập tên sản phẩm",
            img:"Kích thước hình ảnh tải lên không thể vượt quá 3MB!",
            video:"Tải lên kích thước video không thể vượt quá 20 MB!",
            accessory:"Tải lên tệp đính kèm không thể vượt quá 5MB!",
            uploadSuccess:"Tải lên video thành công",
        },
        btn: {
            uploadImg: "Đăng tải hình ảnh", 
            uploadVideo: "Đăng tải video", 
            uploadAccessory: "Đăng tải tệp đính kèm", 
            perfect: "Tài liệu hoàn chỉnh", 
            continue: "Tiếp tục hoàn chỉnh", 
            ok: "Hoàn thành", 
            edit:"Chỉnh sửa" ,
            detele:"Xóa",
            continueUpload:"Tiếp tục tải lên",
            UploadAgain:"Tải lên lại"
            
        },
        tableHeader: ["ID","Tên dự án","Trạng thái","Người quản lý","Nhãn","Số ngày thực hiện","Thêm thời gian","Thao tác"],
        status: ["Đang thực hiện", "Đã kết thúc", "Dự án khởi động lại", "Dự án mới"]
    },
    projectInfo:{
        title:"Chi tiết dự án", 
        endProject:"Dự án kết thúc", 
        menu:["Tài liệu","Sản phẩm","Khách hàng công khai","Vùng riêng tư của thành viên","Nhật ký công việc"],
        member:{
            title:"Thành viên làm việc", 
            add:"Thêm thành viên", 
            target:["Công ty mục tiêu","công ty"],
            time:["Thời gian thực hiện","Ngày"],
            population:"tổng cộng {number} người",
			dialogTitle:"Thêm thành viên dự án"
        },
        commonality:{
            tableHeader: ["Công ty mục tiêu","Mức độ quan trọng","Thời gian cập nhật","Trạng thái","Thời gian khởi tạo","Mức độ hoàn thành tài liệu","Tiến hành"],
        },
        importTarget:  {
            add: "Thêm công ty mục tiêu mới", 
            import: "Dẫn vào công ty mục tiêu", 
            templateName:"Mẫu khách hàng.xls",
            textTip:[" Ấn dẫn vào bản mẫu, Điền vào bảng biểu","Dung lượng bảng biểu dưới 5M","Công ty mục tiêu đang được dẫn vào···"],
            uploadBtn:["Nhấn vào đây để tải lên","Re-upload","Nhập một lần nhấp"],
            dialogTitle:"Nhắc nhở", 
            noimport:"Không dẫn vào", 
            coverage:"Thay đổi" 
        },
        tag:{
            title:"Nhãn", 
            detele:"Xóa", 
            ok:"Hoàn thành", 
            dialogTitle:"Thêm nhãn" 
        },
        product:{
            accessory:"Tệp đính kèm (Catalogue)", 
            study:"Tài liệu học tập", 
            view:"Chỉnh sửa"
        }
    },
    notice: {
        menu: ["Tất cả thông báo", "Công ty dự án", "Công ty mục tiêu", "Thành viên", "Công việc hàng ngày", "Hệ thống"],
        box: "Hộp tin", 
        read: "Tất cả đã đọc", 
        checkAll: "Tra cứu toàn bộ" 
    },
    login: {
        title: "Đăng nhập", 
        placeholder: {
            email: "Nhập tài khoản Email", 
            password: "Nhập mật khẩu của bạn" 
        },
        rules: {
            email: "Nhập tài khoản Email", 
            password: "Nhập mật khẩu của bạn" 
        },
        autoLogin: "Tự động đăng nhập trong 7 ngày", 
        link: ["Liên lạc với chúng tôi", "Về chúng tôi"],
        ownership: "? 2019 IWORKU CO., LTD, Lưu giữ tất cả quyền lợi", 
        btn: "Đăng nhập"
    },
    target: {
        title:"Chi tiết công ty mục tiêu",
        menu:["Tài liệu","Báo cáo khảo sát","Nhật ký công việc","Dự án"],
        form:{
            companyTitle:"Thông tin công ty", 
            keymenTitle:"Người chủ chốt", 
            otherTitle:"Khác",
            companyName:"Tên công ty", 
            country:"Quốc gia", 
            site:"Địa chỉ", 
            url:"Website",
            phone:"Điện thoại", 
            keymenName:"Họ tên", 
            position:"Chức vụ", 
            keymenPhone:"Số điện thoại của người chủ chốt", 
            email:"Địa chỉ Email", 
            social:"Tài khoản mạng xã hội", 
            source:"Nguồn khách hàng", 
            clientType:"Loại khách hàng",
            purchaseScale:"Dự toán mua hàng", 
            hsCode:"Mã hải quan", 
            importance:"Mức độ quan trọng", 
            introduce:"Giới thiệu",
            remark:"Ghi chú", 
            btn:"Hoàn thành" 
        },
        info:{
            companyTitle:"Tài liệu công ty mục tiêu", 
            keymenTitle:"Thông tin người chủ chốt",
            otherTitle:"Khác", 
            overviewTitle:"Tình hình chung công ty mục tiêu", 
            companyName:"Tên công ty", 
            country:"Quốc gia", 
            site:"Địa chỉ",
            url:"Website", 
            phone:"Điện thoại liên hệ", 
            keymenName:"Người chủ chốt", 
            position:"Chức vụ", 
            keymenPhone:"Điện thoại liên hệ", 
            email:"Email", 
            social:"Tài khoản mạng xã hội", 
            source:"Nguồn khách hàng", 
            clientType:"Loại khách hàng", 
            purchaseScale:"Quy mô dự toán mua hàng", 
            hsCode:"Mã hải quan", 
            importance:"Mức độ quan trọng", 
            introduce:"Giới thiệu", 
            remark:"Ghi chú", 
            btn:"Chỉnh sửa", 
            editorTitle:"Chỉnh sửa",
            logTotal:"Tổng số nhật ký",
            MonthlyTotal:"Số lượng báo cáo hàng tháng",
            weeksTotal:"Số lượng báo cáo hàng tuần",
            orderTotal:"Số lượng đặt hàng"
        },
         placeholder:{
            companyName:"Vui lòng nhập tên công ty",
            country:"Vui lòng chọn quốc gia",
            keymenName:"Vui lòng nhập tên khóa",
            type:"Vui lòng chọn một loại công ty",
            seek:"Vui lòng chọn một loại công ty",
            
        },
        next: "Tiếp theo", 
        finish: "Thêm hoàn thành", 
        probe: {
            upload: "Đăng tải báo cáo", 
            update: "Chỉnh sửa báo cáo", 
            delete:"Xóa", 
            title:"Báo cáo khảo sát", 
            textTip:[" Nhấn đăng tải mẫu, Điền bảng biểu","Dung lượng bảng biểu dưới 5M","Công ty mục tiêu đang nhập khẩu, xin hãy kiên nhẫn ..."],
            uploadBtn:["Nhấp vào để đăng tải","Đăng tải lại","Bắt đầu đăng tải"],
            dialogTitle:"Chú ý",
            updateContent:"Sửa đổi",
            addContent:"Nhập xong",
            ok:"Hoàn thành"
        },
        loca: {
            tableHeader:["ID","Tên dự án","Trạng thái","Người quản lý"," Nhãn","Số ngày thực hiện","Thêm thời gian","Tiến hành"],
            view:"Tra cứu chi tiết" 
        },
        status: ["Chờ theo sát", "Đang theo sát", "Chưa theo sát", " Vô hiệu hóa"],
        importanceStatus: ["Chờ theo sát", "Hoàn thiện tài liệu", "Có nhật ký theo sát", "Khác hàng quan tâm bình thường", "Tập trung vào khách hàng theo dõi", "Khách hàng hiện tại"]
       
    },
    targetStatus:{
        title:"Nhắc",
        success:"Hoạt động thành công",
        catch:"Hủy bỏ hoạt động",
        Private:{
            messageText:"Bạn có chắc chắn muốn vô hiệu hóa công ty mục tiêu này?"
        },
        invalid:{
            messageText:"Bạn có chắc chắn muốn kích hoạt công ty mục tiêu này?"
        },
        intoSea:{
            messageText:"Công ty mục tiêu đang theo dõi. Bạn có chắc chắn muốn di chuyển ra biển không?"
        },
        probe:{
            messageText:"Bạn có chắc chắn muốn xóa báo cáo nghiên cứu?"
        },
        btn:{
            determine:"Xác định",
            cancel:"Hủy bỏ"
        }
    },
    projectStatus:{
        title:"Nhắc",
        catch:"Hủy bỏ hoạt động",
        end:{
            messageText:"Bạn có chắc chắn muốn kết thúc dự án này?",
            success:"Dự án đã kết thúc"
        },
        restart:{
            messageText:"Bạn có chắc chắn muốn khởi động lại dự án này?",
            success:"Dự án khởi động lại"
        },
        btn:{
            determine:"Xác định",
            cancel:"Hủy bỏ"
        }
    },
    page404: {
        btn: "Thử quay lại trang chủ"
    },
    layout: {
        workBench: "Bàn làm việc",
        project: "Quản lý dự án",
        public: "Quản lý biển",
        member: "Quản lý thành viên",
        tag: "Quản lý nhãn",
        comapnyInfo: "Thông tin công ty",
        companyProduct: "Thông tin sản phẩm",
        target: "Công ty mục tiêu",
        workDiary: "Nhật ký công việc"
    }
}

