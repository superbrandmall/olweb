$.msg = [];
$.msgPage = {
    last: '',
    current: ''
};

$(document).ready(function(){
    iniMsg();
      
    $('.remove-msg').click(function() {
        var item = $(this).parent('li').attr('id').match(/[\d]+$/);
        if($.msg.length >0){
            var m = [];
            $.each($.msg, function(i,v) {
                if(v.id == item) {
                    m.push(v);
                    readMsg(m);
                }
            });
        }
    });
    
    $('#remove_all_msg').click(function() {
        readMsg($.msg);
    });
    
    $('.cbp-l-loadMore-link').click(function() {
        if($.msgPage.last === $.msgPage.current+1){
            $('#loadMore-container').fadeOut();
        } 
        getReadMsg($.msgPage.current+1);
    });
});

function iniMsg() {
    var map = {
        sysMessage: {
            userCode: $.cookie('uid'),
            type: 0,
            page: 1,
            pageCount: 100
        }
    };
    $.ajax({
        url: $.api.base+"/sysmessage/details",
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
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                if(response.data.pagination.totalCount > 0){
                    $('#msg_content ul').append('<li id="remove_all_msg" class="unread" style="overflow: auto;"><a href="javascript: void(0);"><span class="badge c-bg-yellow">全部设为已读</span></a></li>');
                    $.each(response.data.pagination.details, function(i,v) {
                        $.msg.push(v);
                        $('#msg_content ul.c-menu').append('<li id="remove_msg_'+v.id+'" class="unread"><h4 class="c-font-20"><i class="fa fa-clock-o"></i> '+v.created+'</h4><a href="javascript: void(0);" class="remove-msg">'+v.message+'<span class="badge c-bg-yellow" style="margin-top: -13px;">未读</span></a></li>');
                    });
                } else {
                     $('#msg_content ul.c-menu').append('<li class="unread"><h4><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 目前没有未读消息</h4></li>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getUnreadMsg() {
    $('.read-list').removeClass('active');
    $('.unread-list').addClass('active');
    $('.read').remove();
    iniMsg();
}

function getReadMsg(p) {
    $('.unread-list').removeClass('active');
    $('.read-list').addClass('active');
    $('.unread').remove();
    var map = {
        sysMessage: {
            userCode: $.cookie('uid'),
            type: 1,
            page: p,
            pageCount: 10
        }
    };
    $.ajax({
        url: $.api.base+"/sysmessage/details",
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
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                if(response.data.pagination.totalCount > 0){
                    var pages =  Math.ceil(response.data.pagination.totalCount / 10);
                    $.each(response.data.pagination.details, function(i,v) {
                        $('#msg_content ul.c-menu').append('<li class="read"><h4 class="c-font-20"><i class="fa fa-clock-o"></i> '+v.created+'</h4><p class="c-font-15">'+v.message+'</p></li>');
                    });
                    generateLoadMore(p, pages);
                } else {
                    $('#msg_content ul.c-menu').append('<li class="read"><h4><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> 目前没有已读消息</h4></li>');
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function readMsg(m){
    var map = {
        list: m
    };
    $.ajax({
        url: $.api.base+"/sysmessage/read",
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
        success: function (response, status, xhr) {
            interpretBusinessCode(response.code);
            
            if(response.code === 'C0') {
                $.each(response.data.list, function(i,v) {    
                    $('#remove_msg_'+v.id).slideUp();
                });
                
                var countMsg = $('#dropdownLink1 span').text() - response.data.list.length;
                if(countMsg == 0){
                    $('#dropdownLink1 span').remove();
                    $('#remove_all_msg').remove();
                } else {
                    $('#dropdownLink1 span').text(countMsg);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function generateLoadMore(currentPage, LastPage) {
    $.msgPage.last = LastPage;
    $.msgPage.current = currentPage;
    if(LastPage > currentPage){
        $('#loadMore-container').fadeIn();
    } else {
        $('#loadMore-container').fadeOut();
    }
}