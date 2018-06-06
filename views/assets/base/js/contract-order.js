$.bid = '';

$(document).ready(function(){
    if($.cookie('merchantBrandCount') && $.cookie('merchantBrandCount') == 0) {
        window.location.href = "home?k=register-step-3";
    }
    
    if(getURLParameter('key')){
        viewPDF(getURLParameter('key'));
    }
    
    $('#business_suggestion_body, #legal_suggestion_body').summernote({
        minHeight: 200,
        lang: 'zh-CN',
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['view', ['codeview']]
        ]
    });
    
    $("#submit").click(function(){
        submitOffer($.bid);
    });
    
    ///////////////////// Validate business suggestion form /////////////////////////
    $("#business_suggestion_form").validate({
        rules: {
            business_suggestion_body: {
                required: true
            }
        },
        messages: {
            business_suggestion_body: {
                required: "请填写您的商务建议"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var markupStr = $('#business_suggestion_body').summernote('code');
            $('#business_body').val(markupStr);
            
            var map = {
                suggestVo: {
                    code: $.bid,
                    businessSuggest: markupStr        
                } 
            };
            
            $.ajax({
                url: $.api.base+"/bid/saveBusinessSuggest",
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
                complete: function(){},
                success: function (response, status, xhr) {
                    interpretBusinessCode(response.code);
                    
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        $('#business_suggestion').modal('hide');
                        $('#business_suggestion_link').append('<span class="badge c-bg-green c-font-bold" style="margin-left: 10px;"><i class="fa fa-info" aria-hidden="true" style="color: #fff;"></i></span>');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
    
    ///////////////////// Validate legal suggestion form /////////////////////////
    $("#legal_suggestion_form").validate({
        rules: {
            legal_body: {
                required: true
            }
        },
        messages: {
            legal_body: {
                required: "请填写您的法务建议"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var markupStr = $('#legal_suggestion_body').summernote('code');
            $('#legal_body').val(markupStr);
            
            var map = {
                suggestVo: {
                    code: $.bid,
                    legalSuggest: markupStr        
                } 
            };
            
            $.ajax({
                url: $.api.base+"/bid/saveLegalSuggest",
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
                complete: function(){},
                success: function (response, status, xhr) {
                    interpretBusinessCode(response.code);
                    
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        $('#legal_suggestion').modal('hide');
                        $('#legal_suggestion_link').append('<span class="badge c-bg-green c-font-bold" style="margin-left: 10px;"><i class="fa fa-info" aria-hidden="true" style="color: #fff;"></i></span>');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
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
                if(response.data.bidContract.pdfTemp !== null) {
                    $.bid = response.data.bidContract.code;
                    openPDF(response.data.bidContract.pdfTemp);
                }
                
                if(response.data.suggestVo.businessSuggest !== null){
                    $('#business_suggestion_link').append('<span class="badge c-bg-green c-font-bold" style="margin-left: 10px;"><i class="fa fa-info" aria-hidden="true" style="color: #fff;"></i></span>');
                    $('#business_suggestion_body').summernote({minHeight: 200});
                    $('#business_suggestion_body').summernote('code', response.data.suggestVo.businessSuggest);
                }
                
                if(response.data.suggestVo.legalSuggest !== null){
                    $('#legal_suggestion_link').append('<span class="badge c-bg-green c-font-bold" style="margin-left: 10px;"><i class="fa fa-info" aria-hidden="true" style="color: #fff;"></i></span>');
                    $('#legal_suggestion_body').summernote({minHeight: 200});
                    $('#legal_suggestion_body').summernote('code', response.data.suggestVo.legalSuggest);
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

function submitOffer(bid) {
    var map = {
        code: bid   
    };
    
    $.ajax({
        url: $.api.base+"/bid/submit",
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
        complete: function(){},
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                window.location.href = "my-offer";
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}