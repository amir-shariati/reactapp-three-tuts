import React from 'react';
import ReactDOM from 'react-dom';

import {useRef, useState, useEffect, Fragment} from 'react';

import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


import './index.css';

import {Box} from "./components/box";
import {Counter} from "./components/counter";

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            controls.minDistance = 3;
            controls.maxDistance = 20;
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

function App() {
    return(
        <div className={"main"}>


            <h1> Amir test</h1>
            <Counter initialCount={20} />

            <Fragment>
                <h1> React test </h1>

                <Canvas>

                    <CameraController/>

                    <ambientLight  />
                    <pointLight position={[10, 10, 10]} />

                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />

                </Canvas>
            </Fragment>

            <span className="header">Span Test</span>

        </div>
    )
}

const rootElement = document.getElementById('root');

ReactDOM.render(
    <App/> ,
    rootElement
);

