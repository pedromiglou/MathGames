import React, { useRef, useState, useMemo } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense } from "react";
import { Html } from "@react-three/drei";

import * as THREE from 'three'

import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

const Head = ({ position, args, color }) => {
	return (
		<mesh position={position}>
			<boxBufferGeometry attach="geometry" args={args} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
};

const Box = ({ position, args, color }) => {
	return (
		<mesh position={position}>
			<boxBufferGeometry attach="geometry" args={args} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
};

const Plane = ({ position, args, color }) => {
	const mesh = useRef();

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (mesh.current.rotation.x = -Math.PI / 2));

	return (
		<mesh position={position} ref={mesh}>
			<planeGeometry attach="geometry" args={args} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
};

function Shoe(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'shoe-draco.glb')
  
	// Using the GLTFJSX output here to wire in app-state and hook up events
	return (
	  <group ref={group} {...props} dispose={null}>
		<mesh receiveShadow castShadow geometry={nodes.shoe.geometry} material={materials.laces}/>
		<mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} />
		<mesh receiveShadow castShadow geometry={nodes.shoe_2.geometry} material={materials.caps}/>
		<mesh receiveShadow castShadow geometry={nodes.shoe_3.geometry} material={materials.inner}  />
		<mesh receiveShadow castShadow geometry={nodes.shoe_4.geometry} material={materials.sole} />
		<mesh receiveShadow castShadow geometry={nodes.shoe_5.geometry} material={materials.stripes}/>
		<mesh receiveShadow castShadow geometry={nodes.shoe_6.geometry} material={materials.band} />
		<mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} />
	  </group>
	)
}

function MagicianHat(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/hats/magicianHat.glb')
  
	return (
		<group ref={group} {...props} dispose={null} scale={[0.3,0.3,0.3]} position={[0, 1.75, 0]}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<mesh geometry={nodes.mesh_0.geometry} material={materials.lambert2SG} />
			</group>
   		</group>
	)
}

function WitchHat(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/hats/witchHat.glb')
  
	return (
		<group ref={group} {...props} dispose={null} scale={[0.5,0.5,0.5]} position={[0, 1.75, 0]}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<group position={[0, 0.17, -0.29]} rotation={[0.18, 0, 0]}>
						<mesh geometry={nodes.eye1_low_HAT_0.geometry} material={nodes.eye1_low_HAT_0.material} />
					</group>
					<group position={[0.25, 0.31, 0.37]} rotation={[0.12, -0.8, 0.56]} scale={[0.87, 0.87, 0.87]}>
						<mesh geometry={nodes.eye2_low_HAT_0.geometry} material={nodes.eye2_low_HAT_0.material} />
					</group>
						<mesh geometry={nodes.Hatbase_low_HAT_0.geometry} material={nodes.Hatbase_low_HAT_0.material} />
						<mesh geometry={nodes.scraft_low_HAT_0.geometry} material={nodes.scraft_low_HAT_0.material} />
					<group position={[-0.16, 0.61, -3.72]} rotation={[-1.81, 0.1, -0.13]} scale={[0.04, 0.06, 0.04]}>
						<mesh geometry={nodes.H6_low_HAT_0.geometry} material={nodes.H6_low_HAT_0.material} />
					</group>
					<group position={[-0.17, 0.34, -3.72]} rotation={[-2.05, 0.18, -0.13]} scale={[0.05, 0.07, 0.05]}>
						<mesh geometry={nodes.H5_low_HAT_0.geometry} material={nodes.H5_low_HAT_0.material} />
					</group>
					<group position={[-0.06, 0.45, -3.46]} rotation={[-0.11, 0.73, -2.24]} scale={[0.03, 0.04, 0.03]}>
						<mesh geometry={nodes.H4_low_HAT_0.geometry} material={nodes.H4_low_HAT_0.material} />
					</group>
					<group position={[-0.37, 0.45, -3.44]} rotation={[-0.12, -0.67, 2.47]} scale={[0.03, 0.04, 0.03]}>
						<mesh geometry={nodes.H3_low_HAT_0.geometry} material={nodes.H3_low_HAT_0.material} />
					</group>
					<group position={[-0.17, 0.24, -3.78]} rotation={[-2.31, -0.03, -0.33]} scale={[0.02, 0.04, 0.02]}>
						<mesh geometry={nodes.H2_low_HAT_0.geometry} material={nodes.H2_low_HAT_0.material} />
					</group>
					<group position={[-0.3, 0.71, -3.58]} rotation={[-1.2, -0.73, 0.47]} scale={[0.02, 0.03, 0.02]}>
						<mesh geometry={nodes.H1_low_HAT_0.geometry} material={nodes.H1_low_HAT_0.material} />
					</group>
				</group>
			</group>
		</group>
	)
}

function AviatorGlasses(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/acessories/aviatorGlasses.glb')
  
	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<group position={[0, 1.6, 0.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.4, 0.4, 0.4]}>
						<mesh geometry={nodes.Aviators_Plastic001_0.geometry} material={materials['Plastic.001']} />
						<mesh geometry={nodes.Aviators_Glass001_0.geometry} material={materials['Glass.001']} />
					</group>
				</group>
			</group>
		</group>
	)
}


function SunGlasses(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/acessories/sunGlasses.glb')
  
	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<group rotation={[0, 0, 0]} position={[0, 1.59, 0.7]} scale={[0.04, 0.04, 0.03]} >
						<mesh geometry={nodes.Glasses_Glasses2_0.geometry} material={materials.Glasses2} />
						<mesh geometry={nodes.Glasses_Lenses_0.geometry} material={materials.Lenses} />
						<mesh geometry={nodes.Glasses_Glasses1_0.geometry} material={materials.Glasses1} />
					</group>
				</group>
			</group>
		</group>
	)
}


function Avatar() {
	/* const loader = new THREE.TextureLoader();
	loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg', (texture) => {
	  const material = new THREE.MeshBasicMaterial({
		map: texture,
	  });
	});
	
	
	//const texture = useLoader(THREE.TextureLoader, img);
	const [texture] = useLoader(THREE.TextureLoader, img);
	console.log(texture);  */

	return (
		<Canvas>
			<OrbitControls />
			<ambientLight intensity={0.5} />
			
			<Suspense fallback={null}>

				<Head position={[0, 1.5, 0]} args={[1, 1, 1]} />

				<Box args={[2, 2, 1]} color="brown" />

				<Box args={[0.9, 2, 1]} position={[-0.5, -2, 0]} color="grey" />
				<Box args={[0.9, 2, 1]} position={[0.5, -2, 0]} color="grey" />

				<Box args={[0.75, 2, 1]} position={[-1.375, 0, 0]} color="white" />
				<Box args={[0.75, 2, 1]} position={[1.375, 0, 0]} color="white" />

				<Plane args={[5, 5]} position={[0, -3.5, 0]} color="black" />

				{/* <Shoe />  */}
				<MagicianHat /> 
				 {/* <WitchHat />  */}
				<AviatorGlasses />
				 {/* <SunGlasses />  */}
			</Suspense>
		</Canvas>
	);
}

export default Avatar;
