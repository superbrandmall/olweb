$(document).ready(function(){
    if(getURLParameter('id') && getURLParameter('id') !== ''){
        TianyanchaMerchant(getURLParameter('id'));
    }
});

function TianyanchaMerchant(id){
    var map = {
        merchantCourtAnnouncement: {
            code: id,
            page: 1,
            pageCount: 10
        },
        merchantIllegalInfo: {
            code: id,
            page: 1,
            pageCount: 10
        },
        merchantLawsuit: {
            code: id,
            page: 1,
            pageCount: 10
        },
        merchantOwnTax: {
            code: id,
            page: 1,
            pageCount: 10
        },
        merchantPunishmentInfo: {
            code: id,
            page: 1,
            pageCount: 10
        }
    };
    $.ajax({
        url: $.api.base+"/merchantdetail/findAllByConditionPage",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(response.data.merchantCourtAnnouncements.details.length > 0) {
                    var merchantCourtAnnouncement = response.data.merchantCourtAnnouncements.details;
                    $.each(merchantCourtAnnouncement, function(i,v){
                        $('#court_announcement tbody').append('<tr><td>'+v.bltnno+'</td><td>'+v.bltntypename+'</td><td>'+v.content+'</td><td>'+v.courtcode+'</td><td>'+v.dealgradename+'</td><td>'+v.judge+'</td><td>'+v.party1+'</td><td>'+v.party2+'</td><td>'+v.province+'</td><td>'+v.publishdate+'</td><td>'+v.publishpage+'</td></tr>');
                    });
                }
                
                if(response.data.merchantLawsuits.details.length > 0) {
                    var merchantLawsuit = response.data.merchantLawsuits.details;        
                    $.each(merchantLawsuit, function(i,v){
                        $('#lawsuits tbody').append('<tr><td>'+v.caseno+'</td><td>'+v.casetype+'</td><td>'+v.doctype+'</td><td>'+v.court+'</td><td>'+v.submittime+'</td><td>'+v.title+'</td><td><a href="'+v.url+'" target="_blank"><i class="fa fa-link"></i></a></td><td>'+v.uuid+'</td></tr>');
                    });
                }
                
                
                if(response.data.merchantIllegalInfos.details.length > 0) {
                    var merchantIllegalinfo = response.data.merchantIllegalinfos.details;
                    $.each(merchantIllegalinfo, function(i,v){
                        $('#illegal_info tbody').append('<tr><td>'+v.putReason+'</td><td>'+v.putDate+'</td><td>'+v.putDepartment+'</td><td>'+v.removeReason+'</td><td>'+v.removeDepartment+'</td></tr>');
                    });
                }
                
                if(response.data.merchantOwnTaxs.details.length > 0) {
                    var merchantOwnTax = response.data.merchantOwnTaxs.details;               
                    $.each(merchantOwnTax, function(i,v){
                        $('#own_tax tbody').append('<tr><td>'+v.personIdNumber+'</td><td>'+v.legalpersonName+'</td><td>'+v.location+'</td><td>'+v.newOwnTaxBalance+'</td><td>'+v.name+'</td><td>'+v.ownTaxBalance+'</td><td>'+v.taxIdNumber+'</td><td>'+v.type+'</td><td>'+v.taxCategory+'</td></tr>');
                    });
                }
                
                if(response.data.merchantPunishmentInfos.details.length > 0) { 
                    var merchantPunishmentInfo = response.data.merchantPunishmentInfos.details; 
                    $.each(merchantPunishmentInfo, function(i,v){
                        $('#punishment_info tbody').append('<tr><td>'+v.content+'</td><td>'+v.punishNumber+'</td><td>'+v.regNum+'</td><td>'+v.name+'</td><td>'+v.base+'</td><td>'+v.decisionDate+'</td><td>'+v.legalPersonName+'</td><td>'+v.type+'</td><td>'+v.departmentName+'</td></tr>');
                    });
                }
            } 
        }
    });
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}