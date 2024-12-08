import { windowWidth } from "../constants";

// Parameters
const enemySpeed = 100;
const spawnRate = 500;
const howFarFromTop = 150;
const distanceFromOther = 150;

export const createEnemyGroup = (scene: Phaser.Scene) => {
  const enemyGroup = scene.physics.add.group({
    classType: Phaser.Physics.Arcade.Sprite,
    maxSize: -1,
    runChildUpdate: true,
  });
  return enemyGroup;
};

const getRandomEnemyType = () => {
  const types = ["hypership"];
  return Phaser.Utils.Array.GetRandom(types);
};

export const createEnemy = (enemyGroup: Phaser.Physics.Arcade.Group) => {
  const spawnPositions = Phaser.Utils.Array.NumberArrayStep(
    Math.floor(Math.random() * windowWidth) + 1,
    windowWidth,
    100
  );

  Phaser.Utils.Array.Shuffle(spawnPositions);

  for (let x of spawnPositions) {
    const overlapping = (
      enemyGroup.getChildren() as Phaser.GameObjects.Sprite[]
    ).some(
      (enemy: Phaser.GameObjects.Sprite) =>
        Phaser.Math.Distance.Between(x, 0, enemy.x, enemy.y) < distanceFromOther
    );

    if (!overlapping) {
      const enemyType = getRandomEnemyType(); // Use the random type selection
      const enemy = enemyGroup.get(x, 0, enemyType);
      if (!enemy) continue;

      enemy
        .setActive(true)
        .setVisible(true)
        .setY(-enemy.height + howFarFromTop)
        .setVelocityY(enemySpeed)
        .setFlipY(true)
        .setCollideWorldBounds(true)
        .setTint(Phaser.Display.Color.RandomRGB().color);

      enemy.body.onWorldBounds = true;

      enemy.body.world.on(
        "worldbounds",
        function (body: Phaser.Physics.Arcade.Body) {
          if (body.gameObject === enemy) {
            // Deactivate when it goes out of bounds
            enemy.setActive(false);
            enemy.setVisible(false);
          }
        },
        enemy
      );
      enemy.play("battyBoyAnims");

      break;
    }
  }
};

export const setupEnemyAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: "battyBoyAnims",
    frames: scene.anims.generateFrameNumbers("hypership", {
      start: 0,
      end: 4,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

let lastSpawned = 0;

export const handleEnemySpawn = (
  scene: Phaser.Scene,
  enemyGroup: Phaser.Physics.Arcade.Group
) => {
  if (scene.time.now > lastSpawned) {
    createEnemy(enemyGroup);
    lastSpawned = scene.time.now + spawnRate;
  }
};
