import { ElementFinder, $, browser, element, by } from 'protractor';
import {BranchesComponent} from '../branchesComponent.po';

export class OverlayComponent extends BranchesComponent {
  overlay: ElementFinder = this.branchesComponent.$('msd-branches-overlay');

}
