$.bot = {
	token: "C0Omcy8Tw4M.cwA.RyI.gveMGDhcEn8g1xbHB6fgWSAsbNKHNm5vRGjVWoqaeZY",
    watermark: ''
};

var botui = new BotUI('botui');

$(document).ready(function(){
    //updateScroll();
    botui.message.add({ // show a message
        content: '亲亲，我是正大君，有什么可以帮到您的？'
    }).then(function () { // wait till its shown
        return botui.action.text({ // show 'text' action
            action: {
                placeholder: '请在这里输入提问'
            }
        });
    }).then(function (res) { // get the result
        saveChats('s',res.value);
        createConversations(res.value,$.cookie('uid'),$('#sid').val());
    });
});

/*$(document).on('click', '#chat_shortcut .question', function (e) {
    submitShortCut($(this).text());
});

function submitShortCut(sc) {
    $('#msg_container_base').append(
        '<div class="row msg_container base_sent">\n\
        <div class="col-md-10 col-xs-10">\n\
        <div class="messages msg_sent">\n\
        <p>'+sc+'</p>\n\
        </div>\n\
        </div>\n\
        <div class="col-md-1 col-xs-1 avatar">\n\
        <img src="views/gfx/avatar.jpg" class="img-responsive">\n\
        </div>\n\
        </div>'
    );
    updateScroll();
    createConversations(sc,$('#uid').val(),$('#sid').val());
    saveChats('s',sc);
}

function updateScroll(){
    var element = document.getElementById('msg_container_base');
    element.scrollTop = element.scrollHeight;
}*/

function createConversations(msg,uid,sid) {
    $.ajax({
        url: "https://directline.botframework.com/v3/directline/conversations",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + $.bot.token);
            xhr.setRequestHeader("Content-Type", 'application/json');
        },
        success: function (data) {
            createActivities(data.conversationId,msg,uid,sid);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function createActivities(cid,msg,uid,sid) {
    var data = JSON.stringify({
            "type": "message",
            "from": {
              "id": sid,
              "properties": {id:uid}
            },
            "text": msg
        })

    $.ajax({
        url: "https://directline.botframework.com/v3/directline/conversations/"+cid+"/activities",
        type: "post",
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + $.bot.token);
            xhr.setRequestHeader("Content-Type", 'application/json');
            xhr.setRequestHeader("Content-Length", data.length);
        },
        success: function (data) {
            receiveActivities(cid);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function receiveActivities(cid) {
    $.ajax({
        url: "https://directline.botframework.com/v3/directline/conversations/"+cid+"/activities?watermark="+ $.bot.watermark,
        type: "get",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + $.bot.token);
            xhr.setRequestHeader("Content-Type", 'application/json');
        },
        success: function (data) {
            var response = JSON.parse(data.activities[1].text);
            var text = response.replyString;
            if(response.detailDic.login && response.detailDic.login.type === "URL") {
                var login = "<a href='"+response.detailDic.login.text.url+"'>"+response.detailDic.login.text.text+"</a>";
                text = text.replace('$!{login}',login);
            } else if (response.detailDic.clickhere && response.detailDic.clickhere.type === "URL") {
                var detail = "<a href='"+response.detailDic.clickhere.text.url+"'>"+response.detailDic.clickhere.text.text+"</a>";
                text = text.replace('$!{clickhere}',detail);
                if (response.detailDic.img && response.detailDic.img.type === "IMG") {
                    var img = "<br><br><img src='"+response.detailDic.img.text.image+"' style='width: 100px'>";
                    text = text.replace('###$!{img}',img);
                }
            }
            
            saveChats('r',text);
            /*
            updateScroll();*/
            
            botui.message.add({ // show a message
                content: text
            }).then(function () { // wait till its shown
                return botui.action.text({ // show 'text' action
                    action: {
                        placeholder: '请在这里输入提问'
                    }
                });
            }).then(function (res) { // get the result
                var watermark =data.watermark;
                if(watermark == 1) {
                    $.bot.watermark = '';
                } else {
                    $.bot.watermark = watermark;
                    receiveActivities(cid);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function saveChats(pre,txt) {
    var txt = pre + ',' + txt;
    $.ajax({
        url: "controllers/api/1.0/ApiBot.php",
        type: "GET",
        dataType: "json",
        data: {func:'save_chats',txt:txt},
        beforeSend: function () {},
        complete: function (data) {},
        success: function (data) {},
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}
