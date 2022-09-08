html2canvas(document.querySelector(".content"), {
    useCORS: true,
    scale: 2,
    height: $('.content').height() - 5
}).then(canvas => {
    var image = canvas.toDataURL("image/png");
    var formData = new FormData();
    var fileName = $.request.content.mallName+'_'+$.request.content.brandName+'_'+$.request.content.unitCode+'_更改租赁合同申请单_'+bizId;
    formData.append('file', dataURLtoFile(image,fileName+'.png','image/png'));

    var upload = $.ajax({
        type: "POST",
        url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+bizId+"&creatorOpenId="+openId+"&activityName=&bizType=CONTRACT_screenshot",
        data: formData,
        async: false,
        cache: false,
        timeout: 15000,
        processData: false,
        contentType: false,
        beforeSend: function(request) {
            $('#submitState').fadeOut().text('检查完毕，上传单据快照中...').fadeIn();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(jqXHR, textStatus, errorThrown) {
           if(textStatus == 'timeout'){
                upload.abort();
                upload();
            }
        },
        success: function(response, status, xhr) {
            if(response.code === 'C0') {
                var submitRentContractForm = $.ajax({
                    url: $.base+"/zuul/onlineleasing-lotus/api/rent/contract/form/submit",
                    type: "POST",
                    data: JSON.stringify(map),
                    async: false,
                    timeout: 15000,
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function(request) {
                        $('#submitState').fadeOut().text('上传完毕，提交单据中...').fadeIn();
                        request.setRequestHeader("Login", $.cookie('login'));
                        request.setRequestHeader("Authorization", $.cookie('authorization'));
                        request.setRequestHeader("Lang", $.cookie('lang'));
                        request.setRequestHeader("Source", "onlineleasing");
                    },
                    complete: function(jqXHR, textStatus, errorThrown) {
                        if(textStatus == 'timeout'){
                             submitRentContractForm.abort();
                             submitRentContractForm();
                         }
                    },
                    success: function (response, status, xhr) {
                        $('#submitState').text('');
                        $('#submitStateModal').modal('hide');
                        if(response.code === 'C0') {
                            if(response.data.resultCode == "ERROR" && response.data.id != ""){
                                $.request.content.id = response.data.id;
                                alertMsg(response.data.resultCode,response.data.resultMsg);
                            } else if(response.data.id != "" && response.data.formStatus == "2"){
                                window.location.href = '/lotus-admin/modify-summary?id='+response.data.bizId+'&s=succeed';
                            } else {
                                alertMsg(response.data.resultCode,response.data.resultMsg);
                            }
                        } else {
                            alertMsg(response.code,response.customerMessage);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});  