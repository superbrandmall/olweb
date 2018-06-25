$(document).ready(function(){
    if(getURLParameter('k')){
        switch (getURLParameter('k')) {
            case "reserved":
                $('.reserve-succeed').show().delay(2000).hide(0);
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/"+refineUrl() );
        },1000);
    }
    
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        ShowReservations(getURLParameter('page'),8);
    } else {
        ShowReservations(1,8);
    }
 });

function ShowReservations(p,c){
    $('#reserve_lists').html('');

    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/reservation/details/"+$.cookie('uid')+"?page="+Math.round(p-1)+"&size="+c+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(response.data.content.length > 0) {
                    generatePages(p, response.data.totalPages);
                    
                    var modal = [];
                    modal = $.parseJSON(sessionStorage.getItem("modalities"));
                    
                    var modalities = [];
                    $.each(modal, function(i,u) {
                        $.each(u.children, function(j,w) {
                            $.each(w.children, function(k,x) {
                                $.each(x.children, function(l,y) {
                                    modalities.push(y);
                                });
                            });
                        });
                    });
                    
                    $.each(response.data.content, function(i,v) {                        
                        var reserveTime = new Date();
                        reserveTime.setTime(v.reserveTime);
                        var reserveYear = reserveTime.getFullYear('yyyy');
                        var reserveMonth = reserveTime.getMonth('mm')+1;
                        var reserveDate = reserveTime.getDate('dd');
                        
                        var startTime = new Date();
                        startTime.setTime(v.startDate);
                        var startYear = startTime.getFullYear('yyyy');
                        var startMonth = startTime.getMonth('mm')+1;
                        var startDate = startTime.getDate('dd');
                        
                        var endTime = new Date();
                        endTime.setTime(v.endDate);
                        var endYear = endTime.getFullYear('yyyy');
                        var endMonth = endTime.getMonth('mm')+1;
                        var endDate = endTime.getDate('dd');
                        
                        var todayTime = new Date();
                        todayTime.setDate(todayTime.getDate());

                        var alertInfo, startEnd, reserveItems;
                        if(todayTime - v.created < 86400000 ){ //加24小时
                            alertInfo = '<span class="alert c-theme-bg c-font-white" style="display: block;" role="alert">预约成功，我们的招商人员会在2个工作日内与您取得联系。</span>';
                        } else {
                            alertInfo = '';
                        }
                        
                        if(v.shops.length > 0) {
                            startEnd = '&nbsp;&nbsp;&nbsp;<i class="icon-calendar"></i>租约日期: <span>'+startYear+'年'+startMonth+'月'+startDate+'日-'+endYear+'年'+endMonth+'月'+endDate+'日</span>';
                            reserveItems = '&nbsp;&nbsp;&nbsp;<i class="icon-briefcase"></i>预约数量: <span>'+v.shops.length+'家</span>';
                        } else {
                            startEnd = '';
                            reserveItems = '';
                        }

                        $('#reserve_lists').append('<div class="panel">\n\
<div class="panel-heading" role="tab" id="heading-'+i+'">\n\
<h4 class="panel-title"><a class="c-font-bold c-font-dark" data-toggle="collapse" data-parent="#reserve_lists" href="#collapse-'+i+'" aria-expanded="true">\n\
'+alertInfo+'<i class="icon-flag"></i>预约时间: <span class="c-content-label c-font-uppercase c-font-bold c-theme-bg">'+reserveYear+'年'+reserveMonth+'月'+reserveDate+'日</span>\n\
'+startEnd+reserveItems+'</a></h4></div>\n\
<div id="collapse-'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-'+i+'"><div class="panel-body c-font-18">\n\
<ul class="c-content-recent-posts-1" id="res_'+i+'" style="background-color: #fff;"></ul></div></div></div>');
                        
                        $('#collapse-0').addClass('in');
                        
                        if(v.shops.length > 0) {
                            $.each(v.shops, function(j,w) {
                                var modality;                        
                                if(w.modality !== '' && w.modality !== null){
                                    $.each(modalities, function(k,x) {
                                        if(x.code == w.modality) {
                                            modality = x.name;
                                        }
                                    });
                                } else {
                                    modality = "-";
                                }
                                
                                var EventList = ['公共区域','固定场地','临时场地'];
                                var redirect;
                                if($.inArray(w.subType,EventList) == -1){
                                    redirect = 'redirectToShop';
                                } else {
                                    redirect = 'redirectToEvent';
                                }
                                
                                $('#res_'+i).append('<li style="cursor:pointer" onclick=\''+redirect+'("'+w.code+'")\'>\n\
<div class="col-md-3"><img src="'+w.firstImage+'" alt="" class="img-responsive"></div>\n\
<div class="col-md-4"><ul class="c-content-list-1 c-theme c-separator-dot c-square">\n\
<li><span>'+w.mallName+'</span></li>\n\
<li>店铺编号: <span>'+w.unit+'</span></li>\n\
<li>所在楼层: <span>'+w.floorName+'</span></li>\n\
</ul></div>\n\
<div class="col-md-5"><ul class="c-content-list-1 c-theme c-separator-dot c-square">\n\
<li>推荐业态: <span>'+modality+'</span></li>\n\
<li>租赁面积: <span>'+w.area+'m²</span></li></ul></div></li>');
                            });
                        } else {
                            $('#res_'+i).append('<li class="c-font-dark">预约洽谈 <i class="icon-cup"></i></li>');
                        }
                        
                    });
                } else {
                    $('#reserve_lists').html('<div class="col-md-12"><i class="fa fa-info" aria-hidden="true"></i> 您目前没有任何看铺预约</div>');
                }
            } else {
                interpretBusinessCode(response.customerMessage);
            } 
        }
    });
}

function redirectToShop(c) {
    document.location = "shop?id="+c;
}

function redirectToEvent(c) {
    document.location = "event?id="+c;
}

function generatePages(currentPage, LastPage) {
    var pages = '';
    if (LastPage <= 6) {
        for(var i=1;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="c-active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
    } else {
        if(currentPage>1){
            var previousPage = +currentPage-1;
            pages += '<li><a href="?page='+previousPage+'">&lt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&lt;</span></li>';
        }
        for(var i=1;i<=3;i++) {
            if(i == currentPage ) {
                pages += '<li class="c-active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        pages += '<li class="c-space"><span>...</span></li>';
        for(var i=LastPage-2;i<=LastPage;i++) {
            if(i == currentPage ) {
                pages += '<li class="c-active"><a href="?page='+i+'">'+i+'</a></li>';
            } else {
                pages += '<li><a href="?page='+i+'">'+i+'</a></li>';
            }
        }
        if(currentPage<LastPage){
            var nextPage = +currentPage+1;
            pages += '<li><a href="?page='+nextPage+'">&gt;</a></li>';
        } else {
            pages += '<li class="c-space"><span>&gt;</span></li>';
        }
    }
    $(".c-content-pagination").append(pages);
}