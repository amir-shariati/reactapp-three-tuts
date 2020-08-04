import React, {useCallback, useEffect, useRef, useState} from "react";
import {useFrame} from "react-three-fiber";


export function Cube(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const isActiveRef = useRef(isActive);

    // color
    const color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

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
        >
            <boxBufferGeometry attach={"geometry"} args={[1, 1, 1]} />
            <meshStandardMaterial attach={"material"} color={ color } />

        </mesh>

    )
}