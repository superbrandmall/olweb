$(document).ready(function(){
    GetMyBids(1,100);
    setInterval(function(){
        GetMyBids(1,100);
        if($.cookie('lang') === '2'){
            translateToEng();
        }
    }, 15000);
});

$(window).bind("load", function() {
    if($.cookie('lang') === '2'){
        translateToEng();
    }
});

function GetMyBids(p,c) {
    var map = {
        bid: {
            userCode: $.cookie('uid'),
            page: p,
            pageCount: c
        }     
    };
    
    $.ajax({
        url: $.api.base+"/bid/details",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                $('tbody').html('');
                if(response.data.pagination.details.length > 0) {
                    var index,process,floatingRent;
                    $.each(response.data.pagination.details, function(i,v) {
                        index = i+1;

                        switch (v.processState) {
                            case 1: //已保存
                                process = '<span class="badge c-bg-blue"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> 预览合同生成中，请稍等</span>';
                                break;
                            case 2: //预览合同生成
                                process = '<span class="badge c-bg-blue" style="margin-bottom: 5px;"><i class="fa fa-info" aria-hidden="true"></i> 请预览并提交合同以供审核</span><br><a href="javascript: void(0);" id="preview_'+v.code+'" class="preview btn c-theme-btn c-btn-square"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> 标准合同预览</a> <a href="offer?sid='+v.shopCode+'&bid='+v.code+'" class="btn c-theme-btn c-btn-square"><i class="fa fa-edit" aria-hidden="true"></i> 编辑</a>';
                                break;
                            case 4: //等待提交至海鼎
                                process = '<span class="badge c-bg-green"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> 出价提交中，请耐心等待</span>';
                                break;
                            case 5: //提交成功
                                process = '<span class="badge c-bg-green" style="margin-bottom: 5px;"><i class="fa fa-check" aria-hidden="true"></i> 出价已提交成功，正在审核中</span><br><a href="javascript: void(0);" id="preview_'+v.code+'" class="preview btn c-theme-btn c-btn-square"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> 标准合同预览</a>';
                                break;
                            case 6: //提交失败
                                process = '<span class="badge c-bg-green" style="margin-bottom: 5px;"><i class="fa fa-check" aria-hidden="true"></i> 出价已提交成功，正在审核中</span><br><a href="javascript: void(0);" id="preview_'+v.code+'" class="preview btn c-theme-btn c-btn-square"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> 标准合同预览</a>';
                                break;
                            case 7:
                                process = '<span class="badge c-bg-green" style="margin-bottom: 5px;"><i class="fa fa-check" aria-hidden="true"></i> 出价已提交成功，正在审核中</span><br><a href="javascript: void(0);" id="preview_'+v.code+'" class="preview btn c-theme-btn c-btn-square"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> 标准合同预览</a>';
                                break;    
                            case 9: //审批结束
                                process = '<span class="badge c-bg-yellow"><i class="fa fa-info" aria-hidden="true"></i> 抱歉您的出价为能审核通过，请重新出价</span>';
                                break;
                            default:
                                process = '<span class="badge c-bg-blue"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i> 预览合同生成中，请稍等</span>';
                                break;
                        }

                        floatingRent = v.floatingRentalRateMin === null ? '/' : (v.floatingRentalRateMin*100)+'-<br>'+(v.floatingRentalRateMax*100)+'%';

                        $('tbody').append('<tr><td>'+index+'</td>\n\
    <td>'+v.created.split(' ')[0]+'</td>\n\
    <td>'+v.unit+'</td>\n\
    <td>'+v.mallName+'</td>\n\
    <td>'+v.floorName+'</td>\n\
    <td>'+numberWithCommas(v.area)+'m<sup>2</sup></td>\n\
    <td>'+v.startDate.split(' ')[0]+'-<br>'+v.endDate.split(' ')[0]+'</td>\n\
    <td>'+numberWithCommas(v.deadRentMin)+'-<br>'+numberWithCommas(v.deadRentMax)+'元/月</td><td>'+floatingRent+'</td>\n\
    <td>'+process+'</td></tr>');
                    });
                
                } else {
                    $('tbody').html('<tr><td colspan="10"><center><i class="fa fa-info" aria-hidden="true"></i> 您目前没有任何出价</center></td></tr>');
                }
                
                $('.preview').click(function(){
                   var c = $(this).attr('id').split('_')[1];
                   getPreview(c);
                });
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getPreview(c) {
    var map = {
        code: c   
    };
    
    $.ajax({
        url: $.api.base+"/bid/preview",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                window.location.href = "contract-order?key="+response.data.key;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function translateToEng() {
    var e = $("table");
    e.html(e.html()
            .replace(/\预览合同生成中，请稍等/g, "Please wait until the contract to preview is made")
            .replace(/\标准合同预览/g, "Contract preview")
            .replace(/\编辑/g, "Edit")
            .replace(/\元/g, " yuan")
            .replace(/\月/g, "month")
            .replace(/\您目前没有任何出价/g, "You haven't made any offers yet"));
}