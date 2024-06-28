import { Vector3 } from "three"
import React, { Fragment, useRef, useEffect } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useControls } from 'leva'
// drei docs: https://github.com/pmndrs/drei
import { Stats, OrbitControls, Environment, ContactShadows } from '@react-three/drei'

import Sunset from "./assets/venice_sunset_1k.hdr"
import snoiseImport from "./shaders/snoise3.glsl"

const App = () => {
    const ref = useRef()
    const state = useThree()
    const torus = useControls('Torus', {
        metalness: { value: 1, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0, min: 0, max: 1, step: 0.01 },
        color: { value: "white" }
    })

    useFrame((state, delta) => {
        ref.current.rotation.y += 0.5 * delta
    })

    // useEffect(() => {
    //     // note that following doesn't work with OrbitControls
    //     state.camera.lookAt(new Vector3(0, 2, 0))
    // }, [])

    return (<Fragment>
        <OrbitControls target={[0, 2, 0]}/>
        <Stats />
        <Environment
            files={Sunset} 
            background 
            backgroundBlurriness={0.5}
        />
        <ambientLight intensity={0.1} />
        <ContactShadows
            scale={70}
            opacity={0.8}
        />
        <mesh position={[0, 2, 0]} ref={ref}>
            <torusKnotGeometry args={[1, 0.4, 256, 64]} />
            <meshStandardMaterial
                color={torus.color}
                metalness={torus.metalness}
                roughness={torus.roughness}
                // just to show how to extend existing shaders
                onBeforeCompile={(shader) => {
                    shader.vertexShader = shader.vertexShader.replace('#include <common>', `
                        ${snoiseImport}
                        #include <common>
                    `)
                }} />
        </mesh>
    </Fragment>)
}

export default App