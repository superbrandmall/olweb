$.tenant = '';

$(document).ready(function(){
    findTenantByCode();
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
    });
    
    $("#create-form").validate({
        rules: {
            tenantCode: {
                required: true,
                minlength: 4
            },
            name: {
                required: true,
                minlength: 2
            },
            type: {
                required: true
            },
            uscc: {
                required: true,
                rangelength: [18,18],
                numChar: true
            },
            regAddress: {
                required: true,
                minlength: 4
            },
            bankName: {
                required: true,
                minlength: 4
            },
            bankAccount: {
                required: true,
                minlength: 16
            },
            bankProvince: {
                required: true,
                minlength: 1
            },
            bankCity: {
                required: true,
                minlength: 1
            }
        },
        messages: {
            tenantCode: {
                required: "商户编码缺失",
                minlength: "商户编码长度不够"
            },
            name: {
                required: "请输入商户名称",
                minlength: "请输入完整商户名称"
            },
            type: {
                required: "请选择类型"
            },
            uscc: {
                required: "请输入统一社会信用代码/身份证号码",
                rangelength: "请输入正确统一社会信用代码/身份证号码",
                numChar: "请输入正确统一社会信用代码/身份证号码"
            },
            regAddress: {
                required: "请输入注册地址",
                minlength: "请输入正确注册地址"
            },
            bankName: {
                required: "请输入银行名称",
                minlength: "请输入正确银行名称"
            },
            bankAccount: {
                required: "请输入银行账号",
                minlength: "请输入正确银行账号"
            },
            bankProvince: {
                required: "请选择省",
                minlength: "请选择省"
            },
            bankCity: {
                required: "请选择市",
                minlength: "请选择市"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveTenant();
        }
    });
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
})

function findTenantByCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/tenant/lotus/findOneByCode?code="+getURLParameter('id'),
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
                    $.tenant = response.data;
                    findFilesByBizId();
                    findBankProvinceDropDown(response.data.bankProvinceCode,response.data.bankCityCode);
                    
                    if(response.data.messIdOs != null){
                        $('#tenantNav').append('<li><a href="/lotus-admin/tenant-history?id='+getURLParameter('id')+'&messid='+response.data.messIdOs+'">商户历史</a></li>');
                    }
                    
                    $('#state').text(response.data.state == 1 ? '使用中' : '已删除');
                    $('#tenantName').text(response.data.name);
                    $('#tenantCode2').text(response.data.tenantCode);
                    
                    if(response.data.contactList != null) {
                        if(response.data.contactList.length > 0) {
                            $.each(response.data.contactList, function(i,v) {
                                updateRowContactList(JSON.stringify(v));
                            })
                        }
                    }
                    
                    $('#tenantCode').val(response.data.tenantCode);
                    $('#name').val(response.data.name);
                    $('#type').val(response.data.type).trigger('change');
                    $('#capital').val(response.data.capital);
                    $('#businessScope').val(response.data.businessScope);
                    $('#uscc').val(response.data.uscc);
                    $('#shareHolder').val(response.data.shareHolder);
                    $('#remarkFirst').val(response.data.remarkFirst);
                    $('#bankAccount').val(response.data.bankAccount);
                    $('#bankName').val(response.data.bankName);
                    $('#deliveryAddress').val(response.data.deliveryAddress);
                    $('#mail').val(response.data.mail);
                    $('#phoneNum').val(response.data.phoneNum);
                    $('#regAddress').val(response.data.regAddress);                  
                    $('#tenantUpdated').text('最近更新：  ['+(response.data.updateOpenId != 'admin' ? renderUserName(response.data.updateOpenId) : 'admin')+']');
                    
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

