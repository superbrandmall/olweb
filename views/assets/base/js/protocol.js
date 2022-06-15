var protocolStr = document.location.protocol;
if(protocolStr == "http:") {  
   $.base = "http://olapi.superbrandmall.com";
} else if(protocolStr == "https:") { 
   $.base = "https://olapi.superbrandmall.com";
} else {  
   $.base = "http://olapi.superbrandmall.com";
}