import {ElementFinder, $, browser, element, by, Key} from 'protractor';
import {OverlayComponent} from '../overlay.po';

export class ReplayOverlay extends OverlayComponent {
  //#region Elements
  replayOverlay: ElementFinder = this.overlay.$('msd-branches-overlay-replay');
  replayButton: ElementFinder = this.replayOverlay.$('.bigReplay');
  //#endregion


  //#region Functions
  isDisplayed() {
    return this.replayOverlay.isDisplayed();
  }


  returnElement() {
    return this.replayOverlay;
  }

  // keyboard controls


  //#endregion

}
