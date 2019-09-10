/**
 *  获取各种配置
 *  国家
 */
export const getCountry = async ({$http, $store, $lang, $global}) => {
    let country = $store.getters['ipublic/country'];
    if (country.length == 0) {
        // 当前页面使用的那种语言，就根据这种语言排序
        let params = {sortname: 'area_sort_name_en'};
        if ($lang == $global.lang.en) {
            params.sortname = 'area_sort_name_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'area_sort_name_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'area_sort_name_en'
        }
        let res = await $http.post('/properties/area/withoutpaginglist', { areaLevel: 2,  ...params});
        if (res.iworkuCode == 200) {
            country = res.datas;
            $store.commit('ipublic/$_set_country', res.datas);
        } else {
            // 操作失败
        }
    }
    return country;
}

/**
 * 
 * @param { 调用函数的当前上下文环境 } param0 
 * @param { 国家ID } id 
 */
export const getCityById = async ({$http, $store, $lang, $global}, id) => {
    let city = [];
    if (!id) {
        return city;
    }
    
    let params = {sortname: 'area_sort_name_en'};
    if ($lang == $global.lang.en) {
        params.sortname = 'area_sort_name_en'
    } else if ($lang == $global.lang.zh) {
        params.sortname = 'area_sort_name_zh';
    } else if ($lang == $global.lang.vi) {
        params.sortname = 'area_sort_name_en'
    }
    let res = await $http.post('/properties/area/withoutpaginglist', { areaLevel: 3, areaParentId: id,  ...params});
    if (res.iworkuCode == 200 && res.datas) {
        city = res.datas;
    }
    return city;
} 

/**
 *  获取七牛token
 */
export const getQiniuToken = async ({$http, $store, $lang, $global}) => {
    let token = $store.getters['ipublic/qiniuToken'];
    if (!token) {
        let res = await $http.post('/third_party/qiniu/upload/token');
        if (res.iworkuCode == 200) {
            token = res.datas;
            $store.commit("ipublic/$_set_qiniuToken", res.datas);
        }
    }
    return token;
}


/**
 *  file rename 文件重命名
 */
export const rename = (name) => {
    let oldName = name.match(/([^\/]+)(?=\.)/ig)[0];
    let newName = oldName + "_" + (new Date().getTime());
    let fileName = name.replace(oldName, newName);
    return fileName;
}

/**
 *  获取公司行业
 */
export const getIndustry= async ({$http, $store, $lang, $global}) => {
    let industry = $store.getters['ipublic/industry'];
    if (industry.length == 0) {
        let params = {sortname: 'd_stort_en'};
        // $lang == $global.lang.en ? params.sortname = 'd_stort_en' : params.sortname = 'd_stort_zh';
        if ($lang == $global.lang.en) {
            params.sortname = 'd_stort_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'd_stort_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'd_stort_en'
        }
        let res = await $http.post('/properties/dictionary/withoutpaginglist', { treeCode:"INDUSTRIES",  ...params});
        if (res.iworkuCode == 200) {
            industry = res.datas;
            $store.commit('ipublic/$_set_industry', res.datas);
        } else {
        }
    }
    return industry;
}

/**
 *  获取项目状态字典
 */
export const getItemStatus= async ({$http, $store, $lang, $global}) => {
    let itemStatus = $store.getters['ipublic/itemStatus'];
    if (itemStatus.length == 0) {
        let params = {sortname: 'd_stort_en'};
        // $lang == $global.lang.en ? params.sortname = 'd_stort_en' : params.sortname = 'd_stort_zh';
        if ($lang == $global.lang.en) {
            params.sortname = 'd_stort_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'd_stort_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'd_stort_en'
        }
        let res = await $http.post('/properties/dictionary/withoutpaginglist', { treeCode:"ITEM_STATUS",  ...params});
        if (res.iworkuCode == 200) {
            itemStatus = res.datas;
            $store.commit('ipublic/$_set_itemStatus', res.datas);
        } else {
        }
    }
    return itemStatus;
}

/**
 *  获取目标公司类型
 */
export const getTargetType= async ({$http, $store, $lang, $global}) => {
    let targetType = $store.getters['ipublic/targetType'];
    if (targetType.length == 0) {
        let params = {sortname: 'd_stort_en'};
        // $lang == $global.lang.en ? params.sortname = 'd_stort_en' : params.sortname = 'd_stort_zh';
        if ($lang == $global.lang.en) {
            params.sortname = 'd_stort_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'd_stort_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'd_stort_en'
        }
        let res = await $http.post('/properties/dictionary/withoutpaginglist', { treeCode:"TARGET_COMPANY_CLIENT_TYPE",  ...params});
        if (res.iworkuCode == 200) {
            targetType = res.datas;
            $store.commit('ipublic/$_set_targetType', res.datas);
        } else {
        }
    }
    return targetType;
}

/**
 *  获取日程提醒颜色
 */
export const getRemindColor= async ({$http, $store, $lang, $global}) => {
    let remindColor = $store.getters['ipublic/remindColor'];
    if (remindColor.length == 0) {
        let params = {sortname: 'd_stort_en'};
        // $lang == $global.lang.en ? params.sortname = 'd_stort_en' : params.sortname = 'd_stort_zh';
        if ($lang == $global.lang.en) {
            params.sortname = 'd_stort_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'd_stort_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'd_stort_en'
        }
        let res = await $http.post('/properties/dictionary/withoutpaginglist', { treeCode:"SCHEDULE_SHOW_COLOUR",  ...params});
        if (res.iworkuCode == 200) {
            remindColor = res.datas;
            $store.commit('ipublic/$_set_remindColor', res.datas);
        } else {
        }
    }
    return remindColor;
}

/**
 *  获取目标公司重要程度
 */
export const getGrade= async ({$http, $store, $lang, $global}) => {
    let grade = $store.getters['ipublic/grade'];
    if (grade.length == 0) {
        let params = {sortname: 'd_stort_en'};
        // $lang == $global.lang.en ? params.sortname = 'd_stort_en' : params.sortname = 'd_stort_zh';
        if ($lang == $global.lang.en) {
            params.sortname = 'd_stort_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'd_stort_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'd_stort_en'
        }
        let res = await $http.post('/properties/dictionary/withoutpaginglist', { treeCode:"TARGETCOMPANY_GRADE",  ...params});
        if (res.iworkuCode == 200) {
            grade = res.datas;
            $store.commit('ipublic/$_set_grade', res.datas);
        } else {
        }
    }
    return grade;
}


/**
 *  目标公司状态   TARGET_COMPANY_STATUS
 */
export const getTargetStatus = async ({$http, $store, $lang, $global}) => {
    let grade = $store.getters['ipublic/targetStatus'];
    if (grade.length == 0) {
        let params = {sortname: 'd_stort_en'};
        // $lang == $global.lang.en ? params.sortname = 'd_stort_en' : params.sortname = 'd_stort_zh';
        if ($lang == $global.lang.en) {
            params.sortname = 'd_stort_en'
        } else if ($lang == $global.lang.zh) {
            params.sortname = 'd_stort_zh';
        } else if ($lang == $global.lang.vi) {
            params.sortname = 'd_stort_en'
        }
        let res = await $http.post('/properties/dictionary/withoutpaginglist', { treeCode:"TARGET_COMPANY_STATUS",  ...params});
        if (res.iworkuCode == 200) {
            grade = res.datas;
            $store.commit('ipublic/$_set_targetStatus', res.datas);
        } else {
        }
    }
    return grade;
}