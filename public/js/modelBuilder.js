function ModelBuilder(THREE, scene, mat) {
    this.scene = scene;
    this.THREE = THREE;
    this.mat = mat;

    this.tx = {
        x:0,y:0,z:0,
        xVector:{x:1,y:0,z:0},
        yVector:{x:0,y:1,z:0},
        zVector:{x:0,y:0,z:1}
    };

}

function newDuds() {
    return {trousers:mat.brownFabric, belt:mat.darkBlueFabric,shirt:mat.get('grey'), socks:mat.white,
        shoes:mat.black,socks:mat.black, hair:mat.brownFabric,
        sidesLength :0.5,
        sidesDepth : 0.5,
        fringe : 0.3,
        backLength : 0.4,
        backDepth : 0.2
    };


}

function r(magnitude) {
    return Math.random() * magnitude;
}

ModelBuilder.prototype.setTransform = function(tx) {
    this.tx = tx;
    // x,y,z// world.
    //xVector x,y,z
}

function scale_with_tx(x,y,z,tx) {
    return {x: (tx.xVector.x * x) + (tx.yVector.x * y) + (tx.zVector.x * z),
            y:(tx.xVector.y * x) + (tx.yVector.y * y) + (tx.zVector.y * z),
            z:(tx.xVector.z * x) + (tx.yVector.z * y) + (tx.zVector.z * z)};

}

function transform_with_tx(x,y,z,tx, parent) {
    var scaled = scale_with_tx(x,y,z,tx);

    if (parent.position.x === 0 && parent.position.y === 0 && parent.position.z === 0) {
        return {
            x: tx.x + scaled.x,
            y: tx.y + scaled.y,
            z: tx.z + scaled.z
        };
    } else {
        return {
            x: parent.position.x + scaled.x,
            y: parent.position.y + scaled.y,
            z: parent.position.z + scaled.z
        };

    }

}

ModelBuilder.prototype.addTxBox = function(x,y,z,xness,yness,zness,material, parent) {

    var size = scale_with_tx(xness,yness,zness,this.tx);
    if (size.z < 0) {
        size.z = 0-size.z;
        z += size.z;
    }
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(size.x, size.y, size.z),
        material);
    // created with center at 0,0,0
    var pos = transform_with_tx(x,y,z,this.tx, parent);
    box.position.x = pos.x + (size.x /2);
    box.position.y = pos.y + (size.y /2);
    box.position.z = pos.z + (size.z /2);
    box.castShadow=true;
    box.receiveShadow=false;
    (parent || this.scene).add(box);

    return box;
}

ModelBuilder.prototype.addFloor = function (x,y,z, xness, yness, zness) {

    var mainFloor = new THREE.Mesh(
        new THREE.BoxGeometry(xness, yness, zness),
        mat.woodFloor);

    mainFloor.position.x = x + (xness / 2);
    mainFloor.position.y = y - (yness / 2);
    mainFloor.position.z = z + (zness / 2);
    mainFloor.receiveShadow=true;
    this.scene.add( mainFloor );
}


ModelBuilder.prototype.addTableLeg = function(options) {
    var cylinder  = new THREE.BoxGeometry(options.diameter, options.height,options.diameter);
    var leg = new THREE.Mesh(cylinder, mat.whiteFormica);
    leg.position.y = options.height /2;
    leg.position.x = options.x;
    leg.position.z = options.z;
    leg.receiveShadow = leg.castShadow = true;
    this.scene.add(leg);
}

