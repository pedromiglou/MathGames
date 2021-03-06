/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: PeteDeee (https://sketchfab.com/vileguypete)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/1046cd56a67d4b79902e47aa0daf3ccb
title: Ushanka - Trapper Hat
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/hats/ushanka.glb')
  return (
    <group ref={group} {...props} dispose={null} scale={[0.05,0.035,0.05]} position={[0, 1.75, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials.Material__67} />
      </group>
    </group>
  )
}

useGLTF.preload('/Ushanka.glb')
