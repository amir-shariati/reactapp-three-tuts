import React, {useRef} from "react";
import {useFrame, useThree} from "react-three-fiber";
import {useEffect} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";



export const CameraController = () => {
    const { camera, gl } = useThree();
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 9;
    controls.target.set(0,0,0); // option
    controls.enableDamping = true; // option
    controls.dampingFactor = 0.05;
    useEffect(
        () => {
            // const controls = new OrbitControls(camera, gl.domElement);
            //
            // controls.minDistance = 3;
            // controls.maxDistance = 20;
            //
            // controls.target.set(0,0,0); // option
            // controls.enableDamping = true; // option
            // required if controls.enableDamping or controls.autoRotate are set to true
            controls.update();

            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};
