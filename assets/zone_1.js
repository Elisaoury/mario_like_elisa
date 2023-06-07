import {GameOver} from './game_over.js';

export class zone_1 extends Phaser.Scene {


    constructor() {
        super("zone_1")
        this.game_over = false
    }

    preload() {

        this.load.audio('background_1', 'assets/background_1.mp3')
        this.load.audio('background_2', 'assets/background_2.mp3')
        this.load.audio('background_3', 'assets/background_3.mp3')
        this.load.spritesheet('perso_droite', 'assets/perso_droite.png',
            { frameWidth: 280, frameHeight: 400 });
        this.load.spritesheet('perso_gauche', 'assets/perso_gauche.png',
            { frameWidth: 280, frameHeight: 400 });
        this.load.image("book", "assets/ui.png");
        this.load.image("menu", "assets/menu.png");
        this.load.spritesheet('ennemi', 'assets/renard.png',
            { frameWidth: 1400, frameHeight: 700});
        
        this.load.image('planteToxique', 'assets/planteToxique.png'); 
        this.load.image('fleur', 'assets/fleur.png');  
        this.load.image('baie', 'assets/baie.png');   
        this.load.image('eau', 'assets/eau.png'); 
        this.load.image('herbe', 'assets/herbe.png'); 
        this.load.image('potion', 'assets/potion.png');
        this.load.image('potionMelanger', 'assets/potionMelanger.png');
        
       



        // chargement tuiles de jeu
        this.load.image("Phaser_tuilesdejeu", "assets/tileset.png");

        // chargement de la carte
        this.load.tilemapTiledJSON("map", "assets/map.json");
    }


    platforms;
    player;
    cursors;
 
    menuOpen = false;
    herbe;
    fleur;
    baie;
    nbHerbe = 0;
    nbFleur = 0
    nbBaie = 0
    eau = false;
    potion = false;
    potion;
    potionMelanger;
    score1 = 0;
    score2 = 0;
    score3 = 0;
    score4 = 0;



