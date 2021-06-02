import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import React from "react";

import { Asset } from "expo-asset";
import { TextureLoader } from "expo-three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import {
	View,
	Text,
	StyleSheet,
} from "react-native";

export default class Avatar extends React.Component {
	UNSAFE_componentWillMount() {
		THREE.suppressExpoWarnings();
	}

	render() {
		// Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
		// `onContextCreate` function once it's initialized.

		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.playerName}>Nome</Text>
				</View>

				<GraphicsView
					onContextCreate={this.onContextCreate}
					onRender={this.onRender}
					style={styles.graphicContainer}
				/>
			</View>
		);
	}

	// This is called by the `ExpoGraphics.View` once it's initialized
	onContextCreate = async ({
		gl,
		canvas,
		width,
		height,
		scale: pixelRatio,
	}) => {
		this.renderer = new ExpoTHREE.Renderer({
			gl,
			pixelRatio,
			width,
			height,
		});
		this.renderer.setClearColor(0xffffff);
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		);
		this.camera.position.z = 5;


		this.scene.add(new THREE.AmbientLight(0x404040));

		const light = new THREE.DirectionalLight(0xffffff, 0.8);
		light.position.set(3, 3, 3);
		this.scene.add(light);

		const avatarMaterial = new THREE.MeshLambertMaterial({
			color: 0x00ff00,
		});

		// ************************** //
		// Hats
		// ************************** //
		var scaleX1, scaleY1, scaleZ1;
		var rotationX1, rotationY1;
		var positionX1, positionY1, positionZ1;
		var hatFlag = true;
		console.log(this.props.hatName);

		switch (this.props.hatName) {
			case "CowboyHat":
				try {
					var hatAsset = Asset.fromModule(
						require("../../public/avatar_assets/hats/cowboyHat/cowboyHat.glb")
					);
					await hatAsset.downloadAsync();
				} catch(error) {
					console.log(error)
				}

				scaleX1 = 0.1;
				scaleY1 = 0.1;
				scaleZ1 = 0.1;
				rotationX1 = 1;
				rotationY1 = 1;
				positionX1 = 0;
				positionY1 = 0;
				positionZ1 = 0;

				break;

			case "MagicianHat":
				try {
					var hatAsset = Asset.fromModule(
						require("../../public/avatar_assets/hats/magicianHat/magicianHat.glb")
					);
					await hatAsset.downloadAsync();
				} catch(error) {
					console.log(error)
				}

				scaleX1 = 0.1;
				scaleY1 = 0.1;
				scaleZ1 = 0.1;
				rotationX1 = 1;
				rotationY1 = 1;
				positionX1 = 0;
				positionY1 = 0;
				positionZ1 = 0;

				break;

			default:
				hatFlag = false;
		}

		/* if (hatFlag) {
			const loader = new OBJLoader();

			
			console.log("loading");
			loader.load(
				hatAsset.localUri,
				function ( obj ) {
					// ADD MODEL TO THE SCENE
					console.log(obj);

					const root = obj.scene;

					console.log(root);

					
					this.scene.add(obj);

					this.renderer.render(this.scene, this.camera);
				},
				function (xhr) {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},

				(error) => {
					console.log(error);
				}
			);
		} */

		// ************************** //
		// Accessories
		// ************************** //
		console.log(this.props.accessorieName);

		var scaleX, scaleY, scaleZ;
		var rotationX, rotationY;
		var positionX, positionY, positionZ;
		var accessorieFlag = true;

		switch (this.props.accessorieName) {
			case "SunGlasses":
				try {
					var accessorieAsset = Asset.fromModule(
						require("../../public/avatar_assets/accessories/sunGlasses/scene.gltf")
					);
					await accessorieAsset.downloadAsync();
				} catch(error) {
					console.log(error)
				}

				scaleX = 1;
				scaleY = 1;
				scaleZ = 1;
				rotationX = 1;
				rotationY = 1;
				positionX = 0;
				positionY = 1.6;
				positionZ = 0;

				break;
			case "AviatorGlasses":
				try {
					var accessorieAsset = Asset.fromModule(
						require("../../public/avatar_assets/accessories/aviatorGlasses/scene.gltf")
					);
					await accessorieAsset.downloadAsync();
				} catch(error) {
					console.log(error)
				}

				scaleX = 0.005;
				scaleY = 0.006;
				scaleZ = 0.006;
				rotationX = 2 * Math.PI;
				rotationY = 0;
				positionX = 0;
				positionY = 1.6;
				positionZ = 0.5;
				break;
			case "SteamPunkGlasses":
				accessorieAsset = null;
				break;
			case "PixelGlasses":
				try { 
					accessorieAsset = Asset.fromModule(
						require("../../public/avatar_assets/accessories/pixelGlasses/scene.gltf")
					);
					await accessorieAsset.downloadAsync();
				} catch(error) {
					console.log(error)
				}

				scaleX = 0.035;
				scaleY = 0.05;
				scaleZ = 0.05;
				rotationX = Math.PI / 10;
				rotationY = Math.PI / 4;
				positionX = 0;
				positionY = 1.2;
				positionZ = 1.5;

				break;
			default:
				accessorieFlag = false;
		}

		if (accessorieFlag) {
			const loader = new GLTFLoader();

			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath("/examples/js/libs/draco/");
			loader.setDRACOLoader(dracoLoader);

			loader.load(
				accessorieAsset.uri,
				(gltf) => {
					// ADD MODEL TO THE SCENE
					const root = gltf.scene;

					root.rotateX(rotationX);
					root.rotateY(rotationY);
					root.scale.set(scaleX, scaleY, scaleZ);

					root.position.set(positionX, positionY, positionZ);
					this.scene.add(root);

					this.renderer.render(this.scene, this.camera);
				},
				function (xhr) {
					console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
				},

				(error) => {
					console.log(error);
				}
			);
		}

		/* 
		// ************************** //
		// Head
		// ************************** //
		const headGeometry = new THREE.BoxGeometry(1, 1, 1);
		const head = new THREE.Mesh(headGeometry, avatarMaterial);
		head.position.set(0, 1.5, 0);
		this.scene.add(head);

		const mouthGeometry = new THREE.BoxGeometry(0.35, 0.05, 0.1);
		const mouthMaterial = new THREE.MeshLambertMaterial({
			color: 0x000000,
		});
		const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
		mouth.position.set(0, 1.25, 0.5);
		this.scene.add(mouth);

		const eye1Geometry = new THREE.BoxGeometry(0.05, 0.05, 0.1);
		const eye1Material = new THREE.MeshLambertMaterial({ color: 0x000000 });
		const eye1 = new THREE.Mesh(eye1Geometry, eye1Material);
		eye1.position.set(-0.25, 1.6, 0.5);
		this.scene.add(eye1);

		const eye2 = new THREE.Mesh(eye1Geometry, eye1Material);
		eye2.position.set(0.25, 1.6, 0.5);
		this.scene.add(eye2);

		// ************************** //
		// Body
		// ************************** //

		var shirtAsset;

		switch (this.props.shirtName) {
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

		// This texture will be immediately ready but it'll load asynchronously
		const texture = new TextureLoader().load(shirtAsset.localUri);

		const bodyMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: texture,
		});

		const bodyGeometry = new THREE.BoxGeometry(2, 2, 1);
		const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
		this.scene.add(body);

		// ************************** //
		// Arms
		// ************************** //		const armsGeometry = new THREE.BoxGeometry(0.75, 2, 1);
		const arm1 = new THREE.Mesh(armsGeometry, avatarMaterial);
		arm1.position.set(-1.375, 0, 0);
		this.scene.add(arm1);

		const arm2 = new THREE.Mesh(armsGeometry, avatarMaterial);
		arm2.position.set(1.375, 0, 0);
		this.scene.add(arm2);

		// ************************** //
		// Legs
		// ************************** //
		const legGeometry = new THREE.BoxGeometry(0.9, 2, 1);
		const leg1 = new THREE.Mesh(legGeometry, avatarMaterial);
		leg1.position.set(-0.5, -2, 0);
		this.scene.add(leg1);

		const leg2 = new THREE.Mesh(legGeometry, avatarMaterial);
		leg2.position.set(0.5, -2, 0);
		this.scene.add(leg2);
		*/
	};

	onRender = (delta) => {
		/* this.cube.rotation.x += 3.5 * delta;
		this.cube.rotation.y += 2 * delta; */
		this.renderer.render(this.scene, this.camera);
	};
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		width: "60%",
		height: "40%",
		backgroundColor: "red",
		justifyContent: "center",
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
	},

	graphicContainer: {
		alignItems: "stretch",
		width: "100%",
		height: "40%",
		backgroundColor: "red",
		justifyContent: "center",
		textAlign: "center",
	},

	playerName: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "BubblegumSans",
		color: "white",
		padding: 10,
	},
});
