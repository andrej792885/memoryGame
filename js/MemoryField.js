/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const MemoryField = function(img){
        this.AbstractPuzzleField_constructor();
        this.initMemoryField(img);
    };

    const p = createjs.extend(MemoryField, system.AbstractPuzzleField);
    p.fullName = null;

    p.initMemoryField = function (img) {
        img.regX = img.sourceRect.width/2;
        img.regY = img.sourceRect.height/2;
        this.addChild(img);
    };

    p.swapImages = function (img,setClickable) {
        const that = this;
        this.enableClick(setClickable);
        const image = this.getChildAt(0);
        createjs.Tween.get(image).to({skewY:10,scaleX:0},200,createjs.Ease.getPowInOut(2)).call(function () {
            that.getChildAt(0).sourceRect = img.sourceRect;
            createjs.Tween.get(image).to({skewY:0,scaleX:1},200,createjs.Ease.getPowInOut(2));
        });
    };
    
    p.checkPos = function () {
        return !this.mouseEnabled;
    };

    p.enableClick = function (bool) {
        this.mouseEnabled = bool;
    };

    system.MemoryField = createjs.promote(MemoryField,"AbstractPuzzleField");

})();