/**
 * @fileoverview Renderización en Realidad Aumentada con Three.js y AR.js.
 * 
 * @author Manuel Tomas Teves
 * @date 29 mar 2025
 * 
 * Copyright (c) 2025 Manuel Tomas Teves
 * 
 * Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
 * de este software y los archivos de documentación asociados (el "Software"), para 
 * utilizar el Software sin restricción, incluyendo sin limitación los derechos de uso, 
 * copia, modificación, fusión, publicación, distribución, sublicencia y/o venta del 
 * Software, y para permitir a las personas a quienes se les proporcione el Software 
 * hacer lo mismo, sujeto a las siguientes condiciones:
 * 
 * El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias
 * o partes sustanciales del Software.
 * 
 * EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, 
 * INCLUYENDO PERO NO LIMITADO A LAS GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO 
 * PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN 
 * RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN 
 * CONTRACTUAL, EXTRACONTRACTUAL O DE OTRO TIPO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE 
 * O EL USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
 */


const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var ArToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
});
ArToolkitSource.init(() => {
    ArToolkitSource.onResizeElement();
    ArToolkitSource.copyElementSizeTo(renderer.domElement);
    setTimeout(() => {
        ArToolkitSource.onResizeElement();
        ArToolkitSource.copyElementSizeTo(renderer.domElement);
    }, 250);
});

var ArToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'camera_para.dat',
    detectionMode: 'color_and_matrix'
});
ArToolkitContext.init(() => {
    camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
});

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
    type: 'pattern',
    patternUrl: 'pattern-qrcode.patt',
    changeMatrixMode: 'cameraTransformMatrix',
});

scene.visible = false;

const geometry = new THREE.CubeGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial( {
    transparent:  true,
    opacity: 0.5,
    side: THREE.DoubleSide,
} );
const cube = new THREE.Mesh( geometry, material );
// cube.position.y = geometry.parameters.height / 2;
scene.add( cube );

camera.position.z = 5;

function animate() {

    requestAnimationFrame( animate );
    ArToolkitContext.update(ArToolkitSource.domElement);
    scene.visible = camera.visible;
    renderer.render( scene, camera );

}

animate();