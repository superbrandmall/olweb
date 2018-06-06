$.bid = {
	deadRent: "",
    floatingRentalRate: "",
    area: "",
    shopModality: "",
    mallCode: "",
    contractExpireDate: "",
    brandModality: "",
    limit: "",
    maintenanceFee: "",
    promotionBudget: "",
    rentFree: "",
    rentIncrease_1: "",
    rentIncrease_2: ""
};

$.record = null;
$.recordDetails = null;

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
var modal = [];
modal = $.parseJSON(sessionStorage.getItem("modalities"));

$(document).ready(function(){
    if($.cookie('merchantBrandCount') && $.cookie('merchantBrandCount') == 0) {
        window.location.href = "home?k=register-step-3";
    }
    
    if(getURLParameter('bid')){
        var bidmap = {
            code: getURLParameter('bid')
        };
    } else {
        var bidmap = null;
    }
    
    /******** 约定营业日 *********/
    $('#start_date, #end_date, #opening, .begin-rent-period').datepicker({
        'language': "zh-CN",
        'format': 'yyyy-mm-dd'
    });
    
    var map = {
        bidMerchantBrandVo: {
            code: $('#hidden_merchant_code').val()
        },
        shop: {
            code: getURLParameter('sid')
        },
        searchShopDetail: {
            code: getURLParameter('search')
        },
        bid: bidmap

    };
    
    $.ajax({
        url: $.api.base+"/bid/info",
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
        complete: function(){},
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                $('#loader').hide();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                $('#company_name').text(response.data.bidMerchantBrandVo.name);
        
                $.each(response.data.bidMerchantBrandVo.brands, function(i,v) {
                    var selected = ''; 
                    if(i == 0){
                        selected = 'selected';
                    }
                    $('#brand').append('<option value="'+v.code+'" modality="'+v.modality_1+'" selected="'+selected+'">'+v.name+'</option>');
                });

                var modality = response.data.shop.modality?response.data.shop.modality:'';
                var modalityName = GetBrandModality3(modality);
                var deadRent = response.data.shop.deadRent?numberWithCommas((response.data.shop.deadRent * 365 /12).toFixed(2)):'-';
                var area = response.data.shop.area?numberWithCommas(response.data.shop.area):'-';
                var floatingRentalRate = response.data.shop.floatingRentalRate?response.data.shop.floatingRentalRate:'-';
                $('#shop_info_1').html('<li> 店铺编号: '+response.data.shop.unit+'</li>\n\
    <li> 租赁面积: '+area+'m²</li>\n\
    <li> 参考租金: '+deadRent +'元/月</li>');

                $('#shop_info_2').html('<li> 所在楼层: '+response.data.shop.floorName+'</li>\n\
    <li> 推荐业态: '+modalityName+'</li>\n\
    <li> 参考扣率: '+(floatingRentalRate*100 || '-')+'%</li>');

                $.record = response.data.bid;
                $.recordDetails = response.data.bidDetails;

                if(getURLParameter('search') && response.data.searchShopDetail !== null) {
                    $('#brand').val(response.data.searchShopDetail.brandCode);
                    $('#start_date').val(response.data.searchShopDetail.start.split(' ')[0]);
                    $('#end_date').val(response.data.searchShopDetail.end.split(' ')[0]);
                }

                if(response.data.shop.contractExpireDate == null) { // 如果没有上一份合同
                    $.bid.contractExpireDate = '';
                    $('#start_date').val(IncrDate(date));
                } else {
                    $.bid.contractExpireDate = response.data.shop.contractExpireDate.split(' ')[0];
                    if(IncrMonth($.bid.contractExpireDate) < date) {
                        $('#start_date').val(IncrDate(date));
                    } else {
                        $('#start_date').val(IncrMonth($.bid.contractExpireDate));
                    }
                }

                if(getURLParameter('bid') && $.record !== null) { // 有过出价 
                    $('#brand').val($.record.brandCode);
                    $('input:radio[name=business_hours]')[$.record.businessHours-1].checked = true;
                    if($.record.businessHours === 2){
                        $('#extra_business_hour_1').val($.record.extraBusinessHour_1);
                        $('#extra_business_hour_2').val($.record.extraBusinessHour_2);
                    }
                    $('input:radio[name=cashier_mode]')[$.record.cashierMode-1].checked = true;
                    //$('#compare_frequency').val($.record.compareFrequency);
                    $('#end_date').val($.record.endDate.split(' ')[0]);
                    $('#free_days').val($.record.freeDays);
                    $('#gurantee').val(($.record.gurantee).toFixed(2));
                    $('.maintenance_after_decoration').val($.record.maintenanceAfterDecoration);
                    $('.maintenance_during_decoration').val($.record.maintenanceDuringDecoration);
                    $('#opening').datepicker('setDate',$.record.opening.split(' ')[0]);
                    $('#promotion').val($.record.promotion);
                    $('#promotion_budget').val($.record.promotionBudget);
                    $('#public_deposit').val($.record.publicDeposit);
                    $('#rent_method').val($.record.rentMethod);
                    $('#start_date').val($.record.startDate.split(' ')[0]);
                    $('#target').val($.record.target);
                    $('#length').val($.recordDetails.length);                
                } else { // 未有出价
                    if($('#brand').val() !== '' && modality != $("#brand").find("option:selected").attr("modality")) { // 店铺业态与品牌业态不符
                        $('#recommand_others').modal('show');
                        RecommandOthers(response.data.shop.mallCode, area);
                    };
                }
                
                $.bid.deadRent = response.data.shop.deadRent; // 推荐固定租金
                $.bid.floatingRentalRate = floatingRentalRate*100 || '-'; // 推荐浮动扣率
                $.bid.area = response.data.shop.area; // 店铺面积
                $.bid.shopModality = modality;
                $.bid.mallCode = response.data.shop.mallCode;
                
                /* 出价标准 */
                if($.bid.shopModality.substring(0,2) === '00') {
                    if(parseFloat($.bid.area) < 200) { // 商铺 < 200 m2
                        $.bid.limit = response.data.mallBidStandard.limitRetail_1; // 合约年限
                        $.bid.rentFree = response.data.mallBidStandard.rentFreeRetail_1; // 装修免租期
                    } else if(parseFloat($.bid.area) >= 200 && parseFloat($.bid.area) < 500) { // 200 <= 商铺 < 500 m2
                        $.bid.limit = response.data.mallBidStandard.limitRetail_2;
                        $.bid.rentFree = response.data.mallBidStandard.rentFreeRetail_2;
                    } else { // 商铺 >= 500 m2
                        $.bid.limit = response.data.mallBidStandard.limitRetail_3;
                        $.bid.rentFree = response.data.mallBidStandard.rentFreeRetail_3;
                    }
                } else {
                    if(parseFloat($.bid.area) < 100) { // 商铺 < 100 m2
                        $.bid.limit = response.data.mallBidStandard.limitNonretail_1; // 合约年限
                        $.bid.rentFree = response.data.mallBidStandard.rentFreeNonretail_1; // 装修免租期
                    } else if(parseFloat($.bid.area) >= 100 && parseFloat($.bid.area) < 500) { // 100 <= 商铺 < 500 m2
                        $.bid.limit = response.data.mallBidStandard.limitNonretail_2;
                        $.bid.rentFree = response.data.mallBidStandard.rentFreeNonretail_2;
                    } else if(parseFloat($.bid.area) >= 500) { // 商铺 >= 500 m2
                        $.bid.limit = response.data.mallBidStandard.limitNonretail_3;
                        $.bid.rentFree = response.data.mallBidStandard.rentFreeNonretail_3;
                    }
                }
                // 物业管理费
                $.bid.maintenanceFee = response.data.mallBidStandard.maintenanceFee;
                // 宣传推广费
                $.bid.promotionBudget = response.data.mallBidStandard.promotionBudget;
                // 租金递增
                $.bid.rentIncrease_1 = response.data.mallBidStandard.rentIncrease_1; // 1-3年
                $.bid.rentIncrease_2 = response.data.mallBidStandard.rentIncrease_2; // 4-8年
            }
        }
    });
    
    /******** 显示出价明细 *********/
    ShowTable();
    
    if($('#brand').val() !== '') {
        $.bid.brandModality = $("#brand").find("option:selected").attr("modality");
    };
    
    /******** 选择品牌 *********/
    $('#brand').change(function(){
        if($('#length').val() && $('#start_date').val() >= date){
            $('#end_date').datepicker('setDate', IncrYears($('#start_date').val(),$('#length').val()));
        }
        ShowTable();
        
        if($('#brand').val() !== '') {
            $.bid.brandModality = $("#brand").find("option:selected").attr("modality");
            
            if($.bid.shopModality != $("#brand").find("option:selected").attr("modality")) { // 店铺业态与品牌业态不符
                $('#recommand_others').modal('show');
                RecommandOthers($.bid.mallCode, $.bid.area);
            };
        };
        AlertLength();
    });
    
    /******** 选择租期 *********/
    $('#length').change(function(){
        if($('#length').val() && $('#start_date').val()){
            $('#end_date').datepicker('setDate', IncrYears($('#start_date').val(),$('#length').val()));
        }
        ShowTable();
        AlertLength();
    });
    
    $('#start_date, #rent_method').change(function(){ // 如有比高频率，需加入#compare_frequency
        if($('#length').val() && $('#start_date').val() >= date){
            $('#end_date').datepicker('setDate', IncrYears($('#start_date').val(),$('#length').val()));
        }
        ShowTable();
    });
    
    /******** 物业管理费 *********/
    if($.record === null){ // 如果未有出价
        var maintenance = ($.bid.maintenanceFee*(parseFloat($.bid.area))).toFixed(2);
        $('.maintenance_during_decoration, .maintenance_after_decoration').val(maintenance);
    }
    
    /******** 租赁保证金 *********/
    $('.dead_rent').bind('focusout',function(){
        ShowGurantee();
        
        if(parseFloat($(this).val()) < $.bid.deadRent) {
            alert('Tips: 如果采用我们推荐的参考租金，出价被接受的概率将会大大增加哦 : )');
        }
    });
    
    AlertLength();
    
    /******** 显示非标列表 *********/
    setInterval(function(){
        ListNonStandards();
    }, 5000);
    
    ///////////////////// Validate bid form /////////////////////////
    $("#bid_form").validate({
        rules: {
            brand: {
                required: true
            },
            length: {
                required: true
            },
            start_date: {
                required: true,
                date: true
            },
            dead_rent_1: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_2: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_3: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_4: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_5: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_6: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_7: {
                number: true,
                noStartingWith0: true
            },
            dead_rent_8: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_1: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_2: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_3: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_4: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_5: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_6: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_7: {
                number: true,
                noStartingWith0: true
            },
            floating_rent_8: {
                number: true,
                noStartingWith0: true
            },
            gurantee: {
                required: true,
                number: true,
                noStartingWith0: true
            },
            rent_method: {
                required: true
            },
            /*compare_frequency: {
                required: true
            },*/
            target: {
                required: true,
                number: true,
                noStartingWith0: true
            },
            public_deposit: {
                required: true,
                number: true,
                noStartingWith0: true
            },
            promotion: {
                required: true,
                digits: true,
                noStartingWith0: true
            },
            free_days: {
                required: true,
                digits: true,
                noStartingWith0: true
            },
            opening: {
                required: true,
                date: true
            },
            terms: {
                required: true
            }
        },messages: {
            brand: {
                required: "请选择品牌名称"
            },
            length: {
                required: "请选择租约年限"
            },
            start_date: {
                required: "请选择开始日期",
                date: "请输入有效日期"
            },
            dead_rent_1: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_2: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_3: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_4: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_5: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_6: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_7: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            dead_rent_8: {
                number: "租金金额应为数字",
                noStartingWith0: "请正确输入租金金额"
            },
            floating_rent_1: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_2: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_3: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_4: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_5: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_6: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_7: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            floating_rent_8: {
                number: "扣率应为数字",
                noStartingWith0: "请正确输入扣率"
            },
            gurantee: {
                required: "请输入租赁保证金数额",
                number: "保证金应为数字",
                noStartingWith0: "请正确输入保证金"
            },
            rent_method: {
                required: "请选择计租方式"
            },
            /*compare_frequency: {
                required: "请选择比高频率"
            },*/
            target: {
                required: "请输入目标营业额",
                number: "目标营业额应为数字",
                noStartingWith0: "请正确输入目标营业额"
            },
            public_deposit: {
                required: "请输入公共事业费押金数额",
                number: "公共事业费押金应为数字",
                noStartingWith0: "请正确输入公共事业费押金"
            },
            promotion: {
                required: "请输入推广活动次数",
                digits: "推广活动次数应为正整数",
                noStartingWith0: "请正确输入推广活动次数"
            },
            free_days: {
                required: "请输入免租期天数",
                digits: "免租期应为正整数",
                noStartingWith0: "请正确输入免租期天数"
            },
            opening: {
                required: "请选择约定营业日",
                date: "请输入有效日期"
            },
            terms: {
                required: "请阅读并同意本协议"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var brand = $('#brand').val();
            var start_date = $('#start_date').val();
            var end_date = $('#end_date').val();
            var gurantee = $('#gurantee').val();
            var promotion_budget = $('#promotion_budget').val();
            var rent_method = $('#rent_method').val();
            var compare_frequency = 1;
            var maintenance_during_decoration = $('#maintenance_during_decoration').val();
            var maintenance_after_decoration = $('#maintenance_after_decoration').val();
            var target = $('#target').val();
            var public_deposit = $('#public_deposit').val();
            var promotion = $('#promotion').val();
            var free_days = $('#free_days').val();
            var opening = $('#opening').val();
            var promotion_kind = $('#promotion_kind').val();
            var contract_length = $('#length').val();
            
            var business_hours = $('input[name="business_hours"]:checked').val();
            var extra_business_hour_1, extra_business_hour_2;
            if(business_hours == 1){
                extra_business_hour_1 = '';
                extra_business_hour_2 = '';
            } else {
                extra_business_hour_1 = $('#extra_business_hour_1').val();
                extra_business_hour_2 = $('#extra_business_hour_2').val();
            }
            var cashier_mode = $('input[name="cashier_mode"]:checked').val();
           
            if($.recordDetails == null) {
                var makeUpRecords = 8;
                $.recordDetails = [];
            } else {
                var makeUpRecords = 8-$.recordDetails.length;
            }
            
            for(var i=0;i<makeUpRecords;i++){
                $.recordDetails.push({startDate: null, endDate: null, deadRent: null, floatingRentalRate: null, orders: null, deleteFlag: null });
            }
            
            for(var i=1;i<=8;i++){
                var j = i - 1;
                $.recordDetails[j].startDate = $('#begin_rent_period_'+i).val();
                $.recordDetails[j].endDate = IncrYears($('#begin_rent_period_'+i).val(),1);
                $.recordDetails[j].deadRent = $('#dead_rent_'+i).val() || '0';
                $.recordDetails[j].floatingRentalRate = $('#floating_rent_'+i).val() || '0';
                $.recordDetails[j].orders = i;
                
                if(i<=$('#length').val()){
                    $.recordDetails[j].deleteFlag = false;
                } else {
                    $.recordDetails[j].deleteFlag = true;
                }
            }
            
            if($.record === null) { // 如果未有出价
                $.record = {};
                $.record.userCode = $.cookie('uid');
                $.record.merchantCode = $.cookie('mid');
                $.record.shopCode = getURLParameter('sid');
            } 
            $.record.brandCode = brand;
            $.record.startDate = start_date;
            $.record.endDate = end_date;
            $.record.gurantee = gurantee;
            $.record.promotionBudget = promotion_budget;
            $.record.promotionKind = promotion_kind;
            $.record.rentMethod = rent_method;
            $.record.compareFrequency = compare_frequency;
            $.record.maintenanceDuringDecoration = maintenance_during_decoration;
            $.record.maintenanceAfterDecoration = maintenance_after_decoration;
            $.record.target = target;
            $.record.publicDeposit = public_deposit;
            $.record.promotion = promotion;
            $.record.freeDays = free_days;
            $.record.opening = opening;
            $.record.businessHours = business_hours;
            $.record.extraBusinessHour_1 = extra_business_hour_1;
            $.record.extraBusinessHour_2 = extra_business_hour_2;
            $.record.cashierMode = cashier_mode;
            $.record.leaseType = 0; // 正柜 0，Popup 1， Kiosk 2
            $.record.accType = 0; // 租赁 0， 广场联销 1， 百货联销 2
            $.record.contractLength = contract_length;
                        
            var map = {
                bid: $.record,
                bidDetails: $.recordDetails
            };
            
            $.ajax({
                url: $.api.base+"/bid/save",
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
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    interpretBusinessCode(response.code);
                    
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        window.location.href = "my-offer";
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });    
});

function ShowTable(){
    if($.recordDetails !== null){
        ShowRecordTable();
    } else {
        if($('#brand').val() !== '' && $('#length').val() !== '' && $('#start_date').val() !== '' && $('#rent_method').val() !== '' && $('#bid_high_frequency').val() !== ''){
            $('#relevant_fees').fadeIn();

            for(var i=8;i>$('#length').val();i--) {
                $('#relevant_fees').find('tr:eq('+i+')').hide();
            }

            for(var i=1;i<=$('#length').val();i++) {
                $('#relevant_fees').find('tr:eq('+i+')').show();
            }

            /******** 开始时间 *********/
            $("#begin_rent_period_1,#hidden_begin_rent_period_1").datepicker('setDate', $("#start_date").val());
            for(var i=1;i<=8;i++) {
                var j=i+1;
                $("#begin_rent_period_"+j+", #hidden_begin_rent_period_"+j).datepicker('setDate', IncrYear($("#begin_rent_period_"+i).val()));
            }

            /******** 固定租金 *********/
            if($('#rent_method').val() !== 3 && $.bid.deadRent !== null) {
                $('#dead_rent_1').val($.bid.deadRent);

                if($('#length').val() < 4) {
                    var last;
                    for(var i=2;i<=$('#length').val();i++) {
                        last = i - 1;
                        $('#dead_rent_'+i).val((parseFloat($('#dead_rent_'+last).val())*1.08).toFixed(2));
                    }
                } else {
                    var last;
                    for(var i=2;i<=$('#length').val();i++) {
                        last = i - 1;
                        if(i%2==1){
                            $('#dead_rent_'+i).val((parseFloat($('#dead_rent_'+last).val())*1.1).toFixed(2));
                        } else {
                            $('#dead_rent_'+i).val($('#dead_rent_'+last).val());
                        }
                    }
                }
            }    

            /******** 浮动租金 *********/
            if($('#rent_method').val() !== 2 && $.bid.floatingRentalRate !== null && $.bid.floatingRentalRate != 0 && $.bid.floatingRentalRate != '-') {
                for(var i=1;i<=$('#length').val();i++) {
                    $('#floating_rent_'+i).val($.bid.floatingRentalRate);
                }
            }
            
            /******** 租赁保证金 *********/
            ShowGurantee();
        }
    }
}

function ShowRecordTable(){
    $('#relevant_fees').show();
    if($('#length').val()){
        for(var i=8;i>$('#length').val();i--) {
            $('#relevant_fees').find('tr:eq('+i+')').hide();
        }

        for(var i=1;i<=$('#length').val();i++) {
            $('#relevant_fees').find('tr:eq('+i+')').show();
        }

        for(var i=1;i<=$('#length').val();i++) {
            var j = i - 1;     
            if(i<=$.recordDetails.length){
                $("#begin_rent_period_"+i+", #hidden_begin_rent_period_"+i).datepicker('setDate', $.recordDetails[j].startDate.split(' ')[0]);
                $("#dead_rent_"+i).val($.recordDetails[j].deadRent.toFixed(2));
                $("#floating_rent_"+i).val($.recordDetails[j].floatingRentalRate);
            } else {
                $("#begin_rent_period_"+i+", #hidden_begin_rent_period_"+i).datepicker('setDate', IncrYear($("#begin_rent_period_"+j).val()));

                if($('#length').val() < 4) {
                    var last;
                    last = i - 1;
                    $('#dead_rent_'+i).val((parseFloat($('#dead_rent_'+last).val())*(parseFloat($.bid.rentIncrease_1/100) +1)).toFixed(2));
                } else {
                    var last;
                    last = i - 1;
                    if(i%2==1){
                        $('#dead_rent_'+i).val((parseFloat($('#dead_rent_'+last).val())*(parseFloat($.bid.rentIncrease_1/100) +1)).toFixed(2));
                    } else {
                        $('#dead_rent_'+i).val($('#dead_rent_'+last).val());
                    }
                }
                $("#floating_rent_"+i).val($.bid.floatingRentalRate);
            }
        }
    } else {
        for(var i=8;i>$.recordDetails.length;i--) {
            $('#relevant_fees').find('tr:eq('+i+')').hide();
        }

        for(var i=1;i<=$.recordDetails.length;i++) {
            $('#relevant_fees').find('tr:eq('+i+')').show();
        }

        for(var i=1;i<=$.recordDetails.length;i++) {
            var j = i - 1;
            $("#begin_rent_period_"+i+", #hidden_begin_rent_period_"+i).datepicker('setDate', $.recordDetails[j].startDate.split(' ')[0]);
            $("#dead_rent_"+i).val($.recordDetails[j].deadRent);
            $("#floating_rent_"+i).val($.recordDetails[j].floatingRentalRate);
        }
    }
}

function AlertLength(){
    if($('#brand').val() != '' && $('#length').val() != '' && $.bid.brandModality != null && $.bid.area != null){
        $('#free_days').val($.bid.rentFree);
        $('#opening').datepicker('setDate', IncrDates($('#start_date').val(),Math.round($.bid.rentFree-15))); 
    }
}

function ShowGurantee() {
    var max = 0, t;
    for(var i=1;i<=$('#length').val();i++) {
        t = parseFloat($('#dead_rent_'+i).val()) || 0;
        max = t > max ? t : max;
    }

    var gurantee = (3*(parseFloat(max)+parseFloat($('#maintenance_after_decoration').val()))).toFixed(2);
    $('#gurantee').val(gurantee);
}

function GetBrandModality3(mod) {
    var mm;
    if(mod !== null && mod !== '') {
        var m = mod;
        $.each(modal, function(i,v) {
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    $.each(x.children, function(l,y) {
                        if(y.code == m) {
                            mm = y.name;
                        }
                    });
                });
            });
        });
    } else {
        mm = '-';
    }
    
    return mm;
}

