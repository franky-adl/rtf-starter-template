import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import { Loader, Html } from '@react-three/drei'
import App from "./app"

const root = ReactDOM.createRoot(document.querySelector("#canvas"))

const Container = () => {
    // sample usage for Html and Loader: https://drei.pmnd.rs/?path=/docs/misc-useprogress--docs
    // Suspense detects any suspense-enabled children, e.g. https://docs.pmnd.rs/react-three-fiber/api/hooks#useloader
    return (<Canvas camera={{ fov: 60, near: 0.1, far: 100, position: [0, 2, 5] }}>
        <Suspense fallback={<Html><Loader /></Html>}>
            <App />
        </Suspense>
    </Canvas>)
}

root.render(<Container/>)
