import {browser, by, ExpectedConditions, element} from 'protractor';
import {PlayOverlay} from '../play/playOverlay.po';
import {Controls} from '../../controls/controls.po';
import {InformationOverlay} from './information.po';

describe('Information Overlay', () => {
  let playOverlay: PlayOverlay;
  let controls: Controls;
  let informationOverlay: InformationOverlay;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    controls = new Controls();
    informationOverlay = new InformationOverlay();
  }

  beforeEach(() => {
    initializePageObjects();
    informationOverlay.navigateTo();
    informationOverlay.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });

  it('should display the information overlay when the information option is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => controls.clickInformationOption())
      .then(() => expect(informationOverlay.isDisplayed()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should close the information overlay when the information overlay close button is clicked', (done: DoneFn) => {
    playOverlay.click()
      .then(() => controls.moveMouseToOptionsButton())
      .then(() => controls.clickInformationOption())
      .then(() => informationOverlay.clickCloseButton())
      .then(() => expect(informationOverlay.isRemoved()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  // keyboard controls
/*
  it('should display the information overlay when the information option is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectInformationOption())
      .then(() => expect(informationOverlay.isDisplayed()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

  it('should close the information overlay when the information overlay close button is clicked (keyboard controls)', (done: DoneFn) => {
    controls.selectPlayOverlay()
      .then(() => controls.selectInformationOption())
      .then(() => informationOverlay.selectCloseButton())
      .then(() => expect(informationOverlay.isRemoved()).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });
*/
});
