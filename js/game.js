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
    backgroundColor: '#F8C8DC',
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
var nextArrow;
let successfulDropoff;

//
function init() {
}

function preload() {
    this.load.image('background', './assets/peterpanFull-01.png');
    
    this.load.image('head', './assets/pHead-01.png');
    this.load.image('body', './assets/pBody-01.png');
    this.load.image('handL', './assets/pArmL-01.png');
    this.load.image('handR', './assets/pArmR-01.png');
    this.load.image('legL', './assets/pLegL-01.png');
    this.load.image('legR', './assets/pLegR-01.png');
    
    this.load.image('nextArrow', './assets/purple-arrow.png');

}

function create() {    
    var image = this.add.image(200, 250, 'background');
    image.alpha = 0.3;
    
    //----les membres-----
    var head = this.add.image(50, 380, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
//    head.setScale(2);
    head.setName('head');
//    head.setScale(0.45);
    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.7);
    nextArrow.setVisible(false);
    
    var body = this.add.image(60, 550, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
//    body.setScale(0.45);
    
    var handL = this.add.image(310, 392, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
//    handL.setScale(0.45);
    
    var handR = this.add.image(260, 522, 'handR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handR);
    handR.setName('handR');
//    hips.setScale(0.45);
    
    var legL = this.add.image(50, 212, 'legL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legL);
    legL.setName('legL');
//    legL.setScale(0.45);
    
    var legR = this.add.image(310, 302, 'legR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legR);
    legR.setName('legR');
//    legR.setScale(0.45);
    
    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(200, 95, 115, 120).setRectangleDropZone(115, 120);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(211, 227, 80, 137).setRectangleDropZone(80, 137);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(135, 221, 65, 100).setRectangleDropZone(65, 100);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(252, 383, 40, 150).setRectangleDropZone(40, 150);
    zone4.setName('legR');
    
    //  A drop zone
    var zone5 = this.add.zone(160, 385, 40, 150).setRectangleDropZone(40, 150);
    zone5.setName('legL');
    
    //  A drop zone
    var zone6 = this.add.zone(270, 230, 40, 150).setRectangleDropZone(40, 150);
    zone6.setName('handR');
    
    
    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
    graphics.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
    
    graphics.strokeRect(zone3.x - zone3.input.hitArea.width / 2, zone3.y - zone3.input.hitArea.height / 2, zone3.input.hitArea.width, zone3.input.hitArea.height);
    
    graphics.strokeRect(zone4.x - zone4.input.hitArea.width / 2, zone4.y - zone4.input.hitArea.height / 2, zone4.input.hitArea.width, zone4.input.hitArea.height);
    
    graphics.strokeRect(zone5.x - zone5.input.hitArea.width / 2, zone5.y - zone5.input.hitArea.height / 2, zone5.input.hitArea.width, zone5.input.hitArea.height);
    
    graphics.strokeRect(zone6.x - zone6.input.hitArea.width / 2, zone6.y - zone6.input.hitArea.height / 2, zone6.input.hitArea.width, zone6.input.hitArea.height);

 
    this.input.on('dragstart', function (pointer, gameObject) {

        this.children.bringToTop(gameObject);

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

        graphics.clear();
        graphics.lineStyle(2, 0x00ffff);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
        console.log(gameObject.name);

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {
        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name == gameObject.name);
            console.log('successful dropoff of ' + gameObject.name + ' in ' + dropZone.name);
            
            successfulDropoff++;
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            console.log('failed dropoff of ' + gameObject.name + ' in ' + dropZone.name);
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
      if(successfulDropoff === 6){
            console.log("well done!!!!");
            nextArrow.setVisible(true);
            nextArrow.setInteractive();
    }    
        
        nextArrow.on('pointerdown', onClick);

    });
    

}


function update() {

}
function onClick(){
//    window.open("https://www.google.com", "_blank");
    window.location.replace("http://www.w3schools.com");

}