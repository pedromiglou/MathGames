import {urlAPI} from "./../data/data";
import io from "socket.io-client";
let socket = io(urlAPI);
export default socket;