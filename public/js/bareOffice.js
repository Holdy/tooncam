
function r(magnitude) {
    return Math.random() * magnitude;
}

var t = {width:150, depth:75, height:74};

function addIsland(x,z,rows,cols) {
    var currentZ = z;
    for(var row = 1; row<=rows;row++) {
        var currentX = x;
        var facing = row != 1;
        for(var col = 1; col <= cols; col++) {
            mod.addTable({x:currentX +r(2), z:currentZ+r(2), width:t.width, depth:t.depth, height:t.height, facing:facing});
            currentX += t.width+3;
        }
        currentZ += t.depth+3;
    }
}

function createBareOffice(mod, mat) {

    mod.addFloor(-490, 0, -550, 1100, 4, 490*2);

    addIsland(-470 + 70,-425,2,3);
    addIsland(200,      -425,2,3);

    addIsland(-470 + 70,-120,2,3);
    addIsland(200,      -120,2,3);

    addIsland(-470 + 70, 200,2,3);


}