function ListNonStandards() {
    var lists = '';
    /* 若计租方式选择非提成租金”，首期固定租金小于参考租金，则为非标 */
    if($('#rent_method').val() != 3 && parseFloat($('#dead_rent_1').val()) < $.bid.deadRent) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 在固定租金的计租方式下，首期固定租金小于参考租金</li>';
    }
    
    /* 若计租方式选择非固定租金，首期浮动租金扣率小于参考扣率，则为非标 */
    if($('#rent_method').val() != 2 && parseFloat($('#floating_rent_1').val()) < $.bid.floatingRentalRate) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 在提成租金的计租方式下，首期浮动租金扣率小于参考扣率</li>';
    }

    /* 租期小于等于3年，若有固定租金，则后一期间的租金与前一期间的租金差异小于前一期金额的($.bid.rentIncrease_1)%，则为非标出价 */
    if($('#length').val() < 4) {
        var last;
        for(var i=2;i<=$('#length').val();i++) {
            last = i - 1;
            if(parseFloat($('#dead_rent_'+i).val()) / parseFloat($('#dead_rent_'+last).val()) < (parseFloat($.bid.rentIncrease_1/100) +1 - 0.01)) {
                lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 在租期小于等于3年的情况下，后一期间的租金与前一期间的租金差异小于前一期金额的'+$.bid.rentIncrease_1+'%</li>';
                break;
            }
        }
    }
    
    /* 租期大于3年，若有固定租金，则后一期间的租金与前一期间的租金差异小于前一期金额的10%，则为非标出价  在租期大于3年的情况下，后2年的租金与前2年的租金差异小于前一期金额的($.bid.rentIncrease_2)%。 */
    if($('#length').val() > 3) {
        var last;
        for(var i=2;i<=$('#length').val();i++) {
            last = i - 1;
            if(i%2 == 1 && parseFloat($('#dead_rent_'+i).val()) / parseFloat($('#dead_rent_'+last).val()) < (parseFloat($.bid.rentIncrease_1/100) +1 - 0.01)) {
                lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 在租期大于3年的情况下，后2年的租金与前2年的租金差异小于前一期金额的'+$.bid.rentIncrease_2+'%</li>';
                break;
            } else if (i%2 == 0 && parseFloat($('#dead_rent_'+i).val()) < parseFloat($('#dead_rent_'+last).val())) {
                lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 在租期大于3年的情况下，后2年的租金与前2年的租金差异小于前一期金额的'+$.bid.rentIncrease_2+'%</li>';
                break;
            }
        }
    }
    
    /* 浮动租金，后一期间扣率值小于前一期间扣率值，则为非标出价 */
    var last;
    for(var i=2;i<=$('#length').val();i++) {
        last = i - 1;
        if($('#floating_rent_'+i).val() != '' && $('#floating_rent_'+last).val() != '') {
            if(parseFloat($('#floating_rent_'+i).val()) < parseFloat($('#floating_rent_'+last).val())) {
                lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 后一期间扣率值小于前一期间扣率值</li>';
                break;
            }
        }
    }
    
    /* 推广宣传费小于($.bid.promotionBudget)%，则为非标出价 */
    if($('#promotion_budget').val() < $.bid.promotionBudget) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 推广宣传费小于'+$.bid.promotionBudget+'%</li>';
    }

    /* 装修期内/外物业管理费，小于50元/月/平米，则为非标出价 */
    if(($('#maintenance_during_decoration').val() / $.bid.area).toFixed(2) < $.bid.maintenanceFee || ($('#maintenance_after_decoration').val() / $.bid.area).toFixed(2) < $.bid.maintenanceFee) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 装修期内/外物业管理费小于'+$.bid.maintenanceFee+'元/月/平米</li>';
    }
    
    /* 保证金金额小于（最高含税月租金+最高含税装修期外物业管理费）*3倍，则为非标出价 */
    var max = 0, t;
    for(var i=1;i<=$('#length').val();i++) {
        t = parseFloat($('#dead_rent_'+i).val());
        max = t > max ? t : max;
    }
    
    if(parseFloat($('#gurantee').val()) < (3*(parseFloat(max)+parseFloat($('#maintenance_after_decoration').val()))).toFixed(2)) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 保证金金额小于（最高含税月租金+最高含税装修期外物业管理费）*3倍</li>';
    }
    
    /* 免租期或租赁期不符合以下，则为非标出价 */
    if($('#free_days').val() > $.bid.rentFree) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 免租期超出期限</li>';
    }
    if($('#length').val() > $.bid.limit) {
        lists += '<li><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 租赁期超出期限</li>';
    }
    
    $('#non_standard_list').html(lists);

}

