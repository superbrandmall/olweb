var protocolStr = document.location.protocol;
if(protocolStr == "http:") {  
   $.base = "https://olapi.superbrandmall.com";
} else if(protocolStr == "https:") { 
   $.base = "https://olapi.superbrandmall.com";
} else {  
   $.base = "https://olapi.superbrandmall.com";
}

function appendLotusLeasingHead() {
    if($.cookie('mallSelected').split(':::')[1] == 'SC082'){
        $('#Lotus_leasing_head select').append("<option value='5b17605be4b0de66988a42fe'>黄赛男</option>");
    } else {
        $('#Lotus_leasing_head select').append("<option value='62a8400ce4b010118b05f98a'>刘源阳</option>");
    }
}