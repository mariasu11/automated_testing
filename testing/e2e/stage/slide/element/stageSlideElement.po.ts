import {ElementFinder, $, browser, element, by, ExpectedConditions, ElementArrayFinder} from 'protractor';
import {StageSlide} from '../stageSlide.po';
import {DataFactory} from '../../../data-factory'

export class StageSlideElement extends StageSlide {
  //#region Elements
  stageSlideElement: ElementFinder = this.stage.$('msd-branches-stage-slide-element');
  dataFactory: DataFactory = new DataFactory();
  hotspot: ElementFinder = $('.active').$('.hotspot');
  widget = $('.active').$('msd-branches-stage-slide-element-cewidget');
  widgetChoices: ElementArrayFinder = $('#choices').$$('li');
  checkAnswerButton: ElementFinder = $('#answer_content');
  tryAgainButton: ElementFinder = $('#try_again_content');

  //#endregion


  //#region Functions

  getCanvas() {
    return $('.active').$('msd-branches-stage-slide-element-cjsanimation').$('canvas');
  }

  isCanvasElementDefined() {
    const slideCanvas = this.getCanvas();
    const height = slideCanvas.getAttribute('height');
    const width = slideCanvas.getAttribute('width');
    if (height && width) {return true}
  }


  //#endregion

}
