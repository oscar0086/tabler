var hexToRgba = function(hex, opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

    return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', '+ opacity + ')';
};

$(document).ready(function () {

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Initialize popovers
	$('[data-toggle="popover"]').popover({
		html: true
    });

    // Function for remove card
    $('[data-toggle="card-remove"]').on('click', function (e) {
        var $card = $(this).closest('div.card');
        $card.remove();

        e.preventDefault();
        return false;
    });

    // Function for collapse card
    $('[data-toggle="card-collapse"]').on('click', function (e) {
        var $this = $(this),
            $card = $this.closest('div.card');

        $card.toggleClass('card-collapsed');

        e.preventDefault();
        return false;
    });

    // Function for fullscreen card
    $('[data-toggle="card-fullscreen"]').on('click', function(e) {
        var $card = $(this).closest('div.card');

        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');

        e.preventDefault();
        return false;
    });

    if($('[data-sparkline]').length) {
        var generateSparkline = function($elem, data, params) {
            $elem.sparkline(data, {
                type: $elem.attr('data-sparkline-type'),
                height: '100%',
                barColor: params.color,
                lineColor: params.color,
                fillColor: 'transparent',
                spotColor: params.color,
                spotRadius: 0,
                lineWidth: 2,
                highlightColor: hexToRgba(params.color, .6),
                highlightLineColor: '#666',
                defaultPixelsPerValue: 5
            });
        };

        require(['sparkline'], function(){
            $('[data-sparkline]').each(function(){
                var $chart = $(this);

                generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), {
                    color: $chart.attr('data-sparkline-color')
                });
            });
        });
    }


    if($('.chart-circle').length) {
        require(['circle-progress'], function () {
            $('.chart-circle').each(function () {
                var $this = $(this);
                $this.circleProgress({
                    fill: {
                        color: tabler.colors[$this.attr('data-color')] || tabler.colors.blue
                    },
                    size: $this.height(),
                    startAngle: -Math.PI / 4 * 2,
                    emptyFill: '#F4F4F4',
                    lineCap: 'round'
                });
            });
        });
    }




});