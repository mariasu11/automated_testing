import {browser, by, ExpectedConditions, element} from 'protractor';
import {PlayOverlay} from './play/playOverlay.po';
import {Controls} from '../controls/controls.po';
import {HelpOverlay} from './help.po';


describe('Help Overlay', () => {
  let playOverlay: PlayOverlay;
  let controls: Controls;
  let helpOverlay: HelpOverlay;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    controls = new Controls();
    helpOverlay = new HelpOverlay();
  }

  beforeEach(() => {
    initializePageObjects();
    helpOverlay.navigateTo();
    helpOverlay.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should display the help overlay when the help option is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => controls.clickHelpOption())
      .then(() => expect(helpOverlay.isDisplayed()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the help overlay when the help overlay close button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => controls.clickHelpOption())
      .then(() => helpOverlay.clickCloseButton())
      .then(() => expect(helpOverlay.isVisible()).toEqual(false))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  // keyboard controls
/*
  it('should display the help overlay when the help option is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectHelpOption())
      .then(() => expect(helpOverlay.isVisible()).toEqual(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should remove the help overlay when the help overlay close button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectHelpOption())
      .then(() => helpOverlay.selectCloseButton())
      .then(() => expect(helpOverlay.isVisible()).toEqual(false))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });
*/
});
