import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import React, { useState } from "react";
import { Expo } from "expo";

import { Asset } from "expo-asset";
import { TextureLoader } from "expo-three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import OrbitControlsView from "expo-three-orbit-controls";

import {
	View,
	ScrollView,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	TouchableHighlight,
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
		/* const geometry = new THREE.BoxGeometry(1, 1, 1);

		const material = new THREE.MeshPhongMaterial({
			color: 0xff0000,
		});

		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube); */



		this.scene.add(new THREE.AmbientLight(0x404040));

		const light = new THREE.DirectionalLight(0xffffff, 0.8);
		light.position.set(3, 3, 3);
		this.scene.add(light);

		const avatarMaterial = new THREE.MeshLambertMaterial({
			color: 0x00ff00,
		});


		// ************************** //
		// Accessories
		// ************************** //
		console.log(this.props.accessorieName);

		var scaleX, scaleY, scaleZ;
		var rotationX, rotationY;
		var positionX, positionY, positionZ;

		switch (this.props.accessorieName) {
			case "SunGlasses":
				var accessorieAsset = Asset.fromModule(
					require("../../public/avatar_assets/accessories/aviatorGlasses/scene.gltf")
				);
				await accessorieAsset.downloadAsync();

				scaleX = 0.005;
				scaleY = 0.006;
				scaleZ = 0.006;
				rotationX = 2 * Math.PI;
				rotationY = 0;
				positionX = 0;
				positionY = 1.6;
				positionZ = 0.5;

				break;
			case "AviatorGlasses":
				accessorieAsset = null;
				break;
			case "SteamPunkGlasses":
				accessorieAsset = null;
				break;
			case "PixelGlasses":
				accessorieAsset = Asset.fromModule(
					require("../../public/avatar_assets/accessories/pixelGlasses/scene.gltf")
				);
				await accessorieAsset.downloadAsync();

				scaleX = 0.035;
				scaleY = 0.05;
				scaleZ = 0.05;
				rotationX = 0;
				rotationY = Math.PI / 4;
				positionX = 0.4;
				positionY = 1.4;
				positionZ = 1.5;

				break;
			default:
				var accessorieAsset = Asset.fromModule(
					require("../../public/avatar_assets/accessories/aviatorGlasses/scene.gltf")
				);
				await accessorieAsset.downloadAsync();
		}
		console.log("4");

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
			undefined,

			(error) => {
				console.log(error);
			}
		);
		console.log("5");

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

		/* Arms */
		const armsGeometry = new THREE.BoxGeometry(0.75, 2, 1);
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
