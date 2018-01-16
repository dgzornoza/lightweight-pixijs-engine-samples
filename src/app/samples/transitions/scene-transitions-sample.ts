import {
    IKeyValueMap, EnumDirections, pixiEngineInstance,
    ITransition, TransitionSlide, TransitionFadeOut, TransitionFadeIn
} from "lightweight-pixijs-engine";


let resourcePaths: IKeyValueMap<string, string>[];

const SLIDE_DIRECTIONS: EnumDirections[] = [
    EnumDirections.NONE,
    EnumDirections.UP,
    EnumDirections.DOWN,
    EnumDirections.LEFT,
    EnumDirections.RIGHT,
    EnumDirections.UP + EnumDirections.LEFT,
    EnumDirections.DOWN + EnumDirections.LEFT,
    EnumDirections.DOWN + EnumDirections.RIGHT,
    EnumDirections.UP + EnumDirections.RIGHT
];

let gTransitionIndex: number = 1;
let gImageIndex: number = 0;
let gSlideCurrentDirectionIndex: EnumDirections = 0;
let gLoader: PIXI.loaders.Loader;

/**
 * Main class, for samples. Must have the name of the file to lazy load from configuration.
 */
export class SceneTransitionsSample extends PIXI.Container {

    protected _loadingText: PIXI.Text;

    constructor() {
        super();

        // load images with webpack
        let requireContext: __WebpackModuleApi.RequireContext = require.context("../../../content/img/scene-transitions/", true, /^\.\/.*\.jpg$/);
        resourcePaths = requireContext.keys().map((value: string) => {
            let index: string = /-(\w+).\w+$/.exec(value)![1];
            return { key: `BG_SCENE_${index}`, value: `assets/src/content/img/scene-transitions/bg-scene-${index}.jpg` };
        });

        this._loadingText = new PIXI.Text("Loading...", { fontSize: 72 });
        this._loadingText.anchor.x = 0.5;
        this._loadingText.x = pixiEngineInstance.renderer.width / 2;

        // create sample loader, load all resources and initialize scene
        gLoader = new PIXI.loaders.Loader();
        gLoader
            .add(resourcePaths.map((value: IKeyValueMap<string, string>) => { return value.value; }))
            .load(() => this._init());

    }

    /** override for destroy all sample scenes and reset sample */
    public destroy(options?: PIXI.DestroyOptions | boolean): void {
        super.destroy(options);

        pixiEngineInstance.sceneManager.destroySceneById("SceneOne");
        pixiEngineInstance.sceneManager.destroySceneById("SceneTwo");

        gLoader.destroy();
        gTransitionIndex = 0;
        gImageIndex = 0;
        gSlideCurrentDirectionIndex = 0;
    }

    private _init(): void {
        // start transitions scenes sapmle
        pixiEngineInstance.sceneManager.createAndReplaceScene("SceneOne", SceneOne);
    }
}

/**
 * Base class for implement transitions scene sample
 */
abstract class SceneTransitionSampleBase extends PIXI.Container {

    protected _background: PIXI.Sprite;
    protected _timeoutHandler: number;
    protected _transition: ITransition;

    constructor() {
        super();

        // create background sprite
        this.name = (this.constructor as any).name;
        this._background = new PIXI.Sprite();
        this.addChild(this._background);
        // create main menu button
        this._createMainMenuButton();

        // on added scene
        this.on("added", () => {
            // set new texture
            gImageIndex = gImageIndex ===  resourcePaths.length - 1 ? 1 : gImageIndex + 1;
            let resource: IKeyValueMap<string, string> = resourcePaths.find((value: IKeyValueMap<string, string>) => {
                return value.key === `BG_SCENE_${gImageIndex}`;
            }) as IKeyValueMap<string, string>;
            this._background.texture = gLoader.resources[resource.value].texture;

            // schedule auto change scene
            this._scheduleChangeScene();
        });
    }

    /**
     * Override in childrens for get next transition scene
     */
    protected abstract _getNextScene(): PIXI.Container | undefined;

    private _scheduleChangeScene(): void {

        this._timeoutHandler = window.setTimeout(() => {
            let scene: PIXI.Container | undefined = this._getNextScene();
            if (undefined === scene) { throw `${this.name}: nextScene can't create`; }

            // replace scene with transition
            switch (gTransitionIndex) {
                case 0:
                    this._transition = new TransitionSlide(pixiEngineInstance.sceneManager.currentScene, scene,
                        SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                case 1:
                    this._transition = new TransitionFadeIn(pixiEngineInstance.sceneManager.currentScene, scene,
                        SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                case 2:
                    this._transition = new TransitionFadeOut(pixiEngineInstance.sceneManager.currentScene, scene,
                        SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
                    break;
                default:
                    this._transition = new TransitionSlide(pixiEngineInstance.sceneManager.currentScene, scene,
                        SLIDE_DIRECTIONS[gSlideCurrentDirectionIndex]);
            }

            pixiEngineInstance.sceneManager.replaceSceneWithTransition(this._transition);

            gSlideCurrentDirectionIndex = gSlideCurrentDirectionIndex < SLIDE_DIRECTIONS.length - 1 ? gSlideCurrentDirectionIndex + 1 : 0;
            if (gSlideCurrentDirectionIndex === 0) { gTransitionIndex = gTransitionIndex < 3 ? gTransitionIndex + 1 : 0; }

        }, 3000);
    }

    private _createMainMenuButton(): void {

        let style: PIXI.TextStyle = new PIXI.TextStyle({
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


        let btn: PIXI.Text = new PIXI.Text("Main menu", style);
        btn.x = 20;
        btn.y = 20;

        // make the text interactive
        btn.interactive = true;
        btn.buttonMode = true;

        // event for go main menu
        btn
            .on("pointerdown", (_event: PIXI.interaction.InteractionEvent) => {
                window.clearTimeout(this._timeoutHandler);
                let scene: PIXI.Container = pixiEngineInstance.sceneManager.getScene("app/samples/mainSamples") as PIXI.Container;
                pixiEngineInstance.sceneManager.replaceScene(scene);
            });

        this.addChild(btn);
    }
}



class SceneOne extends SceneTransitionSampleBase {

    constructor() {
        super();
    }

    protected _getNextScene(): PIXI.Container | undefined {
        return pixiEngineInstance.sceneManager.getScene("SceneTwo") || pixiEngineInstance.sceneManager.createScene("SceneTwo", SceneTwo);
    }
}

class SceneTwo extends SceneTransitionSampleBase {

    constructor() {
        super();
    }

    protected _getNextScene(): PIXI.Container | undefined {
        return pixiEngineInstance.sceneManager.getScene("SceneOne") || pixiEngineInstance.sceneManager.createScene("SceneOne", SceneOne);
    }
}

