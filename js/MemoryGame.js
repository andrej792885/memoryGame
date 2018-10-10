/**
 * Created by Conan on 21.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const MemoryGame = function(numOfLevels,main){
        this.AbstractPuzzleGame_constructor("Memory",numOfLevels,main);
        this.initGame();
    };

    const p = createjs.extend(MemoryGame, system.AbstractPuzzleGame);

    p.cardsToFind = 0;

    p.initGame = function () {
        this.cardsToFind = 3;
        this.showImageBtn.visible = false;
        this.framesBtn.visible = false;
    };

    p.addLevelsButtons = function (from,to) {
        const levelsBtns = this.levelsBtns = new createjs.Container();

        for(let i = from; i < to; i++){
            const num = i+1;
            const level = "level" + num;
            const img = system.CustomMethods.makeImage(this.levelsOptions.options[level].mainImage , true);
            const levelBtn = new system.ImageButton(img,0.3);

            const firstEnd = from + 3;//9

            if(i >= firstEnd){//second row
                levelBtn.x = (i - firstEnd) * 600;
                levelBtn.y = 400;
            }else{//first row
                levelBtn.x = (i - from) * 600;//6
            }

            levelBtn.name = num;

            levelBtn.addSticker();
            levelBtn.addBestTime();
            levelsBtns.addChild(levelBtn);

        }
        levelsBtns.on("click" , (e)=> {
            this.level = e.target.parent.name;
            this.loadLevel(this.gameName);
            this.levelsBtns.visible = false;
        });

        levelsBtns.x = 400;
        levelsBtns.y = 200;

        this.addChild(levelsBtns);
    };

    p.refreshLevelsButtons = function(from , to){
        const solvedLevels = this.mainGame.player.memoryPuzzleSolvedLevels;
        let childInd = 0;
        for(let i = from; i < to; i++){
            const num = i+1;
            const level = "level" + num;
            const levelBtn = this.levelsBtns.getChildAt(childInd);
            const imgName = this.levelsOptions.options[level].mainImage;
            system.CustomMethods.swapImages(levelBtn.getChildAt(0) , imgName , true , false);

            levelBtn.name = num;

            if(solvedLevels.hasOwnProperty(num)){
                levelBtn.showSticker(true);
                levelBtn.updateBestTimeTxt(system.CustomMethods.formatTime(solvedLevels[num]));
            }else{
                levelBtn.showSticker(false);
                levelBtn.updateBestTimeTxt("");
            }
            childInd++;
        }
    };

/*    p.onLevelButton = function (e) {
        this.level = e.target.parent.name;
        this.loadLevel(this.gameName);
        this.levelsBtns.visible = false;
    };*/

    p.showInGameButtons = function (bool) {
        this.solveBtn.visible =
        this.solveCreditsComponent.visible = bool;
        this.paginationComponent.visible = !bool;
    };

    system.MemoryGame = createjs.promote(MemoryGame,"AbstractPuzzleGame");
})();