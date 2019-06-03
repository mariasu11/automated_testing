import {browser, by, ExpectedConditions, element} from 'protractor';
import {BranchesComponent} from '../../branchesComponent.po';
import {PlayOverlay} from '../play/playOverlay.po';
import {Controls} from '../../controls/controls.po';
import {ReplayOverlay} from './replay.po';
import {DataFactory} from '../../data-factory';

describe('Replay Overlay', () => {
  let replayOverlay: ReplayOverlay;
  let controls: Controls;
  let playOverlay: PlayOverlay;
  let dataFactory: DataFactory;
  const data: any = require('../../../../src/assets/demo/linear/WordsWithSilentLetters-createjs/data.json');


  function initializePageObjects(): void {
    replayOverlay = new ReplayOverlay();
    controls = new Controls();
    playOverlay = new PlayOverlay();
    dataFactory = new DataFactory();
  }

  beforeEach(() => {
    initializePageObjects();
    replayOverlay.navigateTo();
    replayOverlay.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should display the replay overlay when the video has finished', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChange())
      .then(() => expect(replayOverlay.isDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should replay the video when the replay button is clicked', (done: DoneFn) => {
    let endSceneTitle;
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChange())
      .then(() => controls.getSceneTitle().then((lastSceneTitle) => endSceneTitle = lastSceneTitle)
      .then(() => replayOverlay.replayButton.click())
      .then(() => controls.getSceneTitle().then( (firstSceneTitle) => {expect(firstSceneTitle).not.toEqual(endSceneTitle) }))
      .then(done))
      .catch((err: Error) => done.fail(err));
  });
});
