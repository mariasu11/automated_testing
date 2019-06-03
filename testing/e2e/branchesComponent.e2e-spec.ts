import {browser, by, ExpectedConditions, element} from 'protractor';
import {BranchesComponent} from './branchesComponent.po';
import {PlayOverlay} from "./overlay/play/playOverlay.po"
import {initServicesIfNeeded} from "@angular/core/src/view";

describe('Branches Component', () => {
  let branches: BranchesComponent;

  function initializePageObjects(): void {
    branches = new BranchesComponent();
  }

  beforeAll( () => {
    initializePageObjects();
    branches.navigateTo();
    branches.login();
  });

  beforeEach(() => {
    initializePageObjects();
    branches.navigateTo();
    branches.removeAlert();
  });

  it('msd-branches should be present', (done: DoneFn) => {
    return branches.branchesComponent.isDisplayed().then((result: boolean) => expect(result).toBe(true))
      .then(done)
      .catch((err: Error) => done.fail(err));
  });

});
