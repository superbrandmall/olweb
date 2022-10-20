$(document).ready(function(){
    findAllProductCategory();
})

function findAllProductCategory() {
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/PRODUCT_CATEGORY",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null){
                    if(response.data.dictDataList.length > 0){
                        $.each(response.data.dictDataList, function(i,v) {
                            var state;
                            switch (v.state) {
                                case '1':
                                    state = "使用中";
                                    break;
                                case '0':
                                    state = "已删除";
                                    break;
                                default:
                                    state = "使用中";
                                    break;
                            }
                            
                            var dictInfos = [];
                            var dictInfo = '';
                            if(v.dictInfo != null) {
                                dictInfo = '应用于';
                                dictInfos = v.dictInfo.split(',');
                                $.each(dictInfos, function(j,w) {
                                    switch (w) {
                                        case '1':
                                            dictInfo += "正柜租赁";
                                            break;
                                        case '2':
                                            dictInfo += "kow租赁";
                                            break;
                                        case '3':
                                            dictInfo += "pop-up租赁";
                                            break;
                                        case '4':
                                            dictInfo += "kiosk租赁";
                                            break;
                                        case '5':
                                            dictInfo += "广告位租赁";
                                            break;
                                        case '6':
                                            dictInfo += "场地租赁";
                                            break;
                                        default:
                                            break;
                                    }
                                })
                            }
                            
                            $('#productCategory').append('<tr>\n\
                            <td><i class="fa fa-file-o"></i> '+v.dictName+'['+v.dictCode+']</td>\n\
                            <td>使用中</td>\n\
                            <td>'+dictInfo+'</td></tr>');
                        })
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    });
}