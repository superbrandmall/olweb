$(document).ready(function(){
    GetMyContracts(1,100);
});

$(window).bind("load", function() {
    if($.cookie('lang') === '2'){
        translateToEng();
    }
});

function GetMyContracts(p,c) {
    var map = {
        bid: {
            userCode: $.cookie('uid'),
            page: p,
            pageCount: c
        }     
    };
    
    $.ajax({
        url: $.api.base+"/bid/contractdetails",
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
                    var index,img,deposit;
                    $.each(response.data.pagination.details, function(i,v) {
                        index = i+1;

                        switch (v.isEffect) {
                            case 0:
                                deposit = '<a href="javascript: void(0);" id="deposit_'+v.code+'" class="pay-deposit btn c-theme-btn c-btn-square"><i class="fa fa-rmb" aria-hidden="true"></i> 缴纳保证金</a>';
                                break;
                            case 1:
                                deposit = '<span class="badge c-bg-green"><i class="fa fa-check" aria-hidden="true"></i> 已缴保证金</span>';
                                break;
                            default:
                                deposit = '';
                                break;
                        }

                        $('tbody').append('<tr><td>'+index+'</td>\n\
    <td>'+v.created.split(' ')[0]+'</td>\n\
    <td>'+v.unit+'</td>\n\
    <td><img src="'+v.firstImage+'" height="40" alt=""></td>\n\
    <td>'+v.mallName+'</td>\n\
    <td>'+v.floorName+'</td>\n\
    <td>'+numberWithCommas(v.area)+'m<sup>2</sup></td>\n\
    <td>'+v.brandName+'</td>\n\
    <td>'+deposit+'</td>\n\
    <td><a href="javascript: void(0);" id="contract_'+v.code+'" class="view-contract btn c-theme-btn c-btn-square"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> 查看合同</a></td></tr>');
                    });
                
                } else {
                    $('tbody').html('<tr><td colspan="10"><center><i class="fa fa-info" aria-hidden="true"></i> 您目前没有任何已审核的合同</center></td></tr>');
                }
                
                $('.pay-deposit').click(function(){
                   var c = $(this).attr('id').split('_')[1];
                   getPreview(c,'deposit');
                });
                
                $('.view-contract').click(function(){
                   var c = $(this).attr('id').split('_')[1];
                   getPreview(c,'contract');
                });
                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getPreview(c,obj) {
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
                if(obj === 'deposit'){
                    window.location.href = "deposit?key="+response.data.key;
                } else if(obj === 'contract'){
                    window.location.href = "contract?key="+response.data.key;
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function translateToEng() {
}