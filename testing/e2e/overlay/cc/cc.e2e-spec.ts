import {browser, by, ExpectedConditions, element} from 'protractor';
import {PlayOverlay} from '../play/playOverlay.po';
import {Controls} from '../../controls/controls.po';
import {CCOverlay} from './cc.po';

describe('CC Overlay', () => {
  let playOverlay: PlayOverlay;
  let controls: Controls;
  let ccOverlay: CCOverlay;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    ccOverlay = new CCOverlay();
    controls = new Controls();
  }

  beforeEach(() => {
    initializePageObjects();
    ccOverlay.navigateTo();
    ccOverlay.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should display the cc overlay when the cc button is clicked', (done: DoneFn) => {
    return playOverlay.click()
      .then(() => controls.ccButton.click())
      .then(() => expect(ccOverlay.isDisplayed()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the cc overlay when the cc button is clicked twice', (done: DoneFn) => {
    return playOverlay.click()
      .then(() => controls.clickCCButton(2))
      .then(() => expect(ccOverlay.isRemoved()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  // keyboard controls
/*
  it('should display the cc overlay when the cc button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectCCButton())
      .then(() => expect(ccOverlay.isDisplayed()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the cc overlay when the cc button is clicked twice (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectCCButton())
      .then(() => ccOverlay.removeCC())
      .then(() => expect(ccOverlay.isRemoved()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });
*/
});
