/**
 *  获取各种配置
 */
export const getCountry = async ({$http, $store, $lang, $global}) => {
    let country = $store.getters['ipublic/country'];
    if (country.length == 0) {
        // 当前页面使用的那种语言，就根据这种语言排序
        let params = {sortname: 'area_sort_name_en'};
        $lang == $global.lang.en ? params.sortname = 'area_sort_name_en' : params.sortname = 'area_sort_name_zh';
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