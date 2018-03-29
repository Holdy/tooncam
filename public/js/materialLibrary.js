function MATLIB(THREE) {

    var map = {};

    this.woodFloor = new THREE.MeshPhongMaterial( { color: 0x9D7F61 , shininess:0} );
    this.whiteFormica = new THREE.MeshLambertMaterial( { color: 0x999999, shininess:300 } );
    this.greyFormica = new THREE.MeshLambertMaterial( { color: 0xBBBBBB } );


    this.white = new THREE.MeshBasicMaterial( { color: 0xFFFFFF} );
    this.black = new THREE.MeshBasicMaterial( { color: 0x111111, specular:'blue', shininess:300} );
    this.keyboard = new THREE.MeshPhongMaterial( { color: 0x777777, specular: 'white', shininess:300 } );
    this.silver = new THREE.MeshPhongMaterial( { color: 0x666666, specular: 'white', shininess:300 } );
    this.blueFabric = new THREE.MeshLambertMaterial( { color: 0x6666FF } );
    this.darkBlueFabric = new THREE.MeshLambertMaterial( { color: 0x2222FF } );
    this.brownFabric = new THREE.MeshLambertMaterial( { color: 0x855723 } );
    this.redFabric = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
    this.greenFabric = new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
    this.skin = new THREE.MeshLambertMaterial( { color: 0xFFFF00 } );
    this.passiveScreen = new THREE.MeshBasicMaterial( { color: 0x111111, specular:'blue', shininess:300} );
    this.activeScreen = new THREE.MeshLambertMaterial( { color: 0x00FF00 } );

    this.get = function(colorName) {
        var result = map[colorName];
        if (!result) {
            result = new THREE.MeshLambertMaterial({color: colorName});
            map[colorName] = result;
        }
        return result;
    }
}
