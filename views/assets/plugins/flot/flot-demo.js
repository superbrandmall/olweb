$(document).ready(function() {
    console.log("document ready");
    plot();

    function plot() {
        var expect = [],
            actual = [];
        for (var i = 0; i < 12; i += 0.2) {
            expect.push([i, 2]);
            actual.push([i, 3]);
        }

        var options = {
            series: {
                lines: {
                    show: true
                },
                shadowSize: 0
            },
            grid: {
                borderWidth: 0
            },
            yaxis: {
                min: 0,
                max: 10
            }
        };

        var plotObj = $.plot($("#flot-line-chart"), [{
            data: actual,
            label: "实际收入"
        }, {
            data: expect,
            label: "预计收入"
        }],
        options);
    }
});
