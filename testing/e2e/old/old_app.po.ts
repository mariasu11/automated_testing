import { browser, element, by } from 'protractor';

export class BranchesPage {
  msdBranches = element(by.tagName('msd-branches'));
  overlay = this.msdBranches.element(by.tagName('msd-branches-overlay'));
  // playOverlay = this.overlay.element(by.tagName('msd-branches-overlay-play'));
  // overlayPlayButtonPresent = this.playOverlay.isElementPresent(by.css('.bigPlay'));
  // overlayPlayButton = this.playOverlay.element(by.css('.bigPlay'));
  controls = element(by.tagName('msd-branches-controls'));
  previousButton = this.controls.element(by.css('div.previous'));
  playButton = this.controls.element(by.css('div.play'));
  nextButton = this.controls.element(by.css('div.next'));
  historyButton = this.controls.element(by.css('div.history'));
  sceneTitle = this.historyButton.element(by.tagName('span'));
  scrubber = this.historyButton.element(by.css('.sprogress')).element(by.css('.scrubber'));
  volumeButton = this.controls.element(by.css('div.volume'));
  ccButton = this.controls.element(by.css('div.cc'));
  optionsButton = this.controls.element(by.css('div.options'));
  fullscreenButton = this.controls.element(by.css('div.fullscreen'));
  historyMenu = this.overlay.element(by.tagName('msd-branches-overlay-history'))
    .element(by.css('div.historyWrapper'));
  historyMenuHeader = this.historyMenu.element(by.css('div.header')).element(by.css('h3'));
  historyMenuSubheading = this.historyMenu.element(by.css('div.header')).element(by.css('h4'));
  historyMenuCloseButton = this.historyMenu.element(by.css('div.close'));
  volumePopUp = this.volumeButton.element(by.css('div.popup'));
  ccOverlay = element(by.tagName('msd-branches-overlay-cc'));


