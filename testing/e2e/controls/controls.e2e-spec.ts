import {browser, by, ExpectedConditions, element} from 'protractor';
import {PlayOverlay} from '../overlay/play/playOverlay.po';
import {Controls} from './controls.po';
import {StageSlideElement} from '../stage/slide/element/stageSlideElement.po';
import {ReplayOverlay} from '../overlay/replay/replay.po';

describe('Control Bar', () => {
  let playOverlay: PlayOverlay;
  let controls: Controls;
  let stageSlideElement: StageSlideElement;
  let replayOverlay: ReplayOverlay;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    controls = new Controls();
    stageSlideElement = new StageSlideElement();
    replayOverlay = new ReplayOverlay();
  }

  beforeEach(() => {
    initializePageObjects();
    controls.navigateTo();
    controls.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should have the control bar z index equal to 10 ', (done: DoneFn) => {
    controls.getZindex().then((zindex) => expect(zindex).toEqual('10'))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should not allow user to click on previous button in the controls on load', (done: DoneFn) => {
    controls.isPreviousButtonDisabled().then((result) => expect(result).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should not allow user to click on next button in the controls on load', (done: DoneFn) => {
    controls.isNextButtonDisabled().then((result) => expect(result).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should not play the video on load', (done: DoneFn) => {
    controls.getScrubberWidth().then((result) => expect(result).toBe(0))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should play the video when the overlay play button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => expect(controls.isPlaying()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should pause the video when the play/pause button is clicked in the controls after the overlay play button has been clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.playButton.click())
      .then(() => expect(controls.isPaused()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display a scene title when you click the play button', (done: DoneFn) => {
    playOverlay.click()
      .then(() => expect(controls.getSceneTitle()).toBeDefined())
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display different scene title as slides change', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChange())
      .then(() => expect(replayOverlay.returnElement().isDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the volume pop up when the mouse is over the volume button', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToVolumeButton())
      .then(() => expect(controls.isVolumePopUpDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the volume pop up background image when the mouse is over the volume button', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToVolumeButton())
      .then(() => expect(controls.includesVolumePopUpBGImage()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the volume pop up progress bar background image when the mouse is over the volume button', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToVolumeButton())
      .then(() => expect(controls.includesVolumePopUpProgressBarImage()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should not display the volume pop up when the mouse is moved away from the volume button', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToVolumeButton())
      .then(() => expect(controls.isVolumePopUpPresent()).toBe(true))
      .then(() => controls.moveMouseToHistoryButton())
      .then(() => expect(controls.isVolumePopUpPresent()).toBe(false))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should initially set the presentation to not be muted', (done: DoneFn) => {
    playOverlay.click()
      .then(() => expect(controls.isNotMuted()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should mute the video when the volume button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.volumeButton.click())
      .then(() => expect(controls.isMuted()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should unmute the video when the volume button is clicked twice', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.clickVolumeButton(2))
      .then(() => expect(controls.isNotMuted()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should allow the user to move the volume scrubber when clicking on the progress bar image', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToVolumeButton())
      .then(() => expect(controls.hasVolumeScrubberMoved()).toEqual(false))
      .then(() => controls.moveVolumeScrubber())
      .then(() => expect(controls.hasVolumeScrubberMoved()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the options pop up when the mouse is over the options button', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => expect(controls.isOptionsPopUpDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display 3 options in the options pop up with correct text', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => expect(controls.areAllOptionsDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the correct content property value for each option', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => expect(controls.isCorrectContentPropertyForEachOption()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should open transcript in new browser window when transcript option is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => expect(controls.transcriptURL()).toContain('Transcript'))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should initially not be set to fullscreen mode', (done: DoneFn) => {
    playOverlay.click()
      .then(() => expect(controls.isNotinFullscreenMode()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should switch to fullscreen mode when the fullscreen button is clicked', (done: DoneFn) => {
    let initialHeight;
    controls.getHeight()
      .then((iHeight) => initialHeight = iHeight)
      .then(() => playOverlay.click())
      .then(() => controls.fullscreenButton.click())
      .then(() => controls.getHeight().then((fHeight) => { expect(fHeight).not.toEqual(initialHeight) }))
      .then(() => controls.isInFullScreenMode().then((result) => { expect(result).toEqual(true) }))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should allow users to click on the previous button when the second slide is being played', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => expect(controls.isPreviousButtonClickable()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should take the user back to the first slide when the previous button is clicked in the second slide', (done: DoneFn) => {
    let initialSceneTitle;
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.getSceneTitle().then((iTitle) => { initialSceneTitle = iTitle; }))
      .then(() => controls.previousButton.click())
      .then(() => controls.getSceneTitle().then((fTitle) => {expect(fTitle).not.toEqual(initialSceneTitle) }))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should allow users to click on the next button after they have clicked on the previous button in the second slide', (done: DoneFn) => {
    let initialSceneTitle;
    playOverlay.click()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.previousButton.click())
      .then(() => controls.getSceneTitle().then((iTitle) => { initialSceneTitle = iTitle; }))
      .then(() => controls.nextButton.click())
      .then(() => controls.getSceneTitle().then((fTitle) => {expect(fTitle).not.toEqual(initialSceneTitle) }))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  // keyboard controls
/*
  it('should play the video when the overlay play button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => expect(controls.isPlaying()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should pause the video when the play/pause button is clicked in the controls after the overlay play button has been clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectPauseButton())
      .then(() => expect(controls.isPaused()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should mute the video when the volume button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectMuteButton())
      .then(() => expect(controls.isMuted()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should unmute the video when the volume button is clicked twice (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectMuteButtonTwice())
      .then(() => expect(controls.isNotMuted()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display the options pop up when the options button is selected (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectOptionsButton())
      .then(() => expect(controls.isOptionsPopUpDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should open transcript in new browser window when transcript option is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectTranscriptButton())
      .then(() => expect(controls.transcriptURLUsingKeyboard()).toContain('Transcript'))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should switch to fullscreen mode when the fullscreen button is clicked (keyboard controls)', (done: DoneFn) => {
    let initialHeight;
    controls.getHeight()
      .then((iHeight) => initialHeight = iHeight)
      .then(() => controls.selectPlayOverlay())
      .then(() => controls.selectFullScreenButton())
      .then(() => controls.getHeight().then((fHeight) => { expect(fHeight).not.toEqual(initialHeight) }))
      .then(() => controls.isInFullScreenMode().then((result) => { expect(result).toEqual(true) }))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should take the user back to the first slide when the previous button is clicked in the second slide (keyboard controls)', (done: DoneFn) => {
    let initialSceneTitle;
    controls.selectPlayOverlay()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.getSceneTitle().then((iTitle) => { initialSceneTitle = iTitle; }))
      .then(() => controls.selectPreviousButton())
      .then(() => controls.getSceneTitle().then((fTitle) => {expect(fTitle).not.toEqual(initialSceneTitle) }))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should take the user to the second slide when the next button is clicked on the first slide (user had clicked the previous button when on second slide to get to the first slide slide) (keyboard controls)', (done: DoneFn) => {
    let initialSceneTitle;
    controls.selectPlayOverlay()
      .then(() => controls.waitForSceneTitleToChangeToSceneX(2))
      .then(() => controls.selectPreviousButton())
      .then(() => controls.getSceneTitle().then((iTitle) => { initialSceneTitle = iTitle; }))
      .then(() => controls.selectNextButton())
      .then(() => controls.getSceneTitle().then((fTitle) => {expect(fTitle).not.toEqual(initialSceneTitle) }))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });
*/
});
