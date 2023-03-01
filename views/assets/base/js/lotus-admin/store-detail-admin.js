$.store = '';

$(document).ready(function(){    
    $("#create-form").validate({
        rules: {
            unitName: {
                required: true,
                minlength: 2
            },
            unitType: {
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
                required: true,
                min: 0.01
            }
        },
        messages: {
            unitName: {
                required: "请输入门牌号",
                minlength: "请输入完整门牌号"
            },
            unitType: {
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
                required: true,
                min: 0.01
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveStore();
        }
    });
    
    updateDictDropDownByDictTypeCode('UNIT_TYPE', 'unitType', '', '');
    updateUserDropDown(20);
    $("#mallCode").val(null).trigger('change');
    
    $("#mallCode").on('change',function(){
        findFloorDropDownByMallCode($('#mallCode').val());
    })
    
    $('.date-picker, .input-daterange').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayBtn': "linked",
        'todayHighlight': true,
        'startDate': '',
        'endDate': '',
        'autoclose': true
    });
    
    findStoreByCode();
    
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
                
                if(response.data != null && response.data != ''){
                    $.store = response.data;
                    $('#state').text(response.data.state == 1 ? '使用中' : '已删除');
                    $('#shopStatus').text(response.data.shopStatus == 1 ? '空闲' : '租用');
                    $('#name2').text(response.data.unitName+'['+response.data.unitCode+']');
                    
                    $('#unitCode').val(response.data.unitCode);
                    $('#unitName').val(response.data.unitName);
                    $('#remark').val(response.data.unitDesc);
                    updateDictByDictTypeCodeAndVal('UNIT_TYPE', 'unitType', response.data.unitType);
                    $('#mallCode').val(response.data.mallCode).trigger('change');
                    var modality_1 = new Option(response.data.modality, response.data.modality, true, true);
                    $('#modality_1').append(modality_1).trigger('change');
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    $('#unitArea').val(response.data.unitArea);
                    var floor = new Option(response.data.floorName, response.data.floorCode, true, true);
                    $('#selectFloor').append(floor).trigger('change');
                    var selectUser1 = new Option(response.data.approveFirst, response.data.approveFirst, true, true);
                    $('#selectUser1').append(selectUser1).trigger('change');
                    var selectUser2 = new Option(response.data.approveSecond, response.data.approveSecond, true, true);
                    $('#selectUser2').append(selectUser2).trigger('change');
                    var selectUser3 = new Option(response.data.approveThird, response.data.approveThird, true, true);
                    $('#selectUser3').append(selectUser3).trigger('change');
                    
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
            "floorName": $('#select2-selectFloor-container').text(),
            "id": $.store.id,
            "liftFlag": $.store.liftFlag,
            "mallCode": $('#mallCode').val(),
            "modality": $('#modality_1').val(),
            "mulitPathFlag": $.store.mulitPathFlag,
            "shopStatus": $.store.shopStatus,
            "startDate": $('#startDate').val(),
            "unitCode": $.store.unitCode,
            "unitDesc": $('#remark').val(),
            "unitName": $('#unitName').val(),
            "unitSize": $.store.unitSize,
            "unitType": $('#unitType').val(),
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