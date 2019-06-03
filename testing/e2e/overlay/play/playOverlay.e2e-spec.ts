import {browser, by, ExpectedConditions, element} from 'protractor';
import {BranchesComponent} from '../../branchesComponent.po';
import {PlayOverlay} from './playOverlay.po';
import {Controls} from "../../controls/controls.po";

describe('Play Overlay', () => {
  let playOverlay: PlayOverlay;
  let controls: Controls;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    controls = new Controls();
  }

  beforeEach(() => {
    initializePageObjects();
    playOverlay.navigateTo();
    playOverlay.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should display play overlay on load', (done: DoneFn) => {
    return playOverlay.isPresent().then((result) => expect(result).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should compute the the overlay size equals the viewport size', (done: DoneFn) => {
    return playOverlay.isCorrectSize().then((size) => expect(size).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should display overlay play button', (done: DoneFn) => {
    return playOverlay.isPlayButtonDisplayed().then((isDsplayed) => expect(isDsplayed).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should have the play overlay z index equal to 100 ', (done: DoneFn) => {
    return playOverlay.getZindex().then((zindex) => expect(zindex).toEqual('100'))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the overlay when the overlay play button has been clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => expect(playOverlay.isRemoved()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  // keyboard controls
/*
  it('should remove the overlay when the overlay play button has been clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => expect(playOverlay.isRemoved()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });
  */
});
