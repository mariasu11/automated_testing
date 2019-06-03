import {ElementFinder, $, browser, element, by, ExpectedConditions} from 'protractor';
import {BranchesComponent} from '../branchesComponent.po';

export class Stage extends BranchesComponent {
  stage: ElementFinder = this.branchesComponent.$('msd-branches-stage');

}
