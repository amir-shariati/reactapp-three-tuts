import React from 'react';
import ReactDOM from 'react-dom';

import {Fragment} from 'react';

import {Canvas} from 'react-three-fiber';


import './index.css';

import {CameraController} from "./components/cameraController";
import {Box} from "./components/box";
import {Counter} from "./components/counter";
import {Cube} from "./components/cube";
import {Shape} from "./components/shape";

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

                    {/*<Cube position={[-1.2, 2, 0]} />*/}
                    {/*<Cube position={[1.2, 2, 0]} />*/}

                    <Shape position={[1.2, 2, 0]} />

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

