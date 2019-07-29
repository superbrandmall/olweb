<?php include 'sidebar.php'; ?>

<div class="content-wrapper">
    <section class="content-header" style="padding-bottom: 30px;">
        <h1 class="pull-left">
            招商专员
        </h1>
    </section>

    <section class="content">
        <div id="webui">
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-body">
                            <form class="form-inline" id="bulkForm">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="bootstrap-table">
                                            <div class="fixed-table-pagination" style="clear: both;">
                                                <div class="pull-left pagination-detail">
                                                    <span class="pagination-info">共 23 人</span>
                                                </div>
                                            </div>
                                            <div class="fixed-table-container table-no-bordered">
                                                <div class="fixed-table-body">
                                                    <table class="table table-striped snipe-table table-responsive table-no-bordered" style="margin-top: 0">
                                                        <thead id="assetsListingTable-sticky-header" class="hidden-xs">
                                                            <tr>
                                                                <th class="bs-checkbox">
                                                                    <div class="th-inner ">
                                                                        <input name="btSelectAll" type="checkbox">
                                                                    </div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner"></div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">序号</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">姓名</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">Mobile</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">Email</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                                <th>
                                                                    <div class="th-inner">业态</div>
                                                                    <div class="fht-cell"></div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="hidden-xs">
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 1</td>
                                                                <td>1</td>
                                                                <td>蒋晟</td>
                                                                <td>13816735109</td>
                                                                <td>sheng.jiang@superbrandmall.com</td>
                                                                <td width="30%">F&B-Chinese</td>
                                                            </tr>

                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 1</td>
                                                                <td>2</td>
                                                                <td>陈春梅</td>
                                                                <td>18621693657</td>
                                                                <td>chunmei.chen@superbrandmall.com</td>
                                                                <td>F&B-Chinese</td>
                                                            </tr>

                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input data-index="2" name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 1</td>
                                                                <td>3</td>
                                                                <td>徐晔琤</td>
                                                                <td>13761633927</td>
                                                                <td>yecheng.xu@superbrandmall.com</td>
                                                                <td>F&B-Chinese</td>
                                                            </tr>

                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 1</td>
                                                                <td>4</td>
                                                                <td>李晓洁</td>
                                                                <td>13641714832</td>
                                                                <td>maggie.li@superbrandmall.com</td>
                                                                <td>F&B-Chinese</td>
                                                            </tr>

                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 2</td>
                                                                <td>5</td>
                                                                <td>徐伟杰</td>
                                                                <td>13701774736</td>
                                                                <td>jeff.hsu@superbrandmall.com</td>
                                                                <td>F&B-Asian/Others、F&B-Western & Bars & Clubs、F&B-Fast Food/Drink Coffee/Desserts、Selective Luxury、Men's Fashion、Cosmetics、Sports、Entertainment、Digital Products、IP</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 2</td>
                                                                <td>6</td>
                                                                <td>饶朝阳</td>
                                                                <td>15921358740</td>
                                                                <td>chaoyang.rao@superbrandmall.com</td>
                                                                <td>Sports、Entertainment、Digital Products、IP</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 2</td>
                                                                <td>7</td>
                                                                <td>周晓芳</td>
                                                                <td>18521310702</td>
                                                                <td>xiaofang.zhou@superbrandmall.com</td>
                                                                <td>Cosmetics</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 2</td>
                                                                <td>8</td>
                                                                <td>敬韵</td>
                                                                <td>15601874997</td>
                                                                <td>yun.jing@superbrandmall.com</td>
                                                                <td>F&B-Asian/Others、F&B-Fast Food/Drink Coffee/Desserts</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 2</td>
                                                                <td>9</td>
                                                                <td>姜皓文</td>
                                                                <td>17621510628</td>
                                                                <td>haowen.jiang@superbrandmall.com</td>
                                                                <td>F&B-Western & Bars & Clubs</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 3</td>
                                                                <td>10</td>
                                                                <td>冰淼</td>
                                                                <td>18217411787</td>
                                                                <td>miao.bing@superbrandmall.com</td>
                                                                <td>Women's Fashion、Underwear、Shoes/Bags、Jewelry/Watches、Accessories</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 3</td>
                                                                <td>11</td>
                                                                <td>方佳俊</td>
                                                                <td>18101727416</td>
                                                                <td>jiajun.fang@superbrandmall.com</td>
                                                                <td>Women's Fashion、Underwear、Shoes/Bags、Jewelry/Watches、Accessories</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 3</td>
                                                                <td>12</td>
                                                                <td>魏肖霞</td>
                                                                <td>13122104522</td>
                                                                <td>xiaoxia.wei@superbrandmall.com</td>
                                                                <td>Women's Fashion</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 4</td>
                                                                <td>13</td>
                                                                <td>宋岩</td>
                                                                <td></td>
                                                                <td>yan.song@superbrandmall.com</td>
                                                                <td>Home/Lifestyle、Tourist items、Health & Wellness、Kids & Senior Citizens、Fast Fashion、Kiosks</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 4</td>
                                                                <td>14</td>
                                                                <td>崔迪</td>
                                                                <td>13611789958</td>
                                                                <td>di.cui@superbrandmall.com</td>
                                                                <td>Home/Lifestyle、Fast Fashion、Kiosks</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 4</td>
                                                                <td>15</td>
                                                                <td>周轶君</td>
                                                                <td>15821219478</td>
                                                                <td>yijun.zhou@superbrandmall.com</td>
                                                                <td>Home/Lifestyle、Fast Fashion、Kiosks</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 4</td>
                                                                <td>16</td>
                                                                <td>乔治</td>
                                                                <td>18817598976</td>
                                                                <td>zhi.qiao@superbrandmall.com</td>
                                                                <td>Home/Lifestyle、Kiosks</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 4</td>
                                                                <td>17</td>
                                                                <td>李秉彝</td>
                                                                <td>13386099095</td>
                                                                <td>bingyi.li@superbrandmall.com</td>
                                                                <td>Home/Lifestyle、Kiosks</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 5</td>
                                                                <td>18</td>
                                                                <td>黄赛男</td>
                                                                <td>18616332139</td>
                                                                <td>sainan.huang@superbrandmall.com</td>
                                                                <td>Tourist items、Kids & Senior Citizens</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 5</td>
                                                                <td>19</td>
                                                                <td>罗真龙</td>
                                                                <td>17301857116</td>
                                                                <td>zhenlong.luo@superbrandmall.com</td>
                                                                <td>Tourist items、Health & Wellness、Kids & Senior Citizens、Service</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>Corp-Group 5</td>
                                                                <td>20</td>
                                                                <td>周蓉靓</td>
                                                                <td>13817727887</td>
                                                                <td>rongjing.zhou@superbrandmall.com</td>
                                                                <td></td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>租赁支持部</td>
                                                                <td>21</td>
                                                                <td>马云飞</td>
                                                                <td>15618979723</td>
                                                                <td>yunfei.ma@superbrandmall.com</td>
                                                                <td>ALL</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>租赁支持部</td>
                                                                <td>22</td>
                                                                <td>师晓慧</td>
                                                                <td>18639930612</td>
                                                                <td>xiaohui.shi@superbrandmall.com</td>
                                                                <td></td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td class="bs-checkbox">
                                                                    <input name="btSelectItem" type="checkbox">
                                                                </td>
                                                                <td>租赁支持部</td>
                                                                <td>23</td>
                                                                <td>叶蔚</td>
                                                                <td>18916220839</td>
                                                                <td>wei.ye@superbrandmall.com</td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                        <tbody class="hidden-sm hidden-md hidden-lg">
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 1</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">1</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">蒋晟</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13816735109</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">sheng.jiang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Chinese</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 1</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">2</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">陈春梅</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18621693657</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">chunmei.chen@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Chinese</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 1</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">3</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">徐晔琤</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13761633927</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">yecheng.xu@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Chinese</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 1</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">4</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">李晓洁</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13641714832</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">maggie.li@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Chinese</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 2</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">5</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">徐伟杰</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13701774736</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">jeff.hsu@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Asian/Others、F&B-Western & Bars & Clubs、F&B-Fast Food/Drink Coffee/Desserts、Selective Luxury、Men's Fashion、Cosmetics、Sports、Entertainment、Digital Products、IP</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 2</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">6</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">饶朝阳</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">15921358740</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">chaoyang.rao@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Sports、Entertainment、Digital Products、IP</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 2</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">7</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">周晓芳</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18521310702</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">xiaofang.zhou@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Cosmetics</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 2</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">8</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">敬韵</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">15601874997</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">yun.jing@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Asian/Others、F&B-Fast Food/Drink Coffee/Desserts</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 2</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">9</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">姜皓文</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">17621510628</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">haowen.jiang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">F&B-Western & Bars & Clubs</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 3</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">10</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">冰淼</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18217411787</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">miao.bing@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Women's Fashion、Underwear、Shoes/Bags、Jewelry/Watches、Accessories</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 3</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">11</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">方佳俊</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18101727416</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">jiajun.fang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Women's Fashion、Underwear、Shoes/Bags、Jewelry/Watches、Accessories</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 3</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">12</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">魏肖霞</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13122104522</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">xiaoxia.wei@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Women's Fashion</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 4</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">13</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">宋岩</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">yan.song@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Home/Lifestyle、Tourist items、Health & Wellness、Kids & Senior Citizens、Fast Fashion、Kiosks</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 4</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">14</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">崔迪</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13611789958</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">di.cui@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Home/Lifestyle、Fast Fashion、Kiosks</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 4</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">15</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">周轶君</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">15821219478</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">yijun.zhou@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Home/Lifestyle、Fast Fashion、Kiosks</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 4</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">16</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">乔治</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18817598976</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">zhi.qiao@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Home/Lifestyle、Kiosks</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 4</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">17</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">李秉彝</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13386099095</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">bingyi.li@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Home/Lifestyle、Kiosks</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 5</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">18</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">黄赛男</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18616332139</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">sainan.huang@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Tourist items、Kids & Senior Citizens</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 5</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">19</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">罗真龙</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">17301857116</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">zhenlong.luo@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">Tourist items、Health & Wellness、Kids & Senior Citizens、Service</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Corp-Group 5</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">20</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">周蓉靓</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">13817727887</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">rongjing.zhou@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">租赁支持部</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">21</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">马云飞</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">15618979723</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">yunfei.ma@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value">ALL</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">租赁支持部</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">22</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">师晓慧</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18639930612</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">xiaohui.shi@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="65">
                                                                    <div class="card-views">
                                                                        <div class="card-view ">
                                                                            <input name="btSelectItem" type="checkbox">
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">租赁支持部</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">序号</span>
                                                                            <span class="value">23</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">姓名</span>
                                                                            <span class="value">叶蔚</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Mobile</span>
                                                                            <span class="value">18916220839</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">Email</span>
                                                                            <span class="value">wei.ye@superbrandmall.com</span>
                                                                        </div>
                                                                        <div class="card-view">
                                                                            <span class="title">业态</span>
                                                                            <span class="value"></span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div class="fixed-table-pagination">
                                                    <div class="pull-left pagination-detail">
                                                        <span class="pagination-info">
                                                            共 23 人
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

</div>
<?php include 'footer.php'; ?>