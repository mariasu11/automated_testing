import {
  ElementFinder,
  ElementArrayFinder,
  $,
  $$,
  browser,
  element,
  by,
  ExpectedConditions,
  Key,
  promise
} from 'protractor';
import {BranchesComponent} from '../branchesComponent.po';
import {PlayOverlay} from '../overlay/play/playOverlay.po';
import {StageSlideElement} from '../stage/slide/element/stageSlideElement.po';
import {DataFactory} from '../data-factory';
import {ReplayOverlay} from '../overlay/replay/replay.po';

export class Controls extends BranchesComponent {

  //#region Elements
  stageSlideElement: StageSlideElement = new StageSlideElement();
  dataFactory: DataFactory = new DataFactory();
  replayOverlay: ReplayOverlay = new ReplayOverlay();

  controls: ElementFinder = this.branchesComponent.$('msd-branches-controls');
  previousButton: ElementFinder = this.controls.$('.previous');
  nextButton: ElementFinder = this.controls.$('.next');
  historyButton: ElementFinder = this.controls.$('.history');
  scrubber: ElementFinder = this.historyButton.$('.sprogress').$('.scrubber');
  playButton: ElementFinder = this.controls.$('.play');
  sceneTitle: ElementFinder = this.historyButton.element(by.tagName('span'));
  volumeButton: ElementFinder = this.controls.$('.volume');
  volumePopUp: ElementFinder = this.volumeButton.$('.popup');
  ccButton: ElementFinder = this.controls.$('.cc');
  optionsButton: ElementFinder = this.controls.$('.options');
  optionsPopUp: ElementFinder = this.optionsButton.$('.popup');
  fullscreenButton: ElementFinder = this.controls.$('.fullscreen');
  //#endregion

  //#region Functions
  getZindex() {
    return this.controls.getCssValue('z-index');
  }

  getClass(button) {
    return button.getAttribute('class');
  }

  isPreviousButtonDisabled() {
    return this.getClass(this.previousButton).then( (pclass) => {
      return pclass.includes('cb-btn-disable');
    })
  }

  isNextButtonDisabled() {
    return this.getClass(this.nextButton).then( (nclass) => {
      return nclass.includes('cb-btn-disable');
    })
  }

  getScrubberWidth() {
    return this.scrubber.getSize().then((scrubber) => {
      return scrubber.width;
    });
  }

