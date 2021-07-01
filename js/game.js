let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#cea7d2',
    audio: {
        disableWebAudio: false
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
var nextArrow;
let successfulDropoff;

var startSound;
var holdSound;
var wrongSound;
var correctSound;
var finishSound;

var star;
var starScale;

var gameBg;

var gameCover;
var startClicked;

//
function init() {
}

function preload() {
    this.load.image('background', './assets/peterpanFull-01.png');
    
    this.load.image('cover', './assets/peterCOVER-01.png');
    
    this.load.image('head', './assets/pHead-01.png');
    this.load.image('body', './assets/pBody-01.png');
    this.load.image('handL', './assets/pArmL-01.png');
    this.load.image('handR', './assets/pArmR-01.png');
    this.load.image('legL', './assets/pLegL-01.png');
    this.load.image('legR', './assets/pLegR-01.png');
    
    this.load.image('nextArrow', './assets/purple-arrow.png');
 
    this.load.audio('start', './assets/start1.wav');
    this.load.audio('hold', './assets/hold.wav');
    this.load.audio('wrong', './assets/wrong.wav');
    this.load.audio('correct', './assets/correct.wav');
    this.load.audio('finish', './assets/finish.wav');
    
    //---star at the end---
    this.load.image('star', './assets/purple-star.png');
    
     //---background pattern---
    this.load.image('gameBg', './assets/stars (1)-01.png');

}

function create() { 
    startClicked = false;
    
    gameCover = this.add.image(180, 320, 'cover');
    gameCover.setDepth(5);
    
    gameBg = this.add.image(180, 330, 'gameBg');
    gameBg.setScale(0.4);
    gameBg.setVisible(false);
    
     //---star---
    starScale = 0.1;
    star = this.add.image(90,530, 'star');
    star.setScale(starScale);
    star.setVisible(false);
    star.setDepth(0);
    
    
    var image = this.add.image(200, 250, 'background');
    image.alpha = 0.3;
    
    startSound = this.sound.add('start');
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');
    
    //----les membres-----
    var head = this.add.image(50, 380, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
    head.setName('head');
    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.7);
    nextArrow.setVisible(false);
    
    var body = this.add.image(60, 550, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
    
    var handL = this.add.image(310, 92, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
    
    var handR = this.add.image(200, 552, 'handR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handR);
    handR.setName('handR');
    
    var legL = this.add.image(50, 212, 'legL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legL);
    legL.setName('legL');
    
    var legR = this.add.image(310, 570, 'legR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legR);
    legR.setName('legR');
    
    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(200, 95, 115, 120).setRectangleDropZone(115, 120);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(211, 227, 80, 137).setRectangleDropZone(80, 137);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(135, 221, 65, 130).setRectangleDropZone(65, 130);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(252, 383, 90, 170).setRectangleDropZone(90, 170);
    zone4.setName('legR');
    
    //  A drop zone
    var zone5 = this.add.zone(160, 385, 90, 170).setRectangleDropZone(90, 170);
    zone5.setName('legL');
    
    //  A drop zone
    var zone6 = this.add.zone(270, 230, 40, 130).setRectangleDropZone(40, 130);
    zone6.setName('handR');

 
    this.input.on('dragstart', function (pointer, gameObject) {

         if (startClicked === true){
        this.children.bringToTop(gameObject);
              holdSound.play();
         }

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
    
            wrongSound.play();
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
      if(successfulDropoff === 6){
            nextArrow.setVisible(true);
            nextArrow.setInteractive();
          finishSound.play();
          star.setVisible(true);
          gameBg.setVisible(true);
    }    
        

    });
            nextArrow.on('pointerdown', onClick);
    
         this.input.on('pointerdown', function(pointer){
        if(pointer.x >= 55 && pointer.x <= 432  && pointer.y >= 380 && pointer.y <=473 && startClicked === false){
             startSound.play();
            setTimeout(function(){ 
                startClicked = true; 
                gameCover.setVisible(false);
            }, 500);
}});
    

}


function update() {
    if(successfulDropoff === 6){
         starScale += 0.001;
        star.setScale(starScale);
        if (starScale > 0.2){
            starScale = 0.2;
        } }
}
function onClick(){
    window.location.replace("https://games.caramel.be/tinker-bell/index.html");

}