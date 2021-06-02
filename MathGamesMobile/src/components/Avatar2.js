import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import * as React from "react";
import {
	AmbientLight,
	BoxBufferGeometry,
	Fog,
	GridHelper,
	Mesh,
	MeshStandardMaterial,
	PerspectiveCamera,
	PointLight,
	Scene,
	SpotLight,
} from "three";

import ExpoTHREE from "expo-three";

import { Asset } from "expo-asset";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Group, ObjectLoader } from "three";

import * as THREE from "three";

export default function Avatar2(props) {
	let timeout;

	React.useEffect(() => {
		// Clear the animation loop when the component unmounts
		return () => clearTimeout(timeout);
	}, []);

	return (
		<GLView
			style={{ alignItems: "stretch", width: "100%", height: "100%", justifyContent: "center", textAlign: "center",}}
			onShouldReloadContext={ () => console.log("///////////////////") }
			onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
				const {
					drawingBufferWidth: width,
					drawingBufferHeight: height,
				} = gl;
				const sceneColor = 0x6ad6f0;

				// Create a WebGLRenderer without a DOM element
				const renderer = new Renderer({ gl });
				renderer.setSize(width, height);
				renderer.setClearColor(sceneColor);

				const camera = new PerspectiveCamera(
					70,
					width / height,
					0.01,
					1000
				);
				camera.position.set(0, 2, 5);

				const scene = new Scene();
				scene.fog = new Fog(sceneColor, 1, 10000);
				//scene.add(new GridHelper(10, 10));

				const ambientLight = new AmbientLight(0x101010);
				scene.add(ambientLight);

				const pointLight = new PointLight(0xffffff, 2, 1000, 0.001);
				pointLight.position.set(0, 200, 200);
				scene.add(pointLight);

				const spotLight = new SpotLight(0xffffff, 0.5);
				spotLight.position.set(0, 500, 100);
				spotLight.lookAt(scene.position);
				scene.add(spotLight);

				const cube = new IconMesh();
				cube.position.set(3, 0, 1);
				scene.add(cube);

				//camera.lookAt(cube.position);

				switch (props.hatName) {
					case "MagicianHat":
						const MagicianHat = await loadModelsAsync_MagicianHat();
						scene.add(MagicianHat);
						break;

					case "UshankaHat":
						const UshankaHat = await loadModelsAsync_UshankaHat();
						scene.add(UshankaHat);
						break;

					case "WhitchHat":
						const WhitchHat = await loadModelsAsync_WitchHat();
						scene.add(WhitchHat);
						break;

					default:
						/* 
						const CowboyHat = await loadModelsAsync_CowboyHat();
						scene.add(CowboyHat); */
						break;
				}

				switch (props.accessorieName) {
					case "AviatorGlasses":
						const AviatorGlasses =
							await loadModelsAsync_AviatorGlasses();
						scene.add(AviatorGlasses);
						break;
					case "SunGlasses":
						const SunGlasses = await loadModelsAsync_SunGlasses();
						scene.add(SunGlasses);
						break;
					default:
						/* const SteamPunkGlasses = await loadModelsAsync_SteamPunkGlasses();
						scene.add(SteamPunkGlasses); */
						break;
				}

				// ************************** //
				// Head
				// ************************** //
				const headGeometry = new THREE.BoxGeometry(1, 1, 1);
				const head = new THREE.Mesh(headGeometry, avatarMaterial);
				head.position.set(0, 1.5, 0);
				scene.add(head);

				const mouthGeometry = new THREE.BoxGeometry(0.35, 0.05, 0.1);
				const mouthMaterial = new THREE.MeshLambertMaterial({
					color: 0x000000,
				});
				const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
				mouth.position.set(0, 1.25, 0.5);
				scene.add(mouth);

				const eye1Geometry = new THREE.BoxGeometry(0.05, 0.05, 0.1);
				const eye1Material = new THREE.MeshLambertMaterial({
					color: 0x000000,
				});
				const eye1 = new THREE.Mesh(eye1Geometry, eye1Material);
				eye1.position.set(-0.25, 1.6, 0.5);
				scene.add(eye1);

				const eye2 = new THREE.Mesh(eye1Geometry, eye1Material);
				eye2.position.set(0.25, 1.6, 0.5);
				scene.add(eye2);

				// ************************** //
				// Body
				// ************************** //

				var shirtAsset;

				switch (props.shirtName) {
					case "Camouflage2":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/Camouflage2.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					case "Carpet1":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/Carpet1.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					case "Camouflage1":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/Camouflage1.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					case "BlueFabric":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/BlueFabric.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					case "ShirtWool1":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/ShirtWool1.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					case "ShirtWool2":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/ShirtWool2.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					case "ShirtWool3":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/ShirtWool3.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					default:
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/GreyFabric.jpg")
						);
						await shirtAsset.downloadAsync();
				}


				const avatarMaterial = new THREE.MeshLambertMaterial({
					color: 0x00ff00,
				});

				// This texture will be immediately ready but it'll load asynchronously
				const texture = new TextureLoader().load(shirtAsset.localUri);

				const bodyMaterial = new THREE.MeshLambertMaterial({
					color: 0xffffff,
					map: texture,
				});

				const bodyGeometry = new THREE.BoxGeometry(2, 2, 1);
				const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
				scene.add(body);

				camera.lookAt(body.position);


				// ************************** //
				// Arms
				// ************************** //		
				const armsGeometry = new THREE.BoxGeometry(0.75, 2, 1);
				const arm1 = new THREE.Mesh(armsGeometry, avatarMaterial);
				arm1.position.set(-1.375, 0, 0);
				scene.add(arm1);

				const arm2 = new THREE.Mesh(armsGeometry, avatarMaterial);
				arm2.position.set(1.375, 0, 0);
				scene.add(arm2);

				// ************************** //
				// Legs
				// ************************** //
				const legGeometry = new THREE.BoxGeometry(0.9, 2, 1);
				const leg1 = new THREE.Mesh(legGeometry, avatarMaterial);
				leg1.position.set(-0.5, -2, 0);
				scene.add(leg1);

				const leg2 = new THREE.Mesh(legGeometry, avatarMaterial);
				leg2.position.set(0.5, -2, 0);
				scene.add(leg2);


				// ************************** //
				// Render
				// ************************** //
				function update() {
					cube.rotation.y += 0.05;
					cube.rotation.x += 0.025;
				}

				// Setup an animation loop
				const render = () => {
					timeout = requestAnimationFrame(render);
					update();
					renderer.render(scene, camera);
					gl.endFrameEXP();
				};
				render();
			}}
		/>
	);
}

