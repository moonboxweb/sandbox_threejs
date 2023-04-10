/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { Vector2 } from "three";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

export default function FlatScreen(props) {
    const { camera } = useThree();
    const { nodes, materials } = useGLTF("./iMacNotTilted3.glb");
    const { textures, distance } = props.screens;
    const { wheel, resetWheel } = props;

    const screen = useRef();

    const [tl, setTl] = useState([]);
    const [page, setPage] = useState(0);

    // creating material for the screen meshes
    const screenMaterial = [];
    for (let i = 0; i < textures.length; i++) {
        const texture = useTexture(textures[i]);
        texture.flipY = false;
        texture.offset = new Vector2(0, -0.1);

        screenMaterial.push(materials.Screen.clone());
        screenMaterial[i].map = texture;
        screenMaterial[i].transparent = true;
        screenMaterial[i].opacity = i === 0 ? 1 : 0;
    }

    useEffect(() => {
        const screenMeshes = screen.current.children[1].children;

        let timeline1 = gsap.timeline({
            paused: true,
            onComplete: resetWheel,
            onReverseComplete: resetWheel,
        });

        // Start of page 1 animation

        timeline1
            .to(camera.position, {
                duration: 0.7,
                z: camera.position.z + 3, // zooming out
            })
            .add("end", 0.7)
            .to(
                screen.current.rotation,
                {
                    duration: 0.7,
                    y: Math.PI * 1.15,
                },
                "end"
            )
            .to(
                screen.current.position,
                {
                    duration: 0.7,
                    x: 7,
                    z: 1,
                },
                "end"
            )
            .add("pull_screens", 1.5);

        for (let i = 1; i < screenMeshes.length; i++) {
            timeline1.to(
                screenMeshes[i].position,
                {
                    x: distance * i,
                },
                "pull_screens"
            );

            // console.log("Material: ", screenMeshes[i].material);

            /* The ##################################### Problem ##################################### */
            timeline1.to(screenMeshes[i].material, {
                opacity: 1,
                duration: 0.7,
            });
        }

        setTl((prevTl) => [...prevTl, timeline1]);

        // End of page 1 animation
    }, []);

    useEffect(() => {
        switch (wheel) {
            case -1:
                switch (page) {
                    case 1:
                        setPage(0);
                        tl[0].reverse();
                        break;
                    default:
                        break;
                }

                break;
            case 1:
                switch (page) {
                    case 0:
                        setPage(1);
                        tl[0].play();
                        break;
                    default:
                        break;
                }
                break;
            case 0:
                // reset
                break;
            default:
                break;
        }
    }, [wheel]);

    return (
        <group ref={screen} {...props} dispose={null}>
            <group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Screen_bottom001.geometry}
                    material={materials.Metal}
                    position={[0.56, 2.41, 0]}
                    rotation={[-0.01, -0.04, -0.15]}
                    scale={[1, 1.28, 0.87]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Stand.geometry}
                    material={materials.Metal}
                    position={[0.01, 0, 0]}
                />
            </group>
            <group>
                {textures.map((item, index) => {
                    return (
                        <mesh
                            key={index}
                            castShadow
                            receiveShadow
                            geometry={nodes.Screen.geometry}
                            material={screenMaterial[index]}
                            position={[0.56, 2.41, 0]}
                            rotation={[-0.01, -0.04, -0.15]}
                            scale={[1, 1.28, 0.87]}
                        />
                    );
                })}
            </group>
        </group>
    );
}

useGLTF.preload("./iMacNotTilted3.glb");