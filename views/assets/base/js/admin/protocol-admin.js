var protocolStr = document.location.protocol;
if(protocolStr == "http:") {  
   $.base = "https://uat-olapi.superbrandmall.com";
} else if(protocolStr == "https:") { 
   $.base = "https://uat-olapi.superbrandmall.com";
} else {  
   $.base = "https://uat-olapi.superbrandmall.com";
}