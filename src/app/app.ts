import { pixiEngineInstance, IPixiEngineConfiguration } from "lightweight-pixijs-engine";
import { MainScene } from "./samples/main-scene";

import "../content/css/reset.css";

/** Interface for pixi main app */
export interface IApp {
}

/** Pixi main app */
class App implements IApp {

    /** Default constructor */
    constructor() {
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

    private _init(): void {

        // let config: IPixiEngineConfiguration = {
        //     backgroundColor: parseInt("<%= BACKGROUND_COLOR %>", 10),
        //     debugMode: "true" === "<%= DEBUG_MODE %>" as any,
        //     height: parseInt("<%= DESIGN_RESOLUTION_HEIGHT %>", 10),
        //     mainScene: "<%= MAIN_SCENE %>",
        //     width: parseInt("<%= DESIGN_RESOLUTION_WIDTH %>", 10)
        // };

        let config: IPixiEngineConfiguration = {
            backgroundColor: 0x000000,
            debugMode: true,
            height: 1280,
            scaleToWindow: true,
            width: 1920
        };

        pixiEngineInstance.initialize(config);
        let mainScene: MainScene = pixiEngineInstance.sceneManager.createScene("samples/main-scene", MainScene) as MainScene;
        pixiEngineInstance.sceneManager.replaceScene(mainScene);
    }


}


// create main app instance
export let application: IApp = new App();
