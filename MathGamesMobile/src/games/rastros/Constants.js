import { Dimensions } from 'react-native';

export default Constants = {
    MAX_WIDTH: Dimensions.get("window").width,
    MAX_HEIGHT: Dimensions.get("window").height,
    GRID_SIZE: 7,
    CELL_SIZE: Dimensions.get("window").width/8
}