function init() {
    var scene = new THREE.Scene();

    //Colour of fog and density of fog
    scene.fog = new THREE.FogExp2(0xffffff, 0.2)

    var polygonMesh = getPolygon(1,1,1);
    var plane = getPlane(100,100)

    plane.name ='cool-plane';
    polygonMesh.position.y = polygonMesh.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    //Adding cube to screen
    plane.add(polygonMesh);

    //Adding plane to scene 
    scene.add(plane);

    var camera = new THREE.PerspectiveCamera(
        45, //Field of view
        window.innerWidth/window.innerHeight, //Aspect ratio
        1, //near clipping plane
        1000 //far clipping plane
    );

    camera.position.x =1;
    camera.position.y =2;
    camera.position.z =5;

    camera.lookAt(new THREE.Vector3(0,0,0));

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff)
    document.getElementById('webgl').appendChild(renderer.domElement);

    update(renderer, scene, camera);

    return scene;
}

function update(renderer, scene, camera){
    renderer.render(
        scene,
        camera
    );
    /** 
    //Adding rotation
    var plane = scene.getObjectByName('cool-plane');
    plane.rotation.y += 0.001;
    plane.rotation.z += 0.001;

    //
    scene.traverse(function(child){
        child.scale.x +=0.001
    })
    */
    requestAnimationFrame(function () {
        update(renderer, scene, camera);
    })
}

function getPolygon(width, height, depth){
    //values go in as width, height and depth
    var geometry = new THREE.BoxGeometry(width, height, depth);

    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });

    //Creating a mesh that combines the two into a 3D object
    var mesh = new THREE.Mesh(
        geometry,
        material
    )
    return mesh;
}

function getPlane(width, depth){
    //values go in as width, height and depth
    var geometry = new THREE.PlaneGeometry(width, depth);

    var material = new THREE.MeshBasicMaterial({
        color: 0x0759db,
        side: THREE.DoubleSide //This makes sure we cna see through 2D objects
    });

    //Creating a mesh that combines the two into a 3D object
    var mesh = new THREE.Mesh(
        geometry,
        material
    )
    return mesh;
}
var scene = init()