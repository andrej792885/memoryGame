/**
 * Created by Conan on 28.7.2017..
 */

this.system = this.system || {};
(function(){
    "use strict";

    const MemoryLevelOptions = function(){
        this.init();
    };

    const p = MemoryLevelOptions.prototype;
    p.options = null;

    p.init = function () {
        this.options = {
            level1:{
                rows:3,
                columns:3,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain1"
            },
            level2:{
                rows:3,
                columns:4,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain2"
            },
            level3:{
                rows:3,
                columns:5,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain3"
            },
            level4:{
                rows:3,
                columns:6,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain4"
            },
            level5:{
                rows:3,
                columns:7,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain5"
            },
            level6:{
                rows:3,
                columns:8,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain6"
            },
            level7:{
                rows:4,
                columns:6,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain7"
            },
            level8:{
                rows:3,
                columns:9,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain8"
            },
            level9:{
                rows:4,
                columns:7,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain9"
            },
            level10:{
                rows:3,
                columns:10,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain10"
            },
            level11:{
                rows:3,
                columns:11,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain11"
            },
            level12:{
                rows:4,
                columns:9,
                fieldWidth:140,
                fieldHeight:190,
                mainImage:"memoryMain12"
            }
        }
    };

    p.getOptionsForLevel = function(level){
        const lvl = "level" + level;
        return this.options[lvl];

    };

    system.MemoryLevelOptions = MemoryLevelOptions;

})();