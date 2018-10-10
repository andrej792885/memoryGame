/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const SolveCreditsComponent = function(game){
        this.Container_constructor();
        this.init(game);
    };

    const p = createjs.extend(SolveCreditsComponent,createjs.Container);
    p.game = null;
    p.bar = null;
    p.barLevel = null;
    p.numOfCredits = null;
    p.creditsTxt = null;

    p.init = function (game) {
        this.game = game;
        this.numOfCredits = this.game.mainGame.player.solveCredits;
        this.barLevel = this.game.mainGame.player.solveCreditsBarLevel;

        const frame = new createjs.Shape(new createjs.Graphics().setStrokeStyle(4).beginStroke("#8d3bff").drawRoundRect (0, 0, 402, 40, 6));
        frame.mouseEnabled = false;
        frame.snapToPixel = true;
        //frame.cache(0,0,402,40);

        const bar = this.bar = new createjs.Shape(new createjs.Graphics().beginFill("#7dc1ff").drawRoundRect(0,0,387,27,6));
        bar.x = 7;
        bar.y = 7;
        bar.snapToPixel = true;
        bar.mouseEnabled = false;
        bar.scaleX = 0.25 * this.barLevel;
        //bar.cache(0,0,387,27);

        const credits = this.creditsTxt = system.CustomMethods.makeText("X " + this.numOfCredits,"31px Russo One","#ffe2e9" , "center" , "alphabetic");
        credits.x = 440;
        credits.y = 31;

        const infoTxt = system.CustomMethods.makeText("solve button credits","27px Russo One","#8d3bff" , "center" , "alphabetic");
        infoTxt.x = 201;
        infoTxt.y = 30;

        this.addChild(frame,bar,credits,infoTxt);
        this.cache(-6,-6,500,52);
    };

    p.levelSolved = function () {
        this.uncache();
        this.barLevel++;
        if(this.barLevel === 4){
            this.numOfCredits++;
            this.updateCreditsTxt();
            this.updateBar();
            this.barLevel = 0;
        }else{
            this.updateBar();
        }
    };

    p.updateCreditsTxt = function () {
        this.creditsTxt.text = "X " + this.numOfCredits;
    };

    p.updateBar = function () {
        const scale = 0.25 * this.barLevel;
        createjs.Tween.get(this.bar).to({scaleX:scale},300).call(()=> {
            if(scale === 1){
                createjs.Tween.get(this.bar).to({scaleX:0},300).call(()=>{
                    this.cache(-6,-6,500,52);
                })
            }else{
                this.cache(-6,-6,500,52);
            }
        });
    };

    system.SolveCreditsComponent = createjs.promote(SolveCreditsComponent,"Container");

})();