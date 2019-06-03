import {ElementFinder, $, browser, element, by, ExpectedConditions} from 'protractor';
import {BranchesComponent} from '../../branchesComponent.po';
import {Stage} from '../stage.po';

export class StageSlide extends Stage {
  //#region Elements
  stageSlide: ElementFinder = this.stage.$('msd-branches-stage-slide');
  //#endregion

  //#region Functions
  returnElement() {
    return this.stageSlide;
  }

  //#endregion

}