function saveTenant() {
    Ewin.confirm({ message: "确定要保存修改该商户信息吗？" }).on(function (e) {
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
        
        $.tenant.creatorOpenId = openId;
        $.tenant.updateOpenId = openId;
        if($('#capital').val() != '' && numberWithoutCommas($('#capital').val()) > 0){
            $.tenant.capital = numberWithoutCommas($('#capital').val());
        } else {
            $.tenant.capital = null;
        }
        $.tenant.tenantCode = $('#tenantCode').val();
        $.tenant.name = $('#name').val() || null;
        $.tenant.type = $('#type').val() || null;
        $.tenant.businessScope = $('#businessScope').val() || null;
        $.tenant.uscc = $('#uscc').val() || null;
        $.tenant.shareHolder = $('#shareHolder').val() || null;
        $.tenant.remarkFirst = $('#remarkFirst').val() || null;
        $.tenant.address = $('#remarkFirst').val() || null;
        $.tenant.bankAccount = $('#bankAccount').val() || null;
        $.tenant.bankName = $('#bankName').val() || null;
        $.tenant.deliveryAddress = $('#deliveryAddress').val() || null;
        $.tenant.mail = $('#mail').val() || null;
        $.tenant.phoneNum = $('#phoneNum').val() || null;
        $.tenant.regAddress = $('#regAddress').val() || null;
        $.tenant.bankProvinceCode = $('#bankProvince').val() != '' ?  $('#bankProvince').val() : null;
        $.tenant.bankProvinceName = $('#bankProvince').val() != '' ?  $('#bankProvince').find('option:selected').text() : null;
        $.tenant.bankCityCode = $('#bankCity').val() != '' ?  $('#bankCity').val() : null;
        $.tenant.bankCityName = $('#bankCity').val() != '' ?  $('#bankCity').find('option:selected').text() : null;

        var contactList = [];
        var index;
        $("#contactList").find("tr").each(function(i,e){
            var contact = {};
            index = i * 1 + 1;
            contact.name = $('#contactListName_'+index).val();
            contact.cardId = $('#contactListCardId_'+index).val();
            contact.title = $('#contactListTitle_'+index).val();
            contact.tenantCode = $.tenant.tenantCode;
            contact.bdFlag = $('#contactListBdFlag_'+index).val();
            contact.mobileNo = $('#contactListMobileNo_'+index).val();
            contact.phoneNum = $('#contactListPhoneNum_'+index).val();
            contact.mail = $('#contactListMail_'+index).val();
            contact.address = $('#contactListAddress_'+index).val();
            if($('#contactListEsignFlag_'+index).prop('checked') == true){
                contact.esignFlag = 1;
            } else {
                contact.esignFlag = 0;
            }
            if($('#contactListFinanceFlag_'+index).prop('checked') == true){
                contact.financeFlag = 1;
            } else {
                contact.financeFlag = 0;
            }
            if($('#contactListLegalFlag_'+index).prop('checked') == true){
                contact.legalFlag = 1;
            } else {
                contact.legalFlag = 0;
            }
            contactList.push(contact);
        })
        
        $.tenant.contactList = contactList;
        
        if($.tenant.tenantCode != '' && $.tenant.name!= '' && $.tenant.type != '' && $.tenant.uscc != '' && $.tenant.regAddress != '' && $.tenant.bankProvinceCode!= '' && $.tenant.bankProvinceName != null && $.tenant.bankCityCode != '' && $.tenant.bankCityName != null){
            $.ajax({
                url: $.api.baseLotus+"/api/tenant/lotus/saveOrUpdate",
                type: "POST",
                data: JSON.stringify($.tenant),
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

                        window.location.href = '/lotus-admin/tenants?s=succeed';
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

function findFilesByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+$.tenant.code,
        type: "GET",
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
            if(response.code === 'C0') {
                if(response.data != null && response.data != '' && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        sessionStorage.setItem("uploadFile_"+v.id,JSON.stringify(v));
                        
                        var bizType = v.bizType.split('_')[1];
                        var type;
                        switch (bizType) {
                            case "BL":
                                type = 'businessLicense';
                                break;
                            case "IC":
                                type = 'idCard';
                                break;
                            default:
                                break;
                        }
                        
                        $("input[id*='"+type+"_']").each(function(j,e){
                            if($('#'+type+'_'+j).val() == ''){
                                $('#'+type+'_'+j).val(v.fileName);
                                var fileSize;
                                if(v.fileSize >= 1024 && v.fileSize < 1048576){
                                    fileSize = Math.round(v.fileSize / 1024 * 100) / 100 + 'Kb';
                                } else if(v.fileSize >= 1048576){
                                    fileSize = Math.round(v.fileSize / 1048576 * 100) / 100 + 'Mb';
                                } else {
                                    fileSize = v.fileSize + 'b';
                                }
                                $('#'+type+'FileSize'+'_'+j).text(fileSize);
                                $('#'+type+'Created'+'_'+j).text(v.created);
                                $('#'+type+'Action'+'_'+j).html('\
    <a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">查看文件</a> | \n\
    <a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+v.id+'")\'>删除文件</a>\n\
    <input type="hidden" id="file_'+v.id+'" />');
                                $('#'+type+'_'+j).parent().parent().show();
                                return false;
                            }
                        })
                    })
                }
            }
        }
    })
}

function fileUpload(id) {
    if($('#uploadFile_'+id).parent().find("input[type=file]").val() != ''){
        var fileName, type;
        switch (id) {
            case "businessLicense":
                fileName = '营业执照_'+$.tenant.name+'_'+date;
                type = 'BL';
                break;
            case "idCard":
                fileName = '法人代表身份证件_'+$.tenant.name+'_'+date;
                type = 'IC';
                break;
            default:
                break;
        }
    
        var formData = new FormData();
        var file = $('#uploadFile_'+id).parent().find("input[type=file]")[0].files[0];
        formData.append('file', file,fileName+'.'+file.name.split('.')[file.name.split('.').length - 1]);

        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        var upload = $.ajax({
            type: "POST",
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+$.tenant.code+"&creatorOpenId="+openId+"&activityName=&bizType=TENANT_"+type,
            data: formData,
            async: false,
            cache: false,
            timeout: 30000,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete : function(){},
            success: function(response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }

                    sessionStorage.setItem("uploadFile_"+response.data.id,JSON.stringify(response.data));

                    $('#fileName_'+id).val('');
                    $('#uploadFile_'+id).parent().find("input[type=file]").val('');
                    
                    $("input[id*='"+id+"_']").each(function(i,e){
                        if($('#'+id+'_'+i).val() == ''){
                            $('#'+id+'_'+i).val(response.data.fileName);
                            var fileSize;
                            if(response.data.fileSize >= 1024 && response.data.fileSize < 1048576){
                                fileSize = Math.round(response.data.fileSize / 1024 * 100) / 100 + 'Kb';
                            } else if(response.data.fileSize >= 1048576){
                                fileSize = Math.round(response.data.fileSize / 1048576 * 100) / 100 + 'Mb';
                            } else {
                                fileSize = response.data.fileSize + 'b';
                            }
                            $('#'+id+'FileSize'+'_'+i).text(fileSize);
                            $('#'+id+'Created'+'_'+i).text(response.data.created);
                            $('#'+id+'Action'+'_'+i).html('\
<a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+response.data.bizId+'&fileId='+response.data.fileId+'" target="_blank">查看文件</a> | \n\
<a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+response.data.id+'")\'>删除文件</a>\n\
<input type="hidden" id="file_'+response.data.id+'" />');
                            $('#'+id+'_'+i).parent().parent().show();
                            return false;
                        }
                    })
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
               if(textStatus == 'TIMEOUT'){
                    upload();
                }
            }
        });
    }
}

