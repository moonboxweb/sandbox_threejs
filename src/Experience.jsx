import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import Placeholder from "./Placeholder.jsx";
import FlatScreen from "./FlatScreen.jsx";

export default function Experience({ wheel, resetWheel }) {
    return (
        <group>
            <axesHelper args={[10]} />

            <OrbitControls makeDefault enableZoom={false} />

            <directionalLight
                castShadow
                position={[1, 2, 3]}
                intensity={1.5}
                shadow-normalBias={0.04}
            />
            <ambientLight intensity={0.5} />

            <Suspense
                fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}
            >
                <FlatScreen
                    rotation={[0, Math.PI * 1.5, 0]}
                    scale={1.3}
                    position={[0, -3, 0]}
                    screens={{
                        textures: [
                            "./images/pay/pay.jpg",
                            "./images/api.png",
                            "./images/php.png",
                            "./images/pay/pay.jpg",
                        ],
                        distance: 1.7,
                    }}
                    wheel={wheel}
                    resetWheel={resetWheel}
                />
            </Suspense>
        </group>
    );
}
