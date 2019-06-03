import {browser, by, ExpectedConditions, element} from 'protractor';
import {BranchesComponent} from '../../../branchesComponent.po';
import {PlayOverlay} from '../../../overlay/play/playOverlay.po';
import {StageSlideElement} from './stageSlideElement.po';
import {StageSlide} from "../stageSlide.po";
import {Controls} from "../../../controls/controls.po";


describe('Stage Slide Element', () => {
  let playOverlay: PlayOverlay;
  let stageSlideElement: StageSlideElement;
  let controls: Controls;

  function initializePageObjects(): void {
    playOverlay = new PlayOverlay();
    stageSlideElement = new StageSlideElement();
    controls = new Controls();
  }

  beforeEach(() => {
    initializePageObjects();
    stageSlideElement.navigateTo();
    stageSlideElement.removeAlert();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });



});
