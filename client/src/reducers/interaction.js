import { interactionConstants } from '../constants';

export function changeLeftMenu(state = {}, action) {
    const { isOpen } = state; 
    return (action.type === interactionConstants.TOGGLE_LEFT_MENU) ?
        { isOpen: !isOpen } :
        state;
}