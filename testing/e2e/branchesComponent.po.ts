import { ElementFinder, $, browser, element, by, ExpectedConditions } from 'protractor';

export class BranchesComponent {
  //#region Elements
  branchesComponent: ElementFinder = $('msd-branches');
  //#endregion

  //#region Functions

  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('https://nest-staging.eastus2.cloudapp.azure.com/tool/view/5be4c1b6993d4d628d1886df');
  }

  login() {
    $('input[name = "username"]').sendKeys('asfa.lohani@pearson.com');
    $('input[name = "password"]').sendKeys('Nestnest123');
    return $('button[type = "submit"]').click();
  }

  removeAlert() {
    const alert = $('.alert');
    browser.wait(ExpectedConditions.visibilityOf(alert), 5000);
    return alert.click();
  }

  isDisplayed() {
    return this.branchesComponent.isDisplayed();
  }

  returnElement() {
    return this.branchesComponent;
  }
  //#endregion

}
