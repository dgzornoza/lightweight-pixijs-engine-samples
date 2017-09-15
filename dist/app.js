webpackJsonp([1],{

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lightweight_pixijs_engine_1 = __webpack_require__(16);
var main_scene_1 = __webpack_require__(198);
__webpack_require__(215);
/** Pixi main app */
var App = (function () {
    /** Default constructor */
    function App() {
        this._init();
    }
    // APP_VERSION: "1.0",
    // BASE_URL: "/",
    // API_BASE_URL: "/",
    // APP_NAME: "pixi.ts.sample",
    // DEBUG_MODE: "true",
    // MINIFIED_EXT: ".min",
    // DESIGN_RESOLUTION_WIDTH: "1920",
    // DESIGN_RESOLUTION_HEIGHT: "1280",
    // BACKGROUND_COLOR: "0x000000",P
    // MAIN_SCENE: "app/samples/mainSamples"
    App.prototype._init = function () {
        // let config: IPixiEngineConfiguration = {
        //     backgroundColor: parseInt("<%= BACKGROUND_COLOR %>", 10),
        //     debugMode: "true" === "<%= DEBUG_MODE %>" as any,
        //     height: parseInt("<%= DESIGN_RESOLUTION_HEIGHT %>", 10),
        //     mainScene: "<%= MAIN_SCENE %>",
        //     width: parseInt("<%= DESIGN_RESOLUTION_WIDTH %>", 10)
        // };
        var config = {
            backgroundColor: 0x000000,
            debugMode: true,
            height: 1280,
            scaleToWindow: true,
            width: 1920
        };
        lightweight_pixijs_engine_1.pixiEngineInstance.initialize(config);
        lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.createAndReplaceScene("samples/main-scene", main_scene_1.MainScene);
    };
    return App;
}());
// create main app instance
exports.application = new App();


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lightweight_pixijs_engine_1 = __webpack_require__(16);
var scene_transitions_sample_1 = __webpack_require__(199);
var sprite_transitions_sample_1 = __webpack_require__(214);
/**
 * main class for execute all samples
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this._samples = [
            { key: "Scene Transitions", value: scene_transitions_sample_1.SceneTransitionsSample },
            { key: "Container Transitions", value: sprite_transitions_sample_1.SpriteTransitionsSample }
        ];
        _this._currentSample = undefined;
        _this._menuContainer = new PIXI.Container();
        _this.addChild(_this._menuContainer);
        _this._createMenu();
        // on added scene
        _this.on("added", function (_displayObject) {
            // release scenes and resources
            if (_this._currentSample) {
                lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.destroyScene(_this._currentSample);
            }
            // Object.keys(PIXI.utils.TextureCache).forEach((texture: string) => {
            //     PIXI.utils.TextureCache[texture].destroy(true);
            // });
            // PIXI.loader.reset();
        });
        return _this;
    }
    MainScene.prototype._createMenu = function () {
        var _this = this;
        var style = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAngle: Math.PI / 6,
            dropShadowBlur: 4,
            dropShadowColor: "#000000",
            dropShadowDistance: 6,
            fill: ["#ffffff", "#00ff99"],
            fontFamily: "Bree Serif, serif",
            fontSize: 72,
            fontStyle: "italic",
            fontWeight: "bold",
            stroke: "#4a1850",
            strokeThickness: 5
        });
        var centerX = lightweight_pixijs_engine_1.pixiEngineInstance.renderer.width / 2;
        for (var index = 0; index < this._samples.length; index++) {
            var menuItem = new PIXI.Text(this._samples[index].key, style);
            menuItem.anchor.x = 0.5;
            menuItem.x = centerX;
            menuItem.y = (index + 1) * 150;
            // make the text interactive
            menuItem.interactive = true;
            menuItem.buttonMode = true;
            // events
            menuItem
                .on("pointerdown", function (event) { _this._onMenuItemDown(event); })
                .on("pointerup", function (event) { _this._onMenuItemUp(event); })
                .on("pointerupoutside", function (event) { _this._onMenuItemUp(event); })
                .on("pointerover", function (event) { _this._onMenuItemOver(event); })
                .on("pointerout", function (event) { _this._onMenuItemOut(event); });
            this._menuContainer.addChild(menuItem);
        }
    };
    MainScene.prototype._onMenuItemDown = function (_event) {
        var sample = this._samples.find(function (value) {
            return value.key === _event.currentTarget.text;
        });
        // load new scene and replace
        this._currentSample = lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.createScene(sample.key, sample.value);
        lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.replaceScene(this._currentSample);
    };
    MainScene.prototype._onMenuItemUp = function (_event) {
        // ...
    };
    MainScene.prototype._onMenuItemOver = function (_event) {
        _event.currentTarget.scale.set(1.5, 1.2);
    };
    MainScene.prototype._onMenuItemOut = function (_event) {
        _event.currentTarget.scale.set(1, 1);
    };
    return MainScene;
}(PIXI.Container));
exports.MainScene = MainScene;


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lightweight_pixijs_engine_1 = __webpack_require__(16);
// load images with webpack
var requireContext = __webpack_require__(93);
/* tslint:disable no-require-imports */
var resourcePaths = requireContext.keys().map(function (value, index) {
    return { key: "BG_SCENE_" + index, value: "assets/src/content/img/scene-transitions/" + value };
});
/* tslint:enable no-require-imports */
var SLIDE_DIRECTIONS = [
    lightweight_pixijs_engine_1.EnumDirections.UP,
    lightweight_pixijs_engine_1.EnumDirections.DOWN,
    lightweight_pixijs_engine_1.EnumDirections.LEFT,
    lightweight_pixijs_engine_1.EnumDirections.RIGHT,
    lightweight_pixijs_engine_1.EnumDirections.UP + lightweight_pixijs_engine_1.EnumDirections.LEFT,
    lightweight_pixijs_engine_1.EnumDirections.DOWN + lightweight_pixijs_engine_1.EnumDirections.LEFT,
    lightweight_pixijs_engine_1.EnumDirections.DOWN + lightweight_pixijs_engine_1.EnumDirections.RIGHT,
    lightweight_pixijs_engine_1.EnumDirections.UP + lightweight_pixijs_engine_1.EnumDirections.RIGHT
];
var gTransitionIndex = 0;
var gImageIndex = 0;
var gSlideCurrentDirectionIndex = 0;
var gLoader;
/**
 * Main class, for samples. Must have the name of the file to lazy load from configuration.
 */
var SceneTransitionsSample = (function (_super) {
    __extends(SceneTransitionsSample, _super);
    function SceneTransitionsSample() {
        var _this = _super.call(this) || this;
        _this._loadingText = new PIXI.Text("Loading...", { fontSize: 72 });
        _this._loadingText.anchor.x = 0.5;
        _this._loadingText.x = lightweight_pixijs_engine_1.pixiEngineInstance.renderer.width / 2;
        // create sample loader, load all resources and initialize scene
        gLoader = new PIXI.loaders.Loader();
        gLoader
            .add(resourcePaths.map(function (value) { return value.value; }))
            .load(function () { return _this._init(); });
        return _this;
    }
    /** override for destroy all sample scenes and reset sample */
    SceneTransitionsSample.prototype.destroy = function (options) {
        _super.prototype.destroy.call(this, options);
        lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.destroySceneById("SceneOne");
        lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.destroySceneById("SceneTwo");
        gLoader.destroy();
        gTransitionIndex = 0;
        gImageIndex = 0;
        gSlideCurrentDirectionIndex = 0;
    };
    SceneTransitionsSample.prototype._init = function () {
        // start transitions scenes sapmle
        lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.createAndReplaceScene("SceneOne", SceneOne);
    };
    return SceneTransitionsSample;
}(PIXI.Container));
exports.SceneTransitionsSample = SceneTransitionsSample;
/**
 * Base class for implement transitions scene sample
 */
var SceneTransitionSampleBase = (function (_super) {
    __extends(SceneTransitionSampleBase, _super);
    function SceneTransitionSampleBase() {
        var _this = _super.call(this) || this;
        // create background sprite
        _this.name = _this.constructor.name;
        _this._background = new PIXI.Sprite();
        _this.addChild(_this._background);
        // create main menu button
        _this._createMainMenuButton();
        // on added scene
        _this.on("added", function () {
            // set new texture
            gImageIndex = gImageIndex === resourcePaths.length - 1 ? 1 : gImageIndex + 1;
            var resource = resourcePaths.find(function (value) {
                return value.key === "BG_SCENE_" + gImageIndex;
            });
            _this._background.texture = gLoader.resources[resource.value].texture;
            // schedule auto change scene
            _this._scheduleChangeScene();
        });
        return _this;
    }
    SceneTransitionSampleBase.prototype._scheduleChangeScene = function () {
        var _this = this;
        this._timeoutHandler = window.setTimeout(function () {
            var scene = _this._getNextScene();
            if (undefined === scene) {
                throw _this.name + ": nextScene can't create";
            }
            // replace scene with transition
            switch (gTransitionIndex) {
                case 0:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionSlide(lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.currentScene, scene, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                case 1:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionFadeIn(lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.currentScene, scene, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                case 2:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionFadeOut(lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.currentScene, scene, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                default:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionSlide(lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.currentScene, scene, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
            }
            lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.replaceSceneWithTransition(_this._transition);
            gSlideCurrentDirectionIndex = gSlideCurrentDirectionIndex < SLIDE_DIRECTIONS.length - 1 ? gSlideCurrentDirectionIndex + 1 : 0;
            if (gSlideCurrentDirectionIndex === 0) {
                gTransitionIndex = gTransitionIndex < 3 ? gTransitionIndex + 1 : 0;
            }
        }, 3000);
    };
    SceneTransitionSampleBase.prototype._createMainMenuButton = function () {
        var _this = this;
        var style = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAngle: Math.PI / 6,
            dropShadowBlur: 4,
            dropShadowColor: "#000000",
            dropShadowDistance: 6,
            fill: ["#ffffff", "#00ff99"],
            fontFamily: "Bree Serif, serif",
            fontSize: 72,
            fontStyle: "italic",
            fontWeight: "bold",
            stroke: "#4a1850",
            strokeThickness: 5
        });
        var btn = new PIXI.Text("Main menu", style);
        btn.x = 20;
        btn.y = 20;
        // make the text interactive
        btn.interactive = true;
        btn.buttonMode = true;
        // event for go main menu
        btn
            .on("pointerdown", function (_event) {
            window.clearTimeout(_this._timeoutHandler);
            var scene = lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.getScene("app/samples/mainSamples");
            lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.replaceScene(scene);
        });
        this.addChild(btn);
    };
    return SceneTransitionSampleBase;
}(PIXI.Container));
var SceneOne = (function (_super) {
    __extends(SceneOne, _super);
    function SceneOne() {
        return _super.call(this) || this;
    }
    SceneOne.prototype._getNextScene = function () {
        return lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.getScene("SceneTwo") || lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.createScene("SceneTwo", SceneTwo);
    };
    return SceneOne;
}(SceneTransitionSampleBase));
var SceneTwo = (function (_super) {
    __extends(SceneTwo, _super);
    function SceneTwo() {
        return _super.call(this) || this;
    }
    SceneTwo.prototype._getNextScene = function () {
        return lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.getScene("SceneOne") || lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.createScene("SceneOne", SceneOne);
    };
    return SceneTwo;
}(SceneTransitionSampleBase));


/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-1.jpg";

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-10.jpg";

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-11.jpg";

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-12.jpg";

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-13.jpg";

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-14.jpg";

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-2.jpg";

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-3.jpg";

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-4.jpg";

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-5.jpg";

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-6.jpg";

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-7.jpg";

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-8.jpg";

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/src/content/img/scene-transitions/bg-scene-9.jpg";

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lightweight_pixijs_engine_1 = __webpack_require__(16);
// load images with webpack
var requireContext = __webpack_require__(93);
/* tslint:disable no-require-imports */
var resourcePaths = requireContext.keys().map(function (value, index) {
    return { key: "BG_SCENE_" + index, value: "assets/src/content/img/scene-transitions/" + value };
});
/* tslint:enable no-require-imports */
var SLIDE_DIRECTIONS = [
    lightweight_pixijs_engine_1.EnumDirections.UP,
    lightweight_pixijs_engine_1.EnumDirections.DOWN,
    lightweight_pixijs_engine_1.EnumDirections.LEFT,
    lightweight_pixijs_engine_1.EnumDirections.RIGHT,
    lightweight_pixijs_engine_1.EnumDirections.UP + lightweight_pixijs_engine_1.EnumDirections.LEFT,
    lightweight_pixijs_engine_1.EnumDirections.DOWN + lightweight_pixijs_engine_1.EnumDirections.LEFT,
    lightweight_pixijs_engine_1.EnumDirections.DOWN + lightweight_pixijs_engine_1.EnumDirections.RIGHT,
    lightweight_pixijs_engine_1.EnumDirections.UP + lightweight_pixijs_engine_1.EnumDirections.RIGHT
];
var gTransitionIndex = 0;
var gImageIndex = 0;
var gSlideCurrentDirectionIndex = 0;
var gLoader;
/**
 * Main scene class, for samples. Must have the name of the file to lazy load from configuration.
 */
var SpriteTransitionsSample = (function (_super) {
    __extends(SpriteTransitionsSample, _super);
    function SpriteTransitionsSample() {
        var _this = _super.call(this) || this;
        _this._loadingText = new PIXI.Text("Loading...", { fontSize: 72 });
        _this._loadingText.anchor.x = 0.5;
        _this._loadingText.x = lightweight_pixijs_engine_1.pixiEngineInstance.renderer.width / 2;
        // create sample loader, load all resources and initialize scene
        gLoader = new PIXI.loaders.Loader();
        gLoader
            .add(resourcePaths.map(function (value) { return value.value; }))
            .load(function () { return _this._init(); });
        return _this;
    }
    /** override for reset sample */
    SpriteTransitionsSample.prototype.destroy = function (options) {
        _super.prototype.destroy.call(this, options);
        window.clearInterval(this._intervalHandler);
        if (this._transition) {
            this._transition.stop();
        }
        gTransitionIndex = 0;
        gImageIndex = 0;
        gSlideCurrentDirectionIndex = 0;
        gLoader.destroy();
    };
    SpriteTransitionsSample.prototype._init = function () {
        // create sample sprites
        this.addChild(this._setNextSpriteTexture(this._currentSprite = new PIXI.Sprite()));
        this.addChild(this._setNextSpriteTexture(this._nextSprite = new PIXI.Sprite()));
        // next sprite is invisible
        this._nextSprite.visible = false;
        // create main menu button
        this._createMainMenuButton();
        // schedule auto change sprites
        this._scheduleChangeSprites();
    };
    SpriteTransitionsSample.prototype._scheduleChangeSprites = function () {
        var _this = this;
        this._intervalHandler = window.setInterval(function () {
            // change sprites with transition
            switch (gTransitionIndex) {
                case 0:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionSlide(_this._currentSprite, _this._nextSprite, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                case 1:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionFadeIn(_this._currentSprite, _this._nextSprite, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                case 2:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionFadeOut(_this._currentSprite, _this._nextSprite, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                default:
                    _this._transition = new lightweight_pixijs_engine_1.ContainerTransitionSlide(_this._currentSprite, _this._nextSprite, SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
            }
            // visible next sprite for start transition
            _this._nextSprite.visible = true;
            _this._transition.start()
                .then(function () {
                // change next image and hide sprite
                _this._currentSprite.visible = false;
                _this._setNextSpriteTexture(_this._currentSprite);
                // call restore for set initial sprites states
                _this._transition.restore();
                // swap sprites for change z-index order and set visibility next sprite (previous current)
                _this._swapSprites();
            });
            gSlideCurrentDirectionIndex = gSlideCurrentDirectionIndex < SLIDE_DIRECTIONS.length - 1 ? gSlideCurrentDirectionIndex + 1 : 0;
            if (gSlideCurrentDirectionIndex === 0) {
                gTransitionIndex = gTransitionIndex < 3 ? gTransitionIndex + 1 : 0;
            }
        }, 3000);
    };
    SpriteTransitionsSample.prototype._setNextSpriteTexture = function (sprite) {
        // set new texture
        gImageIndex = gImageIndex === resourcePaths.length - 1 ? 1 : gImageIndex + 1;
        var resource = resourcePaths.find(function (value) {
            return value.key === "BG_SCENE_" + gImageIndex;
        });
        sprite.texture = gLoader.resources[resource.value].texture;
        return sprite;
    };
    SpriteTransitionsSample.prototype._swapSprites = function () {
        this.swapChildren(this._currentSprite, this._nextSprite);
        var tempSprite = this._currentSprite;
        this._currentSprite = this._nextSprite;
        this._nextSprite = tempSprite;
    };
    SpriteTransitionsSample.prototype._createMainMenuButton = function () {
        var style = new PIXI.TextStyle({
            dropShadow: true,
            dropShadowAngle: Math.PI / 6,
            dropShadowBlur: 4,
            dropShadowColor: "#000000",
            dropShadowDistance: 6,
            fill: ["#ffffff", "#00ff99"],
            fontFamily: "Bree Serif, serif",
            fontSize: 72,
            fontStyle: "italic",
            fontWeight: "bold",
            stroke: "#4a1850",
            strokeThickness: 5
        });
        var btn = new PIXI.Text("Main menu", style);
        btn.x = 20;
        btn.y = 20;
        // make the text interactive
        btn.interactive = true;
        btn.buttonMode = true;
        // event for go main menu
        btn
            .on("pointerdown", function (_event) {
            var scene = lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.getScene("app/samples/mainSamples");
            lightweight_pixijs_engine_1.pixiEngineInstance.sceneManager.replaceScene(scene);
        });
        this.addChild(btn);
    };
    return SpriteTransitionsSample;
}(PIXI.Container));
exports.SpriteTransitionsSample = SpriteTransitionsSample;


/***/ }),

/***/ 215:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bg-scene-1.jpg": 200,
	"./bg-scene-10.jpg": 201,
	"./bg-scene-11.jpg": 202,
	"./bg-scene-12.jpg": 203,
	"./bg-scene-13.jpg": 204,
	"./bg-scene-14.jpg": 205,
	"./bg-scene-2.jpg": 206,
	"./bg-scene-3.jpg": 207,
	"./bg-scene-4.jpg": 208,
	"./bg-scene-5.jpg": 209,
	"./bg-scene-6.jpg": 210,
	"./bg-scene-7.jpg": 211,
	"./bg-scene-8.jpg": 212,
	"./bg-scene-9.jpg": 213
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 93;

/***/ })

},[197]);
//# sourceMappingURL=app.js.map