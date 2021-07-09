import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import * as React from "react";
import {
	BoxBufferGeometry,
	Fog,
	Mesh,
	MeshStandardMaterial,
	PerspectiveCamera,
	PointLight,
	Scene,
} from "three";

import ExpoTHREE from "expo-three";

import { Asset } from "expo-asset";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import * as THREE from "three";

export default function Avatar(props) {
	let timeout;

	React.useEffect(() => {
		// Clear the animation loop when the component unmounts
		return () => clearTimeout(timeout);
	}, []);


	return (
		<GLView
			style={{ alignItems: "stretch", width: "100%", height: "100%", justifyContent: "center", textAlign: "center",}}
			onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
				const {
					drawingBufferWidth: width,
					drawingBufferHeight: height,
				} = gl;
				const sceneColor = 0x78c9ff;

				// Create a WebGLRenderer without a DOM element
				const renderer = new Renderer({ gl, alpha: true });
				renderer.setSize(width, height);
				renderer.setClearColor(0x000000, 0);

				renderer.dispose();
				renderer.forceContextLoss();

				const camera = new PerspectiveCamera(
					70,
					width / height,
					0.01,
					1000
				);


				const scene = new Scene();
				scene.fog = new Fog(sceneColor, 1, 10000);
				//scene.add(new GridHelper(10, 10));

				scene.background = null;

				//const ambientLight = new AmbientLight(0x101010);
			//	scene.add(ambientLight);

				const pointLight = new PointLight(0xffffff, 2, 1000, 0.001);
				pointLight.position.set(0, 20, 10);
				scene.add(pointLight);

				//const spotLight = new SpotLight(0xffffff, 1);
				//spotLight.position.set(0, 5, 10);
				//spotLight.lookAt(scene.position);
				//scene.add(spotLight);

				switch (props.hatName) {
					case "MagicianHat":
						const MagicianHat = await loadModelsAsync_MagicianHat();
						scene.add(MagicianHat);
						break;

					case "Ushanka":
						const UshankaHat = await loadModelsAsync_UshankaHat();
						scene.add(UshankaHat);
						break;

					case "WitchHat":
						const WitchHat = await loadModelsAsync_WitchHat();
						scene.add(WitchHat);
						break;

					case "CowboyHat":
						const CowboyHat = await loadModelsAsync_CowboyHat();
						scene.add(CowboyHat);
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
					case "PixelGlasses":
						const PixelGlasses =
							await loadModelsAsync_PixelGlasses();
						scene.add(PixelGlasses);
						break;
					
					default:
						/* const SteamPunkGlasses = await loadModelsAsync_SteamPunkGlasses();
						scene.add(SteamPunkGlasses);  */
						break;
				} 
				

				const avatarMaterial = new THREE.MeshLambertMaterial({
					color: props.skinColor,
				});


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
				var shirtFlag = false;

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
					case "GreyFabric":
						shirtAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/GreyFabric.jpg")
						);
						await shirtAsset.downloadAsync();
						break;
					default:
						shirtFlag = true;
				}

				const bodyGeometry = new THREE.BoxGeometry(2, 2, 1);
				var body = new THREE.Mesh(bodyGeometry, avatarMaterial);

				if ( !shirtFlag ) {
					// This texture will be immediately ready but it'll load asynchronously
					const texture = new TextureLoader().load(shirtAsset.uri);

					const bodyMaterial = new THREE.MeshLambertMaterial({
						color: 0xffffff,
						map: texture,
					});
					body = new THREE.Mesh(bodyGeometry, bodyMaterial);
				}
				scene.add(body);



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
				var leg1 = new THREE.Mesh(legGeometry, avatarMaterial);
				var leg2 = new THREE.Mesh(legGeometry, avatarMaterial);

				var trouserAsset;
				var trouserFlag = true;
				var coloredTrousers = false;

				switch(props.trouserName) {
					case "TrouserJeans":
						trouserAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/TrouserJeans.jpg")
						);
						await trouserAsset.downloadAsync();
						break;
					case "TrouserGrey":
						trouserAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/TrouserGrey.jpg")
						);
						await trouserAsset.downloadAsync();
						break;
					case "TrouserBlackJeans":
						trouserAsset = Asset.fromModule(
							require("../../public/avatar_assets/texture/TrouserBlackJeans.jpg")
						);
						await trouserAsset.downloadAsync();
						break;
					case "none":
						trouserFlag = false;
						break;
					default:
						coloredTrousers = true;
						trouserFlag = false;
				}


				if (trouserFlag) {
					const texture = new TextureLoader().load(trouserAsset.uri);

					const trouserMaterial = new THREE.MeshLambertMaterial({
						color: 0xffffff,
						map: texture,
					});

					leg1 = new THREE.Mesh(legGeometry, trouserMaterial);
					leg2 = new THREE.Mesh(legGeometry, trouserMaterial);
				}

				if (coloredTrousers) {
					var trouserT;
					switch(props.trouserName) {
						case "Trouser1":
							trouserT = "#34495E";
							break;
						case "Trouser2":
							trouserT = "#7B7D7D";
							break;
						case "Trouser3":
							trouserT = "#EAEDED";
							break;
						default:
							trouserT = props.trouserName;
					}

					const trouserMaterial = new THREE.MeshLambertMaterial({
						color: trouserT,
					});

					leg1 = new THREE.Mesh(legGeometry, trouserMaterial);
					leg2 = new THREE.Mesh(legGeometry, trouserMaterial);
				}

			
				leg1.position.set(-0.5, -2, 0);
				scene.add(leg1);
				
				leg2.position.set(0.5, -2, 0);
				scene.add(leg2);



				if( props.profileCam ) {
					camera.position.set(0, 1.7, 2.3);
				}
				else {
					camera.position.set(0, 2, 5);
					camera.lookAt(body.position);
				}


				// ************************** //
				// Render
				// ************************** //
				function update() { }

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


