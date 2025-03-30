# Documentation

### camera_para.dat?
camera_para.dat es un archivo que contiene los parámetros de calibración de la cámara para AR.js.

#### ¿Para qué se usa?
- Se necesita para convertir las coordenadas del mundo real en coordenadas de la escena 3D.Define:

    - Matriz de proyección: cómo la cámara captura la escena.

    - Distorsión de lente: corrige deformaciones.

    - Focal length y centro óptico: ajusta perspectiva y alineación.

### Pattern?
El pattern (patrón) en AR.js es una imagen en blanco y negro que el sistema usa como marcador para detectar y posicionar objetos 3D en la realidad aumentada.

#### ¿Cómo funciona?
El sistema analiza la imagen de la cámara y busca un patrón predefinido.
Si el patrón coincide con el archivo de referencia (pattern-qrcode.patt en este caso), calcula su posición y orientación.
Luego, coloca el objeto 3D en la escena alineados con el marcador.

#### ¿Qué es pattern-qrcode.patt?
Es el archivo que contiene la versión binaria del patrón. Se genera desde una imagen usando [AR.js Marker Traning](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html).
