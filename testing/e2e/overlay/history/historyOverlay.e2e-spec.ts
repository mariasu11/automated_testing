import {browser, by, ExpectedConditions, element} from 'protractor';
import {BranchesComponent} from '../../branchesComponent.po';
import {PlayOverlay} from '../play/playOverlay.po';
import {HistoryOverlay} from './historyOverlay.po';
import {Controls} from '../../controls/controls.po';
import {StageSlide} from "../../stage/slide/stageSlide.po";
import {StageSlideElement} from "../../stage/slide/element/stageSlideElement.po";

describe('History Overlay', () => {
  let playOverlay: PlayOverlay;
  let historyOverlay: HistoryOverlay;
  let controls: Controls;
  let stageSlideElement: StageSlideElement;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    historyOverlay = new HistoryOverlay();
    controls = new Controls();
    stageSlideElement =  new StageSlideElement();
  }

  beforeEach(() => {
    initializePageObjects();
    historyOverlay.navigateTo();
    historyOverlay.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should display the history menu when the history button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.historyButton.click())
      .then(() => expect(historyOverlay.isDisplayed()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the history menu heading and subheading when the history button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.historyButton.click())
      .then(() => expect(historyOverlay.isCorrectHeadingAndSubHeading()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the history menu when the history menu close button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.historyButton.click())
      .then(() => historyOverlay.closeButton.click())
      .then(() => expect(historyOverlay.isRemoved()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display two menu sections when the history button is clicked while on the second slide', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.historyButton.click())
      .then(() => expect(historyOverlay.areTwoMenuSectionsDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });


  it('should add a third section to the history menu when the video is on the third slide', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(3))
      .then(() => controls.historyButton.click())
      .then(() => expect(historyOverlay.areThreeMenuSectionsDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should highlight the current slide in the history menu', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(3))
      .then(() => controls.historyButton.click())
      .then(() => expect(historyOverlay.isCurrentSlideHighlighted()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should play a slide from the beginning when its section is clicked in the history menu', (done: DoneFn) => { // this will pass only if auto play has been selected in the slide option
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.historyButton.click())
      .then(() => historyOverlay.allSections.get(0).click())
      .then(() => expect(historyOverlay.isSlidePlayedFromBeginning()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  // keyboard controls
/*
  it('should display the history menu when the history button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectHistoryButton())
      .then(() => expect(historyOverlay.isDisplayed()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the history menu when the history menu close button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectHistoryButton())
      .then(() => historyOverlay.selectCloseButton())
      .then(() => expect(historyOverlay.isRemoved()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should play a slide from the beginning when its section is clicked in the history menu (keyboard controls)', (done: DoneFn) => { // this will pass only if it has been selected in the slide option
    controls.selectPlayOverlay()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.selectHistoryButton())
      .then(() => historyOverlay.selectFirstSection())
      .then(() => expect(historyOverlay.isSlidePlayedFromBeginning()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });
*/

});
