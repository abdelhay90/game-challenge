import * as Constants from '../Constants';
import {createNodeElement} from './Utils';

export class Overlay {
    constructor() {
        this.overlayOn = false;
        this.createOverlay();
        this.createOverlayText()
    }

    /**
     * create overlay DOM element
     */
    createOverlay() {
        this.overlay = createNodeElement('div', {
            id: "overlay",
        }, document.body);
    }

    /**
     * create overlay text DOM element
     */
    createOverlayText() {
        this.overlayText = createNodeElement('div', {
            id: "overlayText",
        }, this.overlay);
    }

    /**
     * toggle overlay on/off
     */
    toggleOverlay(flag) {
        this.overlayOn = typeof flag !== 'undefined' ? flag : !this.overlayOn;
        this.overlay.style.display = this.overlayOn ? "block" : "none";
    }

    setText(text){
        this.overlayText.innerHTML = text;
    }
}
