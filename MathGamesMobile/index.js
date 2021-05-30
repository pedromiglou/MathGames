import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './src/App';

import {urlAPI} from "./src/data/data";
import io from "socket.io-client";
let socket = io(urlAPI);
export default socket;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
