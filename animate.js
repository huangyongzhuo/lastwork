var div2 = document.getElementById('divId2');
var navlist = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var p = document.getElementById('p1');

var mo1 = document.getElementById('mo1');
var mov1 = document.getElementById('mov1');
var mov10 = document.getElementById('mov10');
var mo2 = document.getElementById('mo2');
var mov2 = document.getElementById('mov2');
var mov20 = document.getElementById('mov20');
var mo3 = document.getElementById('mo3');
var mov3 = document.getElementById('mov3');
var mov30 = document.getElementById('mov30');
var mo4 = document.getElementById('mo4');
var mov4 = document.getElementById('mov4');
var mov40 = document.getElementById('mov40');
var mo5 = document.getElementById('mo5');
var mov5 = document.getElementById('mov5');
var mov50 = document.getElementById('mov50');

var i = 1;

mov1.onmouseover = function(){
	mov1.style.display = "none";
	mov10.style.display = "inline-block";
	alertUser(mov10);
}
mov10.onmouseout = function(){
	mov1.style.display = "inline-block";
	mov10.style.display = "none";
}
mov2.onmouseover = function(){
	mov2.style.display = "none";
	mov20.style.display = "inline-block";
}
mov20.onmouseout = function(){
	mov2.style.display = "inline-block";
	mov20.style.display = "none";
}
mov3.onmouseover = function(){
	mov3.style.display = "none";
	mov30.style.display = "inline-block";
}
mov30.onmouseout = function(){
	mov3.style.display = "inline-block";
	mov30.style.display = "none";
}
mov4.onmouseover = function(){
	mov4.style.display = "none";
	mov40.style.display = "inline-block";
}
mov40.onmouseout = function(){
	mov4.style.display = "inline-block";
	mov40.style.display = "none";
}
mov5.onmouseover = function(){
	mov5.style.display = "none";
	mov50.style.display = "inline-block";
}
mov50.onmouseout = function(){
	mov5.style.display = "inline-block";
	mov50.style.display = "none";
}

var timer;

function alertUser(obj){
    obj.setAttribute("border","2px solid #FF0000");
    setTimeout(function(){
       obj.setAttribute("border","2px solid #FF8888");
       setTimeout(function(){obj.setAttribute("border","2px solid #e2e2e2");}, 100);
     }, 200);
 }

function changeColor(obj){
	timer = setInterval(function(){
		var color1 = '#';
		var str1 = '4321056789abcdef';
		for (var i = 0; i < 6; i++) {
			color1 += str1.charAt(parseInt(Math.random()*str1.length));
		}
		obj.style.backgroundColor= "color1";
		// obj.setAttribute("border-color","color1");
	},50)
}


var isMoving = false;

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}

// var timer = setInterval(
// 	function(){
// 		var now = parseInt(getStyle(p,'left'));
// 		if(now == -400){
// 			p.style.left = 800 + "px";
// 		}
// 		else{	
// 			p.style.left = now - 3 + "px";
// 		}				
// 	},30);
	

		
//轮播下一张
function next(){
	if(isMoving){
		return;
	}
	isMoving = true;
	i++;
	navChange();
	animate(slider,{left:-1000*i},function(){
		if(i > 5){
			slider.style.left = "-1000px";
			i = 1;
		}
		isMoving = false;
	});
}
			
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	i--;
	navChange();
	animate(slider,{left:-1000*i},function(){
		if(i ===0){
			slider.style.left = "-5000px";
			i = 5;
		}
		isMoving = false;
	});
}
var timer = setInterval(next,3000);
//鼠标划入
div2.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
div2.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
//小按钮点击时间
for(var j = 0;j<navlist.length;j++){
	navlist[j].idx = j;
	navlist[j].onclick = function(){
		i = this.idx + 1;
		navChange();
		animate(slider,{left:-1000*i});
	}
}
//小按钮背景色
function navChange(){
	for(var j = 0;j<navlist.length;j++){
		navlist[j].className = '';
	}
	if(i === 6){
		navlist[0].className = 'active';
	}else if(i === 0){
		navlist[4].className = 'active';
	}
	else{
		navlist[i - 1].className = 'active';
	}
			
}

function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

//回到顶部
window.onload = function() {
    var oBtn = document.getElementById('gotop');
    var bSys = true;
    var timer = null;
 
    //如何检测用户拖动了滚动条
    window.onscroll = function() {
        if (!bSys) {
            clearInterval(timer);
        }
        bSys = false;
    };
 
    oBtn.onclick = function() {
        timer = setInterval(function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var iSpeed = Math.floor( - scrollTop / 8);
 
            if (scrollTop == 0) {
                clearInterval(timer);
            }
 
            bSys = true;
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
        },
        30);
    };
};

function Obj(){}  //创建一个对象
 
    /*为这个对象添加一个具有一个参数的原型方法*/
    Obj.prototype.draw=function(o){
        var speed=0;   //雪花每次下落的数值（10px）
        var startPosLeft=Math.ceil(Math.random()*document.documentElement.clientWidth);//设置雪花随机的开始x值的大小
        o.style.opacity=(Math.ceil(Math.random()*3)+7)/10;  //设置透明度
        o.style.left=startPosLeft+'px'; 
        o.style.color="red";
        o.style.fontSize=12+Math.ceil(Math.random()*14)+'px';
        setInterval(function(){
            //雪花下落的top值小鱼屏幕的可视区域高时执行下列
            if(speed<document.documentElement.clientHeight){
                o.style.top=speed+'px';
                o.style.left=startPosLeft+Math.ceil(Math.random()*8)+'px';
                speed+=10;
            }
            else{
                o.style.display='none';
            }
        },400);
    }
 
    var flame=document.getElementById('flame');
  
    /*使用setInterval定时器每800毫秒创建一个雪花*/
    setInterval(function(){
        var odiv=document.createElement('div');  //创建div
        odiv.innerHTML="中♡国";   //div的内容
        odiv.style.position='absolute';  //div的绝对定位
        flame.appendChild(odiv);   //把创建好的div放进flame中
        var obj=new Obj();   //创建函数
        obj.draw(odiv);  //执行obj的draw方法
    },800);  