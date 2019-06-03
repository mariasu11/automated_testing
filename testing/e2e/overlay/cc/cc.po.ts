import {ElementFinder, $, browser, element, by, Key} from 'protractor';
import {BranchesComponent} from '../../branchesComponent.po';

export class CCOverlay extends BranchesComponent {

  //#region Elements
  ccOverlay: ElementFinder = this.branchesComponent.$('msd-branches-overlay-cc');
  //#endregion


  //#region Functions
  isDisplayed() {
    return this.ccOverlay.isDisplayed();
  }

  returnElement() {
    return this.ccOverlay;
  }

  isRemoved() {
    const bool = browser.isElementPresent(this.ccOverlay);
    return bool.then((b: boolean) => {
      return !b;
    })
  }

  // keyboard controls

  removeCC() {
    browser.actions().sendKeys(Key.ENTER).perform();
  }
  //#endregion


}
