var scene = new THREE.Scene();
//scene.fog = new THREE.Fog('black',1000,1700);

//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );


var frustumSize = 800;
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 100000 );
var shadowsActive = false;
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = shadowsActive;

document.body.appendChild( renderer.domElement );

var mat = new MATLIB(THREE);
var mod = new ModelBuilder(THREE, scene, mat);

/*
var light = new THREE.PointLight( 0xEEEEff, 0.5, 50000 );
//var light = new THREE.DirectionalLight(0xEEEEFF, 1,100);
light.position.set( -600, 80, 0 );
light.castShadow = shadowsActive;
scene.add( light );
*/

var light = new THREE.SpotLight(0xEEEEFF,1.5);
light.position.set( -1600, 1480, 0 );
light.castShadow = shadowsActive;

light.shadow.mapSize.width = 1024*8;
light.shadow.mapSize.height = 1024*8
light.shadow.camera.near = 50;
light.shadow.camera.far = 4000;
scene.add(light);

var ambientLight = new THREE.AmbientLight( 0x404040,2 ); // soft white light
scene.add( ambientLight );

createBareOffice(mod, mat);



mod.tx.xVector.x = 6;
mod.tx.yVector.y = 6;
mod.tx.zVector.z = 6;



var people = [];
var duds;

mod.tx.x =0;
mod.tx.y=0;
mod.tx.z =0;
mod.tx.xVector = {x:6,y:0,z:0};
mod.tx.yVector ={x:0,y:6,z:0};
mod.tx.zVector ={x:0,y:0,z:6};


function addP(x,z,facing,duds) {
    mod.tx.x = 0;
    mod.tx.z = 0;
    var result = mod.addTxPerson(duds);
    people.push(result);
    result.root.position.x=x;
    result.root.position.z=z;
    result.chair.position.x=x;
    result.chair.position.z=z;
    result.kit.position.x =x;
    result.kit.position.z=z;
    if (facing) {
        result.root.rotation.y = 3.2;
        result.chair.rotation.y = 3.2;
        result.kit.rotation.y = 3.2;
    }
    result.offset = r(1500);

    return result;
}

function setVisible(person, visible) {
    person.root.visible = visible;
    person.screen.material = visible ? mat.greenFabric : mat.black;

}

var xDenim ='#1874CD';
var xBlackDenim ='#2F4F4F';

duds = newDuds();
duds.trousers = mat.get('#6A5ACD');
duds.hair = mat.black;
duds.fringe = 0.5;
duds.backLength = 1.1;
duds.backDepth = 0.5;
var p1 = addP(-395,-480,true,duds);

duds = newDuds();
duds.hair = mat.get('#BDB76B');
duds.backLength = 1.1;
var p2 = addP(-235,-480,true,duds);

duds = newDuds();
duds.shirt = mat.get('#8B795E');
var p7 = addP(-395,-293,false,duds);

duds = newDuds();
duds.hair = mat.black;
duds.fringe =0.1;
duds.sidesLength = 0.5;
var p13 = addP(-395,-175,true,duds);



duds = newDuds();
duds.backLength = 1.1;
duds.sidesDepth=0.5;
duds.backDepth=0.5;
var p4 = addP(215,-480,true,duds);

duds = newDuds();
duds.hair = mat.black;
duds.backLength = 1;
var p5 = addP(355,-480,true,duds);


duds = newDuds();
duds.hair = mat.black;
var p6 = addP(515,-480,true,duds);





duds = newDuds();
duds.fringe=0.1;
var p10 = addP(215,-293,false,duds);

duds = newDuds();
duds.backLength = 1;
duds.sidesDepth = 0.8;
duds.backDepth = 0.5;
var p11 = addP(355,-293,false,duds);


duds = newDuds();
duds.left_sock = mat.greenFabric;
duds.right_sock = mat.redFabric;
var p12 = addP(515,-293,false,duds);


duds = newDuds();
var p18 = addP(515,-173,true,duds);
setVisible(p18,false);

duds = newDuds();
var p17 = addP(355,-173,true,duds);
setVisible(p17,false);



duds = newDuds();
duds.trousers = mat.get(xDenim);
duds.shoes = duds.socks= mat.get('grey');
duds.hair = mat.black;
duds.backLength=1;
duds.backDepth = 0.3;
var p19 = addP(-395,13,false,duds);



duds = newDuds();
duds.trousers = mat.get(xBlackDenim);
duds.shirt = mat.black;
duds.forearm = mat.skin;
var p20 = addP(-248,13,false,duds);
setVisible(p20,true);

duds = newDuds();
duds.forearm = mat.skin;
duds.trousers = mat.get(xDenim);
var p21 = addP(-88,13,false,duds);

duds = newDuds();
duds.hair = mat.black;
var p23 = addP(355,14,false,duds);


duds = newDuds();
duds.hair = mat.black;
duds.fringe=0.1;
var p24 = addP(515,14,false,duds);


duds = newDuds();
duds.hair = mat.black;
var p25 = addP(-395,147,true,duds);

duds = newDuds();
duds.shirt = mat.get('gray');
duds.forearm = mat.skin;
duds.trousers = mat.get(xDenim);
duds.hair = mat.black;
duds.backLength = duds.fringe = null;
var p26 = addP(-245,147,true,duds);

duds = newDuds();
duds.shirt = mat.get('tan');
duds.trousers = mat.get(xDenim);
duds.hair = mat.get('darkgoldenrod');
var p27 = addP(-95,147,true,duds);


duds = newDuds();
duds.hair = mat.black;
duds.fringe = 0.4;
duds.sidesDepth =0.6;
duds.sidesLength =0.5;
duds.backLength = 0.6;
duds.backDepth = 0.5;
var p28 = addP(-395,337,false,duds);

duds = newDuds();
var p29 = addP(-245,337,false,duds);


//mod.tx.x = mod.tx.y = mod.tx.z;
//var par = mod.addTxBox(0,0,0,10,10,10, mat.brownFabric);
//mod.addTxBox(0,11,0,10,10,10, mat.brownFabric, par);

var geometry = new THREE.BoxGeometry( 7, 7, 7 );
var cube = new THREE.Mesh( geometry, mat.white );
//scene.add( cube );

var camDistance = 900;
camera.position.y = camDistance / 2;

var lookAtPoint = scene.position.clone();
lookAtPoint.y = 50;

var animate = function () {
    requestAnimationFrame( animate );

    var now = Date.now();
    var timer = now * 0.0001;
    var vtimer = now * 0.001;

    var qtimer = (now) * 0.01;
    var qstimer = (now) * 0.01005;
    p25.head.position.x = Math.cos(qtimer) *1;
    p25.head.position.z = Math.sin(qstimer) *1;

    people.forEach(function(personMeta) {
        var qtimer = (now + personMeta.offset) * 0.01;
        personMeta.right_wrist.rotation.x = 3 + (Math.cos(qtimer) * 0.5);
        personMeta.right_wrist.rotation.z = 3 - (Math.cos(vtimer +10) * 0.3);
        personMeta.left_wrist.rotation.x = 3 + (Math.cos(qtimer +10) * 0.5);
        personMeta.left_wrist.rotation.z = 3 + (Math.cos(vtimer +10) * 0.5);
    });

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

        camera.position.x = Math.cos( timer ) * -camDistance;
        camera.position.z = Math.sin( timer ) * camDistance;
        camera.lookAt( lookAtPoint );

    renderer.render(scene, camera);
};

animate();
