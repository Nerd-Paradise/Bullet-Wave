import { Scene } from "phaser";
import {
  setupPlayerAnimations,
  createPlayer,
  handlePlayerMovementWithCursor,
  setupPlayerBulletAnimations,
  createEnemyGroup,
  createPlayerBulletGroup,
  createEnemyBulletGroup,
  setupEnemyBulletAnimations,
  setupEnemyAnimations,
  setupCollisionHandlers,
  handlePlayerBulletFiring,
  handleEnemySpawn,
  handleEnemyBulletFiring,
} from "../logic";
import { GameState } from "../types";
import { windowHeight, windowWidth } from "../constants";

export const mainScene = () => {
  const gameState: GameState = {
    platforms: null,
    score: 0,
    player: null,
    playerBulletGroup: null,
    enemyBulletGroup: null,
    enemyGroup: null,
    scoreText: null,
    cursors: null,
  };

  return class Background extends Scene {
    constructor() {
      super("BackGround");
    }

    preload() {
      this.load.setPath("assets");

      this.load.image("bg", "bg.png");
      this.load.image("star", "star.png");
      this.load.spritesheet("bullet", "bullet.png", {
        frameWidth: 32,
        frameHeight: 32,
      });

      this.load.spritesheet("hypership", "HyperwaveShiptype2.png", {
        frameWidth: 64,
        frameHeight: 100,
      });
      this.load.spritesheet("explosion", "explosion.png", {
        frameWidth: 32,
        frameHeight: 32,
      });

      // this.load.once("complete", () => {
      //   const texture = this.textures.get("explosion");
      //   console.log(
      //     "Bullet sprite sheet dimensions:",
      //     texture.getSourceImage().width,
      //     texture.getSourceImage().height
      //   );
      //   console.log(texture.frames);
      // });
    }

    create() {
      gameState.score = 0;
      this.add.image(windowWidth / 2, windowHeight / 2, "bg");

      // Player
      gameState.player = createPlayer(this);

      // Bullets
      gameState.playerBulletGroup = createPlayerBulletGroup(this);
      gameState.enemyBulletGroup = createEnemyBulletGroup(this);

      // Enemies
      gameState.enemyGroup = createEnemyGroup(this);

      // Animations
      setupPlayerAnimations(this);
      setupPlayerBulletAnimations(this);
      setupEnemyAnimations(this);
      setupEnemyBulletAnimations(this);

      setupCollisionHandlers(this, gameState);

      gameState.scoreText = this.add.text(10, 16, "Score: 0", {
        fontSize: "32px",
        fontStyle: "bold",
        color: "#ffff",
      });
    }

    update() {
      gameState.cursors = this.input.activePointer;

      if (
        gameState.player &&
        gameState.cursors &&
        gameState.playerBulletGroup &&
        gameState.enemyGroup &&
        gameState.enemyBulletGroup
      ) {
        handlePlayerMovementWithCursor(
          this,
          gameState.player,
          gameState.cursors
        );
        handlePlayerBulletFiring(
          this,
          gameState.player!,
          gameState.playerBulletGroup!,
          gameState.cursors!
        );
        handleEnemySpawn(this, gameState.enemyGroup!);
        handleEnemyBulletFiring(
          this,
          gameState.enemyGroup!,
          gameState.enemyBulletGroup!
        );
      }
    }
  };
};
