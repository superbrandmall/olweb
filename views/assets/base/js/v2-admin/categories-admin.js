$(document).ready(function(){
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red'
    });
    
    if($.cookie('org') != '' && $.cookie('org') != null){
        findAllCategoriesWxByOrgCode($.cookie('org'));
    } else {
        findAllCategoriesWxByOrgCode('100001_上海陆家嘴正大广场');
    }
})

function findAllCategoriesWxByOrgCode(org) {
    $.cookie('org',org);
    $('.input-group input').val($.cookie('org').split('_')[1]);
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/brand/wx/base/findAllByStoreCode?storeCode="+$.cookie('org').split('_')[0],
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $('#loader').hide();
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('tbody').append('<tr>\n\
                        <td>'+v.categoryName+'</td>\n\
                        <td>'+v.categoryFirstName+'</td>\n\
                        <td>'+v.categorySecondName+'</td>\n\
                        <td></td>\n\
                        </tr>');
                    });
                }
            } else {
                interpretBusinessCode('#panel_table',response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}