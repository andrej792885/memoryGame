/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const ShapeButton = function(width,height,radius,color){
        this.Container_constructor();
        this.init(width,height,radius,color);
    };

    const p = createjs.extend(ShapeButton,createjs.Container);

    p.init = function (width,height,radius,color) {
        const body = new createjs.Shape(new createjs.Graphics().beginFill(color).drawRoundRect(0, 0, width, height,radius));
        body.regX = width/2;
        body.regy = height/2;
        this.addChild(body);
    };

    p.addText = function (text,font,color,x,y) {
        const txt = system.CustomMethods.makeText(text,font,color , "center" , "alphabetic");
        if(x){
            txt.x = x;
        }
        if(y){
            txt.y = y;
        }
        this.addChild(txt);
    };

    p.doClickAnimation = function () {
        createjs.Tween.get(this).to({scaleX:0.8,scaleY:0.8},80).to({scaleX:1,scaleY:1},80)
    };

    p.enableClick = function (bool) {
        this.mouseEnabled = bool;
        this.alpha = bool === true ? 1 : 0.6;
    };

    system.ShapeButton = createjs.promote(ShapeButton,"Container");

})();