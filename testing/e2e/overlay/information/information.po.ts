import {ElementFinder, $, browser, element, by, Key} from 'protractor';
import {OverlayComponent} from '../overlay.po';

export class InformationOverlay extends OverlayComponent {
  //#region Elements
  informationOverlay: ElementFinder = this.overlay.$('msd-branches-overlay-information');
  closeButton: ElementFinder = this.informationOverlay.$('.details').$('.close');
  //#endregion


  //#region Functions
  isDisplayed() {
    return this.informationOverlay.isDisplayed();
  }

  clickCloseButton() {
    return this.closeButton.click();
  }

  isRemoved() {
    const bool = browser.isElementPresent(this.informationOverlay);
    return bool.then((b: boolean) => {
      return !b;
    })
  }

  // keyboard controls

  selectCloseButton() {
    browser.actions().sendKeys(Key.ENTER).perform();
  }
  //#endregion

}
