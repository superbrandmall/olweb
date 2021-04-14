<!DOCTYPE html>
<html lang="zh-cmn-Hans">
    <head>
        <title>租得好商业地产租赁平台</title>
        <meta name="description" content="租得好商业地产租赁平台" />
        <meta charset="utf-8" />
        <script src="/views/assets/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="/views/assets/base/js/v2/api-configure.js" type="text/javascript"></script>
        <script src="/views/assets/plugins/jquery.cookie.js" type="text/javascript"></script>
        <script>
            var timestamp = Date.parse(new Date());
            var code = getUrlParam("code");
            weixinLogin();

            function weixinLogin() {
                $.ajax({
                    url: "https://olapi.superbrandmall.com/comm-wechatol/api/wechat/public/accessToken?code="+code,
                    type: "GET",
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function (request) {},
                    complete: function () {},
                    success: function (response, status, xhr) {
                        if (response.code === 'C0') {
                            if (xhr.getResponseHeader("Login") !== null) {
                                $.cookie("login", xhr.getResponseHeader("Login"));
                            }
                            if (xhr.getResponseHeader("Authorization") !== null) {
                                $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                            }
                            
                            //判断手机号
                            if(response.data.wechatUserInfo.mobileNo !== '' && response.data.wechatUserInfo.mobileNo !== null){
                                $.ajax({
                                    type: 'POST',
                                    url: '/controllers/api/2.0/ApiLoginSession.php',
                                    data: {
                                        uid: response.data.wechatUserInfo.mobileNo
                                    },
                                    dataType: "json",
                                    beforeSend: function(request) {
                                    },
                                    complete: function(){
                                        $.cookie('uid',response.data.wechatUserInfo.mobileNo);
                                        sessionStorage.setItem('wechat_user_info', JSON.stringify(response.data.wechatUserInfo));
                                        sessionStorage.setItem('authorize_time', timestamp);

                                        var strUrl = sessionStorage.getItem('location_href') || 'v2/';
                                        window.location.href = strUrl;
                                    }
                                })
                            } else {
                                sessionStorage.setItem('wechat_user_info', JSON.stringify(response.data.wechatUserInfo));
                                sessionStorage.setItem('authorize_time', timestamp);

                                var strUrl = sessionStorage.getItem('location_href') || 'v2/';
                                window.location.href = strUrl;
                            }
                        } else {
                            console.log(response.customerMessage);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
            }

            function getUrlParam(key) {
                var url = window.location.search;
                var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
                var result = url.substr(1).match(reg);
                return result ? decodeURIComponent(result[2]) : null;
            }
        </script>
    </head>
    <body>
        <cetner>页面跳转中...</cetner>
    </body>
</html>