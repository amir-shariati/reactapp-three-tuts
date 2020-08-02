import React from 'react';
import ReactDOM from 'react-dom';

import {useRef, useState, useEffect, Fragment} from 'react';

import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


import './index.css';

import {extend} from "react-three-fiber";
extend({ OrbitControls })


// const CameraController = () => {
//     const { camera, gl } = useThree();
//     useEffect(
//         () => {
//             const controls = new OrbitControls(camera, gl.domElement);
//
//             controls.minDistance = 3;
//             controls.maxDistance = 20;
//             return () => {
//                 controls.dispose();
//             };
//         },
//         [camera, gl]
//     );
//     return null;
// };

function Box(props) {

    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame( () => {
        
        if (hovered && !active){
            mesh.current.rotation.z += 0.01;
            mesh.current.rotation.x += 0.01;
        }
        if (hovered && active){
            mesh.current.rotation.y += 0.02;
            mesh.current.rotation.x += 0.06;
            
        }
        
    })
    
    return (
        <mesh 
            {...props}
            ref={mesh}
            scale={active ? [1.5,1.5,1.5] : [1, 1, 1] }
            onClick={ e => setActive(!active) }
            onPointerOver={ e => setHover(true) }
            onPointerOut={ e => setHover(false) }
        >
            <boxBufferGeometry attach={"geometry"} args={[1, 1, 1]} />
            <meshStandardMaterial attach={"material"} color={ hovered ? 'hotpink' : 'rgb(70,70,70)' } />

        </mesh>
        
    )

}

const Scene = () => {
    const {
        camera,
        gl: { domElement }
    } = useThree()
    return (
        <>
            <ambientLight  />
            <pointLight position={[10, 10, 10]} />

            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <orbitControls args={[camera, domElement]} />
        </>
    )
}

ReactDOM.render(
    <Canvas>
        <Scene/>
    </Canvas>,
    document.getElementById('root')
)

// function App() {
//     return(
//         <div className={"main"}>
//             <h1> Amir test</h1>
//
//             <Fragment>
//                 <h1> React test </h1>
//                 <Canvas>
//
//                     <CameraController/>
//
//                     <ambientLight  />
//                     <pointLight position={[10, 10, 10]} />
//
//                     <Box position={[-1.2, 0, 0]} />
//                     <Box position={[1.2, 0, 0]} />
//
//                 </Canvas>
//             </Fragment>
//
//             <span className="header">Tohid Map</span>
//
//         </div>
//     )
// }
//
// const rootElement = document.getElementById('root');
//
// ReactDOM.render(
//     <App/> ,
//     rootElement
// );

