import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useFrame} from "react-three-fiber";
import * as THREE from 'three';



// // var geometry = new THREE.BoxBufferGeometry( 0.6, 2, 1.07 );
// let geometry = new THREE.BoxGeometry( 0.6, 2, 1.07 );
// let mesh = new THREE.Mesh( geometry, materials );

//
//
// position.y += (geometry.parameters.height/2 + 0.01);
// mesh.position.add(position);
// mesh.name = name;

export function Shape(props) {

    // Set up state for the material state
    // const [material, set] = useState();

    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const isActiveRef = useRef(isActive);

    //-------------- material color ---------------------------//
    // color
    const color = isHovered ? 'rgb(255,100,0)' : (isActive ? 'rgb(200,200,200)' : 'rgb(5,5,5)');
    const opacity = isHovered ? 0.5 : (isActive ? 1 : 1 );

    const material = isHovered ?
        new THREE.MeshBasicMaterial( { color: color, transparent: true, opacity: opacity, side: THREE.DoubleSide } )
        :
        new THREE.MeshBasicMaterial( { color: color, opacity: opacity, side: THREE.DoubleSide } )

    const materialTransparent =  new THREE.MeshBasicMaterial( { transparent: true, opacity: 0, wireframe: true, side: THREE.DoubleSide} );


    let materials = [
        material,
        material,
        material,
        material,
        materialTransparent,
        materialTransparent
    ];
    //-------------- end of material color ---------------------------//

    //useEffect of the activeState
    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame( () => {

        if (isHovered && !isActive){
            mesh.current.rotation.z += 0.01;
            mesh.current.rotation.x += 0.01;
        }
        if (isHovered && isActive){
            mesh.current.rotation.y += 0.02;
            mesh.current.rotation.x += 0.06;

        }

    })

    // Events
    const onHover = useCallback(
        (e, value) => {
            e.stopPropagation();
            setIsHovered(value);
        },
        [setIsHovered]
    );

    const onClick = useCallback(
        e => {
            e.stopPropagation();
            setIsActive(v => !v);
        },
        [setIsActive]
    );

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={isActive ? [1.5,1.5,1.5] : [1, 1, 1] }
            onClick={ e => onClick(e) }
            onPointerOver={ e => onHover(e, true) }
            onPointerOut={ e => onHover(e, false) }
            material={materials}
        >
            <boxBufferGeometry attach={"geometry"} args={[1, 1, 1]} />

        </mesh>

    )
}