class IconMesh extends Mesh {
	constructor() {
		super(
			new BoxBufferGeometry(1.0, 1.0, 1.0),
			new MeshStandardMaterial({
				// map: new TextureLoader().load(require('./assets/icon.png')),
				color: 0xff0000,
			})
		);
	}
}

// ************************** //
// Hats
// ************************** //

/*	NOT WORKING 
const loadModelsAsync_CowboyHat = async () => {
	/// Get all the files in the mesh
	const model = {
		"CowBoyHat.obj": require("../../public/avatar_assets/hats/cowboyHat/cowboyHat.obj"),
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["CowBoyHat.obj"]],
		null,
		(name) => model[name]
	);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(require("../../public/avatar_assets/hats/cowboyHat/textures/Material_001_baseColor.png"));

	material.map = texture;
	mesh.children[0].material = material; 

	console.log(mesh)
	//console.log(texture)


	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.9);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(1, 0.5, -2);
	//scene.add(mesh);
	this.mesh = mesh; 

	return mesh;
}; */

const loadModelsAsync_MagicianHat = async () => {
	/// Get all the files in the mesh
	const model = {
		"TopHat.obj": require("../../public/avatar_assets/hats/magicianHat/TopHat.obj"), //Working
		"TopHat.mtl": require("../../public/avatar_assets/hats/magicianHat/TopHat.mtl"), //Working
		//"aviatorGlasses.obj": require("../../public/avatar_assets/accessories/aviatorGlasses/aviatorGlasses.obj"),	//Working
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["TopHat.obj"], model["TopHat.mtl"]],
		null,
		(name) => model[name]
	);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(
		require("../../public/avatar_assets/hats/magicianHat/Texture_TopHat.bmp")
	);

	material.map = texture;
	mesh.children[0].material = material;

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.9);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(0, 0.5, -2);
	//scene.add(mesh);
	this.mesh = mesh;

	return mesh;
};

