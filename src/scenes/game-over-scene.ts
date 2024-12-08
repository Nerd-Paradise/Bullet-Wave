// gameOverScene.ts
import { Scene } from "phaser";
import { windowHeight, windowWidth } from "../constants";

export const gameOverScene = () => {
  return class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameoverText: Phaser.GameObjects.Text;
    restartButton: Phaser.GameObjects.Rectangle;
    restartText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    score!: number;

    constructor() {
      super("GameOver");
    }

    init(data: { score: number }) {
      this.score = data.score;
    }
    preload() {
      this.load.image("bg", "assets/bg.png");
    }

    create() {
      this.camera = this.cameras.main;
      this.camera.setBackgroundColor(0x333333);

      this.background = this.add.image(windowWidth / 2, windowHeight / 2, "bg");
      this.background.setAlpha(0.5);
      this.background.setDisplaySize(windowWidth, windowHeight);

      this.gameoverText = this.add.text(
        windowWidth / 2 - 20,
        windowHeight / 2 - 100,
        "Game Over",
        {
          fontFamily: "Arial Black",
          fontSize: "42px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        }
      );
      this.gameoverText.setOrigin(1);

      this.scoreText = this.add.text(
        windowWidth / 2 - 80,
        windowHeight / 2 - 50,
        "Score: " + this.score,
        {
          fontFamily: "Arial Black",
          fontSize: "32px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        }
      );
      this.gameoverText.setOrigin(0.4);

      this.restartButton = this.add.rectangle(
        windowWidth / 2,
        windowHeight / 2 + 100,
        300,
        75,
        0x00ff00
      );
      this.restartButton.setInteractive();

      this.restartText = this.add.text(
        windowWidth / 2,
        windowHeight / 2 + 100,
        "Restart",
        {
          fontFamily: "Arial",
          fontSize: "32px",
          color: "#000000",
        }
      );
      this.restartText.setOrigin(0.5);

      this.restartButton.on("pointerdown", () => {
        this.scene.start("BackGround");
      });

      this.restartButton.on("pointerover", () => {
        this.restartButton.setFillStyle(0x00cc00);
      });

      this.restartButton.on("pointerout", () => {
        this.restartButton.setFillStyle(0x00ff00);
      });
    }
  };
};
