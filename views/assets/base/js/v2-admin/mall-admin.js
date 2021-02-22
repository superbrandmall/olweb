$.mall = '';
$.mallBidStandard = {};

$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "update-succeed":
                $('#ui_succeed').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('#ui_succeed').offset().top
                }, 0);
                break;
            default:
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/admin/"+refineOfferUrl() );
        },1000);
    }
    
    GetMallInfo();
    
     $('#submit').click(function(){
        SaveMallInfo();
        //SaveMallBidStandard();
    });
});

function GetMallInfo(){
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/mall/"+getURLParameter('id')+"",
        type: "GET",
        async: false,
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
                
                var mall = response.data;
                $.mall = mall;
                $('#code').val(mall.mallCode || '-');
                $('#name').val(mall.mallName || '-');
                $('#name_eng').val(mall.mallNameEng || '-');
                $('#gross_area').val((mall.grossFloorArea || '-' ) + '平方米');
                $('#leasing_area').val((mall.leasingArea || '-' ) + '平方米');
                $('#location').val(mall.location || '-');
                $('#location_eng').val(mall.locationEng || '-');
                $('#phone').val(mall.phone || '-');
                $('#desc').val(mall.description || '-');
                $('#desc_eng').val(mall.descriptionEng || '-');
                
                var hdCode;
                switch(mall.mallCode){
                    case 'OLMALL180917000003':
                        hdCode = "100001";
                        break;
                    case 'OLMALL180917000002':
                        hdCode = "201001";
                        break;
                    case 'OLMALL180917000001':
                        hdCode = "204001";
                        break;
                    default:
                        hdCode = "100001";
                        break;
                }
                
                getMallFlow(hdCode);
                
                if(mall.traffic != null && mall.traffic != ''){
                    var traffics = mall.traffic;
                    $.each(traffics, function(i,v){
                        $('#traffics').append('\
<div class="col-lg-12">\n\
<div class="panel panel-default">\n\
<div class="panel-heading"><input class="form-control traffic-type" id="type_'+i+'" value="'+v.type+'"></div>\n\
<div class="panel-body"><p><input class="form-control" id="text_'+i+'" value="'+v.text+'"></p></div>\n\
</div></div>');
                        $('#traffics_eng').append('\
<div class="col-lg-12">\n\
<div class="panel panel-default">\n\
<div class="panel-heading"><input class="form-control" id="type_eng_'+i+'" value="'+v.typeEng+'"></div>\n\
<div class="panel-body"><p><input class="form-control" id="text_eng_'+i+'" value="'+v.textEng+'"></p></div>\n\
</div></div>');
                    });
                }
                
                /*if(response.data.mallBidStandard != null && response.data.mallBidStandard != ''){
                    var mallBidStandard = response.data.mallBidStandard;
                    $.mallBidStandard = mallBidStandard; 
                    $('#rent_free_retail_1').val(mallBidStandard.rentFreeRetail_1 || '');
                    $('#rent_free_retail_2').val(mallBidStandard.rentFreeRetail_2 || '');
                    $('#rent_free_retail_3').val(mallBidStandard.rentFreeRetail_3 || '');
                    $('#rent_free_non_retail_1').val(mallBidStandard.rentFreeNonretail_1 || '');
                    $('#rent_free_non_retail_2').val(mallBidStandard.rentFreeNonretail_2 || '');
                    $('#rent_free_non_retail_3').val(mallBidStandard.rentFreeNonretail_3 || '');

                    $('#limit_retail_1').val(mallBidStandard.limitRetail_1 || '');
                    $('#limit_retail_2').val(mallBidStandard.limitRetail_2 || '');
                    $('#limit_retail_3').val(mallBidStandard.limitRetail_3 || '');
                    $('#limit_non_retail_1').val(mallBidStandard.limitNonretail_1 || '');
                    $('#limit_non_retail_2').val(mallBidStandard.limitNonretail_2 || '');
                    $('#limit_non_retail_3').val(mallBidStandard.limitNonretail_3 || '');

                    $('#rent_increase_1').val(mallBidStandard.rentIncrease_1 || '');
                    $('#rent_increase_2').val(mallBidStandard.rentIncrease_2 || '');
                    $('#promotion_budget').val(mallBidStandard.promotionBudget || '');
                    $('#maintenance_fee').val(mallBidStandard.maintenanceFee || '');
                }*/
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

function SaveMallInfo(){
    $.mall.mallNameEng = $('#name_eng').val();
    $.mall.locationEng = $('#location_eng').val();
    $.mall.phone = $('#phone').val();
    $.mall.description = $('#desc').val();
    $.mall.descriptionEng = $('#desc_eng').val();
    var traffic = [];
    $(".traffic-type").each(function(i,v){
        traffic.push({
            'text':$("#text_"+i).val(),
            'textEng':$("#text_eng_"+i).val(),
            'type':$("#type_"+i).val(),
            'typeEng':$("#type_eng_"+i).val()
        });
    });
    $.mall.traffic = traffic;
    
    var map = $.mall;

    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/mall/save",
        type: "PUT",
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
                caching();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    }); 
}

