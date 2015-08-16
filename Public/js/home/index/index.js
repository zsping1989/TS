requirejs.config({paths:{
    "a" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/jquery-migrate-1.2.1',
    "b" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/script',
    "c" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/superfish',
    "d" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/sForm',
    "e" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/jquery.ui.totop',
    "f" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/jquery.equalheights',
    "g" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/jquery.easing.1.3',
    "h" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/jquery.iosslider.min',
    "i" :TS._STATIC_URL_+'js/'+TS.m+'/'+TS.c+'/jquery.hoverdir'

}});
define(['jquery','fun','a','b','c','d','e','f','g','h','i'],function(j,f){
   // $().UItoTop({ easingType: 'easeOutQuart' });
    TS.addLink();
    var  bind = {};
    bind.checkd = function(){ /* 赋值选中 */
        var data = eval('window.' + TS.data_var+'.where');
        var res = {};
        for(var i in data){
            for(var j in data[i]){
                res['where['+i+']['+j+']'] = data[i][j].replace(/\%/g,'');
            }
        }
        f.checkd(res);
    }
    $('.iosSlider').iosSlider({
        desktopClickDrag: true,
        snapToChildren: true,
        navSlideSelector: '.sliderContainer .slideSelectors .item',
        onSlideComplete: slideComplete,
        onSliderLoaded: sliderLoaded,
        onSlideChange: slideChange,
        scrollbar: false,
        autoSlide: true,
        autoSlideTimer: 3300,
        infiniteSlider: true
    });
    function slideChange(args) {
        $('.sliderContainer .slideSelectors .item').removeClass('selected');
        $('.sliderContainer .slideSelectors .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
    }
    function slideComplete(args) {
        if(!args.slideChanged) return false;
        $(args.sliderObject).find('.text1, .text2').attr('style', '');
        $(args.currentSlideObject).find('.text1').animate({
            right: '100px',
            opacity: '0.72'
        }, 400, 'easeOutQuint');
        $(args.currentSlideObject).find('.text2').delay(200).animate({
            right: '70px',
            opacity: '0.72'
        }, 400, 'easeOutQuint');
    }
    function sliderLoaded(args) {
        $(args.sliderObject).find('.text1, .text2').attr('style', '');
        $(args.currentSlideObject).find('.text1').animate({
            right: '100px',
            opacity: '0.72'
        }, 400, 'easeOutQuint');
        $(args.currentSlideObject).find('.text2').delay(200).animate({
            right: '70px',
            opacity: '0.72'
        }, 400, 'easeOutQuint');
        slideChange(args);
    }
    $(' #da-thumbs > li ').each( function() { $(this).hoverdir(); } );


    function init(){
        for(var i in bind){
            bind[i]();
        }
    }
    return {
        init:init
    };
});

