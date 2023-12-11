$.store = '';

$(document).ready(function(){
    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.moduleCode == 'IT_ADMIN' || v.moduleCode == 'LOTUS_ENGINEERING'){
            auth = 1;
            $('#saveDraft').show();
            return false;
        }
    })
    
    $("#create-form").validate({
        rules: {
            unitName: {
                required: true,
                minlength: 2
            },
            unitType1: {
                required: true
            },
            mallCode: {
                required: true
            },
            selectFloor: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            selectUser1: {
                required: true
            },
            unitArea: {
                required: true
            },
            modality_1: {
                required: true
            },
            modality_2: {
                required: true
            }
        },
        messages: {
            unitName: {
                required: "请输入门牌号",
                minlength: "请输入完整门牌号"
            },
            unitType1: {
                required: "请选择铺位类型"
            },
            mallCode: {
                required: "请选择所属项目"
            },
            selectFloor: {
                required: "请选择所属楼层"
            },
            startDate: {
                required: "请选择生效开始日期"
            },
            endDate: {
                required: "请选择生效结束日期"
            },
            selectUser1: {
                required: "请选择铺位负责人1"
            },
            unitArea: {
                required: "请输入租赁面积"
            },
            modality_1: {
                required: "请选择一级业态"
            },
            modality_2: {
                required: "请选择二级业态"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            if(numberWithoutCommas($('#unitArea').val()) < 1 ) {
                auth = 0;
                $('#errorcontainer-unitArea').html('<label id="unitArea-error" class="error" for="unitArea" style="">租赁面积最小为1平方米</label>');
            } else {
                auth = 1;
                $('#errorcontainer-unitArea').html('<label id="unitArea-error" class="error" for="unitArea" style="display: none;"></label>');
            }
            
            if(auth == 1){
                saveStore();
            }
        }
    });
    
    updateDictDropDownByDictTypeCode('UNIT_TYPE', 'unitType1', '', '');
    updateUserDropDown(20);
    $("#mallCode").val(null).trigger('change');
    
    $("#mallCode").on('change',function(){
        findFloorDropDownByMallCode($('#mallCode').val());
        updateSelectStoreDropDownByMallCode(10,$('#mallCode').val());
    })
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true,
        'clearBtn': true
    });
    
    findStoreByCode();
    
    $("#modality_1").on('change',function(){
        if($(this).val() != '') {
            findBizByBiz1($(this).val());
        }
    })
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
})

function findStoreByCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByShopCode?shopCode="+getURLParameter('id'),
        type: "GET",
        async: true,
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
                
                if(response.data != null && response.data != ''){
                    $.store = response.data;
                    if(response.data.remarkFirst == 1 ){
                        $('#state').text('使用中');
                    } else {
                        $('#state').removeClass('badge-success').addClass('badge-danger').text('已删除');
                    }
                    $('#shopStatus').text(response.data.shopStatus == 1 ? '空闲' : '租用');
                    $('#name2').text(response.data.unitName+'['+response.data.unitCode+']');
                    
                    $('#unitCode').val(response.data.unitCode);
                    $('#unitName').val(response.data.unitName);
                    $('#remark').val(response.data.unitDesc);
                    updateDictByDictTypeCodeAndVal('UNIT_TYPE', 'unitType1', response.data.unitType);
                    $('#mallCode').val(response.data.mallCode).trigger('change');

                    updateSelectStoreDropDownByMallCode(10,response.data.mallCode);
                    if(response.data.remarkThird != null && response.data.remarkThird != ''){
                        var temp = response.data.remarkThird;
                        var unitParent = new Option((temp.split(':::')[0] +'['+ temp.split(':::')[1] +'] | '+ temp.split(':::')[2]), temp.split(':::')[1]+':::'+temp.split(':::')[3]+':::'+temp.split(':::')[0]+':::'+response.data.floorName+':::'+response.data.floorCode, true, true);
                        $('#selectStore').append(unitParent).trigger('change');
                    }
                    
                    $('#modality_1').val(response.data.modality1).trigger('change');
                    if(response.data.modality2 != null && response.data.modality2 != ''){
                        var modality_2 = new Option(response.data.modality2, response.data.modality2, true, true);
                        $('#modality_2').append(modality_2).trigger('change');
                    }
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    $('#unitArea').val(response.data.unitArea);
                    var floor = new Option(response.data.floorName, response.data.floorCode, true, true);
                    $('#selectFloor').append(floor).trigger('change');
                    if(response.data.approveFirst != null){
                        var selectUser1 = new Option(response.data.approveFirst, response.data.approveFirst, true, true);
                        $('#selectUser1').append(selectUser1).trigger('change');
                    }
                    if(response.data.approveSecond != null){
                        var selectUser2 = new Option(response.data.approveSecond, response.data.approveSecond, true, true);
                        $('#selectUser2').append(selectUser2).trigger('change');
                    }
                    if(response.data.approveThird != null){
                        var selectUser3 = new Option(response.data.approveThird, response.data.approveThird, true, true);
                        $('#selectUser3').append(selectUser3).trigger('change');
                    }
                    
                    if($('#modality_1').val() != '') {
                        findBizByBiz1($('#modality_1').val());
                    }
                    
                    $('input.money').each(function(){
                        if($(this).val() != ''){
                            $(this).val(accounting.formatNumber($(this).val()));
                        }
                    })
                }
            }
        }
    })
}

