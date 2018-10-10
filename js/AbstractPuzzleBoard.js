/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const AbstractPuzzleBoard = function(game){
        this.Container_constructor();
        this.init(game);
    };

    const p = createjs.extend(AbstractPuzzleBoard, createjs.Container);
    p.rows = 0;
    p.columns = 0;
    p.fieldWidth = 0;
    p.fieldHeight = 0;
    p.fieldSpacing = 0;
    p.selectedField = null;
    p.animationsCounter = 0;
    p.mainImage = "";
    p.game = null;

    p.init = function (game) {
        this.game = game;
        this.addEventListener("click",(e)=>{this.onChoose(e)});
    };

    p.setBoard = function (options) {
        this.rows = options.rows;
        this.columns = options.columns;
        this.fieldWidth = options.fieldWidth;
        this.fieldHeight = options.fieldHeight;
        this.mainImage = options.mainImage;
        this.generateFields();
        this.rearrangeFields();
        this.enableMouse(true);
    };

    p.checkBoard = function () {
        const children = this.numChildren;
        let correct = 0;
        for(let i = 0; i < children; i++){
            if(this.getChildAt(i).checkPos()){
                correct++;
            }else{
                break;
            }
        }
        if(children === correct){
            this.enableMouse(false);
            this.game.levelSolved();
            this.removeFieldFrames();
        }else{
            this.enableMouse(true);
        }
    };

    p.removeFieldFrames = function () {
        const children = this.numChildren;
        for(let i = 0; i < children; i++){
            this.getChildAt(i).removeFrame();
        }
    };

    p.showHideFrames = function () {
        const children = this.numChildren;
        for(let i = 0; i < children; i++){
            this.getChildAt(i).showHideFrame();
        }
    };

    p.removeFields = function () {
        const children = this.numChildren-1;
        for(let i = children; i > -1; i--){
            this.getChildAt(i).removeField();
        }
    };
    
    p.solvePuzzle = function () {
        const children = this.numChildren;
        this.game.framesBtn.enableClick(false);
        this.game.solveBtn.enableClick(false);
        for(let i = 0; i < children; i++){
            const child = this.getChildAt(i);
            this.doSolveAnimation(child);
        }
    };

    p.getBoardWidth = function () {
        return (this.columns * this.fieldWidth) + (this.columns * this.fieldSpacing);
    };

    p.getBoardHeight = function () {
        return (this.rows * this.fieldHeight) + (this.columns * this.fieldSpacing);
    };

    p.enableMouse = function (bool) {
        this.mouseEnabled = bool;
    };

    system.AbstractPuzzleBoard = createjs.promote(AbstractPuzzleBoard,"Container");

})();