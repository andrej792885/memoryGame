/**
 * Created by Conan on 27.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const MemoryBoard = function(options,game){
        this.AbstractPuzzleBoard_constructor(options,game);
        this.initBoard();
    };

    const p = createjs.extend(MemoryBoard, system.AbstractPuzzleBoard);
    p._usedFieldNames = [];
    p._revealedCards = [];
    p._overlayCard = null;
    p._cardsJson = null;
    let that;

    // public methods

    p.initBoard = function () {
        that = this;
    };

    p.generateFields = function () {
        this._usedFieldNames = [];
        this._revealedCards = [];
        this.fieldSpacing = 10;
        let x;
        let y;
        let spacingX;
        let spacingY;


        const json = queue.getResult("cardsJson");


        const overlayCardName = Math.round(Math.random()) === 1 ? "cardBackBlue" : "cardBackRed";
        const overlayPropsIndex = json.animations[overlayCardName];
        const overlayCardProps = json.frames[overlayPropsIndex];

        let sameCards = 0;
        let fullName = this._generateRandomFieldName();

        for(const i = 0; i < this.rows; i++){
            y = i * this.fieldHeight;
            spacingY  = i * this.fieldSpacing;
            for(const j = 0; j < this.columns; j++){
                x = j * this.fieldWidth;
                spacingX = j * this.fieldSpacing;
                const overlayCard = new createjs.Bitmap(queue.getResult("cardsAtlas"));
                overlayCard.sourceRect = new createjs.Rectangle(overlayCardProps[0],overlayCardProps[1],overlayCardProps[2],overlayCardProps[3]);
                const field = new system.MemoryField(overlayCard);
                field.x = x + (overlayCardProps[2]/2) + spacingX;
                field.y = y + (overlayCardProps[3]/2) + spacingY;
                field.name = "n" + i + j;

                if(sameCards === this.game.cardsToFind){
                    sameCards = 0;
                    fullName = this._generateRandomFieldName();
                }

                field.fullName = fullName;
                sameCards++;
                this.addChild(field);
            }
        }
        this._overlayCard = overlayCard.clone();
        this._cardsJson = json;
    };

    p.rearrangeFields = function () {
        const children = this.numChildren;
        for(const i = 0; i < children; i++){
            const randomNum = Math.round(Math.random() * (children-1));
            const child = this.getChildAt(i);
            const randomChild = this.getChildAt(randomNum);

            const childX = child.x;
            const childY = child.y;
            const randomChildX = randomChild.x;
            const randomChildY = randomChild.y;

            child.x = randomChildX;
            child.y = randomChildY;
            randomChild.x = childX;
            randomChild.y = childY;
        }
    };

    p.onChoose = function (e) {
        const child = e.target.parent.name;
        const field = that.getChildByName(child);
        that._revealedCards.push(field);

        const clickedCard = new createjs.Bitmap(queue.getResult("cardsAtlas"));
        const clickedCardPropsIndex = that._cardsJson.animations[field.fullName];
        const clickedCardProps = that._cardsJson.frames[clickedCardPropsIndex];

        clickedCard.sourceRect = new createjs.Rectangle(clickedCardProps[0],clickedCardProps[1],clickedCardProps[2],clickedCardProps[3]);
        field.swapImages(clickedCard,false);

        if(that._revealedCards.length === that.game.cardsToFind){
            if(!that._cardsIsMatched()){
                that.enableMouse(false);
                setTimeout(function () {
                    that._coverCards();
                },1000);
            }else{
                that._revealedCards = [];
                that.checkBoard();
            }
        }
    };

    p.doSolveAnimation = function (field) {
        this.animationsCounter++;
        if(field.mouseEnabled){
            const clickedCard = new createjs.Bitmap(queue.getResult("cardsAtlas"));
            const clickedCardPropsIndex = that._cardsJson.animations[field.fullName];
            const clickedCardProps = that._cardsJson.frames[clickedCardPropsIndex];

            clickedCard.sourceRect = new createjs.Rectangle(clickedCardProps[0],clickedCardProps[1],clickedCardProps[2],clickedCardProps[3]);
            field.swapImages(clickedCard,false);
        }
        if(this.animationsCounter === this.numChildren){
            this.animationsCounter = 0;
            this.checkBoard();
        }
    };

    p.removeFieldFrames = function () {};

    // private methods

    p._generateRandomFieldName = function () {
        const that = this;
        let name;
        makeName();

        function makeName() {
            const signs = ["Clubs","Diamonds","Hearts","Spades"];
            const randomSign = signs[Math.round(Math.random()*3)]; // from 0 to 3
            const randomNum = Math.round(Math.random()*12) + 2;// from 2 to 14
            name = "card" + randomSign + randomNum;
            if(that._usedFieldNames.indexOf(name) > -1){
                makeName();
            }else{
                that._usedFieldNames.push(name);
            }
        }
        return name;
    };

    p._coverCards = function () {
        for(const i = 0; i < this._revealedCards.length; i++){
            this._revealedCards[i].swapImages(this._overlayCard,true);
        }
        this._revealedCards = [];
        this.enableMouse(true);
    };

    p._cardsIsMatched = function () {
        let isMatched = false;
        if(this._revealedCards[0].fullName === this._revealedCards[1].fullName){
            if(this._revealedCards[0].fullName === this._revealedCards[2].fullName){
                isMatched = true;
            }
        }
        return isMatched;
    };

    system.MemoryBoard = createjs.promote(MemoryBoard,"AbstractPuzzleBoard");
})();