import { React, Suspense } from "react";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";

import * as THREE from 'three';


import MagicianHat from './Avatar/Hats/MagicianHat'
import WitchHat from './Avatar/Hats/WitchHat'
import PoliceHat from './Avatar/Hats/PoliceHat'
import ChristmasHat from './Avatar/Hats/ChristmasHat'
import CowboyHat from './Avatar/Hats/CowboyHat'
import Ushanka from './Avatar/Hats/Ushanka'


import SunGlasses from './Avatar/Accessories/SunGlasses'
import AviatorGlasses from './Avatar/Accessories/AviatorGlasses'
import SteamPunkGlasses from './Avatar/Accessories/SteamPunkGlasses'
import PixelGlasses from './Avatar/Accessories/PixelGlasses'





const Head = ({ position, args, color }) => {
	return (
		<group>
			<mesh position={position}>
				<RoundedBox args={args} radius={0.2}>
					<meshLambertMaterial attach="material" color={color} />
				</RoundedBox>
			</mesh>
			<mesh  position={[0, 1.25, 0.5]}>
				<boxBufferGeometry attach="geometry" args={[0.35, 0.05, 0.1]} />
				<meshLambertMaterial attach="material" color="black" />
			</mesh>

			<mesh  position={[-0.25, 1.6, 0.5]}>
				<boxBufferGeometry attach="geometry" args={[0.05, 0.05, 0.1]} />
				<meshLambertMaterial attach="material" color="black" />
			</mesh>
			<mesh  position={[0.25, 1.6, 0.5]}>
				<boxBufferGeometry attach="geometry" args={[0.05, 0.05, 0.1]} />
				<meshLambertMaterial attach="material" color="black" />
			</mesh>
		</group>
	);
};

const Box = ({ position, args, color, tex, props }) => {

	return (
		<mesh position={position}>
			<RoundedBox args={args} radius={0.1}>
				<meshLambertMaterial attach="material" color={color} />
			</RoundedBox>
		</mesh>
	);

};

const Body = ({ position, args, color, tex, props }) => {

	const Camouflage1 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/Camouflage1.jpg');
	const Camouflage2 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/Camouflage2.jpg');
	const Carpet1 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/Carpet1.jpg');
	const GreyFabric = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/GreyFabric.jpg');
	const BlueFabric = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/BlueFabric.jpg');
	const ShirtWool1 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/ShirtWool1.jpg');
	const ShirtWool2 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/ShirtWool2.jpg');
	const ShirtWool3 = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/ShirtWool3.jpg');

	if(tex) {
		switch(props.shirtName) {
			case "Camouflage2":
				var textureLoaded = Camouflage2;
				break;
			case "Carpet1":
				textureLoaded = Carpet1;
				break;
			case "Camouflage1":
				textureLoaded = Camouflage1;
				break;
			case "BlueFabric":
				textureLoaded = BlueFabric;
				break;
			case "ShirtWool1":
				textureLoaded = ShirtWool1;
				break;
			case "ShirtWool2":
				textureLoaded = ShirtWool2;
				break;
			case "ShirtWool3":
				textureLoaded = ShirtWool3;
				break;
			default:
				textureLoaded = GreyFabric;
		}


		return (

			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args}/>
				<meshBasicMaterial attach="material" map={textureLoaded} toneMapped={false} />
			</mesh> 
			
		);
	} else {
		return (
			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args}/>
				<meshLambertMaterial attach="material" color={color} />
			</mesh>
		);
	}
}


const Legs = ({ position, args, color, tex, props }) => {

	const TrouserJeans = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/TrouserJeans.jpg');
	const TrouserBlackJeans = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/TrouserBlackJeans.jpg');
	const TrouserGrey = useLoader(THREE.TextureLoader, process.env.PUBLIC_URL + 'avatar_assets/texture/TrouserGrey.jpg');

	if(tex) {
		switch(props.trouserName) {
			case "TrouserJeans":
				var textureLoaded = TrouserJeans;
				break;
			case "TrouserGrey":
				textureLoaded = TrouserGrey;
				break;
			default:
				textureLoaded = TrouserBlackJeans;
		}

		return (
			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args}/>
				<meshBasicMaterial attach="material" map={textureLoaded} toneMapped={false} />
			</mesh> 
		);
	} else {
		return (
			<mesh position={position}>
				<boxBufferGeometry attach="geometry" args={args}/>
				<meshLambertMaterial attach="material" color={color} />
			</mesh>
		);
	}

};


function Avatar(props) {
	//const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/hats/christmasHat.glb')


	switch(props.hatName) {
		case "MagicianHat":
			var hat = <MagicianHat />
			break;
		case "WitchHat":
			hat = <WitchHat />
			break;
		case "PoliceHat":
			hat = <PoliceHat />
			break
		case "ChristmasHat":
			hat = <ChristmasHat />
			break
		case "CowboyHat":
			hat = <CowboyHat />
			break
		case "Ushanka":
			hat = <Ushanka />
			break
		default:
			hat = null
			
	}
		

	if( props.shirtName === "none")
		var tex = false;
	else
		tex = true;


	switch(props.trouserName) {
		case "#34495E":
			var texTrousers = false;
			break;
		case "#7B7D7D":
			texTrousers = false;
			break;
		case "#EAEDED":
			texTrousers = false;
			break;
		default:
			texTrousers = true;
	}	

	switch(props.accesorieName) {
		case "SunGlasses":
			var accessorie = <SunGlasses />;
			break;
		case "AviatorGlasses":
			accessorie = <AviatorGlasses />;
			break;
		case "SteamPunkGlasses":
			accessorie = <SteamPunkGlasses />;
			break
		case "PixelGlasses":
			accessorie = <PixelGlasses />;
			break
		default:
			accessorie = null
	}	




	/* const [didMount, setDidMount] = useState(false); 

	useEffect(() => {
		setDidMount(true);
		return () => setDidMount(false);
	}, [])

	if(!didMount) {
		return null;
	} */

	
	return (
		<Canvas>
            <Suspense fallback={null}>	
				<OrbitControls />
				<ambientLight intensity={0.7} />

				<Head position={[0, 1.5, 0]} args={[1, 1, 1]} color={props.skinColor} /> 

				<Body args={[2, 2, 1]} tex={tex} props={props} color={props.skinColor}/>

				<Legs args={[0.9, 2, 1]} tex={texTrousers} props={props} position={[-0.5, -2, 0]} color={props.trouserName} />
				<Legs args={[0.9, 2, 1]} tex={texTrousers} props={props} position={[0.5, -2, 0]} color={props.trouserName} />

				<Box args={[0.75, 2, 1]} props={props} position={[-1.375, 0, 0]} color={props.skinColor} />
				<Box args={[0.75, 2, 1]} props={props} position={[1.375, 0, 0]} color={props.skinColor} />

				{hat}
				{accessorie}


				{/* <RoundedBox args={[3, 3, 0.25]} radius={0.1}>
					<meshLambertMaterial attach="material" color={"grey"} />
				</RoundedBox> */}

			</Suspense>
		</Canvas>
	);
}

	

export default Avatar;
