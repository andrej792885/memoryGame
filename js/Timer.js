/**
 * Created by Conan on 26.5.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const Timer = function(){
        this.Container_constructor();
        this.initTimer();
    };

    const p = createjs.extend(Timer,createjs.Container);

    p._seconds = 0;
    p._minutes = 0;
    p._timerTxt = "";
    p._interval = null;


    p.initTimer = function () {
        const text = this._timerTxt = system.CustomMethods.makeText("00:00","32px Russo One","white" , "center" , "alphabetic");
        this.addChild(text);
        this.show(false);
    };

    p.startTimer = function () {
        this.show(true);
        let minutes = "";
        let seconds = "";
        this._interval = setInterval(()=> {
            this._seconds++;
            if(this._seconds > 59){
                this._seconds = 0;
                this._minutes++;
            }
            minutes = this._minutes < 10 ? "0" + this._minutes : "" + this._minutes; //  da bi zadrzao tip promenjive , tj da ne bude do 9 string , a posle number
            seconds = this._seconds < 10 ? "0" + this._seconds : "" + this._seconds;
            this._timerTxt.text = minutes + ":" + seconds;
        },1000);
    };

    p.stopTimer = function () {
        if(this._interval){
            console.log("clear interval");
            clearInterval(this._interval);
            this._interval = null;
            this.show(false);
        }
    };

    p.takeTime = function () {
        return this._seconds + (this._minutes * 60);
    };

    p.reset = function () {
        this._seconds = 0;
        this._minutes = 0;
        this._timerTxt.text = "00:00";
    };

    p.show = function (bool) {
        this.visible = bool;
    };

    system.Timer = createjs.promote(Timer,"Container");

})();