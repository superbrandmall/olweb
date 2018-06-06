$(document).ready(function(){
    GetMerchantInfo();    
});

function GetMerchantInfo(){
    var map = {
        merchant : {
            code: getURLParameter('id')
        }
    };
    $.ajax({
        url: $.api.base+"/merchant/findByCode",
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
                
                var merchant = response.data.merchant;
                $('#code').val(merchant.code || '-');
                $('#name').val(merchant.name || '-');
                $('#hd_code').val(merchant.hdCode || '-');
                $('#hd_state').val(merchant.hdState || '-');
                $('#capital').val((merchant.capital || '-') + '元');
                $('#shareholder').val(merchant.shareholder || '-');
                $('#type').val(merchant.type || '-');
                $('#uscc').val(merchant.uscc || '-');
                
                if(response.data.merchantAddress && response.data.merchantAddress != null) {
                    var merchantAddress = response.data.merchantAddress;
                    $('#city').val(merchantAddress.city || '-');
                    $('#province').val(merchantAddress.province || '-');
                    $('#street_address').val(merchantAddress.streetAddress	 || '-');
                    $('#mailing_address').val(merchantAddress.mailingAddress || '-');
                    $('#postal_code').val(merchantAddress.postalCode	 || '-');
                    $('#fax').val(merchantAddress.fax || '-');
                }
                
                if(response.data.merchantBankAccounts && response.data.merchantBankAccounts != '') {
                    $.each(response.data.merchantBankAccounts, function(i,v){
                        $('#bank_account tbody').append('<tr><td>'+v.bankAccount+'</td><td>'+v.bankAccountDesc+'</td></tr>');
                    });
                } else {
                    $('#bank_account tbody').append('<tr><td colspan="2">暂无银行账号!</td></tr>');
                }
                
                if(response.data.merchantBrands && response.data.merchantBrands != '') {
                    $.each(response.data.merchantBrands, function(i,v){
                        GetbrandInfo(v.brandCode,v.brandAuthor);
                    });
                } else {
                    $('#brands tbody').append('<tr><td colspan="2">暂无经营品牌!</td></tr>');
                }
                
                if(response.data.merchantBusinessLicense && response.data.merchantBusinessLicense != null && response.data.merchantBusinessLicense.businessLicense != null) {
                    $('#business_license').html('<img src="'+response.data.merchantBusinessLicense.businessLicense+'" class="img-responsive" alt="" />');
                } else {
                    $('#business_license').append('<text>暂无营业执照!</text>');
                }
            } 
        }
    });
}

function GetbrandInfo(bc,ba){
    var map = {
        brand : {
            code: bc
        }
    };
    $.ajax({
        url: $.api.base+"/brand/findByCode",
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
                
                if(ba != null) {
                    var brand_author = '<img src="'+ba+'" width="200" alt="" />';
                } else {
                    var brand_author = '无';
                }
                
                $('#brands tbody').append('<tr onclick=\'redirect("'+response.data.brand.code+'");\' style="cursor: pointer;"><td>'+response.data.brand.name+'</td><td>'+brand_author+'</td></tr>');
            } 
        }
    });
}

function redirect(id) {
  window.location='brand?id='+id;
}