var aLi = document.querySelectorAll("li");
var liPs = [];//存储所有li的位置值
var oNav = document.querySelector(".nav");
for(let i=0,len=aLi.length;i<len;i++){
    liPs.push([aLi[i].offsetLeft,aLi[i].offsetTop]);
    setTimeout(function(){
        aLi[i].style.position = "absolute";
        aLi[i].style.left = liPs[i][0] + "px";
        aLi[i].style.top = liPs[i][1] + "px";
        aLi[i].style.margin = 0 + "px";
        },0);//tms之后执行一次函数
    }
oNav.addEventListener("mousedown",drag);
document.addEventListener("mousemove",drag);
document.addEventListener("mouseup",drag);
var toggle = false;//判断用户是否点中一个元素
var ele = null;//点击li元素
var startX,startY;// 点击li开始的位置
var x1,y1;//开始鼠标的位置
var z = 1;//默认元素的层级值
var goalele;
function drag(ev){
    ev.preventDefault();//阻止浏览器默认不让我们拖拽一个元素事件
    switch(ev.type){//时间分流
        case 'mousedown':
            if(ev.target.parentNode.tagName === "LI"){
                //事件节流
                toggle = true;
                ele = ev.target.parentNode;
                ele.style.zIndex = z++;
                startX = ele.offsetLeft;
                startY = ele.offsetTop;
                x1 = ev.clientX;
                y1 = ev.clientY;
            };
            
             break;
        case 'mousemove':
            if(toggle){
                x2 = ev.clientX;
                y2 = ev.clientY;
                nowX = startX + x2 - x1;
                nowY = startY + y2 - y1;
                ele.style.left = nowX +"px";
                ele.style.top = nowY +"px";
                var xr = x2 - oNav.offsetLeft;
                var yr = y2 - oNav.offsetTop;
                for(var i = 0,len = aLi.length;i<len;i++){
                    aLi[i].style.transform = "";
                    if(
                        aLi[i]!=ele&&
                        xr>aLi[i].offsetLeft&&
                        xr<aLi[i].offsetLeft+200&&
                        yr>aLi[i].offsetTop&&
                        yr<aLi[i].offsetTop+120
                    ){
                        console.log("碰撞成功");
                        aLi[i].style.transform = "scale(1.05)";
                        goalele = aLi[i];
                        isEle = true;
                    }
                }
            }
            
            break;
        case 'mouseup':
            toggle = false;
            if(goalele == undefined){
            console.log("123");
            ele.style.left = startX + "px";
            ele.style.top = startY + "px";
            }else{
                ele.style.top = goalele.offsetTop + "px";
                ele.style.left = goalele.offsetLeft + "px";
                goalele.style.left = startX + "px";
                goalele.style.top = startY + "px";
                goalele.style.transform = "";
            }
            console.log(goalele);
            goalele = null;
            break;
    }
}