ModelBuilder.prototype.addTxPerson = function(duds) {
    // Chair base
    var chairGroup = new THREE.Group();
    var chairBase = mod.addTxBox(0,0,-3,1,1,1,mat.black,chairGroup);
    mod.addTxBox(0,0, 3,1,1,1,mat.black,chairGroup);
    mod.addTxBox(-3,0,0,1,1,1,mat.black,chairGroup);
    mod.addTxBox(3,0,0,1,1,1,mat.black,chairGroup);
    mod.addTxBox(-2,1,0,5,1,1,mat.silver,chairGroup);
    mod.addTxBox(0,1,-2,1,1,5,mat.silver,chairGroup);
    mod.addTxBox(0,1,0,1,4,1,mat.silver,chairGroup);
    mod.addTxBox(-3,5,-3,7,1,7, mat.blueFabric,chairGroup);
// back mech
    mod.addTxBox(0,5,4,1,3,1,mat.black,chairGroup);
    mod.addTxBox(-3,8,4,7,8,1,mat.blueFabric,chairGroup);
// rests
    mod.addTxBox(-4,5,-1,1,3,1,mat.black, chairGroup); mod.addTxBox(-4,8,-1,1,1,4,mat.black,chairGroup);
    mod.addTxBox( 4,5,-1,1,3,1,mat.black, chairGroup); mod.addTxBox( 4,8,-1,1,1,4,mat.black,chairGroup);
    this.scene.add(chairGroup);


    // keyboard.
    var kitGroup = new THREE.Group();
    var keyboard = new THREE.Mesh(new THREE.BoxGeometry(50, 1, 15), mat.silver);
    keyboard.position.set(0,74.5,-37);
    kitGroup.add(keyboard);

    // Monitor.
    var cx = 0;
    var zpos=-80;
    var height = 74;
    var group = new THREE.Group();
    cx += r(10);
    zpos+=r(10);

    var rot = 0.1-r(0.2);
    var stand = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 5), mat.silver);
    stand.position.set(cx,height+2.5,zpos);

    var housing = new THREE.Mesh(new THREE.BoxGeometry(40, 40, 5), mat.silver);
    housing.position.set(cx,height+5+20,zpos);

    var screen = new THREE.Mesh(new THREE.BoxGeometry(36, 36, 5), mat.green);
    screen.position.set(cx,height+7+18,zpos+0.06);
    kitGroup.add(stand);
    kitGroup.add(housing);
    kitGroup.add(screen);




//person


    var person = new THREE.Group();

//seat
    mod.addTxBox(-2,6,-1,5,2,3,duds.trousers, person);
//belt
    mod.addTxBox(-2,8,-1,5,1,3,duds.belt, person);

    mod.addTxBox(-2,   9,-1,5,9,3,duds.shirt, person); // torso

    mod.addTxBox(-3,  14,-1,1,3,2,duds.shirt, person); // upper-arm
    mod.addTxBox(-3,  13,-4, 1,1,4,duds.forearm || duds.shirt, person);  // lower-arm

    var scale = scale_with_tx(1,1,1,this.tx);

    var left_wrist = mod.addTxBox(-3,  13,-5,1,1,1,mat.skin, person);//wrist
    var left_hand = new THREE.Mesh(
        new THREE.BoxGeometry(scale.x*1.1, scale.y*0.8, scale.z*1.5),
        mat.skin);
    left_hand.position.z = scale.z * 1;
    left_wrist.add(left_hand);

    mod.addTxBox(3,   14,-1,1,3,2,duds.shirt, person); // upper-arm
    mod.addTxBox(3,   13,-4, 1,1,4,duds.forearm || duds.shirt, person);  // lower-arm
    var right_wrist = mod.addTxBox(3,   13,-5,1,1,1,mat.skin, person);//wrist

    var right_hand = new THREE.Mesh(
        new THREE.BoxGeometry(scale.x*1.1, scale.y*0.8, scale.z*1.5),
        mat.skin);
    right_hand.position.z = scale.z * 1;
    right_wrist.add(right_hand);


//thighs
    mod.addTxBox(-2,6,-4,2,2,3,duds.trousers, person);
    mod.addTxBox(1,6,-4,2,2,3,duds.trousers, person);
//calves
    mod.addTxBox(-2,2,-6,2,6,2,duds.trousers, person);
    mod.addTxBox( 1,2,-6,2,6,2,duds.trousers, person);
// socks
    mod.addTxBox(-1.5,1,-6,1,1,2,duds.left_sock || duds.socks, person);
    mod.addTxBox( 1.5,1,-6,1,1,2,duds.right_sock || duds.socks, person);