const loadModelsAsync_UshankaHat = async () => {
	/// Get all the files in the mesh
	const model = {
		"UshankaHat.obj": require("../../public/avatar_assets/hats/ushankaHat/source/51cf9fb389244132a6b5bd6b5a33cd8c.obj"), //Working
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["UshankaHat.obj"]],
		null,
		(name) => model[name]
	);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(
		require("../../public/avatar_assets/hats/ushankaHat/textures/Plane003_[Albedo].jpg")
	);

	material.map = texture;
	mesh.children[0].material = material;

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.9);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(1, 0.5, -2);
	//scene.add(mesh);
	this.mesh = mesh;

	return mesh;
};

const loadModelsAsync_WitchHat = async () => {
	/// Get all the files in the mesh
	const model = {
		"WhitchHat.obj": require("../../public/avatar_assets/hats/witchHat/source/MagicHat_low.obj"), //Working
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["WhitchHat.obj"]],
		null,
		(name) => model[name]
	);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(
		require("../../public/avatar_assets/hats/witchHat/textures/HAT_Base_Color.png")
	);

	material.map = texture;
	for (var i = 0; i < mesh.children.length; i++)
		mesh.children[i].material = material;

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.9);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(2, 0.5, -2);
	//scene.add(mesh);
	this.mesh = mesh;

	return mesh;
};

// ************************** //
// Accessories
// ************************** //

const loadModelsAsync_AviatorGlasses = async () => {
	/// Get all the files in the mesh
	const model = {
		"AviatorGlasses.obj": require("../../public/avatar_assets/accessories/aviatorGlasses/aviatorGlasses.obj"),
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["AviatorGlasses.obj"]],
		null,
		(name) => model[name]
	);

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 1.3);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(0, 1.6, 1);
	//scene.add(mesh);
	this.mesh = mesh;

	return mesh;
};

const loadModelsAsync_SunGlasses = async () => {
	/// Get all the files in the mesh
	const model = {
		"SunGlasses.obj": require("../../public/avatar_assets/accessories/sunGlasses/sunGlasses.obj"),
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["SunGlasses.obj"]],
		null,
		(name) => model[name]
	);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(
		require("../../public/avatar_assets/accessories/sunGlasses/textures/Glasses1_baseColor.jpg")
	);

	material.map = texture;
	mesh.children[0].material = material;
	mesh.children[1].material = material;
	mesh.children[2].material = material;

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 1.3);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	//mesh.scale.set(1, 1, 1);
	mesh.position.set(0, 1.6, 1);
	//scene.add(mesh);
	this.mesh = mesh;

	return mesh;
};

/* CURRENTLY NOT APPLYING TEXTURES
const loadModelsAsync_SteamPunkGlasses = async () => {
	/// Get all the files in the mesh
	const model = {
		"SteamPunkGlasses.obj": require("../../public/avatar_assets/accessories/steamPunkGlasses/steamPunkGlasses.obj"),
	};

	/// Load model!
	const mesh = await ExpoTHREE.loadAsync(
		[model["SteamPunkGlasses.obj"]],
		null,
		(name) => model[name]
	);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(require("../../public/avatar_assets/accessories/steamPunkGlasses/textures/м3_Corona_DiffuseColor.jpg"));

	material.map = texture;
	mesh.children[0].material = material;
	mesh.children[1].material = material;
	mesh.children[2].material = material;

	console.log(mesh.children.length)

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.9);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(2, 0.5, -1);
	//scene.add(mesh);
	this.mesh = mesh; 

	return mesh;
}; */





/* const styles = StyleSheet.create({

	graphicContainer: {
		alignItems: "stretch",
		width: "100%",
		height: "40%",
		backgroundColor: "red",
		justifyContent: "center",
		textAlign: "center",
	},

});
 */