    create() {

        var musique_de_fond;
        musique_de_fond = this.sound.add('background_1'); 
        musique_de_fond.play();
        this.game_over = false;

        // tiled
        this.carteDuNiveau = this.add.tilemap("map");
        this.tileset = this.carteDuNiveau.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        this.calque_background = this.carteDuNiveau.createLayer(
            "background",
            this.tileset
        );
    
        this.calque_plateforme = this.carteDuNiveau.createLayer(
            "plateform",
            this.tileset
        );
        this.calque_decors = this.carteDuNiveau.createLayer(
            "decors",
            this.tileset
        );
       

        //personnage

        this.ennemis = this.physics.add.group();
        
        this.ennemy1= this.ennemis.create(1088, 2950, 'ennemi').setScale(0.07);
        this.player = this.physics.add.sprite(32,2800, 'perso_droite').setScale(0.4);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.ennemy1.setBounce(0.2);
        this.ennemy1.setCollideWorldBounds(true);

        this.ennemy2= this.ennemis.create(3400, 1360, 'ennemi').setScale(0.07);
        this.ennemy2.setBounce(0.2);
        this.ennemy2.setCollideWorldBounds(true);

        this.ennemy3= this.ennemis.create(5100, 2800, 'ennemi').setScale(0.07);
        this.ennemy3.setBounce(0.2);
        this.ennemy3.setCollideWorldBounds(true);

        this.ennemy4= this.ennemis.create(5850, 680, 'ennemi').setScale(0.07);
        this.ennemy4.setBounce(0.2);
        this.ennemy4.setCollideWorldBounds(true);

        this.ennemy5= this.ennemis.create(6650, 2040, 'ennemi').setScale(0.07);
        this.ennemy5.setBounce(0.2);
        this.ennemy5.setCollideWorldBounds(true);

        this.ennemy6= this.ennemis.create(6900, 2900, 'ennemi').setScale(0.07);
        this.ennemy6.setBounce(0.2);
        this.ennemy6.setCollideWorldBounds(true);

        this.ennemy7= this.ennemis.create(9000, 1900, 'ennemi').setScale(0.07);
        this.ennemy7.setBounce(0.2);
        this.ennemy7.setCollideWorldBounds(true);

        this.ennemy8= this.ennemis.create(9550, 2800, 'ennemi').setScale(0.07);
        this.ennemy8.setBounce(0.2);
        this.ennemy8.setCollideWorldBounds(true);

        this.ennemy9= this.ennemis.create(10300, 1900, 'ennemi').setScale(0.07);
        this.ennemy9.setBounce(0.2);
        this.ennemy9.setCollideWorldBounds(true);

        this.ennemy10= this.ennemis.create(10000, 1900, 'ennemi').setScale(0.07);
        this.ennemy10.setBounce(0.2);
        this.ennemy10.setCollideWorldBounds(true);




        //this.planteToxique = this.physics.add.group();
        
        this.planteToxique1= this.ennemis.create(4200, 2500, 'planteToxique').setScale(0.15);
        this.planteToxique1.setBounce(0.2);
        this.planteToxique1.setCollideWorldBounds(true);
        
        this.planteToxique2= this.ennemis.create(4500, 2500, 'planteToxique').setScale(0.15);
        this.planteToxique2.setBounce(0.2);
        this.planteToxique2.setCollideWorldBounds(true);
        
        this.planteToxique3= this.ennemis.create(3300, 2500, 'planteToxique').setScale(0.15);
        this.planteToxique3.setBounce(0.2);
        this.planteToxique3.setCollideWorldBounds(true);


    // collectible  

        // scoretext
        this.scoreText = this.physics.add.group();

        this.scoreText1 = this.add.text(300,300,'0',{fontSize:'32px',fill:'#000'});
        this.scoreText1.setScrollFactor(0);
        this.scoreText1.setDepth(15);
        this.scoreText1.setVisible(false);



        this.scoreText2 = this.add.text(290,340,'0',{fontSize:'32px',fill:'#000'});
        this.scoreText2.setScrollFactor(0);
        this.scoreText2.setDepth(15);
        this.scoreText2.setVisible(false);

        this.scoreText3 = this.add.text(290,380,'0',{fontSize:'32px',fill:'#000'});
        this.scoreText3.setScrollFactor(0);
        this.scoreText3.setDepth(15);
        this.scoreText3.setVisible(false);

        this.scoreText4 = this.add.text(290,420,'0',{fontSize:'32px',fill:'#000'});
        this.scoreText4.setScrollFactor(0);
        this.scoreText4.setDepth(15);
        this.scoreText4.setVisible(false);

        //herbe
        this.herbe = this.physics.add.group();

        this.herbe1 = this.herbe.create(70, 800, "herbe").setScale(0.05);
        this.herbe2 = this.herbe.create(8500,20, "herbe").setScale(0.05);
        this.physics.add.overlap(this.player, this.herbe, this.collectHerbe, null, this);

        
        //fleur
        this.fleur = this.physics.add.group();

        this.fleur1 = this.fleur.create(6900,1700, "fleur").setScale(0.07);
        this.fleur2 = this.fleur.create(10500,1800, "fleur").setScale(0.07);
        this.fleur3 = this.fleur.create(4080,80, "fleur").setScale(0.07);
        this.physics.add.overlap(this.player, this.fleur, this.collectFleur, null, this);

        //baie
        this.baie = this.physics.add.group();

        this.baie1 = this.baie.create(1700,80, "baie").setScale(0.07);
        this.baie2 = this.baie.create(11968,900, "baie").setScale(0.07);
        this.physics.add.overlap(this.player, this.baie, this.collectBaie, null, this);

        //eau
        this.eau = this.physics.add.group();

        
        this.eau1 = this.eau.create(4000,2800, "eau").setScale(0.07);
        this.physics.add.overlap(this.player, this.eau, this.collectEau, null, this);
        

        //menuthis.eau.create(4000,2800, "eau").setScale(0.07);
        this.menu = this.add.image(500, 400, "menu").setScale(0.7);
        this.menu.setScrollFactor(0);
        this.menu.setVisible(false);
        
        this.ui = this.add.image(10, 40, "book").setScale(0.15);
        this.ui.setScrollFactor(0);
        this.ui.setInteractive();
        if (this.menuOpen === false){
            this.ui.on("pointerdown", this.leClick, this);
        }
        
        //potion

        this.laPotion = this.add.image(825, 300, "potion").setScale(0.3 );
        this.laPotion.setScrollFactor(0);
        this.laPotion.setVisible(false);

        this.laPotionMelanger = this.add.image(827, 302, "potionMelanger").setScale(0.3) ;
        this.laPotionMelanger.setScrollFactor(0);
        this.laPotionMelanger.setVisible(true);

        //bouton

        this.boutonPotion = this.add.text(750, 500, 'Créer la potion', { fill: '0xffffff' });
        this.boutonPotion.setVisible(false);
        this.boutonPotion.setScrollFactor(0);
        this.boutonPotion.setInteractive();
        this.boutonPotion.on("pointerdown", this.creerPotion, this);


        


        //boite 
        


        // définition des tuiles de plateformes qui sont solides
        // utilisation de la propriété estSolide
        this.calque_plateforme.setCollisionByProperty({ estSolide: true });

        this.physics.add.collider(this.player, this.calque_plateforme);

        this.physics.add.collider(this.herbe, this.calque_plateforme);
        this.physics.add.collider(this.fleur, this.calque_plateforme);
        this.physics.add.collider(this.baie, this.calque_plateforme);
        this.physics.add.collider(this.eau, this.calque_plateforme);
        this.physics.add.collider(this.ennemis, this.calque_plateforme);
        
        // clavier 

        this.cursors = this.input.keyboard.createCursorKeys()


        
        // redimentionnement du monde avec les dimensions calculées via tiled
        this.physics.world.setBounds(0, 0, 12000,3050);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 12000, 3050);
        // ancrage de la caméra sur le joueur
        this.cameras.main.zoom = 0.85;
        this.cameras.main.startFollow(this.player);
 

        
     