  // browser

  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get('/');
  }

  getViewportWidth() {
    return browser.executeScript('return window.innerWidth');
  }

  getViewportHeight() {
    return browser.executeScript('return window.innerHeight')
  }

  moveMouseToVolumeButton() {
    browser.actions().mouseMove(this.volumeButton).perform();
  }

  moveVolumeScrubber() {
    browser.actions().mouseMove(this.getVolumePopUpProgressBar()).click().perform();
  }

  moveMouseToHistoryButton() {
    browser.actions().mouseMove(this.historyButton).perform();
  }

  moveMouseToOptionsButton() {
    browser.actions().mouseMove(this.optionsButton).perform();
  }

  getContentPropertyWhenUnmuted() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-unmuted"), ":before").getPropertyValue("content")' // will this work? OR below?
    );
  }

  /* getContentPropertyWhenUnmuted() {
    return this.volumeButton.getCssValue('content');
  } */

  getContentPropertyWhenMuted() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-muted"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyWhenFullscreen() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-fullscreen-close"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyWhenNotFullscreen() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-fullscreen-open"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyWhenPlayed() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-play"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyWhenPaused() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-pause"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyForInformationOption() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".information"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyForTranscriptOption() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".transcript"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyForDyslexicOption() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".dyslexic"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyForImageCreditsOption() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".image-credits"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyForHelpOption() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".help"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  // controls

  getControlsZindex() {
    return this.controls.getCssValue('z-index');
  }

  clickPreviousButton() {
    return this.previousButton.click();
  }

  clickPlayButton() {
    return this.playButton.click();
  }

  clickNextButton() {
    return this.nextButton.click();
  }

  clickHistoryButton() {
    return this.historyButton.click();
  }

  clickVolumeButton() {
    return this.volumeButton.click();
  }

  clickCCButton() {
    return this.ccButton.click();
  }

  clickOptionsButton() {
    return this.optionsButton.click();
  }

  clickFullscreenButton() {
    return this.fullscreenButton.click();
  }

  getScrubberWidth() {
    return this.scrubber.getSize().then((scrubber) => {
      return scrubber.width;
    });
  }

  getVolumePopUp() {
    return this.volumeButton.element(by.css('div.popup'));
  }

  getVolumePopUpBg() {
    const volumePopUp = this.getVolumePopUp();
    return volumePopUp.element(by.css('.bg'));
  }

  getVolumePopUpProgressBar() {
    const volumePopUpImage = this.getVolumePopUpBg();
    return volumePopUpImage.element(by.css('.progressbar'));
  }

  getVolumePopUpScrubber() {
    const volumePopUpImage = this.getVolumePopUpBg();
    return volumePopUpImage.element(by.css('.scrubber'));
  }

  getOptionsPopUp() {
    return this.optionsButton.element(by.css('div.popup'));
  }

  getAllOptions() {
    return element.all(by.tagName('msd-branches-controls')).all(by.css('div.options')).all(by.css('div.popup')).all(by.tagName('li'));
  }

  getFirstOption() {
    const optionsPopUp = this.getOptionsPopUp();
    return optionsPopUp.element(by.css('li.information')).element(by.tagName('span'));
  }

  getFirstOptionText() {
    const firstOption = this.getFirstOption();
    return firstOption.getText();
  }

  clickFirstOption() {
    const firstOption = this.getFirstOption();
    return firstOption.click();
  }

  getSecondOption() {
    const optionsPopUp = this.getOptionsPopUp();
    return optionsPopUp.element(by.css('li.transcript')).element(by.tagName('span'));
  }

  getSecondOptionText() {
    const secondOption = this.getSecondOption();
    return secondOption.getText();
  }

  clickSecondOption() {
    const secondOption = this.getSecondOption();
    return secondOption.click();
  }

  getThirdOption() {
    const optionsPopUp = this.getOptionsPopUp();
    return optionsPopUp.element(by.css('li.help')).element(by.tagName('span'));
  }

  getThirdOptionText() {
    const thirdOption = this.getThirdOption();
    return thirdOption.getText();
  }

  clickThirdOption() {
    const thirdOption = this.getThirdOption();
    return thirdOption.click();
  }

  /*getFourthOption() {
    const optionsPopUp = this.getOptionsPopUp();
    return optionsPopUp.element(by.css('li.image-credits')).element(by.tagName('span'));
  }

  getFourthOptionText() {
    const fourthOption = this.getFourthOption();
    return fourthOption.getText();
  }

  clickFourthOption() {
    const fourthOption = this.getFourthOption();
    return fourthOption.click();
  }

  getFifthOption() {
    const optionsPopUp = this.getOptionsPopUp();
    return optionsPopUp.element(by.css('li.help')).element(by.tagName('span'));
  }

  getFifthOptionText() {
    const fifthOption = this.getFifthOption();
    return fifthOption.getText();
  }

  clickFifthOption() {
    const fifthOption = this.getFifthOption();
    return fifthOption.click();
  }*/

  getSceneTitleText() {
    const sceneTitle = element(by.tagName('msd-branches-controls')).element(by.css('.history')).element(by.tagName('span'));
    return sceneTitle.getText();
  }

  // play overlay

  /*getPlayOverlayHeight() {
    return this.playOverlay.getSize().then( (overlay) => {
      return overlay.height;
    })
  }*/

  /*getPlayOverlayWidth() {
    return this.playOverlay.getSize().then( (overlay) => {
      return overlay.width;
    })
  }*/

  /*getPlayOverlayZindex() {
    return this.playOverlay.getCssValue('z-index');
  }*/

  // history overlay

  getHistoryMenu() {
    return element(by.tagName('msd-branches-overlay')).element(by.tagName('msd-branches-overlay-history'))
      .element(by.css('div.historyWrapper'));
  }

  getHistoryMenuItems() {
    return element(by.css('msd-branches-overlay > msd-branches-overlay-history > div.historyWrapper > div.content')).all(by.css('div.section'));
  }

  getHistoryMenuFirstSectionTitle() {
    return this.getHistoryMenuItems().then( (sections) => {
      return sections[0].element(by.tagName('div')).getText();
    });
  }

  getHistoryMenuSecondSectionTitle() {
    return this.getHistoryMenuItems().then( (sections) => {
      return sections[1].element(by.tagName('div')).getText();
    });
  }

  getHistoryMenuThirdSectionTitle() {
    return this.getHistoryMenuItems().then( (sections) => {
      return sections[2].element(by.tagName('div')).getText();
    });
  }

  /*getHistoryMenuHeader() {
    const historyMenu = this.getHistoryMenu();
    return historyMenu.element(by.css('div.header')).element(by.css('h3'));
  }*/

  getHistoryMenuHeaderText() { // moved code inside function
    const historyMenu = this.getHistoryMenu();
    const historyMenuHeader = historyMenu.element(by.css('div.header')).element(by.css('h3'));
    return historyMenuHeader.getText();
  }

  /*getHistoryMenuSubHeader() {
    const historyMenu = this.getHistoryMenu();
    return historyMenu.element(by.css('div.header')).element(by.css('h4'));
  }*/

  getHistoryMenuSubHeaderText() { // moved code inside function
    const historyMenu = this.getHistoryMenu();
    const historyMenuSubHeader = historyMenu.element(by.css('div.header')).element(by.css('h4'));
    return historyMenuSubHeader.getText();
  }

  /*getHistoryMenuCloseButton() {
    const historyMenu = this.getHistoryMenu();
    return historyMenu.element(by.css('div.close'));
  }*/

  clickHistoryMenuCloseButton() { // moved code inside function
    const historyMenu = this.getHistoryMenu();
    const historyMenuCloseButton = historyMenu.element(by.css('div.close'));
    return historyMenuCloseButton.click();
  }

  // cc overlay

  getCCOverlay() {
    return element(by.tagName('msd-branches-overlay-cc'));
  }

  // Information overlay

  getInformationOverlay() {
    return this.overlay.element(by.tagName('msd-branches-overlay-information'));
  }

  /*getInformationOverlayCloseButton() {
    const informationOverlay = this.getInformationOverlay();
    return informationOverlay.element(by.css('.details')).element(by.css('.close'));
  }*/

  clickInformationOverlayCloseButton() { // moved code inside of function
    const informationOverlay = this.getInformationOverlay();
    const informationOverlayCloseButton = informationOverlay.element(by.css('.details')).element(by.css('.close'));
    return informationOverlayCloseButton.click();
  }

  // image credits overlay

  getImageCreditsOverlay() {
    return this.overlay.element(by.tagName('msd-branches-overlay-image-credits'));
  }

  // help overlay

  getHelpOverlay() {
    return this.overlay.element(by.tagName('hotkeys-cheatsheet')).element(by.css('.cfp-hotkeys-container'));
  }

  /*getHelpOverlayCloseButton() {
    const helpOverlay = this.getHelpOverlay();
    return helpOverlay.element(by.css('div.cfp-hotkeys')).element(by.css('cfp-hotkeys-close'));
  }*/

  clickHelpOverlayCloseButton() { // moved code inside function
    const helpOverlay = this.getHelpOverlay();
    const helpOverlayCloseButton = helpOverlay.element(by.css('div.cfp-hotkeys')).element(by.css('.cfp-hotkeys-close'));
    return helpOverlayCloseButton.click();
  }

  // slides

  getSlide005() {
    return element(by.id('abc'));
  }

  getSlide005Canvas() {
    const slide005 = this.getSlide005();
    return slide005.element(by.tagName('msd-branches-stage-slide-element-cjsanimation')).element(by.tagName('canvas'));
  }

  getSlide010() {
    return element(by.id('scene010'));
  }

  getSlide010Canvas() {
    const slide010 = this.getSlide010();
    return slide010.element(by.tagName('msd-branches-stage-slide-element-cjsanimation')).element(by.tagName('canvas'));
  }
}
