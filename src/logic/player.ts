import { windowHeight, windowWidth } from "../constants";

export const createPlayer = (scene: Phaser.Scene) => {
  const player = scene.physics.add
    .sprite(windowWidth / 2, windowHeight - 100, "hypership")
    .setScale(1)
    .refreshBody();

  player.setCollideWorldBounds(true);
  return player;
};

export const setupPlayerAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: "move",
    frames: scene.anims.generateFrameNumbers("hypership", { start: 0, end: 6 }),
    frameRate: 15,
    repeat: -1,
  });

  scene.anims.create({
    key: "stop",
    frames: scene.anims.generateFrameNumbers("hypership", {
      start: 7,
      end: 10,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

export const handlePlayerMovementWithCursor = (
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  cursor: Phaser.Input.Pointer
) => {
  // Horizontal movement
  const directionX = cursor.worldX - player.x;
  const horizontalThreshold = 50;

  if (Math.abs(directionX) > horizontalThreshold) {
    if (directionX < 0) {
      // Move left
      player.setVelocityX(-360);
      player.anims.play("move", true);
    } else {
      // Move right
      player.setVelocityX(360);
      player.anims.play("move", true);
    }
  } else {
    // Stop horizontal movement if near the pointer
    player.setVelocityX(0);
    player.anims.play("stop", true);
  }

  // Vertical movement
  const directionY = cursor.worldY - player.y;
  const verticalThreshold = 50;

  if (Math.abs(directionY) > verticalThreshold) {
    if (directionY < 0) {
      // Move up
      player.setVelocityY(-360);
    } else {
      // Move down
      player.setVelocityY(360);
    }
  } else {
    // Stop vertical movement if near the pointer
    player.setVelocityY(0);
  }
};
