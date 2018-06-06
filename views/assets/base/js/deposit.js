$.bid = '';

$(document).ready(function(){
    if($.cookie('merchantBrandCount') && $.cookie('merchantBrandCount') == 0) {
        window.location.href = "home?k=register-step-3";
    }
    
    if(getURLParameter('key')){
        viewPDF(getURLParameter('key'));
    }
});

function viewPDF(key) {
    var map = {
        key: key
    };
    
    $.ajax({
        url: $.api.base+"/bid/view",
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
                if(response.data.bidContract.depositBillPdf !== null) {
                    $.bid = response.data.bidContract.code;
                    openPDF(response.data.bidContract.depositBillPdf);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function openPDF(pdf) {
    var map = {
        uri: pdf    
    };
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-file/api/download/pre",
        type: "POST",
        data: map,
        async: false,
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
                $('object').attr('data',$.api.baseNew+'/onlineleasing-file/api/download/file?key='+response.data.key+'&type=inline');
                $('object a').attr('href',$.api.baseNew+'/onlineleasing-file/api/download/file?key='+response.data.key+'&type=attachment');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}