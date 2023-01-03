$.store = '';

$(document).ready(function(){    
    $("#create-form").validate({
        rules: {
            unitCode: {
                required: true,
                minlength: 2
            },
            unitName: {
                required: true,
                minlength: 2
            },
            mallCode: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            }
        },
        messages: {
            unitCode: {
                required: "请输入铺位代码",
                minlength: "请输入完整铺位代码"
            },
            unitName: {
                required: "请输入铺位名称",
                minlength: "请输入完整铺位名称"
            },
            mallCode: {
                required: "请选择所属门店"
            },
            startDate: {
                required: "请选择生效开始日期"
            },
            endDate: {
                required: "请选择生效结束日期"
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
                    $('#state').text(response.data.remarkFirst == 1 ? '使用中' : '已删除');
                    $('#shopStatus').text(response.data.shopStatus == 1 ? '空闲' : '租用');
                    $('#name2').text(response.data.unitName+'['+response.data.unitCode+']');
                    
                    if(response.data.remarkFirst == 0){
                        $('#saveDraft').hide();
                    }
                    
                    $('#unitCode').val(response.data.unitCode);
                    $('#unitName').val(response.data.unitName);
                    updateDictByDictTypeCodeAndVal('UNIT_TYPE', 'unitType', response.data.unitType);
                    $('#mallCode').val(response.data.mallCode).trigger('change');
                    $('#startDate').datepicker('update',response.data.startDate);
                    $('#endDate').datepicker('update',response.data.endDate);
                    $('#unitArea').val(response.data.unitArea);
                    if(response.data.unitSize != null){
                        var height = response.data.unitSize.split('x')[2];
                        $('#height').val(height);
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
        
        var height = $('#height').val();

        if($.store.remarkFirst == 1 && $.store.unitCode != '' && $.store.unitName!= '' && $.store.mallCode != '' && $.store.startDate != '' && $.store.endDate != ''){
            var map = {
                "abcRent": $.store.abcRent,
                "approveFirst": $.store.approveFirst,
                "approveSecond": $.store.approveSecond,
                "approveThird": $.store.approveThird,
                "area": numberWithoutCommas($('#unitArea').val()),
                "code": $.store.code,
                "creatorOpenId": $.store.creatorOpenId,
                "endDate": $('#endDate').val(),
                "enterFlag": $.store.enterFlag,
                "floorName": $.store.floorName,
                "id": $.store.id,
                "liftFlag": $.store.liftFlag,
                "mallCode": $('#mallCode').val(),
                "modality": $.store.modality,
                "mulitPathFlag": $.store.mulitPathFlag,
                "shopStatus": $.store.shopStatus,
                "startDate": $('#startDate').val(),
                "unitCode": $('#unitCode').val(),
                "unitDesc": $.store.unitDesc,
                "unitName": $('#unitName').val(),
                "unitSize": '0x0x'+height,
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
        }
    })
}