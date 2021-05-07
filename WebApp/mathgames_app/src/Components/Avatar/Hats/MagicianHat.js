import React from "react"

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

export default MagicianHat;
