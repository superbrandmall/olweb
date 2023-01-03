$(document).ready(function(){
    findRequestByBizId();
})

function findRequestByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByBizId?bizId="+getURLParameter('id'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    $('#mallName').text(data.mallName).attr('title',data.mallName);
                    $('#brandName').text(data.brandName).attr('title',data.brandName);
                    var created = data.created.split(' ')[0];
                    created = created.split('-')[0]+created.split('-')[1]+created.split('-')[2];
                    $('#created').text(created).attr('title',created);
                    updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));
                    
                    var path = data.formType;
                    if(path == 'new'){
                        path = 'request';
                    }
                    
                    $('.box-header .breadcrumb li:eq(0)').find('a').attr('href','/lotus-admin/'+path+'-summary?id='+getURLParameter('id'));
                    $('.box-header .breadcrumb li:eq(1)').find('a').attr('href','/lotus-admin/'+path+'-detail?id='+getURLParameter('id'));
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}