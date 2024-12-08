import { GameState } from "../types";

// Setup collision animations
export const setupCollisionAnimations = (scene: Phaser.Scene) => {
  // Enemy Explosion Animation
  scene.anims.create({
    key: "explosion",
    frames: scene.anims.generateFrameNumbers("explosion", {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: 0,
  });
};

// Play collision animation at a specific location
const playCollisionAnimation = (scene: Phaser.Scene, x: number, y: number) => {
  const animSprite = scene.add
    .sprite(x, y, "explosionSpritesheet")
    .play("explosion")
    .on("animationcomplete", () => {
      animSprite.destroy();
    });
};

export const handlePlayerBulletEnemyCollision = (
  scene: Phaser.Scene,
  playerBullet: Phaser.GameObjects.Sprite,
  enemy: Phaser.GameObjects.Sprite,
  gameState: GameState
) => {
  gameState.score += 10;
  if (gameState.scoreText) {
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  }

  playCollisionAnimation(scene, enemy.x, enemy.y);

  playerBullet.setActive(false).setVisible(false);
  enemy.setActive(false).setVisible(false);
};

export const handleEnemyBulletPlayerCollision = (
  scene: Phaser.Scene,
  enemyBullet: Phaser.GameObjects.Sprite,
  player: Phaser.GameObjects.Sprite,
  gameState: GameState
) => {
  // Play player death animation
  playCollisionAnimation(scene, player.x, player.y);

  // Deactivate bullet
  enemyBullet.setActive(false).setVisible(false);

  // Trigger game over
  triggerGameOver(scene, gameState);
};

export const handlePlayerEnemyCollision = (
  scene: Phaser.Scene,
  player: Phaser.GameObjects.Sprite,
  enemy: Phaser.GameObjects.Sprite,
  gameState: GameState
) => {
  playCollisionAnimation(scene, player.x, player.y);

  // Deactivate enemy
  enemy.setActive(false).setVisible(false);

  // Trigger game over
  triggerGameOver(scene, gameState);
};

export const handleBulletCollision = (
  scene: Phaser.Scene,
  playerBullet: Phaser.GameObjects.Sprite,
  enemyBullet: Phaser.GameObjects.Sprite
) => {
  // Play bullet burst animation at midpoint
  const midX = playerBullet.x + enemyBullet.x;
  const midY = playerBullet.y + enemyBullet.y;

  playCollisionAnimation(scene, midX, midY);

  // Deactivate both bullets
  playerBullet.setActive(false).setVisible(false);
  enemyBullet.setActive(false).setVisible(false);
};

export const triggerGameOver = (scene: Phaser.Scene, gameState: GameState) => {
  scene.physics.pause();
  scene.scene.start("GameOver", {
    score: gameState.score,
  });
};

export const setupCollisionHandlers = (
  scene: Phaser.Scene,
  gameState: GameState
) => {
  // Setup collision animations
  setupCollisionAnimations(scene);

  // Player bullet hits enemy
  scene.physics.add.collider(
    gameState.playerBulletGroup!,
    gameState.enemyGroup!,
    (playerBullet, enemy) =>
      handlePlayerBulletEnemyCollision(
        scene,
        playerBullet as Phaser.GameObjects.Sprite,
        enemy as Phaser.GameObjects.Sprite,
        gameState
      ),
    undefined,
    scene
  );

  // Enemy bullet hits player
  scene.physics.add.collider(
    gameState.enemyBulletGroup!,
    gameState.player!,
    (enemyBullet, player) =>
      handleEnemyBulletPlayerCollision(
        scene,
        enemyBullet as Phaser.GameObjects.Sprite,
        player as Phaser.GameObjects.Sprite,
        gameState
      ),
    undefined,
    scene
  );

  // Player hits enemy
  scene.physics.add.collider(
    gameState.player!,
    gameState.enemyGroup!,
    (player, enemy) =>
      handlePlayerEnemyCollision(
        scene,
        player as Phaser.GameObjects.Sprite,
        enemy as Phaser.GameObjects.Sprite,
        gameState
      ),
    undefined,
    scene
  );

  // Player bullet hits enemy bullet
  scene.physics.add.collider(
    gameState.playerBulletGroup!,
    gameState.enemyBulletGroup!,
    (playerBullet, enemyBullet) =>
      handleBulletCollision(
        scene,
        playerBullet as Phaser.GameObjects.Sprite,
        enemyBullet as Phaser.GameObjects.Sprite
      ),
    undefined,
    scene
  );
};
