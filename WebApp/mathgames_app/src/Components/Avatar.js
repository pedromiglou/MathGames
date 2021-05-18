import { React, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";

import * as THREE from 'three';

import MagicianHat from './Avatar/Hats/MagicianHat'
import WitchHat from './Avatar/Hats/WitchHat'
import PoliceHat from './Avatar/Hats/PoliceHat'

import SunGlasses from './Avatar/Accessories/SunGlasses'
import AviatorGlasses from './Avatar/Accessories/AviatorGlasses'
import SteamPunkGlasses from './Avatar/Accessories/SteamPunkGlasses'




const Head = ({ position, args, color }) => {
	return (
		<group>
			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args} />
				<meshBasicMaterial attach="material" color={color} />
			</mesh>
			<mesh  position={[0, 1.25, 0.5]}>
				<boxBufferGeometry attach="geometry" args={[0.35, 0.05, 0.1]} />
				<meshBasicMaterial attach="material" color="black" />
			</mesh>

			<mesh  position={[-0.25, 1.6, 0.5]}>
				<boxBufferGeometry attach="geometry" args={[0.05, 0.05, 0.1]} />
				<meshBasicMaterial attach="material" color="black" />
			</mesh>
			<mesh  position={[0.25, 1.6, 0.5]}>
				<boxBufferGeometry attach="geometry" args={[0.05, 0.05, 0.1]} />
				<meshBasicMaterial attach="material" color="black" />
			</mesh>
		</group>
	);
};

const Box = ({ position, args, color }) => {

	return (
		<mesh position={position}>
			<boxBufferGeometry attach="geometry" args={args}/>
			<meshBasicMaterial attach="material" color={color} />
		</mesh>
	);

};


const Body = ({ position, args, color, tex, props }) => {

	const Camouflage1 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/Camouflage1.jpg');
	const Camouflage2 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/Camouflage2.jpg');
	const Carpet1 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/Carpet1.jpg');

	if(tex) {
		if ( props.shirtName === "Camouflage2" )
			var textureLoaded = Camouflage2;
		else if ( props.shirtName === "Carpet1" )
			textureLoaded = Carpet1;
		else 
			textureLoaded = Camouflage1;
		

		return (
			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args}/>
				<meshLambertMaterial attach="material" map={textureLoaded} toneMapped={false}/>
			</mesh>
		);
	} else {
			return (
			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args}/>
				<meshBasicMaterial attach="material" color={color} />
			</mesh>
		);
	}
}

/* const Plane = ({ position, args, color }) => {
	const mesh = useRef();

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (mesh.current.rotation.x = -Math.PI / 2));

	return (
		<mesh position={position} ref={mesh}>
			<planeGeometry attach="geometry" args={args} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
}; */ 


function Avatar(props) {

	if (props.hatName === "MagicianHat") 
		var hat = <MagicianHat />
	else if (props.hatName === "WitchHat") 
		hat = <WitchHat />
	else if (props.hatName === "PoliceHat") 
		hat = <PoliceHat />
	else
		hat = null


	if( props.shirtName === "none")
		var tex = false;
	else
		tex = true;


	if( props.accesorieName === "SunGlasses")
		var accessorie = <SunGlasses />;
	else if ( props.accesorieName === "AviatorGlasses")
		accessorie = <AviatorGlasses />;
	else if ( props.accesorieName === "SteamPunkGlasses")
		accessorie = <SteamPunkGlasses />;
	else
		accessorie = null

	
	return (
		<Canvas>
			<Suspense fallback={null}>
				<OrbitControls />
				<ambientLight intensity={0.5} />

				<Head position={[0, 1.5, 0]} args={[1, 1, 1]} color={props.skinColor} /> 

				<Body args={[2, 2, 1]} tex={tex} props={props} color={props.skinColor}/>

				<Box args={[0.9, 2, 1]} position={[-0.5, -2, 0]} color={props.trouserName}/>
				<Box args={[0.9, 2, 1]} position={[0.5, -2, 0]} color={props.trouserName} />

				<Box args={[0.75, 2, 1]} position={[-1.375, 0, 0]} color={props.skinColor} />
				<Box args={[0.75, 2, 1]} position={[1.375, 0, 0]} color={props.skinColor} />

				{/* <Plane args={[5, 5]} position={[0, -3.5, 0]} color="black" /> */}
				
				{hat}
				{accessorie}
				
			</Suspense>
		</Canvas>
	);
}

	

export default Avatar;
