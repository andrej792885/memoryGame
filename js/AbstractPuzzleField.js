/**
 * Created by konan on 01-Aug-17.
 */

this.system = this.system || {};
(function(){
    "use strict";

    const AbstractPuzzleField = function(){
        this.Container_constructor();
        this.init();
    };

    const p = createjs.extend(AbstractPuzzleField, createjs.Container);


    p.init = function () {};

    p.removeFrame = function () {
        const frame = this.getChildAt(1);
        createjs.Tween.get(frame).to({alpha:0},500).call(()=> {
            this.removeChild(frame);
        });
    };

    p.showHideFrame = function () {
        const frame = this.getChildAt(1);
        frame.visible = !frame.visible;
    };

    p.removeField = function () {
        this.removeAllChildren();
        this.parent.removeChild(this);
    };

    system.AbstractPuzzleField = createjs.promote(AbstractPuzzleField,"Container");

})();