function RecommandOthers(mc,area) {
    var mall = [];
    mall.push(mc);
    
    var map = {
        vo: {
            userCode: $.cookie('uid'),
            brandCode: $("#brand").val(),
            minArea: Math.round(area-30) > 0 ? Math.round(area-30) : 0,
            maxArea: Math.round(area+30) || '',
            start: $("#start_date").val() || '',
            end: $("#end_date").val() || '',
            mallCodes: mall
        }
    };
    
    $.ajax({
        url: $.api.base+"/searchshop/details",
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
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $('#recommand_others .modal-body').html('');
                
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
                
                $.each(response.data.shopScores, function(i,v){
                    if(i<6){
                        var modality;

                        if(v.shop.modality !== '' && v.shop.modality !== null){
                            $.each(modalities, function(k,x) {
                                if(x.code == v.shop.modality) {
                                    modality = x.name.split(' ');
                                    modality = modality[modality.length-1];
                                }
                            });
                        } else {
                            modality = "-";
                        }

                        $('#recommand_others .modal-body').append('<div class="col-md-4"><div class="c-content-person-1 c-option-2">\n\
    <div class="c-caption c-content-overlay"><div class="c-overlay-wrapper">\n\
    <div class="c-overlay-content"><a href="shop?id='+v.shop.code+'&search='+response.data.vo.code+'"><i class="icon-link"></i></a><a href="'+v.shop.firstImage+'" data-lightbox="fancybox" data-fancybox-group="gallery-4"><i class="icon-magnifier"></i></a></div></div><img class="c-overlay-object img-responsive" src="'+v.shop.firstImage+'" alt=""></div>\n\
    <div class="c-body"><div class="c-head"><div class="c-name c-font-uppercase c-font-bold" style="font-size: 16px;"><a href="shop?id='+v.shop.code+'&search='+response.data.vo.code+'">'+v.shop.mallName+'</a></div>\n\
    </div>\n\
    <div class="c-position">楼层: '+v.shop.floorName+'</div><div class="c-position">面积: '+v.shop.area+'m<sup>2</sup></div><div class="c-position">业态: '+modality+'</div>\n\
    <div class="c-position"></div></div>\n\
    </div></div>');
                    }
                });
            }
        }
    });
}

$.validator.addMethod("noStartingWith0", function(n, element) {
    n = n.replace(/\s+/g, ""); 
    if(n == 0 || n.substr(0,2) == '0.'){
        return this.optional(element) || n.match(/^[0-9]/);
    } else {
        return this.optional(element) || n.match(/^[1-9]/);
    }
}, "Number shouldn't start with 0");