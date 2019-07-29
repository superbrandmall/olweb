<div class="col-sm-5 col-md-5">
    <div class="tabulation animate-box">

        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
                <a href="#flights" aria-controls="flights" role="tab" data-toggle="tab">室内广告位</a>
            </li>
            <li role="presentation">
                <a href="#hotels" aria-controls="hotels" role="tab" data-toggle="tab">户外大牌</a>
            </li>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="flights">
                <div class="row">
                    <div class="col-xxs-12 col-xs-6 mt alternate">
                        <div class="input-field">
                            <label for="date-start">开始日期:</label>
                            <input type="text" class="form-control" id="date-start" placeholder="日/月/年"/>
                        </div>
                    </div>
                    <div class="col-xxs-12 col-xs-6 mt alternate">
                        <div class="input-field">
                            <label for="date-end">结束日期:</label>
                            <input type="text" class="form-control" id="date-end" placeholder="日/月/年"/>
                        </div>
                    </div>
                    <div class="col-sm-12 mt">
                        <section>
                            <label for="class">类型:</label>
                            <select class="cs-select cs-skin-border">
                                <option value="" disabled selected>吊幅</option>
                                <option value="economy">电梯挂画</option>
                                <option value="first">玻璃贴</option>
                                <option value="business">侧刀旗</option>
                            </select>
                        </section>
                    </div>
                    <div class="col-xxs-12 col-xs-6 mt">
                        <section>
                            <label for="class">楼层:</label>
                            <select class="cs-select cs-skin-border">
                                <option value="" disabled selected>1</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </section>
                    </div>
                    <div class="col-xxs-12 col-xs-6 mt">
                        <section>
                            <label for="class">数量:</label>
                            <select class="cs-select cs-skin-border">
                                <option value="" disabled selected>1</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </section>
                    </div>
                    <div class="col-xs-12">
                        <input type="submit" class="btn btn-primary btn-block" value="搜索室内广告位">
                    </div>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="hotels">
                <div class="row">
                    <div class="col-xxs-12 col-xs-6 mt alternate">
                        <div class="input-field">
                            <label for="date-start">开始日期:</label>
                            <input type="text" class="form-control" id="date-start" placeholder="日/月/年"/>
                        </div>
                    </div>
                    <div class="col-xxs-12 col-xs-6 mt alternate">
                        <div class="input-field">
                            <label for="date-end">结束日期:</label>
                            <input type="text" class="form-control" id="date-end" placeholder="日/月/年"/>
                        </div>
                    </div>
                    <div class="col-sm-12 mt">
                        <section>
                            <label for="class">位置:</label>
                            <select class="cs-select cs-skin-border">
                                <option value="" disabled selected>东南位置</option>
                                <option value="economy">东北位置</option>
                                <option value="first">转角位置</option>
                            </select>
                        </section>
                    </div>
                    <div class="col-xxs-12 col-xs-6 mt">
                        <section>
                            <label for="class">尺寸规格:</label>
                            <select class="cs-select cs-skin-border">
                                <option value="" disabled selected>15米（宽）*25米（高）</option>
                                <option value="1">20米（宽）*25.5米（高）</option>
                                <option value="2">南面17.8m（W）*32.4m(H)、东面23m（W）*32.4m(H)</option>
                            </select>
                        </section>
                    </div>
                    <div class="col-xxs-12 col-xs-6 mt">
                        <section>
                            <label for="class">数量:</label>
                            <select class="cs-select cs-skin-border">
                                <option value="" disabled selected>1</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </section>
                    </div>
                    <div class="col-xs-12">
                        <input type="submit" class="btn btn-primary btn-block" value="搜索户外大牌">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>