  getContentPropertyWhenPlayed() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-play"), ":before").getPropertyValue("content")'
    );
  }
  getContentPropertyWhenPaused() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-pause"), ":before").getPropertyValue("content")'
    );
  }

  isPlaying() {
    const initialScrubberWidth = this.getScrubberWidth();
    browser.sleep(1000);
    /*if (this.stageSlideElement.hotspot.isDisplayed()) { // if there is a hotspot
      this.stageSlideElement.hotspot.click();
    }*/
    const finalScrubberWidth = this.getScrubberWidth();
    const contentProperty = this.getContentPropertyWhenPlayed();
    const playButtonClass = this.getClass(this.playButton);

    return finalScrubberWidth.then( (fwidth: number) => {
      return initialScrubberWidth.then( (iwidth: number) => {
        return contentProperty.then( (prop) => {
          return playButtonClass.then( (pclass) => {
            return (pclass.includes('cb-btn-play') && iwidth !== fwidth && fwidth > 0 && prop === '"9"')
          });
        });
      });
    });
  }

  isPaused() {
    const initialScrubberWidth = this.getScrubberWidth();
    browser.sleep(2000);
    const finalScrubberWidth = this.getScrubberWidth();
    const contentProperty = this.getContentPropertyWhenPaused();
    const playButtonClass = this.getClass(this.playButton);


    return finalScrubberWidth.then( (fwidth: number) => {
      return initialScrubberWidth.then( (iwidth: number) => {
        return contentProperty.then( (prop) => {
          return playButtonClass.then( (pclass) => {
            return (pclass.includes('cb-btn-pause') && iwidth === fwidth && prop === '"0"' );
          });
        });
      });
    });
  }

  getSceneTitle() {
    return this.sceneTitle.getText();
  }


  moveMouseToVolumeButton() {
    browser.actions().mouseMove(this.volumeButton).perform();
  }

  moveMouseToHistoryButton() {
    browser.actions().mouseMove(this.historyButton).perform();
  }

  isVolumePopUpDisplayed() {
    return this.volumePopUp.isDisplayed();
  }

  getVolumePopUpBg() {
    return this.volumePopUp.element(by.css('.bg'));
  }

  includesVolumePopUpBGImage() {
    return this.getVolumePopUpBg().getCssValue('background').then( (background: any) => {
      return background.includes('.svg');
    });
  }

  volumePopUpProgressBar() {
    return this.getVolumePopUpBg().element(by.css('.progressbar'));
  }

  includesVolumePopUpProgressBarImage() {
    return this.volumePopUpProgressBar().getCssValue('background').then( (background: any) => {
      return background.includes('.svg');
    });
  }

  isVolumePopUpPresent() {
    return browser.isElementPresent(this.volumePopUp);
  }

  getContentPropertyWhenUnmuted() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-unmuted"), ":before").getPropertyValue("content")' // will this work? OR below?
    );
  }

  isCorrectContentPropertyWheUnmuted() {
    const contentProp = this.getContentPropertyWhenUnmuted();
    return contentProp.then( (prop: string) => {
      return prop === '"T"';
    })
  }

  isNotMuted() {
    return this.getClass(this.volumeButton).then( (vclass) => {
      return (vclass.includes('cb-btn-unmuted') && this.isCorrectContentPropertyWheUnmuted());
    })
  }

  getContentPropertyWhenMuted() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-muted"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  isCorrectContentPropertyWhenMuted() {
    const contentProp = this.getContentPropertyWhenMuted();
    return contentProp.then( (prop: string) => {
      return prop === '"Y"';
    })
  }

  isMuted() {
    return this.getClass(this.volumeButton).then( (vclass) => {
      return (vclass.includes('cb-btn-muted') && this.isCorrectContentPropertyWhenMuted());
    })
  }

  clickVolumeButton(number) {
     for (let i = 0; i < number; i++) {
      this.volumeButton.click();
    }
  }

  clickCCButton(number) {
    for (let i = 0; i < number; i++) {
      this.ccButton.click();
    }
  }

  getVolumePopUpScrubber() {
    const volumePopUpImage = this.getVolumePopUpBg();
    return volumePopUpImage.element(by.css('.scrubber'));
  }

  hasVolumeScrubberMoved() {
    return this.getVolumePopUpScrubber().getCssValue('bottom').then( (value: string) => {
      return !(value === '125px');
    })
  }

  moveVolumeScrubber() {
    browser.actions().mouseMove(this.volumePopUpProgressBar()).click().perform();
  }

  moveMouseToOptionsButton() {
    browser.actions().mouseMove(this.optionsButton).perform();
  }

  isOptionsPopUpDisplayed() {
    return this.optionsPopUp.isDisplayed();
  }

  getAllOptions() {
    return this.optionsPopUp.all(by.tagName('li'));
  }

  getInformationOption() {
    return this.optionsPopUp.element(by.css('li.information')).element(by.tagName('span'));
  }

  clickInformationOption() {
    return this.getInformationOption().click();
  }

  getTranscriptOption() {
    return this.optionsPopUp.element(by.css('li.transcript')).element(by.tagName('span'));
  }

  clickTranscriptOption() {
    return this.getTranscriptOption().click();
  }

  getHelpOption() {
    return this.optionsPopUp.element(by.css('li.help')).element(by.tagName('span'));
  }

  clickHelpOption() {
    return this.getHelpOption().click();
  }

  areAllOptionsDisplayed() {
    const allOptions = this.getAllOptions();
    const informationOption = this.getInformationOption();
    const transcriptOption = this.getTranscriptOption();
    const helpOption = this.getHelpOption();
    return allOptions.count().then( (number: number) => {
      return informationOption.getText().then( (iText: string) => {
        return transcriptOption.getText().then( (tText: string) => {
          return helpOption.getText().then( (hText: string) => {
            return (number === 3 && iText === this.dataFactory.InformationOptionText && tText === this.dataFactory.TranscriptOptionText && hText === this.dataFactory.HelpOptionText);
          })
        })
      })
    })
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

  getContentPropertyForHelpOption() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".help"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  isCorrectContentPropertyForEachOption() {
   const informationContentProp = this.getContentPropertyForInformationOption();
   const transcriptContentProp = this.getContentPropertyForTranscriptOption();
   const helpContentProp = this.getContentPropertyForHelpOption();

   return informationContentProp.then( (iProp: string) => {
     return transcriptContentProp.then( (tProp: string) => {
       return helpContentProp.then( (hProp: string) => {
         return (iProp === '"A"' && tProp === '"I"' && hProp === '"3"');
       })
     })
   })
  }

  transcriptURL() {
    return this.clickTranscriptOption().then( () => {
      return browser.getAllWindowHandles().then( (handles) => {
        const transcriptWindow = handles[1];
        return browser.switchTo().window(transcriptWindow).then( () => {
          return browser.getCurrentUrl().then( (currentUrl) => {
            return currentUrl; // includes doesnt work here? property 'includes' does not exist on type 'string'.
          });
        });
      });
    });
  }

  transcriptURLUsingKeyboard() {
    return this.clickTranscriptOption().then( () => {
      return browser.getAllWindowHandles().then( (handles) => {
        const transcriptWindow = handles[2];
        return browser.switchTo().window(transcriptWindow).then( () => {
          return browser.getCurrentUrl().then( (currentUrl) => {
            return currentUrl; // includes doesnt work here? property 'includes' does not exist on type 'string'.
          });
        });
      });
    });
  }

  getContentPropertyWhenNotFullscreen() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-fullscreen-open"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  getContentPropertyWhenFullscreen() {
    return browser.executeScript(
      'return window.getComputedStyle(document.querySelector(".cb-btn-fullscreen-close"), ":before").getPropertyValue("content")' // will this work?
    );
  }

  isNotinFullscreenMode() {
    const contentProp = this.getContentPropertyWhenNotFullscreen();
    return this.getClass(this.fullscreenButton).then( (fclass) => {
      return contentProp.then( (cprop) => {
        return (cprop === '"W"' && fclass.includes('cb-btn-fullscreen-open'));
      })
    })
  }

  getViewportWidth() {
    return browser.executeScript('return window.innerWidth'); // should this be here or somewhere else?
  }

  getViewportHeight() {
    return browser.executeScript('return window.innerHeight'); // should this be here or somewhere else?
  }

  getHeight() {
    return this.getViewportHeight();
  }

  isInFullScreenModeOld() {
    const initialHeight = this.getViewportHeight();
    const playOverlay = new PlayOverlay();
    playOverlay.click();
    this.fullscreenButton.click();
    const fullscreenHeight = this.getViewportHeight();
    const contentProp = this.getContentPropertyWhenFullscreen();

    return initialHeight.then( (iheight: number) => {
      return fullscreenHeight.then( (fheight: number) => {
        return contentProp.then( (prop) => {
          return this.getClass(this.fullscreenButton).then( (fclass) => {
            return (iheight !== fheight && prop === '"E"' && fclass.includes('cb-btn-fullscreen-close'));
          })
        })
      })
    })
  }

  isInFullScreenMode() {
    const contentProp = this.getContentPropertyWhenFullscreen();
    return contentProp.then( (prop) => {
      return this.getClass(this.fullscreenButton).then( (fclass) => {
        return (prop === '"E"' && fclass.includes('cb-btn-fullscreen-close'));
      })
    })
  }

  isPreviousButtonClickable() {
    return this.getClass(this.previousButton).then( (pclass) => {
      return pclass.includes('cb-btn-hover');
    })
  }

  isHotspotVisible() {
    return $('.hotspot').getCssValue('visibility').then((value) => { if (value === 'visible') {return true}})
  }

  isContinueButtonVisible() {
    return $('.continue').getCssValue('visibility').then((value) => { if (value === 'visible') {return true}})
  }


  waitForSceneTitleToChange() {
    let sceneTitle;
    const self = this;

    return browser.wait( function () {
      return self.getSceneTitle().then( (finalSceneTitle) => {
        if (sceneTitle !== finalSceneTitle) {
          sceneTitle = finalSceneTitle;
        }


        $('.hotspot').getCssValue('visibility').then((value) => {
          if (value === 'visible') {
            browser.executeScript('return arguments[0].click()', $('.hotspot'));
            return false;
          }
        }, function() {
          return false;
        });

        $('.continue').getCssValue('visibility').then((value) => {
          if (value === 'visible') {
            browser.executeScript('return arguments[0].click()', $('.continue'));
            return false;

          }
        }, function() {
          return false;
        });

        $('msd-branches-stage-slide-element-cewidget').getCssValue('visibility').then((value) => {
          if (value === 'visible') {
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.widgetChoices.get(0));
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.checkAnswerButton);
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.tryAgainButton);
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.widgetChoices.get(0));
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.checkAnswerButton);
            return false;
          }
        });

        return self.replayOverlay.isDisplayed().then(() => {
          return true;
        }).catch(() => {
          return false;
        });
      })
    })
  }

  waitForSceneTitleToChangeToSceneX(sceneNumber) {
    let sceneTitle;
    let counter = 0;
    const self = this;

    return browser.wait( function () {
      return self.getSceneTitle().then( (finalSceneTitle) => {
        if (sceneTitle !== finalSceneTitle) {
          sceneTitle = finalSceneTitle;
          counter++;
          console.log(counter);
        }

        $('.hotspot').getCssValue('visibility').then((value) => {
          if (value === 'visible') {
            browser.executeScript('return arguments[0].click()', $('.hotspot'));
            return false;
          }
        }, function() {
          return false;
        });

        $('.continue').getCssValue('visibility').then((value) => {
          if (value === 'visible') {
            browser.executeScript('return arguments[0].click()', $('.continue'));
            return false;

          }
        }, function() {
          return false;
        });

        $('msd-branches-stage-slide-element-cewidget').getCssValue('visibility').then((value) => {
          if (value === 'visible') {
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.widgetChoices.get(0));
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.checkAnswerButton);
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.tryAgainButton);
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.widgetChoices.get(0));
            browser.executeScript('return arguments[0].click()', self.stageSlideElement.checkAnswerButton);
            return false;
          }
        });

        if (counter === sceneNumber) {
          return true;
        } else {
          return self.replayOverlay.isDisplayed().then(() => {
            return true;
          }).catch(() => {
            return false;
          });
        }
      })
    })
  }

  // keyboard controls

  selectTabKey(number) {
    for (let i = 0; i < number; i++) {
      browser.actions().sendKeys(Key.TAB).perform();
    }
  }

  selectPlayOverlay() {
    return browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectHelpOption() {
    this.playButton.click(); // pause and then tab to button.
    this.selectTabKey(5);
    browser.actions().sendKeys(Key.ENTER).perform();
    this.selectTabKey(3);
    browser.actions().sendKeys(Key.ENTER).perform();

  }

  selectInformationOption() {
    this.playButton.click(); // pause and then tab to button.
    this.selectTabKey(5);
    browser.actions().sendKeys(Key.ENTER).perform();
    this.selectTabKey(1);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectCCButton() {
    this.selectTabKey(7);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectHistoryButton() {
    this.playButton.click(); // pause and then tab to button.
    this.selectTabKey(2);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectPauseButton() {
    this.selectTabKey(3);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectMuteButton() {
    this.selectTabKey(6);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectMuteButtonTwice() {
    this.selectTabKey(6);
    browser.actions().sendKeys(Key.ENTER).perform();
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectOptionsButton() {
    this.selectTabKey(8);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectTranscriptButton() {
    this.selectTabKey(8);
    browser.actions().sendKeys(Key.ENTER).perform();
    this.selectTabKey(2);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectFullScreenButton() {
    this.selectTabKey(9);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectPreviousButton() {
    this.selectTabKey(3);
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectNextButton() {
    this.selectTabKey(2);
    browser.actions().sendKeys(Key.ENTER).perform();
  }
  //#endregion


}
