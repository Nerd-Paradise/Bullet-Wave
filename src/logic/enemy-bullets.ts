//Parameters
const bulletVelocity = 500;
const fireRate = 500;
const frameRate = 60;
const distanceFromPlayerTop = 50;
export const createEnemyBulletGroup = (scene: Phaser.Scene) => {
  const bulletGroup = scene.physics.add.group({
    classType: Phaser.Physics.Arcade.Sprite,
    maxSize: -1,
    runChildUpdate: true,
  });

  return bulletGroup;
};

const createBullet = (
  bulletGroup: Phaser.Physics.Arcade.Group,
  playerX: number,
  playerY: number
) => {
  const bullet = bulletGroup.get(
    playerX,
    playerY + distanceFromPlayerTop,
    "bullet"
  );
  if (!bullet) return null;

  bullet
    .setActive(true)
    .setVisible(true)
    .setScale(2)
    .setVelocityY(bulletVelocity)
    .play("shoot");
};

export const setupEnemyBulletAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: "shoot",
    frames: scene.anims.generateFrameNumbers("bullet", { start: 0, end: 9 }),
    frameRate,
  });
};
const enemyLastFiredMap = new Map<Phaser.GameObjects.Sprite, number>();

export const handleEnemyBulletFiring = (
  scene: Phaser.Scene,
  enemyGroup: Phaser.Physics.Arcade.Group,
  bulletGroup: Phaser.Physics.Arcade.Group
) => {
  enemyGroup.getChildren().forEach((enemy: any) => {
    const currentTime = scene.time.now;

    if (!enemy.active || !enemy.visible) {
      enemyLastFiredMap.delete(enemy);
      return;
    }

    // Get the last fired time for this specific enemey
    const lastFiredTime = enemyLastFiredMap.get(enemy) || 0;

    if (currentTime > lastFiredTime) {
      createBullet(bulletGroup, enemy.x, enemy.y);

      enemyLastFiredMap.set(enemy, currentTime + fireRate);
    }
  });
};
