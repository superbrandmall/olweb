$.api = {
    base: $.base,
    baseLotus: $.base+"/onlineleasing-lotus",
    baseAdmin: $.base+"/onlineleasing-admin",
    baseCommYZJ: $.base+"/comm-yunzhijia",
    baseAuth: $.base+"/common-authorization",
    dictModule: [],
    dictContractType: 1, //租赁
    contractType: ['租赁','leasing'],
    formType: ['新签','new','续签','renew','终止','termination','变更','modify'],
    paymentMode: ['月付','M'],
    posMode: ['不用POS自收银','unUse'],
    profitCenter: ['租赁部','rent'],
    termCalcMode: ['新计算方法','NEW'],
    rentCalculationMode: ['固租与提成取高','fixedRentAndHigherDeduct'],
    contractTemplate: ['租期 > 6个月','1'],
    fivePercentFixedRent: ['SC126','SC127','SC140','SC124','SC046','SC029','SC028','SC102','SC109'],
    mallCodeSH: ['SC145','SC127','SC082','SC078','SC060','SC050','SC043','SC041','SC040','SC027','SC011','SC010','SC005','SC001','SC055','SC126','SC033']
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    if($.cookie('locationSelected') && $.cookie('locationSelected') != ''){
        $('.locationSelected').text($.cookie('locationSelected'));
    } else {
        $('.location-select ul li').each(function(i,elem){
            if($(elem).hasClass('to-select')){
                $('.locationSelected').text($(elem).find('span').text());
                $.cookie('locationSelected',$(elem).find('span').text());
                return false;
            }
        })
    }
        
    if(!sessionStorage.getItem("lotus_malls") || sessionStorage.getItem("lotus_malls") == null || sessionStorage.getItem("lotus_malls") == "null" || sessionStorage.getItem("lotus_malls") == '') {
        findAllMalls();
    } else {
        updateTopNavMallSelection();
    }
    
    if($.cookie('userModules') && $.cookie('userModules') != '' && $.cookie('userModules') != null){
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if($.inArray(v.userCode,['CUSER200524000004','CUSER210628000002','CUSER220615000003','CUSER221227000001']) == -1){
                $('.sidebar-menu > li').last().hide();
                return false;
            }
        })
    }
    
    $('.location-select .text-blue').click(function(){
        $.cookie('locationSelected',$(this).find('span').text());
        $('.locationSelected').text($.cookie('locationSelected'));
        $.cookie('mallSelected','');
        window.location.href = location.protocol + location.pathname;
    })
    
    $('.mall-select .text-blue').click(function(){
        $.cookie('mallSelected',$(this).find('span').text()+':::'+$(this).attr('data-code'));
        $('#mallSelected').text($.cookie('mallSelected').split(':::')[0]);
        window.location.href = location.protocol + location.pathname;
    })
    
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    
    var fixedNavHeight = $('.main-header').outerHeight();
    if (window.location.hash.indexOf('#') >= 0) {
        $('html,body').animate({
            scrollTop: ($(window.location.hash).offset().top - fixedNavHeight) + "px"
        }, 300);
    };
    $('.sidebar-menu .treeview-menu a').click(function() {
        var target = document.getElementById(this.hash.slice(1));
        if (!target) return;
        var targetOffset = $(target).offset().top - fixedNavHeight;
        $('html,body').animate({
                scrollTop: targetOffset
            },
            300);
        return false;
    });
    
    $('#createRenew, #createTerminate, #createModify, #createRenewMain, #createTerminateMain, #createModifyMain').click(function(){
        var ftTxt, ftVal,headTxt,rcdd,ftid,fheader,confirm;
        switch ($(this).attr('id')) {
            case "createRenew":
                ftTxt = $.api.formType[2];
                ftVal = $.api.formType[3];
                headTxt = '续签合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequest';
                break;
            case "createTerminate":
                ftTxt = $.api.formType[4];
                ftVal = $.api.formType[5];
                headTxt = '终止合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequest';
                break;
            case "createModify":
                ftTxt = $.api.formType[6];
                ftVal = $.api.formType[7];
                headTxt = '变更合同申请';
                rcdd = 'modifyContract';
                ftid = 'modifyUpdateFormType';
                fheader = 'modify';
                confirm = 'modifyCreateRequest';
                break;
            case "createRenewMain":
                ftTxt = $.api.formType[2];
                ftVal = $.api.formType[3];
                headTxt = '续签合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequestMain';
                break;
            case "createTerminateMain":
                ftTxt = $.api.formType[4];
                ftVal = $.api.formType[5];
                headTxt = '终止合同申请';
                rcdd = 'renewContract';
                ftid = 'renewUpdateFormType';
                fheader = 'renew-termination';
                confirm = 'renewCreateRequestMain';
                break;
            case "createModifyMain":
                ftTxt = $.api.formType[6];
                ftVal = $.api.formType[7];
                headTxt = '变更合同申请';
                rcdd = 'modifyContract';
                ftid = 'modifyUpdateFormType';
                fheader = 'modify';
                confirm = 'modifyCreateRequestMain';
                break;
            default:
                break;
        }
        
        
        updateDictDropDownByDictTypeCode('FORM_TYPE',ftid,ftTxt,ftVal);
        $('#investment-contract-request-'+fheader+'-create .modal-header').find('h4').text(headTxt);
        $.fn.modal.Constructor.prototype.enforceFocus = function() {};
        $('#investment-contract-request-'+fheader+'-create').find('.btn-info').attr('id', confirm);
        $('#investment-contract-request-'+fheader+'-create').modal('toggle');
        updateRequestContractDropDown(rcdd,10);
        $('.date-picker').datepicker({
            'language': 'zh-CN',
            'format': 'yyyy-mm-dd',
            'todayBtn': "linked",
            'todayHighlight': true,
            'startDate': '',
            'endDate': '',
            'autoclose': true
        });
        
        $('#renewCreateRequest, #modifyCreateRequest').click(function(){
            var id = $(this).attr('id').split('CreateRequest')[0];
            redirectCheck(id,'');
        })

        $('#renewCreateRequestMain, #modifyCreateRequestMain').click(function(){
            var id = $(this).attr('id').split('CreateRequest')[0];
            redirectCheck(id,'-main');
        })
    })
    
    if($('.mallCode').length > 0){
        updateSelectMallDropDown();
    }
    
    if($("#createContractDepartment").val() != '' && $("#createContractDepartment").val() != null){
        updateSelectStoreDropDownByMallCode(21,$("#createContractDepartment").val());
    }
    
    $("#createContractDepartment").on("select2:select",function(){
        if($("#createContractDepartment").val() != '' && $("#createContractDepartment").val() != null){
            updateSelectStoreDropDownByMallCode(21,$("#createContractDepartment").val());
        }
    })
    
    $('#createContract').click(function(){
        $.fn.modal.Constructor.prototype.enforceFocus = function() {};
        $('#investment-contract-request-create').modal('toggle');
        updateSelectTenantDropDown(51);
        updateBrandNameDropDown(21);
        updateDictDropDownByDictTypeCode('RENT_CALCULATION_MODE','createContractSelectRentCalculationMode',$.api.rentCalculationMode[0],$.api.rentCalculationMode[1]);
        $('.input-daterange').datepicker({
            'language': 'zh-CN',
            'format': 'yyyy-mm-dd',
            'todayBtn': "linked",
            'todayHighlight': true,
            'startDate': ($('#createContractStartDate').val() != '' ? $('#createContractStartDate').val() : ''),
            'endDate': $('#createContractEndDate').val(),
            'autoclose': true,
            'clearBtn': true
        });
    })
    
    $("#renewContract, #modifyContract").on("select2:select",function(){
        var id = $(this).attr('id').split('Contract')[0];
        $("#"+id+"Tenant").text($('#select2-'+id+'Contract-container').text().split(' | ')[0].split('[')[0]);
        $("#"+id+"ContractName").text($('#select2-'+id+'Contract-container').text().split(' | ')[1]);
        $("#"+id+"UnitName").text($('#select2-'+id+'Contract-container').text().split(' | ')[2]);
        $("#"+id+"StartEndDate").text($('#select2-'+id+'Contract-container').text().split(' | ')[3]);
    })
    
    $('#createContractRequest').click(function(){
        createContractCheck();
    })
    
    scrollJump();
    if($('#remark').length > 0){
        setTimeout(function () {
            resizeTextarea('remark');
        }, 3000);
    }
})