import { ElementFinder, $, browser, element, by } from 'protractor';
import {OverlayComponent} from '../overlay.po';

export class PlayOverlay extends OverlayComponent {
  //#region Elements
  playOverlay: ElementFinder = this.overlay.$('msd-branches-overlay-play');

  //#endregion


  //#region Functions
  isPresent() {
    return this.playOverlay.isPresent();
  }

  returnElement() {
    return this.playOverlay;
  }

  getHeight() {
    return this.playOverlay.getSize().then( (overlay) => {
      return overlay.height;
    });
  }

  getWidth() {
    return this.playOverlay.getSize().then((overlay) => {
      return overlay.width;
    })
  }

  getViewportWidth() { // should this function be in this class? where else could it go?
    return browser.executeScript('return window.innerWidth');
  }

  getViewportHeight() { // should this function be in this class? where else could it go?
    return browser.executeScript('return window.innerHeight');
  }

  isCorrectHeight() {
    return this.getHeight().then((height: number) => {
      return this.getViewportHeight().then((vheight:number) => {
        return (height === vheight);
      });
    });
  }

  isCorrectWidth() {
    return this.getWidth().then((width: number) => {
      return this.getViewportWidth().then((vwidth: number) => {
        return (width === vwidth);
      });
    });
  }

  isCorrectSize() {
    return (this.isCorrectHeight() && this.isCorrectWidth())
  }


  getPlayButton() {
    return this.playOverlay.element(by.css('.bigPlay'));
  }

  isPlayButtonDisplayed() {
    return this.getPlayButton().isDisplayed();
  }

  getZindex() {
   return this.playOverlay.getCssValue('z-index');
 }

  click() {
    return this.playOverlay.click();
 }

  isRemoved() {
    return this.isPresent().then( (bool: boolean) => {
      return !bool;
    });
  }
  //#endregion

}
