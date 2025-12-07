let idleSheet, walkSheet;
let idleAnimation = [];
let walkAnimation = [];

// 閒置動畫的設定
const idleFrameWidth = 715 / 12;
const idleFrameHeight = 60;
const numIdleFrames = 12;

// 走路動畫的設定
const walkFrameWidth = 207 / 4;
const walkFrameHeight = 51;
const numWalkFrames = 4;

// 角色屬性
let characterX, characterY;
let speed = 3;
let direction = 1; // 1: 往右, -1: 往左

function preload() {
  // 預先載入閒置和走路的圖片精靈
  idleSheet = loadImage('1/all.png');
  walkSheet = loadImage('walk/w1/w1.png');
}

function setup() {
  // 建立一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 擷取閒置動畫的影格
  for (let i = 0; i < numIdleFrames; i++) {
    let x = i * idleFrameWidth;
    let frame = idleSheet.get(x, 0, idleFrameWidth, idleFrameHeight);
    idleAnimation.push(frame);
  }

  // 擷取走路動畫的影格
  for (let i = 0; i < numWalkFrames; i++) {
    let x = i * walkFrameWidth;
    let frame = walkSheet.get(x, 0, walkFrameWidth, walkFrameHeight);
    walkAnimation.push(frame);
  }
  
  // 設定角色初始位置在畫面中央
  characterX = width / 2;
  characterY = height / 2;
}

function draw() {
  background('lightblue');

  let isMoving = false;

  // 檢查鍵盤輸入
  if (keyIsDown(RIGHT_ARROW)) {
    characterX += speed;
    direction = -1; // 按下右鍵時翻轉
    isMoving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    characterX -= speed;
    direction = 1; // 按下左鍵時使用原圖
    isMoving = true;
  }

  // 根據是否移動來選擇動畫
  let anim = isMoving ? idleAnimation : walkAnimation;
  let frameW = isMoving ? idleFrameWidth : walkFrameWidth;
  let frameH = isMoving ? idleFrameHeight : walkFrameHeight;
  
  // 播放動畫
  let currentFrame = floor((frameCount / 5) % anim.length);

  push(); // 儲存目前的繪圖狀態
  translate(characterX, characterY); // 將原點移動到角色位置
  scale(direction, 1); // 根據方向翻轉畫布
  image(anim[currentFrame], -frameW / 2, -frameH / 2); // 在新原點的中央繪製圖片
  pop(); // 恢復原本的繪圖狀態
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