// shoes
    mod.addTxBox(-2,0,-8,2,1,4,duds.shoes, person);
    mod.addTxBox(1,0,-8,2,1,4,duds.shoes, person);

    var necky = 18;
    var neck = mod.addTxBox(0,   necky,0,1.5,1.5,1.5,mat.skin, person); // neck


   // var head = mod.addTxBox(-1,  necky+1,-1,3,3,2,mat.skin, person); // head

    var headSize = scale_with_tx(3,3,3,mod.tx);
    var newHead = new THREE.Mesh(new THREE.BoxGeometry(headSize.x,headSize.y,headSize.z), mat.skin);
    neck.add(newHead);
    newHead.position.y += headSize.y/2 + mod.tx.yVector.y/2;
    newHead.position.z -= mod.tx.zVector.z * 0.5;

    var hairSize = 1;

    var sidesDepth = headSize.z * duds.sidesDepth;
    var sidesLength = headSize.y * duds.sidesLength;
    var backOfHeadZ = headSize.z / 2;
    var topOfHead = headSize.y /2;

    var sides = new THREE.Mesh(new THREE.BoxGeometry(headSize.x + hairSize,headSize.y * duds.sidesLength,headSize.z * duds.sidesDepth + hairSize), duds.hair);
    sides.position.z =  (backOfHeadZ - (sidesDepth /2));
    sides.position.y = +((sidesLength/2) - hairSize);
    newHead.add(sides);


    if (duds.fringe) {
        var fringeHeight = headSize.y * duds.fringe;
        var fringe = new THREE.Mesh(new THREE.BoxGeometry(headSize.x + hairSize,headSize.y * duds.fringe,headSize.z + hairSize), duds.hair);
        fringe.position.y =  (topOfHead - fringeHeight/2 )+ hairSize;
        newHead.add(fringe);
    }

    if (duds.backLength) {
        var backLength = headSize.y * duds.backLength;
        var backDepth = headSize.z * duds.backDepth;
        var back = new THREE.Mesh(new THREE.BoxGeometry(headSize.x + hairSize,headSize.y * duds.backLength,headSize.z * duds.backDepth + hairSize), duds.hair);
        back.position.z =  (backOfHeadZ - (backDepth /2));
        back.position.y = -(backLength /2);
        newHead.add(back);
    }


//    mod.addTxBox(-1.2,necky+3.9,-1.2,3.4,1,2.4, duds.hair, person); // hair-top
  //  mod.addTxBox(-1.2,necky+2.9,0,3.4,1,1.3, duds.hair, person); // hair-mid
    //mod.addTxBox(-1.2,necky+1.9, 0.6,3.4,1,0.7, duds.hair, person); // hair-back
//   mod.addTxBox(-1.2,necky+0.4, 0.7,3.4,1.5,0.7, duds.hair, person); // hair-length
    mod.scene.add(person);
    mod.scene.add(kitGroup);
    return {root:person, left_hand:left_hand, right_hand:right_hand,
    left_wrist:left_wrist,right_wrist:right_wrist,chair:chairGroup, kit:kitGroup, screen:screen, head:newHead};
}

function addKit(mod, mat,options) {
    var cx = 0;
    var zpos=-30;
    mod.tx.zVector.z = options.facing ? 1 : -1;


    var group = new THREE.Group();
  //  mod.addTxBox(cx-15,0,zpos+40,50,1,15,mat.keyboard, group);
    cx += r(10);
    zpos+=r(10);

    var rot = 0.1-r(0.2);
    mod.addTxBox(cx-5,0,zpos,10,5,5, mat.silver, group).rotation.y = rot;
    mod.addTxBox(cx-20,5,zpos,40,40,5, mat.silver, group).rotation.y = rot;
    mod.addTxBox(cx-18,7,zpos+1,36,36,5, mat.passiveScreen,group).rotation.y = rot;
    mod.scene.add(group);
}

ModelBuilder.prototype.addTable = function(options) {
    var thickness = options.thickness || 5;

    var tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(options.width, thickness, options.depth),
        mat.whiteFormica
    );
    tableTop.castShadow=true;
    tableTop.receiveShadow=false;

    tableTop.position.x = options.x;
    tableTop.position.z = options.z;
    tableTop.position.y = options.height - (thickness/2);
    this.scene.add(tableTop);

    var halfWidth = options.width/2;
    var halfDepth = options.depth/2;
    var inset = 5;
    this.addTableLeg({x:options.x - halfWidth+inset, z:options.z-halfDepth+inset, height: options.height - thickness, diameter:5});
    this.addTableLeg({x:options.x + halfWidth-inset, z:options.z-halfDepth+inset, height: options.height - thickness, diameter:5});
    this.addTableLeg({x:options.x - halfWidth+inset, z:options.z+halfDepth-inset, height: options.height - thickness, diameter:5});
    this.addTableLeg({x:options.x + halfWidth-inset, z:options.z+halfDepth-inset, height: options.height - thickness, diameter:5});

    // position tx origin in middle of desktop.
    mod.tx.x = options.x;
    mod.tx.y = options.height;// + (thickness/2);
    mod.tx.z = options.z;
   // addKit(mod,mat,options);

}