// ************************** //
// Hats
// ************************** //

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


	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 2.5);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

	mesh.rotateX(-Math.PI/2)
	mesh.position.set(0, 2.2, 0);

	return mesh;
};

const loadModelsAsync_MagicianHat = async () => {
	/// Get all the files in the mesh
	 const model = {
		"TopHat.obj": require("../../public/avatar_assets/hats/magicianHat/TopHat.obj"),
		"TopHat.mtl": require("../../public/avatar_assets/hats/magicianHat/TopHat.mtl"),
	};

	const asset = Asset.fromModule(model['TopHat.obj']);
	await asset.downloadAsync();

	const materialAsset = Asset.fromModule(model['TopHat.mtl']);
	await materialAsset.downloadAsync();

 
	const objectLoader = new OBJLoader();
	const mesh = await objectLoader.loadAsync(asset.uri);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(
		require("../../public/avatar_assets/hats/magicianHat/Texture_TopHat.bmp")
	);


	material.map = texture;
	mesh.children[0].material = material;


	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 2);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

	mesh.position.set(0, 1.9, 0);
	return mesh;
};

const loadModelsAsync_UshankaHat = async () => {
	/// Get all the files in the mesh
	const model = {
		"UshankaHat.obj": require("../../public/avatar_assets/hats/ushankaHat/51cf9fb389244132a6b5bd6b5a33cd8c.obj"), //Working
	};

	const asset = Asset.fromModule(model['UshankaHat.obj']);
	await asset.downloadAsync();

	/// Load model!
	const objectLoader = new OBJLoader();
	const mesh = await objectLoader.loadAsync(asset.uri);

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	});
	const texture = new TextureLoader().load(
		require("../../public/avatar_assets/hats/ushankaHat/textures/Plane003_[Albedo].jpg")
	);

	material.map = texture;
	mesh.children[0].material = material;

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 1.7);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

	mesh.position.set(0, 1.8, 0);

	return mesh;
};

const loadModelsAsync_WitchHat = async () => {
	/// Get all the files in the mesh
	const model = {
		"WitchHat.obj": require("../../public/avatar_assets/hats/witchHat/MagicHat_low.obj"), //Working
	};

	/// Load model!
	const asset = Asset.fromModule(model['WitchHat.obj']);
	await asset.downloadAsync();

	/// Load model!
	const objectLoader = new OBJLoader();
	const mesh = await objectLoader.loadAsync(asset.uri);

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
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 2);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });
	/// Smooth mesh
	// ExpoTHREE.utils.computeMeshNormals(mesh)

	/// Add the mesh to the scene
	//const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
	mesh.position.set(0, 1.9, 0.5);


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

	const asset = Asset.fromModule(model['AviatorGlasses.obj']);
	await asset.downloadAsync();

	const objectLoader = new OBJLoader();
	const mesh = await objectLoader.loadAsync(asset.uri);

	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 1.3);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

	mesh.position.set(0, 1.6, 1);

	return mesh;
};

const loadModelsAsync_SunGlasses = async () => {
	/// Get all the files in the mesh
	const model = {
		"SunGlasses.obj": require("../../public/avatar_assets/accessories/sunGlasses/sunGlasses.obj"),
	};

	const asset = Asset.fromModule(model['SunGlasses.obj']);
	await asset.downloadAsync();

	const objectLoader = new OBJLoader();
	const mesh = await objectLoader.loadAsync(asset.uri);

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
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 1.2);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

	mesh.position.set(0, 1.6, 1);

	return mesh;
};

const loadModelsAsync_PixelGlasses = async () => {
	/// Get all the files in the mesh
	const model = {
		"PixelGlasses.obj": require("../../public/avatar_assets/accessories/pixelGlasses/pixelGlasses.obj"),
		"PixelGlasses.mtl": require("../../public/avatar_assets/accessories/pixelGlasses/pixelGlasses.mtl"),

	};

	const asset = Asset.fromModule(model['PixelGlasses.obj']);
	await asset.downloadAsync();

	const materialAsset = Asset.fromModule(model['PixelGlasses.mtl']);
	await materialAsset.downloadAsync();

 
	const objectLoader = new OBJLoader();
	const materialLoader = new MTLLoader();

	materialLoader.setResourcePath('/assets/r2/');
	const material = await materialLoader.loadAsync(materialAsset.uri);
	material.preload();
	objectLoader.setMaterials(material);

	const mesh = await objectLoader.loadAsync(asset.uri);


	/// Update size and position
	ExpoTHREE.utils.scaleLongestSideToSize(mesh, 1);
	ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

	mesh.rotateY(Math.PI)
	mesh.position.set(0.5, 1.6, 1);

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


