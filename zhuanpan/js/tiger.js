$(function(){
    var liLen = $('#list_all ul li').length,liCurIndex = 1,liHeight = $('#list_all ul li').outerHeight();
    setInterval(function(){
        $('#list_all ul:eq(0)').animate({'marginTop':'-'+(liCurIndex*liHeight)},function(){
            liCurIndex++;
            if(liCurIndex==liLen-5){
                liCurIndex=1;
                $('#list_all ul:eq(0)').css('marginTop','0');
            }
        });
    },2000);
    $('.gz').click(function(){
        $('.gzt').show();
        $('.outBox').show();
    });
    $('.closeGz').click(function(){
        $('.gzt').hide();
        $('.outBox').hide();
    });
    $(".outBox").css('height', document.documentElement.clientHeight);
    var timeOut = function(){  //超时函数
        $("#lotteryBtn").rotate({
            angle:0,
            duration: 10000,
            animateTo: 2160 //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
        });

    };
    var rotateFunc = function(awards,angle,png){  //awards:奖项，angle:奖项对应的角度
        $('#lotteryBtn').stopRotate();

        $("#lotteryBtn").rotate({
            angle:0,
            duration: 5000,
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                font(png);
            }
        });

    };
    $("#lotteryBtn").rotate({
        bind:
        {
            click: function(){
                var data = [2,3,4,5,6,7,8]; //返回的数组
                data = data[Math.floor(Math.random()*data.length)];
                if(data==2){
                    rotateFunc(2,65,"bm");
                }
                if(data==3){
                    rotateFunc(3,110,"hf300");
                }
                if(data==4){
                    rotateFunc(4,160,"jyb");
                }
                if(data==5){
                    rotateFunc(5,205,"pb");
                }
                if(data==6){
                    rotateFunc(6,250,"phc");
                }
                if(data==7){
                    rotateFunc(5,-65,"nk");
                }
                if(data==8){
                    rotateFunc(6,-22,"pg6s");
                }
            }
        }
    });
    function font(png){
        $('.zjk').show();
        $('.outBox').show();
        $('#zjt').removeClass().addClass(png);
    }
})