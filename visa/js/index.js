$(function () {
 
    var zoomWidth = 992; //缩放阀值992px, 即所有小于992px的视口都会对原图进行缩放, 只是缩放比例不同
    var maxWidth = 1920; //最大宽度1920px
    var ratio = 1; //缩放比例
    var viewWidth = window.innerWidth; // 视口宽度
    var zoomSlider = function () {
         if (viewWidth < 768) { //当视口小于768时(移动端), 按992比例缩放
             ratio = viewWidth / zoomWidth; //视口宽度除以阀值, 计算缩放比例
        } else if (viewWidth < zoomWidth) { //当视口界于768与992之间时, bootstrap主宽度为750, 这区间图片缩放比例固定.
              ratio = zoosmWidth / (zoomWidth + (zoomWidth - 750));
        } else { // PC端不缩放
            ratio = 1;
        }
          var width = maxWidth * ratio; //缩放宽度
            $(".my-slide img").each(function () {
                $(this).css({
                    "width": width,
                    "max-width": width,
                    "margin-left": -(width - viewWidth) / 2
                }); 
            });
        }
    /**数字滚动**/
    var numOptions = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
         prefix: '',
        suffix: ''
    }
    var numGroup = new Array(
        new CountUp("sum-apply", 0, 18397, 0, 2.5, numOptions),
        new CountUp("sum-rate", 0, 98.8, 1, 2.5, numOptions),
        new CountUp("sum-urgent", 0, 3273, 0, 2.5, numOptions),
        new CountUp("urgent-rate", 0, 100, 0, 2.5, numOptions)
    );
    var runNumber = function () {
        $('.run-number').each(function () {
            var oTop = $(this).offset().top;
            var sTop = $(window).scrollTop();
            var oHeight = $(this).height();
            var oIndex = $(this).index('.run-number');
            if (oTop >= sTop && (oTop + (oHeight / 2)) < (sTop + $(window).height())) {
                numGroup[oIndex].start();
            } 
        });
    }
    
    zoomSlider(); //页面加载时初始化并检查一次.
    runNumber(); //页面加载时判断一次
    /**视口变化事件**/
    $(window).resize(function () {
        viewWidth = window.innerWidth; // 重置视口宽度
        zoomSlider();//判断是否绽放banner
         runNumber();//判断是否执行动画
    });
    /**滚动事件**/
    $(window).scroll(function () {
        runNumber();
    });
    
    //我们的服务
    $('.card-item').each(function () {
        $(this).mouseover(function () {
            $(this).addClass('card-active');
            $(this).siblings().removeClass('card-active');
            $(this).find(".btn").addClass('btn-outline-inverse').removeClass('btn-outline-blue');
            $(this).siblings().find(".btn").addClass('btn-outline-blue').removeClass('btn-outline-inverse');
            });
         });
    });
    
//返回顶部
$(function(){
    //将#back-to-top隐藏
    $("#slider-goTop").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function(){
        if ($(window).scrollTop()>100){
            $("#slider-goTop").fadeIn();
        }else{
            $("#slider-goTop").fadeOut();
        }
    });
    //点击回到页面顶部
    $("#slider-goTop").click(function(){
        $('body,html').animate({scrollTop:0},500);
        return false;
    });
    //返回顶部hover事件
    $('#slider-chat,#slider-qq,#slider-phone,#slider-wechat').hover(
        function(){
            $(this).next().show();
        },
        function(){
            $(this).next().hide();
        }
    );
});