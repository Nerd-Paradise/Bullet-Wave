import { windowHeight, windowWidth } from "./constants";
import { gameOverScene, mainScene } from "./scenes";

import { Game, Types } from "phaser";

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO, // Phaser.AUTO, Phaser.CANVAS, Phaser.WEBGL or Phaser.HEADLESS
  width: windowWidth,
  height: windowHeight,
  parent: "game-container", // id of the div element in index.html
  backgroundColor: "#ffff",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [mainScene(), gameOverScene()],
};

export default new Game(config);
