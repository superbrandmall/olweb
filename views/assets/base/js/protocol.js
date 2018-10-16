var protocolStr = document.location.protocol;
if(protocolStr == "http:") {  
   $.base = "http://10.130.12.15:8750"; //http://uat-olapi.superbrandmall.com
} else if(protocolStr == "https:") { 
   $.base = "http://10.130.12.15:8750"; //http://uat-olapi.superbrandmall.com
} else {  
   $.base = "http://10.130.12.15:8750"; //http://uat-olapi.superbrandmall.com
}