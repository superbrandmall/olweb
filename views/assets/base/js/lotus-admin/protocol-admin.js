var protocolStr = document.location.protocol;
if(protocolStr == "http:") {  
   $.base = "https://olapi.superbrandmall.com";
} else if(protocolStr == "https:") { 
   $.base = "https://olapi.superbrandmall.com";
} else {  
   $.base = "https://olapi.superbrandmall.com";
}