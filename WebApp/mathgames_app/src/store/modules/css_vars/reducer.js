export default function css_vars(state = [], action){
    switch(action.type){
        case 'CHANGE_MENU':
            return [action.function];
        default:
            return [];
    }
}