        // animation personnage
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso_gauche', { start: 1, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'perso_droite', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso_droite', { start: 1, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shift',
            frames: this.anims.generateFrameNumbers('perso_saut', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'ennemi_left',
            frames: this.anims.generateFrameNumbers('ennemi', {start:0,end:3}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'ennemi_right',
            frames: this.anims.generateFrameNumbers('ennemi', {start:4,end:7}),
            frameRate: 7,
            repeat: -1
        });

       
    }


    update() {

        if (this.game_over) {return;}
        //console.log(this.player.x);
        //console.log(this.player.y);

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // bouton de deplacement 
        if (this.keyJump.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-550);
            //    player.anims.play('jump', true);
        } else if (this.keyQ.isDown) {
            // Action pour la touche Q (gauche)
            this.player.setVelocityX(-400);
            this.player.anims.play('left', true);
        } else if (this.keyD.isDown) {
            // Action pour la touche D (droite)
            this.player.setVelocityX(400);
            this.player.anims.play('right', true);
        } else { 
            // Aucune touche enfoncée (immobile)
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // menu         

        if (this.menuOpen === false){
            this.menu.setVisible(false)
            this.scoreText1.setVisible(false)
            this.boutonPotion.setVisible(false);
            this.laPotion.setVisible(false);
            this.laPotionMelanger.setVisible(false);
        }
        else {
            this.menu.setVisible(true)
            this.scoreText1.setVisible(true)
            this.boutonPotion.setVisible(true);
            this.laPotion.setVisible(true);
            this.laPotionMelanger.setVisible(false);
        
        }
    
        if (this.menuOpen === false){
            this.menu.setVisible(false)
            this.scoreText1.setVisible(false)
            this.scoreText2.setVisible(false)
            this.scoreText3.setVisible(false)
            this.scoreText4.setVisible(false)
            this.laPotion.setVisible(false);
            this.laPotionMelanger.setVisible(false);
        }
        else {
            this.menu.setVisible(true)
            this.scoreText1.setVisible(true)
            this.scoreText2.setVisible(true) 
            this.scoreText3.setVisible(true)
            this.scoreText4.setVisible(true)
            
        }
        

        if (this.potion === true){
            this.laPotionMelanger.setVisible(true);
            this.laPotion.setVisible(false);
        }
        if (this.menuOpen === false){
            this.laPotionMelanger.setVisible(false);
        }
       
        if (this.ennemy1) {
            if (this.ennemy1.x <1089) {
              this.ennemy1.setVelocityX(400);
              this.ennemy1.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy1.x > 2000) {
              this.ennemy1.setVelocityX(-400);
              this.ennemy1.anims.play('ennemi_left', true);
            }
        }
        if (this.ennemy2) {
            if (this.ennemy2.x <3401) {
              this.ennemy2.setVelocityX(200);
              this.ennemy2.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy2.x > 3900) {
              this.ennemy2.setVelocityX(-350);
              this.ennemy2.anims.play('ennemi_left', true);
            }
        }

        if (this.ennemy3) {
            if (this.ennemy3.x <5101) {
              this.ennemy3.setVelocityX(225);
              this.ennemy3.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy3.x > 5450) {
              this.ennemy3.setVelocityX(-225);
              this.ennemy3.anims.play('ennemi_left', true);
            }
        }

        if (this.ennemy4) {
            if (this.ennemy4.x <5851) {
              this.ennemy4.setVelocityX(150);
              this.ennemy4.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy4.x > 6200) {
              this.ennemy4.setVelocityX(-150);
              this.ennemy4.anims.play('ennemi_left', true);
            }
        }


        if (this.ennemy5) {
            if (this.ennemy5.x <6651) {
              this.ennemy5.setVelocityX(300);
              this.ennemy5.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy5.x > 7000) {
              this.ennemy5.setVelocityX(-300);
              this.ennemy5.anims.play('ennemi_left', true);
            }
        }

        if (this.ennemy6) {
            if (this.ennemy6.x <6901) {
              this.ennemy6.setVelocityX(300);
              this.ennemy6.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy6.x > 7500) {
              this.ennemy6.setVelocityX(-300);
              this.ennemy6.anims.play('ennemi_left', true);
            }
        }


        if (this.ennemy7) {
            if (this.ennemy7.x <9001) {
              this.ennemy7.setVelocityX(300);
              this.ennemy7.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy7.x > 9300) {
              this.ennemy7.setVelocityX(-300);
              this.ennemy7.anims.play('ennemi_left', true);
            }
        }


        if (this.ennemy8) {
            if (this.ennemy8.x <9551) {
              this.ennemy8.setVelocityX(450);
              this.ennemy8.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy8.x > 10600) {
              this.ennemy8.setVelocityX(-450);
              this.ennemy8.anims.play('ennemi_left', true);
            }
        }


        if (this.ennemy9) {
            if (this.ennemy9.x <10301) {
              this.ennemy9.setVelocityX(450);
              this.ennemy9.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy9.x > 11900) {
              this.ennemy9.setVelocityX(-450);
              this.ennemy9.anims.play('ennemi_left', true);
            }
        }

        
        if (this.ennemy10) {
            if (this.ennemy10.x <10001) {
              this.ennemy10.setVelocityX(450);
              this.ennemy10.anims.play('ennemi_right', true);
            } 
            else if (this.ennemy10.x > 11500) {
              this.ennemy10.setVelocityX(-450);
              this.ennemy10.anims.play('ennemi_left', true);
            }
        }



        if (this.physics.overlap(this.player, this.ennemis)) {
            console.log("klkjdlkgj");
                    this.killplayer();
        }

    }


