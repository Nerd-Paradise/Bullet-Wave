//Parameters
const bulletVelocity = -500;
const fireRate = 100;
const frameRate = 60;
const distanceFromPlayerTop = 50;
export const createPlayerBulletGroup = (scene: Phaser.Scene) => {
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
    playerY - distanceFromPlayerTop,
    "bullet"
  );
  if (!bullet) return null;

  bullet
    .setActive(true)
    .setVisible(true)
    .setScale(2)
    .setVelocityY(bulletVelocity) // Shoot upwards quickly
    .play("shoot");
};

export const setupPlayerBulletAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: "shoot",
    frames: scene.anims.generateFrameNumbers("bullet", { start: 0, end: 9 }),
    frameRate,
  });
};
let lastFired = 0;
export const handlePlayerBulletFiring = (
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  bulletGroup: Phaser.Physics.Arcade.Group,
  cursors: Phaser.Input.Pointer
) => {
  if (cursors.leftButtonDown() && scene.time.now > lastFired) {
    createBullet(bulletGroup, player.x, player.y);
    lastFired = scene.time.now + fireRate;
  }
};
