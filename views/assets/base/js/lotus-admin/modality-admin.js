$(document).ready(function(){
    renderModality0();
})

function renderModality0() {
    $('#modalities').html('');
    var modality0 = ['零售','娱乐服务','儿童','餐饮','主力店'];
    $.each(modality0, function(i,v){
        $('#modalities').append('<tr>\n\
        <td><a id="modality0_'+i+'" href="javascript: void(0);" onclick=\'javascript: renderModality("1","'+i+'","'+v+'","","")\'><i class="fa fa-plus"></i> '+v+' (I)</a></td>\n\
        <td>使用中</td>\n\
        <td></td></tr>');
    })
}

function renderModality(modalityLevel,index,modality,id,ids) {
    var degree,nextDegree,node;
    var nextLevel = modalityLevel*1+1;
    var indent = modalityLevel*1.5*15;
    switch (modalityLevel) {
        case '1':
            degree = "I";
            nextDegree = "II";
            node = $("#modality0_"+index);
            break;
        case '2':
            degree = "II";
            nextDegree = "III"; 
            node = $("#modality0_"+index+"_modality1_"+id);
            break;
        case '3':
            degree = "III";
            nextDegree = "IV";
            node = $("#modality0_"+index+"_modality1_"+id+"_modality2_"+ids);
            break;
        default:
            degree = "";
            nextDegree = "";
            node = "";
            break;
    }
    
    node.html('<i class="fa fa-minus"></i> '+modality+' ('+degree+')').attr('onclick','closeModality("'+modalityLevel+'","'+index+'","'+modality+'","'+id+'","'+ids+'")');
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality"+modalityLevel+"?modality"+modalityLevel+"="+encodeURIComponent(modality),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    var modalities = [];
                    $.each(response.data, function(i,v) {
                        var state;
                        switch (v.state) {
                            case '1':
                                state = "使用中";
                                break;
                            case '0':
                                state = "已删除";
                                break;
                            default:
                                state = "使用中";
                                break;
                        }
                        
                        var mod, insertNode,link;
                        switch (modalityLevel) {
                            case '1':
                                mod = v.modality2;
                                insertNode = $('#modality0_'+index).parent().parent();
                                link = '<a id="modality0_'+index+'_modality1_'+v.id+'" href="javascript: void(0);" onclick=\'javascript: renderModality("'+nextLevel+'","'+index+'","'+mod+'","'+v.id+'","")\' style="text-indent: '+indent+'px;"><i class="fa fa-plus"></i> '+mod+' ('+nextDegree+')</a>';
                                break;
                            case '2':
                                mod = v.modality3;
                                insertNode = $('#modality0_'+index+'_modality1_'+id).parent().parent();
                                link = '<a id="modality0_'+index+'_modality1_'+id+'_modality2_'+v.id+'" href="javascript: void(0);" onclick=\'javascript: renderModality("'+nextLevel+'","'+index+'","'+mod+'","'+id+'","'+v.id+'")\' style="text-indent: '+indent+'px;"><i class="fa fa-plus"></i> '+mod+' ('+nextDegree+')</a>';
                                break;
                            case '3':
                                mod = v.modality4;
                                insertNode = $('#modality0_'+index+'_modality1_'+id+'_modality2_'+ids).parent().parent();
                                link = '<a id="modality0_'+index+'_modality1_'+id+'_modality2_'+ids+'_modality3_'+v.id+'" href="javascript: void(0);" style="text-indent: '+indent+'px; display: block;">'+mod+' ('+nextDegree+')</a>';
                                break;
                            default:
                                mod = v.modality1;
                                break;
                        }
                        
                        if($.inArray(mod, modalities) == -1){
                            modalities.push(mod);
                            $('<tr>\n\
            <td>'+link+'</td>\n\
            <td>'+state+'</td>\n\
            <td></td></tr>').insertAfter(insertNode);
                        }
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    });
}

function closeModality(modalityLevel,index,modality,id,ids) {
    var degree,node;
    switch (modalityLevel) {
        case '1':
            degree = "I";
            node = $("#modality0_"+index);
            node.html('<i class="fa fa-plus"></i> '+modality+' ('+degree+')').attr('onclick','renderModality("'+modalityLevel+'","'+index+'","'+modality+'","'+id+'","'+ids+'")');
            $("a[id*='modality0_"+index+"_']").parent().parent().remove();
            break;
        case '2':
            degree = "II";
            node = $("#modality0_"+index+"_modality1_"+id);
            node.html('<i class="fa fa-plus"></i> '+modality+' ('+degree+')').attr('onclick','renderModality("'+modalityLevel+'","'+index+'","'+modality+'","'+id+'","'+ids+'")');
            $("a[id*='modality0_"+index+"_modality1_"+id+"_']").parent().parent().remove();
            break;
        case '3':
            degree = "III";
            node = $("#modality0_"+index+"_modality1_"+id+"_modality2_"+ids);
            node.html('<i class="fa fa-plus"></i> '+modality+' ('+degree+')').attr('onclick','renderModality("'+modalityLevel+'","'+index+'","'+modality+'","'+id+'","'+ids+'")');
            $("a[id*='modality0_"+index+"_modality1_"+id+"_modality2_"+ids+"_']").parent().parent().remove();
            break;
        default:
            degree = "";
            node = "";
            break;
    }
}