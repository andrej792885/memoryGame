/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const ImageButton = function(img,scale){
        this.Container_constructor();
        this.init(img,scale);
    };

    const p = createjs.extend(ImageButton,createjs.Container);
    p.scaleNum = 1;
    p.hasSticker = false;
    p._bestTimeTxt = null;
    p.stickerImg = null;

    p.init = function (img,scale) {
        const body = img;
        body.regX = body.image.width/2;
        if(scale){
            body.scale = scale;
            this.scaleNum = scale;
        }
        //body.regY = body.image.height/2; // pisalo je regy sa malim y , suludo je sad menjati pozicije svim dugmicima u svim igrama
        this.addChild(body);
    };

    p.getButtonWidth = function () {
        return this.getChildAt(0).image.width;
    };

    p.getButtonHeight = function () {
        return this.getChildAt(0).image.height;
    };

    p.addSticker = function () {
        const stickerImg = this.stickerImg = system.CustomMethods.makeImage("solved" , false);
        stickerImg.regX = stickerImg.image.width/2;
        stickerImg.regY = stickerImg.image.height/2;
        stickerImg.scale = this.scaleNum;
        stickerImg.x = (this.getButtonWidth() * this.scaleNum)/2;
        stickerImg.visible = false;
        this.addChild(stickerImg);
        this.hasSticker = false;
    };

    p.addBestTime = function () {
        const text = this._bestTimeTxt = system.CustomMethods.makeText("" , "28px Russo One" , "white" , "center" , "alphabetic");
        text.y = (this.getButtonHeight() * this.scaleNum) + 30;
        this.addChild(text);
    };

    p.showSticker = function(bool){
        this.hasSticker = bool;
        this.stickerImg.visible = bool;
        if(bool === true){
            this.stickerImg.x = (this.getButtonWidth() * this.scaleNum)/2;
        }
    };

    p.showBestTime = function(bool){
        this._bestTimeTxt.visible = bool;
    };

    p.updateBestTimeTxt = function (time) {
        this._bestTimeTxt.text = time;
    };

    p.enableClick = function (bool) {
        this.mouseEnabled = bool;
        this.alpha = bool === true ? 1 : 0.6;
    };

    system.ImageButton = createjs.promote(ImageButton,"Container");

})();