    collectHerbe(player, herbe){
        console.log("aled");
        herbe.disableBody(true, true); 
        this.score1 += 1  ; 
        this.scoreText1.setText(this.score1);
        }
     

    collectBaie(player, baie){
        console.log("heloo");
        baie.disableBody(true, true); 
        this.score3 += 1  ; 
        this.scoreText3.setText(this.score3);
        }

    collectFleur(player, baie){
        console.log("heloo");
        baie.disableBody(true, true); 
        this.score4 += 1  ; 
        this.scoreText2.setText(this.score4);
        }

    collectEau(player, eau){
        console.log("heloo");
        eau.disableBody(true, true); 
        this.score2 += 1  ; 
        this.scoreText4.setText(this.score2);
        }
        


    leClick(){
        //this.menu.setVisible(true);
        //this.menuOpen = true;
        if (this.menuOpen === false){
            this.menuOpen = true;
        }
        else {
            this.menuOpen = false;
        }
        console.log(this.menuOpen);
    }

    killplayer(){
        this.game_over = true;
        console.log("ça marche");
        this.scene.start("GameOver")
    }

    creerPotion(){
        if (this.score1 == 2 && this.score4 == 3 && this.score2 == 1 && this.score3 == 2){
        this.potion = true
        console.log("potion faite !");
        }
    }
   
}
