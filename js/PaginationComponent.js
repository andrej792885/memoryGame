/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const PaginationComponent = function(numPages,game){
        this.Container_constructor();
        this.init(numPages,game);
    };

    const p = createjs.extend(PaginationComponent,createjs.Container);
    p.game = null;
    p.leftButton = null;
    p.rightButton = null;
    p.currentPage = null;
    p.currentPageTxt = null;
    p.numOfPages = null;

    p.init = function (numPages,game) {
        this.game = game;
        this.numOfPages = numPages;
        this.currentPage = 1;

        const back = system.CustomMethods.makeImage("paginationBack" , false);

        const current = this.currentPageTxt = system.CustomMethods.makeText(this.currentPage,"31px Russo One","#fdfdff" , "center" , "middle");
        current.x = 107;
        current.y = 40;

        const img = system.CustomMethods.makeImage("leftBtn" , true);
        const left = this.leftButton = new system.ImageButton(img);
        const hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, 100, 100);
        hit.regX = 50;
        left.hitArea = hit;
        left.on("click",(event)=>{
            this.onLeftBtn();
        });
        left.x = 39;
        left.y = -10;

        const img2 = system.CustomMethods.makeImage("rightBtn" , true);
        const right = this.rightButton = new system.ImageButton(img2);
        right.hitArea = hit;
        right.on("click",(event)=>{
            this.onRightBtn();
        });

        right.x = 174;
        right.y = -10;

        this.addChild(back,current,left,right);

        if(numPages === 1){
            right.enableClick(false);
        }
        left.enableClick(false);
    };

    p.onLeftBtn = function () {
        if(this.currentPage > 1){
            this.currentPage --;
            this.updateComponents()
        }
    };

    p.onRightBtn = function () {
        if(this.currentPage < this.numOfPages){
            this.currentPage ++;
            this.updateComponents()
        }
    };

    p.updateComponents = function () {
        const leftEnable = this.currentPage > 1;
        const rightEnable = this.currentPage < this.numOfPages;
        this.leftButton.enableClick(leftEnable);
        this.rightButton.enableClick(rightEnable);
        this.currentPageTxt.text = this.currentPage;
        const from = (this.currentPage-1) * 6;
        const to = from + 6;
        this.game.resetLevelsButtons(from,to);
    };

    system.PaginationComponent = createjs.promote(PaginationComponent,"Container");

})();