function deleteFile(id) {
    var file = $.parseJSON(sessionStorage.getItem("uploadFile_"+id));
    file.update = '';
    file.state = 0;
    
    var bizType = file.bizType.split('_')[1];
    
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(file),
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
                
                var type;
                switch (bizType) {
                    case "BL":
                        type = 'businessLicense';
                        break;
                    case "IC":
                        type = 'idCard';
                        break;
                    default:
                        break;
                }

                var row = $('#file_'+id).parent().parent();
                row.hide();
                row.find("input[id*='"+type+"_']").val('');
                row.find("td[id*='"+type+'FileSize'+"_']").text('');
                row.find("td[id*='"+type+'Created'+"_']").text('');
                row.find("td[id*='"+type+'Action'+"_']").html('');
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function updateRowContactList(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    var column6 = createRowColumn(newrow);
    var column7 = createRowColumn(newrow);
    var column8 = createRowColumn(newrow);
    var column9 = createRowColumn(newrow);
    var column10 = createRowColumn(newrow);
    var column11 = createRowColumn(newrow);
    var column12 = createRowColumn(newrow);
    var column13 = createRowColumn(newrow);
    
    var table = document.getElementById('tenantContactList');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var div = document.createElement("div"); //姓名
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListName_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.name || ''));
    column2.appendChild(input);
    
    var div = document.createElement("div"); //身份证号
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListCardId_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.cardId || ''));
    column3.appendChild(input);
    
    var div = document.createElement("div"); //岗位
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListTitle_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.title|| ''));
    column4.appendChild(input);
    
    var select = document.createElement("select"); //分类
    select.setAttribute("class","select2");
    select.setAttribute("id","contactListBdFlag_"+count.toLocaleString());
    select.options[0] = new Option('业务拓展','1');
    select.options[1] = new Option('财务','2');
    select.options[2] = new Option('法务','3');
    column5.appendChild(select);
    
    var div = document.createElement("div"); //手机
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListMobileNo_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.mobileNo || ''));
    column6.appendChild(input);
    
    var div = document.createElement("div"); //办公电话
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListPhoneNum_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.phoneNum || ''));
    column7.appendChild(input);
    
    var div = document.createElement("div"); //电子邮件
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListMail_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.mail || ''));
    column8.appendChild(input);
    
    var div = document.createElement("div"); //详细地址
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","contactListAddress_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",(value.address || ''));
    column9.appendChild(input);
    
    var checkbox = document.createElement("input"); //线上签章人
    checkbox.setAttribute("id","contactListEsignFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.esignFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column10.appendChild(checkbox);
    
    var checkbox = document.createElement("input"); //接收财函
    checkbox.setAttribute("id","contactListFinanceFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.financeFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column11.appendChild(checkbox);
    
    var checkbox = document.createElement("input"); //接收法函
    checkbox.setAttribute("id","contactListLegalFlag_"+count.toLocaleString());
    checkbox.setAttribute("type", "checkbox");
    if(value.legalFlag == 1){
        checkbox.setAttribute("checked", "");
    }
    column12.appendChild(checkbox);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column13.appendChild(remove);

    tbody.appendChild(newrow);
    
    $("#contactListBdFlag_"+count.toLocaleString()).val(value.bdFlag).trigger("change");
    $('#tenantContactList .select2').select2();
}

function findBankProvinceDropDown(p,c) {
    var map = {
        "conditionGroups": [],
        "params": [
          {
            "columnName": "state",
            "columnPatten": "",
            "conditionOperator": "AND",
            "operator": "=",
            "value": "1"
          }
        ]
    }
    
    $.ajax({
        url: $.api.baseSap+"/api/sap/bank/city/findAllByKVCondition?page=0&size=1000&sort=areaCode,asc",
        type: "POST",
        data: JSON.stringify(map),
        async: true,
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0){
                    $('#bankProvince').html('<option value="">未选择</option>');
                    var arr = response.data.content;
                    var area = [];
                    $.each(arr, function(i,v) {
                        if($.inArray(v.areaCode,area) == -1){
                            area.push(v.areaCode);
                            $('#bankProvince').append('<option value="'+v.areaCode+'">'+v.areaName+'</option>');
                        }
                    })
                    
                    if(p != null){
                        $('#bankProvince').val(p).trigger('change');
                        renderBankCityDropDown(JSON.stringify(arr));
                    }
                    
                    $("#bankProvince").on('change',function(){
                        renderBankCityDropDown(JSON.stringify(arr));
                    })
                    
                    if(c != null){
                        $('#bankCity').val(c).trigger('change');
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    });
}

function renderBankCityDropDown(pc) {
    var arr = JSON.parse(pc);
    $('#bankCity').html('<option value="">未选择</option>');
    $.each(arr, function(i,v) {
        if($("#bankProvince").val() == v.areaCode){
            $('#bankCity').append('<option value="'+v.cityCode+'">'+v.cityName+'</option>');
        }
    })
}