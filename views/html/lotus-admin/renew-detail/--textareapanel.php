<!--


                        //小作文
                        /*$('#essayMall').text($('#investmentContractModelMallSelect').val());
                        $('#essayFloor').text($('#select2-floor-container').text());
                        $('#essayModality').text($('#bizTypeName').val());
                        $('#essayBrand').text($('#select2-brandName-container').text());
                        $('#essayArea').text($('#area').val());*/

-->

<div class="box box-default" id="textareapanel">    
    <div class="box-header with-border">
        <h3 class="box-title">说明</h3>
        <div class="box-tools">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>
    <div class="box-body">
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">主要报批事项及内容</h5>
            <hr>
            <div style="line-height: 24px;">
                <p>
                    <span class="txt">
                        <span id="essayMall"></span>
                        <span id="essayFloor"></span>
                        <span id="essayModality"></span>
                        <span id="essayBrand"></span>，
                        <span id="essayArea"></span>平米，续约
                    </span>
                    
                    
                    <!--<input type="text" class="txt" style="width: 40px;" placeholder="" readonly>年（或月），是需要保留的品牌（或不是需要保留的品牌，
                    <input type="text" class="txt" placeholder="" readonly>[暂时保留的原因]）。
                    固定租金<input type="text" class="txt" style="width: 60px;" placeholder="" readonly>元/天/平米，增长
                    <input type="text" class="txt" style="width: 60px;" placeholder="" readonly>%（或平续），（每
                    <input type="text" class="txt" style="width: 20px;" placeholder="" readonly>年递增
                    <input type="text" class="txt" style="width: 40px;" placeholder="" readonly>%），扣率
                    <input type="text" class="txt" style="width: 40px;" placeholder="" readonly>%，标准物管费和推广费（或物管费15元/月/平米，推广费0%），近12个月平均销售额
                    <input type="text" class="txt" style="width: 100px;" placeholder="" readonly>元，租售比
                    <input type="text" class="txt" style="width: 20px;" placeholder="" readonly>%。-->
                </p>
                <p>
                    <!--预算租金<input type="text" class="txt" style="width: 60px;" placeholder="" readonly>元/天/平米，单价达成率
                    <input type="text" class="txt" style="width: 40px;" placeholder="" readonly>%。预算中续约增长x%（或换品牌，新租金
                    <input type="text" class="txt" style="width: 60px;" placeholder="" readonly>元/天/平米，或
                    <input type="text" class="txt">[其它情况说明]），全年预算达成率
                    <input type="text" class="txt" style="width: 40px;" placeholder="" readonly>%，差异
                    <input type="text" class="txt" style="width: 60px;" placeholder="" readonly>元。-->
                </p>
            </div>
        </div>
        <div class="col-md-12">
            <h5 style="margin-bottom: 0;">其它</h5> 
            <br>
            <textarea class="form-control" id="remark" rows="3" placeholder="合同中的非标准条款说明（若有，如提前通知配合调改等）。"></textarea>
        </div>
    </div>
</div>