import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { useState } from "react";

const root = ReactDOM.createRoot(document.querySelector("#root"));

function App() {
    const [wheel, setWheel] = useState(0);

    function wheelHandle(event) {
        if (event.deltaY < 0) {
            setWheel(-1);
        } else if (event.deltaY > 0) {
            setWheel(1);
        }
    }

    const resetWheel = () => {
        setWheel(0);
    };

    return (
        <Canvas
            onWheel={wheelHandle}
            shadows
            camera={{
                near: 0.1,
                far: 200,
                position: [0, 0, 7],
            }}
        >
            <Experience
                wheelHandle={wheelHandle}
                resetWheel={resetWheel}
                wheel={wheel}
            />
        </Canvas>
    );
}

root.render(<App />);
