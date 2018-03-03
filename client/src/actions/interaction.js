import { interactionConstants } from '../constants';

function toggleLeftMenu() {
    return { type: interactionConstants.TOGGLE_LEFT_MENU };
}

export const interactionActions = {
    toggleLeftMenu
};