function caching() {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-admin/api/base/info/mall/refresh",
        type: "POST",
        async: false,
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
                window.location.href = 'mall?id='+getURLParameter('id')+'&s=update-succeed';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });    
}

function getMallFlow(hd) {
    $.ajax({
        url: $.api.baseNew+"/sync-bi/api/bi/findByMallHdCode/"+hd,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            var upTy = [];
            var vehicleInTy = [];
            var salesTy = [];
            
            $.each(response.data, function(i,v){
                upTy.push(v.upTy);
                vehicleInTy.push(v.vehicleInTy);
                salesTy.push(v.salesTy);
            });
            
            showUpTy(upTy);
            showVehicleTy(vehicleInTy);
            showSalesTy(salesTy);
        }
    });
}

function showUpTy(upTy) {
    /********* 客流量 **********/   
    var lineChartData = {
        labels: ["二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "一月"],
        datasets: [
            {
                label: "客流量",
                fillColor: "rgba(21,186,103,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: upTy
            }
        ]
    };
    
    var ctx1 = $("#line-chart")[0].getContext("2d");
    window.myLine = new Chart(ctx1).Line(lineChartData, {
        responsive : true,
        showTooltips: true
    });
}

function showVehicleTy(vehicleInTy) {
    /********* 车库流量 **********/
    var lineChartData = {
        labels: ["二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "一月"],
        datasets: [
            {
                label: "车库流量",
                fillColor: "rgba(21,113,186,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: vehicleInTy
            }
        ]
    };
    
    var ctx2 = $("#line-chart2")[0].getContext("2d");
    window.myLine = new Chart(ctx2).Line(lineChartData, {
        responsive : true,
        showTooltips: true
    });
}

function showSalesTy(salesTy) {
    /********* 销售额 **********/
    var barData = {
        labels: ["二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "一月"],
        datasets: [
            {
                label: "销售额",
                fillColor: "rgba(21,186,103,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: salesTy
            }
        ]
    };
    
    var ctx3 = $("#bar-chart")[0].getContext("2d");
    window.myBar = new Chart(ctx3).Bar(barData, {
        responsive : true,
        showTooltips: true
    });
}

/*function SaveMallBidStandard(){
    $.mallBidStandard.rentFreeRetail_1 = $('#rent_free_retail_1').val();
    $.mallBidStandard.rentFreeRetail_2 = $('#rent_free_retail_2').val();
    $.mallBidStandard.rentFreeRetail_3 = $('#rent_free_retail_3').val();
    $.mallBidStandard.rentFreeNonretail_1 = $('#rent_free_non_retail_1').val();
    $.mallBidStandard.rentFreeNonretail_2 = $('#rent_free_non_retail_2').val();
    $.mallBidStandard.rentFreeNonretail_3 = $('#rent_free_non_retail_3').val();
    
    $.mallBidStandard.limitRetail_1 = $('#limit_retail_1').val();
    $.mallBidStandard.limitRetail_2 = $('#limit_retail_2').val();
    $.mallBidStandard.limitRetail_3 = $('#limit_retail_3').val();
    $.mallBidStandard.limitNonretail_1 = $('#limit_non_retail_1').val();
    $.mallBidStandard.limitNonretail_2 = $('#limit_non_retail_2').val();
    $.mallBidStandard.limitNonretail_3 = $('#limit_non_retail_3').val();
    
    $.mallBidStandard.rentIncrease_1 = $('#rent_increase_1').val();
    $.mallBidStandard.rentIncrease_2 = $('#rent_increase_2').val();
    $.mallBidStandard.promotionBudget = $('#promotion_budget').val();
    $.mallBidStandard.maintenanceFee = $('#maintenance_fee').val();
    
    var map = {
        mall : $.mall,
        mallBidStandard: $.mallBidStandard
    };
    $.ajax({
        url: $.api.base+"/mall/saveOrUpdate",
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
            interpretBusinessCode(response.customerMessage);
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                window.location.href = 'mall?id='+getURLParameter('id')+'&s=update-succeed';              
            }
        }
    });    
}*/