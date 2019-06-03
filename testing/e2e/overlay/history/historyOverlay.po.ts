import {ElementFinder, ElementArrayFinder, $, browser, element, by, ExpectedConditions, Key} from 'protractor';
import {OverlayComponent} from '../overlay.po';
import {StageSlide} from '../../stage/slide/stageSlide.po';
import {Controls} from '../../controls/controls.po';
import {DataFactory} from '../../data-factory'


export class HistoryOverlay extends OverlayComponent {
  //#region Elements
  historyOverlay: ElementFinder = this.overlay.$('msd-branches-overlay-history').$('.historyWrapper');
  header: ElementFinder = this.historyOverlay.$('.header').$('h3');
  subHeader: ElementFinder = this.historyOverlay.$('.header').$('h4');
  closeButton: ElementFinder = this.historyOverlay.$('.close');
  allSections: ElementArrayFinder = this.historyOverlay.$('.content').$$('.section');
  dataFactory: DataFactory = new DataFactory();

  //#endregion

  //#region Functions
  isDisplayed() {
    return this.historyOverlay.isDisplayed();
  }

  getHeader() {
    return this.header.getText();
  }

  getSubHeader() {
    return this.subHeader.getText();
  }

  isCorrectHeadingAndSubHeading() {
    return this.getHeader().then((header: string) => {
      return this.getSubHeader().then( (subHeader: string) => {
        return (header === this.dataFactory.HistoryMenuHeader && subHeader === this.dataFactory.HistoryMenuSubheader);
      })
    })
  }

  isRemoved() {
    browser.wait(ExpectedConditions.invisibilityOf(this.historyOverlay), 2000);
    return browser.isElementPresent(this.historyOverlay).then( (bool: boolean) => {
      return !bool;
    })
  }

  getHistoryMenuFirstSectionTitle() {
    return this.allSections.then( (sections) => {
      return sections[0].element(by.tagName('div')).getText();
    });
  }

  getHistoryMenuSecondSectionTitle() {
    return this.allSections.then( (sections) => {
      return sections[1].element(by.tagName('div')).getText();
    });
  }

  getHistoryMenuThirdSectionTitle() {
    return this.allSections.then((sections) => {
      return sections[2].element(by.tagName('div')).getText();
    });
  }

  areTwoMenuSectionsDisplayed() {
    const firstSectionTitle = this.getHistoryMenuFirstSectionTitle();
    const secondSectionTitle = this.getHistoryMenuSecondSectionTitle();
    return this.allSections.count().then( (number: number) => {
      return firstSectionTitle.then( (ftitle: string) => {
        return secondSectionTitle.then( (stitle: string) => {
          return (number === 2 && ftitle !== stitle);
        })
      })
    })
  }

  areThreeMenuSectionsDisplayed() {
    const secondSectionTitle = this.getHistoryMenuSecondSectionTitle();
    const thirdSectionTitle = this.getHistoryMenuThirdSectionTitle();
    return this.allSections.count().then( (number: number) => {
      return secondSectionTitle.then( (stitle: string) => {
        return thirdSectionTitle.then( (ttitle: string) => {
          return (number === 3 && ttitle !== stitle);
        })
      })
    })
  }

  isCurrentSlideHighlighted() {
    return this.allSections.get(2).getAttribute('class').then( (sclass: any) => {
      return sclass.includes('selected');
    })
  }

  isSlidePlayedFromBeginning() {
    const controls: Controls = new Controls();
    const data: any = require('../../../../src/assets/demo/linear/WordsWithSilentLetters-createjs/data.json');
    const sceneTitle = controls.getSceneTitle();
    const scrubberWidth = controls.getScrubberWidth();
    return sceneTitle.then( (title: string) => {
      return scrubberWidth.then( (width: number) => {
        return (title === data.slides.scene001.title && width < 30);
      })
    })
  }

  // keyboard controls
  selectCloseButton() {
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  selectFirstSection() {
    const controls: Controls = new Controls();
    controls.selectTabKey(1);
    browser.actions().sendKeys(Key.ENTER).perform();

  }
  //#endregion

}
