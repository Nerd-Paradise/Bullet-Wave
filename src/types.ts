export interface GameState {
  score: number;
  player: Phaser.Physics.Arcade.Sprite | null;
  playerBulletGroup: Phaser.Physics.Arcade.Group | null;
  enemyGroup: Phaser.Physics.Arcade.Group | null;
  enemyBulletGroup: Phaser.Physics.Arcade.Group | null;
  platforms: Phaser.Physics.Arcade.StaticGroup | null;
  scoreText: Phaser.GameObjects.Text | null;
  cursors: Phaser.Input.Pointer | null;
}
