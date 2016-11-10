var base = dd.base || {};

//判断环境，如果是支付宝则在body标签上加上‘alipay’
var UAEnv = {
    ua: navigator.userAgent.toLowerCase(),
    testAli: function(){
        if (/alipay/i.test(ua)) {
           return true; 
        }
    },
    testAndroid: function(){
        if(/android/i.test(ua)) {
            return true;
        }
    },
    testIOS : function(){
        if(/iphone/i.test(ua)) {
            return true;
        }
    }
};
var musicControl = {
    pauseMusic: document.querySelector("#playmusic"),
    initMusic: function(){
        base.touch(pauseMusic, function(ev) {
            if (pauseMusic.className === "stopmusic") {
                pauseMusic.classList.remove("stopmusic");
                pauseMusic.classList.add("startmusic");
                document.querySelector("audio").pause();
                pauseMusic.querySelector("img").setAttribute("src", "images/stopmusic.png");
            } else {
                pauseMusic.classList.remove("startmusic");
                pauseMusic.classList.add("stopmusic");
                document.querySelector("audio").play();
                pauseMusic.querySelector("img").setAttribute("src", "images/startmusic.gif");
            }
        });
    }
};
var mainFuc = {
    initFontSize : function(){
        var docuH = document.documentElement.clientHeight,
                    docuW = document.documentElement.clientWidth,
                    html = document.getElementsByTagName('html')[0];
        var num = docuW / 375;
        html.style.fontSize = num * 16 + "px";
        document.body.style.fontSize = num*16 +"px";
    },

}
var shareInfo = {
    actMain: window.actMain,
    share_data: {
        share_url: 'http://static.diditaxi.com.cn/site/pages/<%filename--%>/index.html',
        share_icon_url: 'http://static.diditaxi.com.cn/site/pages/<%filename--%>/images/share.jpg',
        share_img_url: 'http://static.diditaxi.com.cn/site/pages/<%filename--%>/images/share.jpg',
        share_title: '<%sharetitle--%>',
        share_content: '<%sharecontent--%>',
        share_from: "滴滴出行"
    },
    initShareInfo: function(){
        if (actMain.isApp()) {
            share_data.share_url = protocol + '//static.xiaojukeji.com/site/pages/<%filename--%>/pages/index.html?ddfrom=native&v=' + Math.random();
        };
        if (location.href.indexOf('ddfrom=native') != -1) {
            var index = location.href.indexOf('v=') + 2;
            var rand = location.href.substr(index);
            var omaga_event = 'taxi_activity_20161020_native_' + rand;
            Omega.trackEvent(omaga_event, 'native_shared');
        };
        didi.initShare(share_data);
        weixin.initShare(share_data, function() {
            actMain.ajax({
                url: protocol + '//static.xiaojukeji.com/site/pages/<%filename--%>/pages/index.html?ddfrom=SNS&v=' + Math.random(),
                method: 'GET'
            });
            Omega.trackEvent('taxi_activity_20161020', 'weixin_shared');
        });
    }
    
}

window.addEventListener('DOMContentLoaded', function(ev) {

// 初始化mySwiper
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onlyExternal: false,
        speed: 500
    });
    var btn1 = document.querySelector('.btn1');
    var btn2 = document.querySelector('.btn2');
    var mc1 = document.querySelector('.mc1');
    var mc2 = document.querySelector('.mc2');
    var playmusic = document.querySelector('#playmusic');

    btn1.addEventListener('click', function() {
        mc1.style.display = "block";
        playmusic.style.display = "none";
    })
    btn2.addEventListener('click', function() {
        mc2.style.display = "block";
        playmusic.style.display = "none";
    })
    mc1.addEventListener('click', function() {
        mc1.style.display = "none";
        playmusic.style.display = "block";
    })
    mc2.addEventListener('click', function() {
        mc2.style.display = "none";
        playmusic.style.display = "block";
    });



    // //音乐开关设计

    // var pauseMusic = document.querySelector("#playmusic");

    // base.touch(pauseMusic, function(ev) {
    //     if (pauseMusic.className === "stopmusic") {
    //         pauseMusic.classList.remove("stopmusic");
    //         pauseMusic.classList.add("startmusic");
    //         document.querySelector("audio").pause();
    //         pauseMusic.querySelector("img").setAttribute("src", "images/stopmusic.png");
    //     } else {
    //         pauseMusic.classList.remove("startmusic");
    //         pauseMusic.classList.add("stopmusic");
    //         document.querySelector("audio").play();
    //         pauseMusic.querySelector("img").setAttribute("src", "images/startmusic.gif");
    //     }
    // });

    var actMain = window.actMain;
    var share_data = {
        share_url: 'http://static.diditaxi.com.cn/site/pages/<%filename--%>/index.html',
        share_icon_url: 'http://static.diditaxi.com.cn/site/pages/<%filename--%>/images/share.jpg',
        share_img_url: 'http://static.diditaxi.com.cn/site/pages/<%filename--%>/images/share.jpg',
        share_title: '<%sharetitle--%>',
        share_content: '<%sharecontent--%>',
        share_from: "滴滴出行"
    };
    if (actMain.isApp()) {
        share_data.share_url = protocol + '//static.xiaojukeji.com/site/pages/<%filename--%>/pages/index.html?ddfrom=native&v=' + Math.random();
    };
    if (location.href.indexOf('ddfrom=native') != -1) {
        var index = location.href.indexOf('v=') + 2;
        var rand = location.href.substr(index);
        var omaga_event = 'taxi_activity_20161020_native_' + rand;
        Omega.trackEvent(omaga_event, 'native_shared');
    };
    didi.initShare(share_data);
    weixin.initShare(share_data, function() {
        actMain.ajax({
            url: protocol + '//static.xiaojukeji.com/site/pages/<%filename--%>/pages/index.html?ddfrom=SNS&v=' + Math.random(),
            method: 'GET'
        });
        Omega.trackEvent('taxi_activity_20161020', 'weixin_shared');
    });
}, !1);

    console.log(process.argv.slice(2));
