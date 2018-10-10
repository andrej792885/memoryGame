/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const Options = function(back){
        this.Container_constructor();
        this.initOptions(back);
    };

    const p = createjs.extend(Options,createjs.Container);

    p._selectedBackground = "";
    p._backgroundButtons = null;

    p.initOptions = function (back) {
        const background = system.CustomMethods.makeImage("optionsBackground" , false);
        this._backgroundButtons = [];

        const backgroundsText = system.CustomMethods.makeText("Backgrounds" , "27px Russo One" , "white" , "center" , "alphabetic");
        backgroundsText.x = 194;
        backgroundsText.y = 40;

        this.addChild(background,backgroundsText);

        const startX = -42;

        for(let i = 1; i < 6; i++){
            const imgName = "b"+i;
            const button = system.CustomMethods.makeImage(imgName,true);
            button.x = startX + (i * 70);
            button.y = 60;
            button.name = "background"+i;
            button.addEventListener("click" , (e) => {
                this.changeBackground(back,button);
            });
            this.addChild(button);
            this._backgroundButtons.push(button);
        }
        this.changeBackground(back,this._backgroundButtons[0]);

        const soundText = system.CustomMethods.makeText("Sound" , "27px Russo One" , "white" , "center" , "alphabetic");
        soundText.x = 194;
        soundText.y = 160;

        const soundOn = system.CustomMethods.makeImage("soundOn",true);
        soundOn.x = 110;
        soundOn.y = 180;
        soundOn.addEventListener("click" , (e)=>{
            this.muteSound(false , soundOff);
            soundOn.alpha = 1;
        });

        const soundOff = system.CustomMethods.makeImage("soundOff",true);
        soundOff.x = 210;
        soundOff.y = 180;
        soundOff.addEventListener("click" , (e)=>{
            this.muteSound(true , soundOn);
            soundOff.alpha = 1;
        });
        soundOff.alpha = 0.5;

        this.addChild(soundText , soundOn , soundOff);
    };

    p.muteSound = function(mute , otherButton) {
        if(createjs.Sound.muted === mute){return;}
        otherButton.alpha = 0.5;
        createjs.Sound.muted = mute;
    };

    p.changeBackground = function(back,clickedButton) {
        if(clickedButton.name === this._selectedBackground){return;}
        system.CustomMethods.swapImages(back,clickedButton.name,false,false);
        this._backgroundButtons.forEach((button)=>{
            button.alpha = 0.5;
        });
        clickedButton.alpha = 1;
        this._selectedBackground = clickedButton.name;
    };

    system.Options = createjs.promote(Options,"Container");

})();