import { BranchesPage } from './old_app.po';
import {browser, by, ExpectedConditions, element} from 'protractor';
import {BranchesComponent} from '../branchesComponent.po';
import {PlayOverlay} from '../overlay/play/playOverlay.po';

describe('Branches App', () => {
  let page: BranchesPage;
  let branchesComponent: BranchesComponent;
  let playOverlay: PlayOverlay;

  beforeEach(() => {
    page = new BranchesPage();
    branchesComponent = new BranchesComponent();
    playOverlay = new PlayOverlay();
    page.navigateTo();
    browser.wait(ExpectedConditions.visibilityOf(playOverlay.returnElement()), 7000);
  });
  /*
    it('msd-branches should be present', () => {
      expect(branchesComponent.isDisplayed()).toBe(true);
    });

    it('should display play overlay on load', () => {
      expect(playOverlay.isPresent()).toBe(true);
    });

    it('should compute the the overlay size equals the viewport size', () => {
      expect(page.getPlayOverlayHeight()).toEqual(page.getViewportHeight());
      expect(page.getPlayOverlayWidth()).toEqual(page.getViewportWidth());
    });

    it('should have the play overlay z index equal to 100 and the player controls z index equal to 10', () => {
      expect(page.getPlayOverlayZindex()).toEqual('100');
      expect(page.getControlsZindex()).toEqual('10');
    });

    it('should display overlay play button element', () => {
      expect(page.overlayPlayButtonPresent).toBeTruthy();
    });

    it('should display overlay play button', () => {
      expect(page.overlayPlayButton.isDisplayed()).toBe(true);
      expect(page.overlayPlayButton.isPresent()).toBe(true);
    });

    it('should not allow user to click on previous button in the controls on load', () => {
      expect(page.previousButton.getAttribute('class')).toContain('cb-btn-disable'); // why is this class not on all the player controls? Only previous and next buttons
    });

    it('should not allow user to click on next button in the controls on load', () => {
      expect(page.nextButton.getAttribute('class')).toContain('cb-btn-disable');
    });

    it('should not play the video on load', () => {
      expect(page.getScrubberWidth()).toBe(0);
    });

    it('should remove the overlay when the overlay play button has been clicked', () => {
      page.overlayPlayButton.click();
      expect(page.playOverlay.isPresent()).toBe(false);
    });

    it('should play the video when the overlay play button is clicked', () => {
      const initialScrubberWidth = page.getScrubberWidth();
      page.overlayPlayButton.click();
      browser.sleep(2000);
      const finalScrubberWidth = page.getScrubberWidth();
      expect(initialScrubberWidth).not.toEqual(finalScrubberWidth);
      expect(finalScrubberWidth).toBeGreaterThan(0);
      expect(page.playButton.getAttribute('class')).toContain('cb-btn-play');
      expect(page.getContentPropertyWhenPlayed()).toEqual('"9"');
    });

    it('should pause the video when the play/pause button is clicked in the controls after the overlay play button has been clicked', () => {
      page.overlayPlayButton.click();
      page.playButton.click();
      expect(page.playButton.getAttribute('class')).toContain('cb-btn-pause')
      expect(page.getContentPropertyWhenPaused()).toEqual('"0"');
    });

    it('should display the history menu when the history button is clicked', () => {
      page.overlayPlayButton.click();
      page.historyButton.click();
      // const historyMenu = page.getHistoryMenu();
      expect(page.historyMenu.isDisplayed()).toBe(true);
    });

    it('should display the history menu heading and subheading when the history button is clicked', () => {
      page.overlayPlayButton.click();
      page.historyButton.click();

      expect(page.historyMenuHeader.getText()).toEqual('History Menu');
      expect(page.getHistoryMenuHeaderText()).toEqual('History Menu');
      expect(page.historyMenuSubheading.getText()).toEqual('Select a section below to navigate to that slide');
      expect(page.getHistoryMenuSubHeaderText()).toEqual('Select a section below to navigate to that slide');
    });

    it('should remove the history menu when the history menu close button is clicked', () => {
      page.overlayPlayButton.click();
      page.historyButton.click();
      // const historyMenu = page.getHistoryMenu(); // should this fail if it is no longer in the DOM? will it happen in order of the specified steps.
      page.historyMenuCloseButton.click();
      expect(browser.wait(ExpectedConditions.invisibilityOf(page.historyMenu), 2000)).toBe(true);
      expect(browser.isElementPresent(page.historyMenu)).toBe(false);
    });

    it('should display a scene title when you click the play button', () => {
      page.overlayPlayButton.click();
      expect(page.sceneTitle.getText()).toBeDefined();
    });

    it('should display different scene title as slides change', () => {
      page.overlayPlayButton.click();
      const initialSceneTitle = page.sceneTitle.getText();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      const finalSceneTitle = page.sceneTitle.getText();
      expect(initialSceneTitle).not.toEqual(finalSceneTitle);
      expect(initialSceneTitle).toEqual('Introduction');
      expect(finalSceneTitle).toEqual('Scene 005');
    });

    it('should have a canvas element defined for scene 005', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      const slide005Canvas = page.getSlide005Canvas();
      expect(slide005Canvas.getAttribute('height')).toBeDefined();
      expect(slide005Canvas.getAttribute('width')).toBeDefined();
    });

    it('should display the volume pop up when the mouse is over the volume button', () => {
      page.overlayPlayButton.click();
      page.moveMouseToVolumeButton();
      // const volumePopUp = page.getVolumePopUp();
      expect(page.volumePopUp.isDisplayed()).toBe(true);
      expect(page.volumePopUp.isPresent()).toBe(true);
    });

    it('should display the volume pop up image when the mouse is over the volume button', () => {
      page.overlayPlayButton.click();
      page.moveMouseToVolumeButton();
      const volumePopUpBg = page.getVolumePopUpBg();
      expect(volumePopUpBg.getCssValue('background')).toContain('.svg');
    });

    it('should display the volume pop up progress bar image when the mouse is over the volume button', () => {
      page.overlayPlayButton.click();
      page.moveMouseToVolumeButton();
      const volumePopUpProgressBar = page.getVolumePopUpProgressBar();
      expect(volumePopUpProgressBar.getCssValue('background')).toContain('.svg');
    });

    it('should not display the volume pop up when the mouse is moved away from the volume button', () => {
      page.overlayPlayButton.click();
      page.moveMouseToVolumeButton();
      expect(browser.isElementPresent(page.getVolumePopUp())).toBe(true);
      page.moveMouseToHistoryButton();
      expect(browser.isElementPresent(page.getVolumePopUp())).toBe(false);
    });

    it('should initially set the presentation to not be muted', () => {
      page.overlayPlayButton.click();
      expect(page.volumeButton.getAttribute('class')).toContain('cb-btn-unmuted');
    });

    it('should set the content property to T when the presentation is not muted', () => {
      page.overlayPlayButton.click();
      expect(page.getContentPropertyWhenUnmuted()).toEqual('"T"');
    });

    it('should mute the video when the volume button is clicked', () => {
      page.overlayPlayButton.click();
      page.volumeButton.click();
      expect(page.volumeButton.getAttribute('class')).toContain('cb-btn-muted');
    });

    it('should set the content property to Y when the presentation is muted', () => {
      page.overlayPlayButton.click();
      page.volumeButton.click();
      expect(page.getContentPropertyWhenMuted()).toEqual('"Y"');
    });

    it('should unmute the video when the volume button is clicked twice', () => {
      page.overlayPlayButton.click();
      page.volumeButton.click();
      page.volumeButton.click();
      expect(page.volumeButton.getAttribute('class')).toContain('cb-btn-unmuted');
    });

    it('should allow the user to move the volume scrubber when clicking on the progress bar image', () => {
      page.overlayPlayButton.click();
      page.moveMouseToVolumeButton();
      expect(page.getVolumePopUpScrubber().getCssValue('bottom')).toEqual('125px');
      page.moveVolumeScrubber();
      expect(page.getVolumePopUpScrubber().getCssValue('bottom')).not.toEqual('125px');
    });

    it('should display the cc overlay when the cc button is clicked', () => {
      page.overlayPlayButton.click();
      page.ccButton.click();
      // const ccOverlay = page.getCCOverlay();
      expect(page.ccOverlay.isPresent()).toBe(true);
      expect(page.ccOverlay.isDisplayed()).toBe(true);
    });

    it('should remove the cc overlay when the cc button is clicked', () => {
      page.overlayPlayButton.click();
      page.ccButton.click();
      const ccOverlay = page.getCCOverlay();
      page.ccButton.click();
      expect(browser.isElementPresent(ccOverlay)).toBe(false);
    });

    it('should display the options pop up when the mouse is over the options button', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      const optionsPopUp = page.getOptionsPopUp();
      expect(optionsPopUp.isDisplayed()).toBe(true);
      expect(optionsPopUp.isPresent()).toBe(true);
    });

    it('should display 3 options in the options pop up', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      const allOptions = page.getAllOptions();
      expect(allOptions.count()).toEqual(3);
      expect(page.getFirstOptionText()).toEqual('Information');
      expect(page.getSecondOptionText()).toEqual('Transcript');
      expect(page.getThirdOptionText()).toEqual('Help');
    });

    it('should display the correct content property value for each option', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      expect(page.getContentPropertyForInformationOption()).toEqual('"A"');
      expect(page.getContentPropertyForTranscriptOption()).toEqual('"I"');
      expect(page.getContentPropertyForHelpOption()).toEqual('"3"');
    });

    it('should display the information overlay when the information option is clicked', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      page.clickFirstOption();
      const informationOverlay = page.getInformationOverlay();
      expect(informationOverlay.isDisplayed()).toBe(true);
      expect(informationOverlay.isPresent()).toBe(true);
    });

    it('should close the information overlay when the information overlay close button is clicked', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      page.clickFirstOption();
      const informationOverlay = page.getInformationOverlay(); // correct?
      page.clickInformationOverlayCloseButton(); // close the overlay
      expect(browser.isElementPresent(informationOverlay)).toBe(false);
    });

    it('should open transcript in new browser window when transcript option is clicked', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      page.clickSecondOption().then( () => {
       browser.getAllWindowHandles().then( (handles) => {
         const transcriptWindow = handles[1];
         browser.switchTo().window(transcriptWindow).then( () => {
           expect(browser.getCurrentUrl()).toContain('Transcript');
         });
       });
      });
    });

    xit('should display the image credits overlay when the image credits option is clicked', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      // page.clickFourthOption();
      const imageCreditsOverlay = page.getImageCreditsOverlay();
      expect(imageCreditsOverlay.isPresent()).toBe(true);
    });

    it('should display the help overlay when the help option is clicked', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      page.clickThirdOption();
      const helpOverlay = page.getHelpOverlay();
      expect(helpOverlay.isPresent()).toBe(true);
      expect(helpOverlay.isDisplayed()).toBe(true);
    });

    it('should remove the help overlay when the help overlay close button is clicked', () => {
      page.overlayPlayButton.click();
      page.moveMouseToOptionsButton();
      page.clickThirdOption();
      const helpOverlay = page.getHelpOverlay();
      page.clickHelpOverlayCloseButton();
      expect(helpOverlay.getCssValue('visibility')).toEqual('hidden');
      expect(helpOverlay.isDisplayed()).toBe(false);
    });

    it('should initially not be set to fullscreen mode', () => {
      page.overlayPlayButton.click();
      expect(page.fullscreenButton.getAttribute('class')).toContain('cb-btn-fullscreen-open');
      expect(page.getContentPropertyWhenNotFullscreen()).toEqual('"W"')
    });

    it('should switch to fullscreen mode when the fullscreen button is clicked', () => {
      const initialHeight = page.getViewportHeight();
      const initialWidth  = page.getViewportWidth();
      page.overlayPlayButton.click();
      page.fullscreenButton.click();
      const fullscreenHeight = page.getViewportHeight();
      const fullscreenWidth = page.getViewportWidth();

      expect(initialHeight).not.toEqual(fullscreenHeight);
      // expect(initialWidth).not.toEqual(fullscreenWidth); // just check height instead of width?
      expect(page.fullscreenButton.getAttribute('class')).toContain('cb-btn-fullscreen-close');
      expect(page.getContentPropertyWhenFullscreen()).toEqual('"E"');
    });

    it('should allow users to click on the previous button when scene005 is being played', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      expect(page.previousButton.getAttribute('class')).toContain('cb-btn-hover');
      });

    it('should take the user back to the Introduction slide when the previous button is clicked in scene005', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      const initialSceneTitle = page.getSceneTitleText(); // get the initial scene title
      page.previousButton.click();
      const finalSceneTitle = page.getSceneTitleText(); // final scene title
      expect(initialSceneTitle).not.toEqual(finalSceneTitle);
    });

    it('should allow users to click on the next button after they have clicked on the previous button in Scene 005', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      page.previousButton.click();
      expect(page.nextButton.getAttribute('class')).toContain('cb-btn-hover');
    });

    it('should take the user to scene 005 when the next button is clicked on the Introduction slide (user had clicked the previous button when on scene 005 to get to the Intro slide)', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      page.previousButton.click(); // takes user to Intro slide
      const initialSceneTitle = page.getSceneTitleText();
      page.nextButton.click(); // takes user to Scene 005
      const finalSceneTitle = page.getSceneTitleText();
      expect(initialSceneTitle).not.toEqual(finalSceneTitle);
      expect(finalSceneTitle).toEqual('Scene 005');
    });

    it('should display Introduction and Scene 005 when the history button is clicked while on Scene 005', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      page.historyButton.click();
      const historyMenuItems = page.getHistoryMenuItems();
      expect(historyMenuItems.count()).toEqual(2);
      expect(page.getHistoryMenuFirstSectionTitle()).not.toEqual(page.getHistoryMenuSecondSectionTitle());
    });

    it('should display the third slide after a specified time', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide010()), 55000);
      const slide010Canvas = page.getSlide010Canvas();
      expect(slide010Canvas.getAttribute('height')).toBeDefined();
      expect(slide010Canvas.getAttribute('width')).toBeDefined();
    });

    it('should add a third section to the history menu when the video is on the third slide', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide010()), 55000);
      page.historyButton.click();
      expect(page.getHistoryMenuItems().count()).toEqual(3);
      expect(page.getHistoryMenuSecondSectionTitle).not.toEqual(page.getHistoryMenuThirdSectionTitle());
    });

    it('should highlight the current slide in the history menu', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      page.historyButton.click();
      expect(page.getHistoryMenuItems().get(1).getAttribute('class')).toContain('selected');
    });

    it('should play a slide from the beginning when its section is clicked in the history menu', () => {
      page.overlayPlayButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.getSlide005()), 8000);
      page.historyButton.click();
      page.getHistoryMenuItems().get(0).click();
      expect(page.getSceneTitleText()).toEqual('Introduction');
      expect(page.getScrubberWidth()).toBeLessThan(20);
    });
  */
});
