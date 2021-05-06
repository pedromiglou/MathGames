import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";

const Box = ({ position, args, color }) => {
	return (
		<mesh position={position}>
			<boxBufferGeometry attach="geometry" args={args} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
};

const Cylinder = ({ position, args, color }) => {
	return (
		<mesh position={position}>
			<cylinderBufferGeometry attach="geometry" args={args} />
			<meshLambertMaterial attach="material" color={color} />
		</mesh>
	);
};

/* const Plane = ({ position, args, color }) => {
    return (
        

    )
}
 */
function Avatar() {
	return (
		<Canvas>
			<OrbitControls />
			<ambientLight intensity={0.5} />

			<Box position={[0, 1.7, 0]} args={[1, 1, 1]} />

            <Box args={[ 1.75, 2, 1 ]} color="aqua" />
			{/* <Cylinder args={[1, 1, 2.5, 50]} color="aqua" /> */}

			<Cylinder
				args={[0.25, 0.25, 2, 50]}
				position={[-0.5, -1.5, 0]}
				color="white"
			/>
			<Cylinder
				args={[0.25, 0.25, 2, 50]}
				position={[0.5, -1.5, 0]}
				color="white"
			/>

			<Cylinder
				args={[0.25, 0.25, 1.75, 50]}
				position={[-1.2, 0, 0]}
				color="white"
			/>
			<Cylinder
				args={[0.25, 0.25, 1.75, 50]}
				position={[1.2, 0, 0]}
				color="white"
			/>
 
			{/* <Plane color="black" /> */}

			<Plane position={[0, -1, 0]} args={[2,2,2]} >
				<meshPhongMaterial attach="material" color="#f3f3f3" />
			</Plane>

		</Canvas>
	);
}

export default Avatar;
