import { React, useRef } from "react";
import { useGLTF } from "@react-three/drei";


function AviatorGlasses(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + 'avatar_assets/accessories/aviatorGlasses.glb')
  
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
export default AviatorGlasses;
