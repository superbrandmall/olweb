$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.callout-info').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            case "fail":
                $('.callout-danger').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#webui').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowContracts(getURLParameter('page'),items);
    } else {
        ShowContracts(1,items);
    }

    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('10');
            break;
    }
});

function ShowContracts(p,c){
    $.ajax({
        url: $.api.baseLotus+"/api/user/contract/lotus/findAllByMallCode?mallCode="+$.cookie('mallSelected').split(':::')[1]+"&page="+(p-1)+"&size="+c+"&sort=id,desc",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0) { 
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
                    sessionStorage.setItem("contracts_"+$.cookie('mallSelected').split(':::')[1], JSON.stringify(response.data.content));

                    $.each(response.data.content, function(i,v){
                        var name = '';
                        if(v.userContractLotus.length > 0){
                            $.each(v.userContractLotus, function(j,w) {
                                if(w.user != null && w.user.settings != null) {
                                    name += '<a href="javascript: void(0);" onclick=\'javascript: modalToggle("'+w.user.settings.name+'","'+w.user.mobile+'","'+w.user.email+'")\'>'+w.user.settings.name+'</a> '
                                }
                            })
                        }
                        
                        $('#contractsL').append('\
                            <tr data-index="'+i+'">\n\
                            <td>'+(v.contractName || '无')+'</td>\n\
                            <td>'+v.contractType+'</td>\n\
                            <td>'+v.contractStatus+'</td>\n\
                            <td>'+v.unitCode+'</td>\n\
                            <td>'+v.unitArea+'</td>\n\
                            <td><a href=\'javascript: termsModalToggle("'+v.code+'")\'>查看详情</a></td>\n\
                            <td>'+name+'</td>\n\
                        </tr>');
                        
                        $('#contractsS').append('\
<tr data-index="'+i+'" onclick=\'javascript: termsModalToggle("'+v.code+'")\'>\n\
<td colspan="65">\n\
<div class="card-views"><div class="card-view"><span class="title">品牌名称</span><span class="value">'+(v.contractName || '无')+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">合同类型</span><span class="value">'+v.contractType+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">签约情况</span><span class="value">'+v.contractStatus+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">店铺位置代码</span><span class="value">'+v.unitCode+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">合同面积㎡</span><span class="value">'+v.unitArea+'</span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">操作</span><span class="value"><a href=\'javascript: termsModalToggle("'+v.code+'")\'>查看详情</a></span></div></div>\n\
<div class="card-views"><div class="card-view"><span class="title">授权用户</span><span class="value">'+name+'</span></div></div>\n\
</td></tr>');

                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function termsModalToggle(code){
    $.ajax({
        url: $.api.baseLotus+"/api/contract/rent/lotus/findAllByContractCode?contractCode="+code,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#deadRentL').append('<tr>\n\
<td>'+v.startDate+'</td>\n\
<td>'+v.endDate+'</td>\n\
<td>'+numberWithCommas(v.area)+'</td>\n\
<td>'+numberWithCommas(v.amount)+'</td>\n\
<td>'+numberWithCommas(v.taxAmount)+'</td>\n\
<td>'+v.rentAmount+'</td></tr>');
                    })
                }
            }
        }
    })
    
    $('#contract_terms').modal('toggle');
}

function modalToggle(name,mobile,email){
    if($('#user_detail').length > 0) {
        $('#user_detail').remove();
    }
    
    $('body').append('<div class="modal fade" id="user_detail" tabindex="-1" role="dialog" aria-hidden="true">\n\
    <div class="modal-dialog modal-md" style="max-width: 600px;">\n\
        <div class="modal-content c-square">\n\
            <div class="modal-header">\n\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n\
                    <span aria-hidden="true">×</span></button>\n\
                <h4 class="modal-title">用户详情</h4>\n\
            </div>\n\
            <div class="modal-body">\n\
                <div class="col-md-12">\n\
                    <div class="form-group">\n\
                        <span class="control-label">姓名:</span>\n\
                        <strong class="control-label">'+name+'</strong>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <span class="control-label">手机:</span>\n\
                        <strong class="control-label">'+mobile+'</strong>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <span class="control-label">邮箱:</span>\n\
                        <strong class="control-label">'+email+'</strong>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
    </div>\n\
</div>');
    
    $('#user_detail').modal('toggle');
}