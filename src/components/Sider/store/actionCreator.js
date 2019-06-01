import { SHOW_DRAWER, HIDDEN_DRAWER } from "./actionType";

export const showDrawer = () =>({
    type: SHOW_DRAWER
});

export const hiddenDrawer = () => ({
    type: HIDDEN_DRAWER
});