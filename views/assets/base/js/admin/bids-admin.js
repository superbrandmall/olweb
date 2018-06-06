$(document).ready(function(){
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowBids(getURLParameter('page'),50);
    } else {
        ShowBids(1,50);
    }
});

function ShowBids(p,c){
    var map = {
        bid: {
            page: p,
            pageCount: c
        }
    };
    $.ajax({
        url: $.api.base+"/bid/findAllByConditionPage",
        type: "POST",
        data: JSON.stringify(map),
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
                
                if(response.data.pagination.details.length > 0) {
                    var pages =  Math.ceil(response.data.pagination.totalCount / c);
                    generatePages(p, pages);
                    
                    $.each(response.data.pagination.details, function(i,v){
                        var processState;
                        switch(v.processState){
                            case 1:
                                processState = "<button type='button' class='btn btn-success'>已保存</button>";
                                break;
                            case 2:
                                processState = "<button type='button' class='btn btn-success'>预览合同生成</button>";
                                break;
                            case 3:
                                processState = "<button type='button' class='btn btn-warning'>预览合同生成失败</button>";
                                break;
                            case 4:
                                processState = "<button type='button' class='btn btn-success'>等待提交至海鼎</button>";
                                break;
                            case 5:
                                processState = "<button type='button' class='btn btn-success'>提交成功</button>";
                                break;
                            case 6:
                                processState = "<button type='button' class='btn btn-warning'>提交失败</button>";
                                break;
                            case 7:
                                processState = "<button type='button' class='btn btn-info'>暂不提交至海鼎</button>";
                                break;
                            case 9:
                                processState = "<button type='button' class='btn btn-success'>审批结束</button>";
                                break;
                            default:
                                processState = "<button type='button' class='btn btn-success'>已保存</button>";
                                break;
                        }
                        
                        var isApprove;
                        switch(v.isApprove){
                            case 0:
                                isApprove = "<button type='button' class='btn btn-warning'>未审核</button>";
                                break;
                            case 1:
                                isApprove = "<button type='button' class='btn btn-success'>已审核</button>";
                                break;
                            default:
                                isApprove = "<button type='button' class='btn btn-warning'>未审核</button>";
                                break;
                        }
                        
                        var isEffect;
                        switch(v.isEffect){
                            case 0:
                                isEffect = "<button type='button' class='btn btn-warning'>未生效</button>";
                                break;
                            case 1:
                                isEffect = "<button type='button' class='btn btn-success'>已生效</button>";
                                break;
                            default:
                                isEffect = "<button type='button' class='btn btn-warning'>未生效</button>";
                                break;
                        }
                        
                        $('table tbody').append('<tr onclick=\'redirect("'+v.code+'");\' style="cursor: pointer;"><td>'+v.code+'</td><td>'+v.mallName+'</td><td>'+v.unit+'</td><td>'+v.merchantName+'</td><td>'+v.brandName+'m<sup>2</sup></td><td>'+processState+'</td><td>'+isApprove+'</td><td>'+isEffect+'</td></tr>');
                    });
                    
                    if(p == pages){
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+response.data.pagination.totalCount+'条，共'+response.data.pagination.totalCount+'条记录');
                    } else {
                        $("#shows").html('显示第'+Math.ceil((p-1)*c+1)+'到'+Math.ceil((p-1)*c+c)+'条，共'+response.data.pagination.totalCount+'条记录');
                    }
                }
            } 
        }
    });
}

function redirect(id) {
  window.location='bid?id='+id;
}