function findBizByBiz1(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality1?modality1="+encodeURIComponent(biz),
        type: "GET",
        async: true,
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
                
                if(response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        $('#modality_2').append('<option value="'+v.modality2+'">'+v.modality2+'</option>');
                        if ($("#modality_2 option:contains('"+v.modality2+"')").length > 1){
                            $("#modality_2 option:contains('"+v.modality2+"'):gt(0)").remove();
                        }
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function saveStore() {
    Ewin.confirm({ message: "确定要保存修改该铺位信息吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var shopState = 1;
        if(dateCompare($('#endDate').val(),date) == 'smaller'){
            shopState = 0;
        } 
                                
        var unitParent = null;
        if($('#selectStore').val() != null && $('#selectStore').val() != ''){
            unitParent = $('#selectStore').find('option:selected').val().split(':::')[2]+':::'+$('#selectStore').find('option:selected').val().split(':::')[0]+':::'+$('#selectStore').find('option:selected').text().split(' | ')[1]+':::'+$('#selectStore').find('option:selected').val().split(':::')[1];
        }

        var map = {
            "abcRent": $.store.abcRent,
            "approveFirst": $('#selectUser1').val(),
            "approveSecond":$('#selectUser2').val(),
            "approveThird": $('#selectUser3').val(),
            "area": numberWithoutCommas($('#unitArea').val()),
            "code": $.store.code,
            "creatorOpenId": $.store.creatorOpenId,
            "endDate": $('#endDate').val(),
            "enterFlag": $.store.enterFlag,
            "floorCode": $('#selectFloor').val(),
            "floorName": $('#selectFloor').find('option:selected').text(),
            "id": $.store.id,
            "liftFlag": $.store.liftFlag,
            "mallCode": $('#mallCode').val(),
            "modality": "",
            "modality1": $('#modality_1').val(),
            "modality2": $('#modality_2').val(),
            "mulitPathFlag": $.store.mulitPathFlag,
            "shopStatus": $.store.shopStatus,
            "shopState": shopState,
            "startDate": $('#startDate').val(),
            "unitCode": $.store.unitCode,
            "unitDesc": $('#remark').val(),
            "unitName": $('#unitName').val(),
            "unitSize": $.store.unitSize,
            "unitType": $('#unitType1').val(),
            "unitParent": unitParent,
            "updateOpenId": openId
        };

        $.ajax({
            url: $.api.baseLotus+"/api/shop/lotus/saveOrUpdate",
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
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    window.location.href = '/lotus-admin/stores?s=succeed';
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    })
}