import { ElementFinder, $, browser, element, by, Key } from 'protractor';
import {OverlayComponent} from './overlay.po';

export class HelpOverlay extends OverlayComponent {
  //#region Elements
  helpOverlay: ElementFinder = this.overlay.$('hotkeys-cheatsheet').$('.cfp-hotkeys-container');
  closeButton: ElementFinder = this.helpOverlay.$('.cfp-hotkeys').$('.cfp-hotkeys-close');
  //#endregion


  //#region Functions
  isDisplayed() {
    return this.helpOverlay.isDisplayed();
  }

  clickCloseButton() {
    return this.closeButton.click();
  }

  isVisible() {
    return this.helpOverlay.getCssValue('visibility').then( (value: string) => {
      return this.isDisplayed().then( (bool: boolean) => {
        return !(bool === false && value === 'hidden');
      })
    })
  }

  // keyboard controls
  selectCloseButton() {
    browser.actions().sendKeys(Key.ENTER).perform();
  }
  //#endregion

}
