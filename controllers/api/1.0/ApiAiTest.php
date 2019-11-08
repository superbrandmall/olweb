<?php
$url = 'https://aip.baidubce.com/oauth/2.0/token';
$post_data['grant_type'] = 'client_credentials';
$post_data['client_id'] = 'B87Bd9w87WvoIXfIKOI5BYLU';
$post_data['client_secret'] = 'TEWR1f26aPd8pFODbHpB12dC5ZsAxTPd';
$o = "";
foreach ( $post_data as $k => $v ) {
    $o.= "$k=" . urlencode( $v ). "&" ;
}
$post_data = substr($o,0,-1);

$token = get_access_token($url, $post_data);

$token = json_decode($token, true);

$url = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/logo?access_token=' . $token['access_token'];
$img = file_get_contents($_POST['brandlogo']);
$img = base64_encode($img);
$bodys = array(
    'image' => $img,
    'custom_lib' => false
);
$res = request_post($url, $bodys);
    
echo $res;

function get_access_token($url = '', $param = '') {
    if (empty($url) || empty($param)) {
        return false;
    }

    $postUrl = $url;
    $curlPost = $param;
    $curl = curl_init();//初始化curl
    curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
    curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    $data = curl_exec($curl);//运行curl
    curl_close($curl);

    return $data;
}	

function request_post($url = '', $param = '') {
    if (empty($url) || empty($param)) {
        return false;
    }

    $postUrl = $url;
    $curlPost = $param;
    // 初始化curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $postUrl);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    // 要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    // post提交方式
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    // 运行curl
    $data = curl_exec($curl);
    curl_close($curl);

    return $data;
}