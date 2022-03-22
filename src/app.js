import { Engine, Scene, Color3, Animation, setAndStartTimer, CubicEase, EasingFunction, ArcRotateCamera, TransformNode, Vector3, Vector2, Tools, HemisphericLight, PointerEventTypes} from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Rectangle, Image, TextBlock, Button} from "@babylonjs/gui";

        var canvas = document.createElement("canvas");
        document.getElementById("renderCanvas").appendChild(canvas);
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";

        var engine = null;
        var scene = null;
        var sceneToRender = null;  
        
        var createDefaultEngine = function() { return new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

        Control.prototype.getScene = function () { return scene };

        var createScene = function () {
        
            // This creates a basic Babylon Scene object (non-mesh)
            scene = new Scene(engine);
            scene.clearColor = new Color3.FromInts(255, 255, 255);
            // This creates and positions a free camera (non-mesh)
            var camera = new ArcRotateCamera("Camera", Tools.ToRadians(226), Tools.ToRadians(125), 100, Vector3.Zero(), scene);
        
            // This targets the camera to scene origin
            camera.setTarget(Vector3.Zero());
        
                var CoT = new TransformNode("root"); 
            camera.lockedTarget = CoT
        
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
        
            let currentIndex = 0;
            let previousIndex = 0;
            var sources = [
            "https://i.imgur.com/7FFbnuK.png",
            "https://i.imgur.com/UdjG5kC.png", 
            "https://i.imgur.com/h3wWL3D.png",
            "https://i.imgur.com/I4AN2Jp.png",
            "https://i.imgur.com/ca27F5t.png",
            "https://i.imgur.com/J95LnGX.png", 
            "https://i.imgur.com/qmbQS2A.png",
            "https://i.imgur.com/Kl5pWYR.png"];
        
            let currentTextIndex = 0;
            let previousTextIndex = 0;
            var textForMenu = [
            "Welcome to the White House located in Washington, D.C. at 1600 Pennsylvania Avenue! Constructed from 1792-1800, the White House was built with the labor of free and enslaved people. John Adams was the first president to live in the White House and since then the building has served as the official workplace and residence for the President of the United States and their family.",
            "The White House is also a symbol of American democracy and is often referred to as the \“People’s House.\” Citizens ultimately choose who resides in the White House, and that person and their presidency, must answer to the American people. As you travel through the room of the White House, you will explore and experience the diverse history of the \“People’s House.\"", 
            "Want to learn about different rooms within the White House? Select a room for the images above.",
            "This is the Blue Room, an oval shaped room on the State Floor of the White House. The Blue Room was designed to be an elegant space by White House architect James Hoban, and has been used often as a reception room. However, did you know that the Blue Room was not always blue? At different times, the room was red and green until 1837, when President Martin Van Buren turned it into the Blue Room.",
            "Image caption:\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            "",
            "On the morning of January 1, 1863, President Abraham Lincoln hosted the annual New Year’s Day reception at the White House, spending several hours here in the Blue Room shaking hands with hundreds of citizens. During Lincoln’s presidency from 1861-1865, the Civil War was fought between the Union and the Confederacy.",
            "Following Lincoln’s election in 1860, pro-slavery southern states began to secede from the Union, prompting the start of the Civil War in the spring of 1861. Throughout the war, Lincoln considered all approaches to giving the Union a wartime advantage. One of the options put forth included the Emancipation Proclamation, which granted freedom to enslaved people in Confederate States that remained in rebellion.",
            "Lincoln believed this document would hurt the southern economy, negatively impact the South’s ability to continue the war, and further the cause of freedom for enslaved people. After the reception, President Lincoln left the Blue Room and went upstairs to his office, ready to sign the Emancipation Proclamation. With a slightly trembling hand, stiff and numb from greeting so many people, Lincoln signed the document.",
            "Watch this short video on how the Emancipation Proclamation signed by President Abraham Lincoln during the Civil War laid the groundwork for future legislation abolishing, or ending, slavery.",
            "",
            ""];
        
            let menuIsUp = false;
            let menuIsOpen = true;
            let dragging = null;
            let mouseStart = new Vector2.Zero();
        
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        
            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;

            //Class
            class TextBlockWithUnderlineColor extends TextBlock {
                underlineColor = "black";
                _applyStates(context) {
                    super._applyStates(context);
                    context.strokeStyle = this.underlineColor;
                }
            }
                
                    //Functions
                        var imageCarousel = function (control, startPos, endPos, speed, controlImg) {
                            var ease = new CubicEase();
                            var ease2 = new CubicEase();
                            control.isForeground = true;
                            ease.setEasingMode(EasingFunction.EASINGMODE_EASEIN);
                            ease2.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
                            control.source = sources[currentIndex];
                            controlImg.source = sources[previousIndex];
                            control.zIndex = 1;
                            controlImg.zIndex = 0;
                            Animation.CreateAndStartAnimation('at1', control, 'left', speed * 1.5, 120, startPos,endPos, 0, ease);
                            Animation.CreateAndStartAnimation('at2', control, 'alpha', speed, 120, 0,1, 0, ease2);
                
                            
                        }

                        var learnMoreWaiting = function()
                        {
                            examineText.alpha = 0;
                            lincolnMaskBox.alpha = 0;
                            lincolnMaskBox.isEnabled = false;
                            lincolnText1.alpha = 0;
                            lincolnText1.isEnabled = false;
                            waitingMaskBox.alpha = 0;
                            waitingMaskBox.isEnabled = false;
                            waitingText1.alpha = 0;
                            waitingText1.isEnabled = false;
                            engravingMaskBox.alpha = 0;
                            engravingMaskBox.isEnabled = false;
                            engravingText1.alpha = 0;
                            engravingText1.isEnabled = false;
                            frederickMaskBox.alpha = 0;
                            frederickMaskBox.isEnabled = false;
                            frederickText1.alpha = 0;
                            frederickText1.isEnabled = false;
                            fifthMaskBox.alpha = 0;
                            fifthMaskBox.isEnabled = false;
                            fifthText1.alpha = 0;
                            fifthText1.isEnabled = false;
                            labelForLearnAboutWaiting.alpha = 1;
                            labelForLearnAboutWaiting.isEnabled = true;
                            learnMoreMenuMaskBox.alpha = 1;
                            learnMoreMenuMaskBox.isEnabled = true;
                        }

                        var menuPosition = function(){
                            if(menuIsOpen)
                            {
                                //learnMoreMenuMaskBox.left = "-15.65%";
                                easyAnimation(labelForLearnAboutWaiting, 'left', 30, 10.9375, 18.75, 90);
                                easyAnimation(learnMoreMenuMaskBox, 'left', 30, -15.65, 0, 90);
                            }

                            else
                            {
                                //learnMoreMenuMaskBox.leftInPixels = 0;
                                easyAnimation(labelForLearnAboutWaiting, 'left', 30, 18.75, 10.9375, 90);
                                easyAnimation(learnMoreMenuMaskBox, 'left', 30, 0, -15.65, 90);
                            }
                        }

                        var fullscreenGo = function(){
                            var elem = document.getElementById("temp");

                            if(elem.requestFullscreen){
                                elem.requestFullscreen();
                            }
                            else if(elem.mozRequestFullScreen){
                                elem.mozRequestFullScreen();
                            }
                            else if(elem.webkitRequestFullscreen){
                                elem.webkitRequestFullscreen();
                            }
                            else if(elem.msRequestFullscreen){
                                elem.msRequestFullscreen();
                            }
                        }
                
                        var updateText = function(direction)
                        {
                            previousTextIndex = currentTextIndex;

                            if(direction == 'back')
                            {
                                if(currentTextIndex > 0)
                                {
                                    currentTextIndex--;
                                }

                                else
                                {
                                    welcomeSplashScreen.width = "140%";
                                    welcomeSplashScreen.height = "140%";
                                    easyFade(welBackgroundRect, 30, 0, 1, 90);
                                    startButton.isEnabled = true;
                                    if(menuIsUp)
                                    {
                                        menuIsUp = false;
                                        openMenu();
                                    }
                                    //window.location.reload();
                                }
                            }

                            if(direction == 'forward')
                            {
                                if(currentTextIndex < textForMenu.length - 1)
                                {
                                    currentTextIndex++;
                                }
                                
                                else
                                {
                                    return;
                                }
                            }

                            if(direction == 'entrance')
                            {
                                currentTextIndex = 0;
                            }

                            if(currentTextIndex == 0)
                            {
                                //Turn off if necessary
                                clearTheExperience();
                            }

                            if(currentTextIndex == 1)
                            {
                                //Turn off if necessary
                                greyBoxExplore.alpha = 0;
                                greyBoxExplore.isEnabled = false;
                                redRoomMaskBox.width = "0%";
                                redRoomMaskBox.height = "0%";
                                redRoomText.alpha = 0;
                                blueRoomMaskBox.width = "0%";
                                blueRoomMaskBox.height = "0%";
                                blueRoomText.alpha = 0;
                                greenRoomMaskBox.width = "0%";
                                greenRoomMaskBox.height = "0%";
                                greenRoomText.alpha = 0;
                                exploreText.alpha = 0;
                                greyBoxBlurRoomImage.isEnabled = false;
                            }
                
                            if(currentTextIndex == 2)
                            {
                                menuIsUp = false;
                                openMenu();
                                greyBoxExplore.isEnabled = true;
                                pickRoomModals(30, 0, 28.125, 0, 27.77, 30);

                                //Turn off if necessary
                                //architectCalloutButton.alpha = 0;
                                //architectCalloutButton.isEnabled = false;
                                advancedTextureEntrance.isForeground = true;
                                blueRoomButton.isEnabled = true;
                                menuTabText.text = "Welcome";
                                leftArrowBox.isEnabled = false;
                                rightArrowBox.isEnabled = false; 
                    
                                if(menuIsUp)
                                {
                                    menuIsUp = !menuIsUp;
                                    openMenu();
                                }
                            }
                
                            if(currentTextIndex == 3)
                            {
                                advancedTextureEntrance.isForeground = false;
                                blueRoomButton.isEnabled = false;
                                menuTabText.text = "Blue Room";
                                leftArrowBox.isEnabled = true;
                                rightArrowBox.isEnabled = true; 
                    
                                if(!menuIsUp)
                                {
                                    menuIsUp = !menuIsUp;
                                    openMenu();
                                }
                                //architectCalloutButton.alpha = 1;
                                //architectCalloutButton.isEnabled = true;

                                //Turn off if necessary
                                greyBoxBlurRoomImage.alpha = 0;
                                redRoomMaskBox.width = "0%";
                                redRoomMaskBox.height = "0%";
                                redRoomText.alpha = 0;
                                blueRoomMaskBox.width = "0%";
                                blueRoomMaskBox.height = "0%";
                                blueRoomText.alpha = 0;
                                greenRoomMaskBox.width = "0%";
                                greenRoomMaskBox.height = "0%";
                                greenRoomText.alpha = 0;
                                exploreText.alpha = 0;
                                greyBoxBlurRoomImage.isEnabled = false;
                            }
                
                            if(currentTextIndex == 4)
                            {
                                //architectCalloutButton.alpha = 0;
                                //architectCalloutButton.isEnabled = false;
                                greyBoxBlurRoomImage.alpha = 1;
                                greyBoxBlurRoomImage.isEnabled = true;
                                blueRoomImgBox.alpha = 1;
                                blueRoomImgBox.isEnabled = true;

                                //Turn off if necessary
                                wantToLearnMore.alpha = 0;
                                wantToLearnMore.isEnabled = false;
                                learnMoreMaskBox1.alpha = 0;
                                learnMoreMaskBox1.isEnabled = false;
                                learnMoreImgBox1.alpha = 0;
                                learnMoreImgBox1.isEnabled = false;
                                learnMoreText1.alpha = 0;
                                learnMoreText1.isEnabled = false;
                                learnMoreMaskBox2.alpha = 0;
                                learnMoreMaskBox2.isEnabled = false;
                                learnMoreImgBox2.alpha = 0;
                                learnMoreImgBox2.isEnabled = false;
                                learnMoreText2.alpha = 0;
                                learnMoreText2.isEnabled = false;
                            }
                
                            if(currentTextIndex == 5)
                            {
                                blueRoomImgBox.alpha = 0;
                                blueRoomImgBox.isEnabled = false;
                                wantToLearnMore.alpha = 1;
                                wantToLearnMore.isEnabled = true;
                                learnMoreMaskBox1.alpha = 1;
                                learnMoreMaskBox1.isEnabled = true;
                                learnMoreImgBox1.alpha = 1;
                                learnMoreImgBox1.isEnabled = true;
                                learnMoreText1.alpha = 1;
                                learnMoreText1.isEnabled = true;
                                learnMoreMaskBox2.alpha = 1;
                                learnMoreMaskBox2.isEnabled = true;
                                learnMoreImgBox2.alpha = 1;
                                learnMoreImgBox2.isEnabled = true;
                                learnMoreText2.alpha = 1;
                                learnMoreText2.isEnabled = true;
                                menuIsUp = false;
                                openMenu();

                                //Turn off if necessary

                            }
                
                            if(currentTextIndex == 6)
                            {
                                wantToLearnMore.alpha = 0;
                                wantToLearnMore.isEnabled = false;
                                learnMoreMaskBox1.alpha = 0;
                                learnMoreMaskBox1.isEnabled = false;
                                learnMoreImgBox1.alpha = 0;
                                learnMoreImgBox1.isEnabled = false;
                                learnMoreText1.alpha = 0;
                                learnMoreText1.isEnabled = false;
                                learnMoreMaskBox2.alpha = 0;
                                learnMoreMaskBox2.isEnabled = false;
                                learnMoreImgBox2.alpha = 0;
                                learnMoreImgBox2.isEnabled = false;
                                learnMoreText2.alpha = 0;
                                learnMoreText2.isEnabled = false;
                                greyBoxBlurRoomImage.alpha = 0;
                                greyBoxBlurRoomImage.isEnabled = false;
                                //menuBarText.fontSize = "11%";
                                //unionCalloutButton.fontSize = 21;
                                //unionCalloutButton.alpha = 1;
                                //unionCalloutButton.isEnabled = true;
                                //conCalloutButton.fontSize = 21;
                                //conCalloutButton.alpha = 1;
                                //conCalloutButton.isEnabled = true;
                                menuIsUp = true;
                                openMenu();

                                //Turn off if necessary
                                //secCalloutButton.fontSize = 21.25;
                                //secCalloutButton.alpha = 0;
                                //secCalloutButton.isEnabled = false;
                            }
                
                            if(currentTextIndex == 7)
                            {
                                //menuBarText.fontSize = 21.25;
                                //unionCalloutButton.alpha = 0;
                                //unionCalloutButton.isEnabled = false;
                                //conCalloutButton.alpha = 0;
                                //conCalloutButton.isEnabled = false;
                                //secCalloutButton.fontSize = 21.25;
                                //secCalloutButton.alpha = 1;
                                //secCalloutButton.isEnabled = true;
                            }

                            if(currentTextIndex == 8)
                            {
                                //secCalloutButton.alpha = 0;
                                //secCalloutButton.isEnabled = false;

                                //Turn off if necessary
                                openIframe("", 'none');
                                leftArrowBox.isEnabled = true;
                                leftArrowBox.alpha = 1;
                                rightArrowBox.isEnabled = true;
                                rightArrowBox.alpha = 1;
                            }
                
                            if(currentTextIndex == 9)
                            {
                                //menuBarText.fontSize = 21.5;
                                openIframe("https://www.youtube.com/embed/0tlW72ZuIQA", 'Block');
                                leftArrowBox.isEnabled = false;
                                leftArrowBox.alpha = 0;
                                rightArrowBox.isEnabled = false;
                                rightArrowBox.alpha = 0;

                                //Turn off if necessary
                                greyBoxBlurRoomImage.alpha = 0;
                                greyBoxBlurRoomImage.isEnabled = false;
                                examineText.alpha = 0;
                                lincolnMaskBox.alpha = 0;
                                lincolnMaskBox.isEnabled = false;
                                lincolnText1.alpha = 0;
                                lincolnText1.isEnabled = false;
                                waitingMaskBox.alpha = 0;
                                waitingMaskBox.isEnabled = false;
                                waitingText1.alpha = 0;
                                waitingText1.isEnabled = false;
                                engravingMaskBox.alpha = 0;
                                engravingMaskBox.isEnabled = false;
                                engravingText1.alpha = 0;
                                engravingText1.isEnabled = false;
                                frederickMaskBox.alpha = 0;
                                frederickMaskBox.isEnabled = false;
                                frederickText1.alpha = 0;
                                frederickText1.isEnabled = false;
                                fifthMaskBox.alpha = 0;
                                fifthMaskBox.isEnabled = false;
                                fifthText1.alpha = 0;
                                fifthText1.isEnabled = false;
                                dragging = false;
                                scrollModal.isPointerBlocker = true;
                            }
        
                            if(currentTextIndex == 10)
                            {
                                openIframe("", 'none');
                                greyBoxBlurRoomImage.alpha = 1;
                                greyBoxBlurRoomImage.isEnabled = true;
                                examineText.alpha = 1;
                                scrollModal.alpha = 1;
                                scrollModal.isEnabled = true;
                                lincolnMaskBox.alpha = 1;
                                lincolnMaskBox.isEnabled = true;
                                lincolnText1.alpha = 1;
                                lincolnText1.isEnabled = true;
                                waitingMaskBox.alpha = 1;
                                waitingMaskBox.isEnabled = true;
                                waitingText1.alpha = 1;
                                waitingText1.isEnabled = true;
                                engravingMaskBox.alpha = 1;
                                engravingMaskBox.isEnabled = true;
                                engravingText1.alpha = 1;
                                engravingText1.isEnabled = true;
                                frederickMaskBox.alpha = 1;
                                frederickMaskBox.isEnabled = true;
                                frederickText1.alpha = 1;
                                frederickText1.isEnabled = true;
                                fifthMaskBox.alpha = 1;
                                fifthMaskBox.isEnabled = true;
                                fifthText1.alpha = 1;
                                fifthText1.isEnabled = true;
                                menuIsUp = false;
                                openMenu();

                                //Turn off if necessary
                                labelForLearnAboutWaiting.alpha = 0;
                                labelForLearnAboutWaiting.isEnabled = false;
                                learnMoreMenuMaskBox.alpha = 0;
                                learnMoreMenuMaskBox.isEnabled = false;
                                dragging = false;
                            }
                
                            menuBarText.text = textForMenu[currentTextIndex];
                
                        }

                        var jumpToEmanicpation = function()
                        {
                            clearTheExperience();

                            advancedTextureEntrance.isForeground = false;
                            menuTabText.text = "Blue Room";
                            leftArrowBox.isEnabled = true;
                            rightArrowBox.isEnabled = true; 
                            greyBoxBlurRoomImage.alpha = 1;
                            greyBoxBlurRoomImage.isEnabled = true;

                            currentTextIndex = 5;

                            updateText('forward');
                        }

                        var clearTheExperience = function()
                        {
                            //Turn off if necessary
                            examineText.alpha = 0;
                            scrollModal.alpha = 0;
                            scrollModal.isEnabled = false;
                            lincolnMaskBox.alpha = 0;
                            lincolnMaskBox.isEnabled = false;
                            lincolnText1.alpha = 0;
                            lincolnText1.isEnabled = false;
                            waitingMaskBox.alpha = 0;
                            waitingMaskBox.isEnabled = false;
                            waitingText1.alpha = 0;
                            waitingText1.isEnabled = false;
                            engravingMaskBox.alpha = 0;
                            engravingMaskBox.isEnabled = false;
                            engravingText1.alpha = 0;
                            engravingText1.isEnabled = false;
                            frederickMaskBox.alpha = 0;
                            frederickMaskBox.isEnabled = false;
                            frederickText1.alpha = 0;
                            frederickText1.isEnabled = false;
                            fifthMaskBox.alpha = 0;
                            fifthMaskBox.isEnabled = false;
                            fifthText1.alpha = 0;
                            fifthText1.isEnabled = false;

                            dragging = false;

                            greyBoxExplore.alpha = 0;
                            greyBoxExplore.isEnabled = false;
                            redRoomMaskBox.width = "0%";
                            redRoomMaskBox.height = "0%";
                            redRoomText.alpha = 0;
                            blueRoomMaskBox.width = "0%";
                            blueRoomMaskBox.height = "0%";
                            blueRoomText.alpha = 0;
                            greenRoomMaskBox.width = "0%";
                            greenRoomMaskBox.height = "0%";
                            greenRoomText.alpha = 0;
                            exploreText.alpha = 0;
                                                    
                            //architectCalloutButton.alpha = 0;
                            //architectCalloutButton.isEnabled = false;
                            advancedTextureEntrance.isForeground = true;
                            blueRoomButton.isEnabled = true;
                            menuTabText.text = "Welcome";
                            leftArrowBox.isEnabled = false;
                            rightArrowBox.isEnabled = false; 
                
                            if(menuIsUp)
                            {
                                menuIsUp = !menuIsUp;
                                openMenu();
                            }

                            redRoomMaskBox.width = "0%";
                            redRoomMaskBox.height = "0%";
                            redRoomText.alpha = 0;
                            blueRoomMaskBox.width = "0%";
                            blueRoomMaskBox.height = "0%";
                            blueRoomText.alpha = 0;
                            greenRoomMaskBox.width = "0%";
                            greenRoomMaskBox.height = "0%";
                            greenRoomText.alpha = 0;
                            exploreText.alpha = 0;

                            blueRoomImgBox.alpha = 0;
                            blueRoomImgBox.isEnabled = false;
                            wantToLearnMore.alpha = 0;
                            wantToLearnMore.isEnabled = false;
                            learnMoreMaskBox1.alpha = 0;
                            learnMoreMaskBox1.isEnabled = false;
                            learnMoreImgBox1.alpha = 0;
                            learnMoreImgBox1.isEnabled = false;
                            learnMoreText1.alpha = 0;
                            learnMoreText1.isEnabled = false;
                            learnMoreMaskBox2.alpha = 0;
                            learnMoreMaskBox2.isEnabled = false;
                            learnMoreImgBox2.alpha = 0;
                            learnMoreImgBox2.isEnabled = false;
                            learnMoreText2.alpha = 0;
                            learnMoreText2.isEnabled = false;

                            openIframe("", 'none');
                            leftArrowBox.isEnabled = true;
                            leftArrowBox.alpha = 1;
                            rightArrowBox.isEnabled = true;
                            rightArrowBox.alpha = 1;

                            greyBoxBlurRoomImage.alpha = 0;
                            greyBoxBlurRoomImage.isEnabled = false;

                            labelForLearnAboutWaiting.alpha = 0;
                            labelForLearnAboutWaiting.isEnabled = false;
                            learnMoreMenuMaskBox.alpha = 0;
                            learnMoreMenuMaskBox.isEnabled = false;
                        }
                
                        var openMenu = function()
                        {
                            if(menuIsUp)
                            {
                                easyAnimation(menuPicMain, 'top', 30, 0, -27.65, 60); //27.65 used to be 18.4
                                easyFade(menuBarPicAMain, 30, 1, 0, 90);
                                easyFade(menuBarPicBMain, 30, 1, 0, 90);
                                easyFade(menuTabText, 30, 0, 1, 90);
                                easyAnimation(menuPicMainRect, 'top', 30, 27.65, 0, 60);
                            }
                            
                            else
                            {
                                easyAnimation(menuPicMain, 'top', 30, -27.65, 0, 60);
                                easyFade(menuBarPicAMain, 30, 0, 1, 90);
                                easyFade(menuBarPicBMain, 30, 0, 1, 90);
                                easyFade(menuTabText, 30, 1, 0, 90);
                                easyAnimation(menuPicMainRect, 'top', 30, 0, 27.65, 60);
                            }
                        }

                        var easyAnimation = function(control, direction, totalFrames, startPos, endPos, speed)
                        {
                            if(direction == 'top')
                            {
                                var endPosConvert = (canvas.height / 100) * endPos;
                                var startPosConvert = (canvas.height / 100) * startPos;
                            }

                            if(direction == 'left')
                            {
                                var endPosConvert = (canvas.width / 100) * endPos;
                                var startPosConvert = (canvas.width / 100) * startPos;
                            }
    
                            var ease = new CubicEase();
                            ease.setEasingMode(EasingFunction.EASINGMODE_EASEIN);
                            Animation.CreateAndStartAnimation('at1', control, direction, speed, totalFrames, startPosConvert, endPosConvert, 0, ease);
                        }
                
                        var easyFade = function(control, totalFrames, start, end, speed)
                        {
                            Animation.CreateAndStartAnimation('at1', control, 'alpha', speed, totalFrames, start, end, 0);
                        }

                        var easyScale = function(control, totalFrames, startW, endW, startH, endH, speed)
                        {
                            var endHConvert = (canvas.height / 100) * endH;
                            var startHConvert = (canvas.height / 100) * startH;

                            var endWConvert = (canvas.width / 100) * endW;
                            var startWConvert = (canvas.width / 100) * startW;

                            var ease = new CubicEase();
                            ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

                            Animation.CreateAndStartAnimation('at1', control, 'widthInPixels', speed, totalFrames, startWConvert, endWConvert, 0, ease);
                            Animation.CreateAndStartAnimation('at1', control, 'heightInPixels', speed, totalFrames, startHConvert, endHConvert, 0, ease);
                            
                            setAndStartTimer({
                                timeout: 1250,
                                contextObservable: scene.onBeforeRenderObservable,
                                onEnded: () => {
                                    easyFade(welBackgroundRect, 30, 1, 0, 90);

                                    setAndStartTimer({
                                        timeout: 1000,
                                        contextObservable: scene.onBeforeRenderObservable,
                                        onEnded: () => {
                                            easyFade(welcomeBox, 30, 0, 0.97, 90);
                                            easyFade(exitMenuButton, 30, 0, 1, 90);
                                            exitMenuButton.isEnabled = true;
                                        }
                                        });
                                }
                                });

                            
                        }

                        var pickRoomModals = function ( totalFrames, startW, endW, startH, endH, speed)
                        {
                            easyFade(greyBoxExplore, 30, 0, 1, 90);

                            var endHConvert = (canvas.height / 100) * endH;
                            var startHConvert = (canvas.height / 100) * startH;

                            var endWConvert = (canvas.width / 100) * endW;
                            var startWConvert = (canvas.width / 100) * startW;

                            var ease = new CubicEase();
                            ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

                            setAndStartTimer({
                                timeout: 1250,
                                contextObservable: scene.onBeforeRenderObservable,
                                onEnded: () => {
                                    easyFade(exploreText, 30, 0, 1, 90);

                                    setAndStartTimer({
                                        timeout: 1000,
                                        contextObservable: scene.onBeforeRenderObservable,
                                        onEnded: () => {
                                            easyFade(redRoomMaskBox, 30, 0, 1, 90);
                                            easyFade(redRoomText, 30, 0, 1, 30);
                                            Animation.CreateAndStartAnimation('at1', redRoomMaskBox, 'widthInPixels', speed, totalFrames, startWConvert, endWConvert, 0, ease);
                                            Animation.CreateAndStartAnimation('at1', redRoomMaskBox, 'heightInPixels', speed, totalFrames, startHConvert, endHConvert, 0, ease);
                                            easyFade(blueRoomMaskBox, 30, 0, 1, 90);
                                            easyFade(blueRoomText, 30, 0, 1, 30);
                                            Animation.CreateAndStartAnimation('at1', blueRoomMaskBox, 'widthInPixels', speed, totalFrames, startWConvert, endWConvert, 0, ease);
                                            Animation.CreateAndStartAnimation('at1', blueRoomMaskBox, 'heightInPixels', speed, totalFrames, startHConvert, endHConvert, 0, ease);
                                            easyFade(greenRoomMaskBox, 30, 0, 1, 90);
                                            easyFade(greenRoomText, 30, 0, 1, 30);
                                            Animation.CreateAndStartAnimation('at1', greenRoomMaskBox, 'widthInPixels', speed, totalFrames, startWConvert, endWConvert, 0, ease);
                                            Animation.CreateAndStartAnimation('at1', greenRoomMaskBox, 'heightInPixels', speed, totalFrames, startHConvert, endHConvert, 0, ease);
                                            exitMenuButton.isEnabled = true;

                                            setAndStartTimer({
                                                timeout: 1500,
                                                contextObservable: scene.onBeforeRenderObservable,
                                                onEnded: () => {
                                                    redRoomMaskBox.width = "28.125%"; //"540px";
                                                    redRoomMaskBox.height = "27.77%"; //"300px";
                                                    blueRoomMaskBox.width = "28.125%"; //"540px";
                                                    blueRoomMaskBox.height = "27.77%"; //"300px";
                                                    greenRoomMaskBox.width = "28.125%"; //"540px";
                                                    greenRoomMaskBox.height = "27.77%"; //"300px";
                                                }
                                                });
                                        }
                                        });
                                }
                                });
                        }
        
                        var openIframe = function(URL, styleDisplay)
                        {
                            //iframe start
                            let iframe = document.getElementById("iframe_custom");
        
                            iframe.src = URL;
                            iframe.style.display = styleDisplay;
                        }

                        var closeNavigation = function ()
                        {
                            easyAnimation(navBackgroundRect, 'left', 30, 0, -100, 90);
                            easyAnimation(entranceRect, 'left', 30, 30, 0, 90);
                            easyAnimation(constantRect, 'left', 30, 30, 0, 90);
                            easyAnimation(label, 'left', 30, 30, 0, 90);
                            easyAnimation(greyBoxBlurRoomImage, 'left', 30, 30, 0, 90);
                        }
                
//#region Entrance
                        var advancedTextureEntrance = AdvancedDynamicTexture.CreateFullscreenUI("ui0");
                        advancedTextureEntrance.isForeground = true;
                        
                        var entranceRect = new Rectangle("entranceContainer");
                        entranceRect.width = "100%";
                        entranceRect.height = "100%";
                        entranceRect.color = "transparent";
                        advancedTextureEntrance.addControl(entranceRect);

                        var imgA = new Image();
                        imgA.color = "transparent";
                        imgA.source = "https://i.imgur.com/pQo0dPM.jpg";
                        entranceRect.addControl(imgA);

                        var imgB = new Image();
                        imgB.color = "transparent";
                        imgB.source = "https://i.imgur.com/pQo0dPM.jpg";
                        entranceRect.addControl(imgB);
            
                    
//#region Menu Box
                        var welcomeBox = new Rectangle("label for welcome box" );
                        welcomeBox.width = "50%"; // 960px
                        welcomeBox.height = "38.88%"; //420px
                        welcomeBox.color = "transparent";
                        welcomeBox.background = "#2B3E56";
                        welcomeBox.shadowColor = "#00000066";
                        welcomeBox.shadowBlur = 6;
                        welcomeBox.shadowOffsetX = 3;
                        welcomeBox.shadowOffsetY = 3;
                        welcomeBox.alpha = 0;
                        welcomeBox.zIndex = 0;
                        welcomeBox.left = "25%";
                        welcomeBox.top = "28%";
                        welcomeBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        welcomeBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        entranceRect.addControl(welcomeBox);
                
                        var welcomeText = new TextBlock("Welcome");
                        welcomeText.fontFamily = "Calendas Plus";
                        welcomeText.textWrapping = true;
                        welcomeText.width = "87.5%"; //840px
                        welcomeText.height = "9.5%"; //40px
                        welcomeText.text = "Welcome!";
                        welcomeText.color = "white";
                        welcomeText.fontSize = "10%"; //40px
                        welcomeText.top = "16.5%"; // 75px
                        welcomeText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        welcomeText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        welcomeBox.addControl(welcomeText);
                
                        var navButtonMenu = Button.CreateSimpleButton("navButtonMenu", "");
                        navButtonMenu.width = "12.5%"; //"120px";
                        navButtonMenu.height = "19.05%"; //"80px";
                        navButtonMenu.color = "#2B3E56";
                        navButtonMenu.background = "#2B3E56";
                        navButtonMenu.shadowColor = "#0000004D";
                        navButtonMenu.shadowBlur = 6;
                        navButtonMenu.shadowOffsetX = 2;
                        navButtonMenu.shadowOffsetY = 2;
                        navButtonMenu.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        navButtonMenu.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        navButtonMenu.left = "12.5%"; //120px
                        navButtonMenu.top = "39.04%"; //164px
                        welcomeBox.addControl(navButtonMenu);

                        var navButtonMenuStroke = new Rectangle("label for button stroke" );
                        navButtonMenuStroke.width = "95%"; //"114px";
                        navButtonMenuStroke.height = "92.5%" //"74px";
                        navButtonMenuStroke.left = ".75%";
                        navButtonMenuStroke.top = "0.75%";
                        navButtonMenuStroke.color = "white";
                        navButtonMenu.addControl(navButtonMenuStroke);

                        var navButtonMenuImg = new Image();
                        navButtonMenuImg.color = "transparent";
                        navButtonMenuImg.width = "50%"; //57.4px
                        navButtonMenuImg.height = "47%"; //35.43px
                        navButtonMenuImg.top = "16%"; //11.23px
                        navButtonMenuImg.source = "https://i.imgur.com/cmNSnse.png";
                        navButtonMenuImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        navButtonMenuImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        navButtonMenu.addControl(navButtonMenuImg);

                        var navButtonMenuText = new TextBlock("navButtonText");    
                        navButtonMenuText.fontFamily = "Calendas Plus";
                        navButtonMenuText.textWrapping = true;
                        navButtonMenuText.width = "99.16%"; //119px
                        navButtonMenuText.height = "22%"; //15px
                        navButtonMenuText.text = "Navigation";
                        navButtonMenuText.color = "white";
                        navButtonMenuText.fontSize = "19%"; //14px
                        navButtonMenuText.top = "70%"; //57px
                        navButtonMenuText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        navButtonMenuText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        navButtonMenu.addControl(navButtonMenuText);
                
                        var navText = new TextBlock("navText");    
                        navText.fontFamily = "Calendas Plus";
                        navText.textWrapping = true;
                        navText.width = "25%"; //240px
                        navText.height = "12.85%"; //54px
                        navText.left = "6.25%"; //60px
                        navText.text = "Access the main chapters of this experience";
                        navText.color = "white";
                        navText.fontSize = "5%"; //20px
                        navText.top = "62.85%"; //264px
                        navText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        navText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        welcomeBox.addControl(navText);
                
                        var arrowImgMenuA = new Image();
                        arrowImgMenuA.color = "transparent";
                        arrowImgMenuA.width = "4.125%"; //36px
                        arrowImgMenuA.height = "10.71%"; //36px
                        arrowImgMenuA.top = "43%"; //193.5px
                        arrowImgMenuA.left = "-1.25%"; //-12px
                        arrowImgMenuA.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgMenuA.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        arrowImgMenuA.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welcomeBox.addControl(arrowImgMenuA);
                
                        var arrowImgMenuB = new Image();
                        arrowImgMenuB.color = "transparent";
                        arrowImgMenuB.alpha = 0.60;
                        arrowImgMenuB.width = "4.125%"; //36px
                        arrowImgMenuB.height = "10.71%"; //36px
                        arrowImgMenuB.top = "43%"; //193.5px
                        arrowImgMenuB.left = "0px";
                        arrowImgMenuB.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgMenuB.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        arrowImgMenuB.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welcomeBox.addControl(arrowImgMenuB);
                
                        var arrowImgMenuC = new Image();
                        arrowImgMenuC.color = "transparent";
                        arrowImgMenuC.alpha = 0.30;
                        arrowImgMenuC.width = "4.125%"; //36px
                        arrowImgMenuC.height = "10.71%"; //36px
                        arrowImgMenuC.top = "43%"; //193.5px
                        arrowImgMenuC.left = "1.25%"; //12px
                        arrowImgMenuC.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgMenuC.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        arrowImgMenuC.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welcomeBox.addControl(arrowImgMenuC);
                
                        var arrowText = new TextBlock("arrowText");
                        arrowText.fontFamily = "Calendas Plus";
                        arrowText.textWrapping = true;
                        arrowText.width = "25%"; //240px
                        arrowText.height = "12.85%"; //54px
                        arrowText.left = "37.5%"; //360px
                        arrowText.text = "User arrows to navigate through the room";
                        arrowText.color = "white";
                        arrowText.fontSize = "5%"; //20px
                        arrowText.top = "62.85%"; //264px
                        arrowText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        arrowText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        welcomeBox.addControl(arrowText);
                
                        var menuPic = new Rectangle("menuPic" );
                        menuPic.width = "25%"; //240px
                        menuPic.height = "9.5%"; //40px
                        menuPic.color = "white";
                        menuPic.background = "#2B3E56";
                        menuPic.shadowColor = "#0000004D";
                        menuPic.shadowBlur = 6;
                        menuPic.shadowOffsetX = 2;
                        menuPic.shadowOffsetY = 2;
                        menuPic.left = "68.75%"; //660px
                        menuPic.top = "44%"; //185px
                        menuPic.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        menuPic.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        welcomeBox.addControl( menuPic);
                
                        var menuBarPicA = new Rectangle("menuBarPicA" );
                        menuBarPicA.width = "20.83%"; //50px
                        menuBarPicA.height = "7.5%"; //2px
                        menuBarPicA.color = "transparent";
                        menuBarPicA.background = "#D9D9D9";
                        menuBarPicA.leftInPixels = 0;
                        menuBarPicA.top = "37.5%"; //15px
                        menuBarPicA.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        menuBarPicA.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        menuPic.addControl( menuBarPicA);
                
                        var menuBarPicB = new Rectangle("menuBarPicB" );
                        menuBarPicB.width = "20.83%"; //50px
                        menuBarPicB.height = "7.5%"; //2px
                        menuBarPicB.color = "transparent";
                        menuBarPicB.background = "#D9D9D9";
                        menuBarPicB.leftInPixels = 0;
                        menuBarPicB.top = "62.5%"; //25px
                        menuBarPicB.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        menuBarPicB.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        menuPic.addControl( menuBarPicB);
                
                        var menuText = new TextBlock("menuText");
                        menuText.fontFamily = "Calendas Plus";
                        menuText.textWrapping = true;
                        menuText.width = "25%"; //240px
                        menuText.height = "12.85%"; // 54px
                        menuText.left = "68.75%"; //660px
                        menuText.text = "Click on tab to open and close additional features";
                        menuText.color = "white";
                        menuText.fontSize = "5%"; //20px
                        menuText.top = "62.85%"; //264px
                        menuText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        menuText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        welcomeBox.addControl(menuText);
                
                        var exitMenuButton = Button.CreateSimpleButton("exitMenuButton", "X");
                        exitMenuButton.width = "2.29%"; //44px
                        exitMenuButton.height = "4%"; //44px
                        exitMenuButton.color = "transparent";
                        exitMenuButton.cornerRadius = 0;
                        exitMenuButton.background = "white";
                        exitMenuButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        exitMenuButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        exitMenuButton.left = "-23.85%"; //1418px
                        exitMenuButton.top = "25.74%"; //278px
                        exitMenuButton.alpha = 0;
                        exitMenuButton.onPointerUpObservable.add(function() {
                            exitMenuButton.isEnabled = false;
                            leftArrowBox.scaleX = .65;
                            leftArrowBox.scaleY = .65;
                            leftArrowBox.left = "-50px";
                            rightArrowBox.scaleX = .65;
                            rightArrowBox.scaleY = .65;
                            rightArrowBox.left = "50px";
                            easyFade(welcomeBox, 30, 1, 0, 60);
                            easyFade(exitMenuButton, 30, 1, 0, 60);
                            menuIsUp = true;
                            openMenu();
                        });
                        entranceRect.addControl(exitMenuButton);
                        
                        var xButton = new Image();
                        xButton.color = "black";
                        xButton.width = "35%"; //12px
                        xButton.height = "35%"; //12px
                        xButton.source = "https://i.imgur.com/YH78eY3.png";
                        xButton.left = ".75%";
                        xButton.top = ".75%";
                        xButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        xButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        exitMenuButton.addControl(xButton);
//#endregion
                
//#region Explore a room
                        var greyBoxExplore = new Rectangle("label for explore box" );
                        greyBoxExplore.widthInPixels = "100%";
                        greyBoxExplore.heightInPixels = "100%";
                        greyBoxExplore.color = "transparent";
                        greyBoxExplore.background = "#00000099";
                        greyBoxExplore.alpha = 0;
                        greyBoxExplore.isEnabled = false;
                        greyBoxExplore.zIndex = 1;
                        greyBoxExplore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        greyBoxExplore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        entranceRect.addControl(greyBoxExplore);
                
                        var exploreText = new TextBlock("Explore");
                        exploreText.fontFamily = "Calendas Plus";
                        exploreText.fontWeight = "100";
                        exploreText.textWrapping = true;
                        exploreText.width = "50%"; //"885px";
                        exploreText.height = "5%"; //"40px";
                        exploreText.text = "Ok! Which room would you like to explore?";
                        exploreText.color = "white";
                        exploreText.alpha = 0;
                        exploreText.fontSize = "4%" //40px;
                        exploreText.top = "16.66%" //"180px";
                        exploreText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        exploreText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        greyBoxExplore.addControl(exploreText);
                
//#region Red room
                            var redRoomMaskBox = new Rectangle("label for red room mask" );
                            redRoomMaskBox.width = "28.125%"; //"540px";
                            redRoomMaskBox.height = "27.77%"; //"300px";
                            redRoomMaskBox.color = "transparent";
                            redRoomMaskBox.alpha = 0;
                            redRoomMaskBox.background = "transparent";
                            redRoomMaskBox.cornerRadius = 10;
                            redRoomMaskBox.top = "-3%"; //"0px";
                            redRoomMaskBox.left = "-31.25%"; //"-600px";
                            redRoomMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            redRoomMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            greyBoxExplore.addControl(redRoomMaskBox);

                            var redRoom = new Image();
                            redRoom.color = "transparent";
                            redRoom.width = "100%"; //"540px";
                            redRoom.height = "100%"; //"300px";
                            redRoom.source = "https://i.imgur.com/Tjrsr1N.jpg";
                            redRoom.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            redRoom.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            redRoomMaskBox.addControl(redRoom);
                
                            var redRoomText = new TextBlock("redRoomText");
                            redRoomText.fontFamily = "Calendas Plus";
                            redRoomText.underline = true;
                            redRoomText.textWrapping = true;
                            redRoomText.width = "14.01%"; //"269px";
                            redRoomText.height = "2.87%"; //"31px";
                            redRoomText.text = "Red Room";
                            redRoomText.color = "white";
                            redRoomText.alpha = 0;
                            redRoomText.fontSize = "2.25%"; //"30px";
                            redRoomText.top = "65.3%"; //"705.33px";
                            redRoomText.left = "11.77%"; //"226px";
                            redRoomText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            redRoomText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            greyBoxExplore.addControl(redRoomText);

//#endregion
                
//#region Blue room
                            var blueRoomMaskBox = new Rectangle("label for blue room mask" );
                            blueRoomMaskBox.width = "28.125%"; //"540px";
                            blueRoomMaskBox.height = "27.77%"; //"300px";
                            blueRoomMaskBox.color = "transparent";
                            blueRoomMaskBox.alpha = 0;
                            blueRoomMaskBox.background = "transparent";
                            blueRoomMaskBox.cornerRadius = 10;
                            blueRoomMaskBox.top = "-3%"; //"0px";
                            blueRoomMaskBox.left = "0%"; //"960px";
                            blueRoomMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            blueRoomMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            greyBoxExplore.addControl(blueRoomMaskBox);

                            var blueRoom = new Image();
                            blueRoom.color = "transparent";
                            blueRoom.width = "100%"; //"540px";
                            blueRoom.height = "100%"; //"300px";
                            blueRoom.source = "https://i.imgur.com/oE5zBb7.jpg";
                            blueRoom.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            blueRoom.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            blueRoomMaskBox.addControl(blueRoom);

                            var blueRoomMaskBoxStroke = new Rectangle("label for blue room mask" );
                            blueRoomMaskBoxStroke.width = "95.83%"; //"540px";
                            blueRoomMaskBoxStroke.height = "90%"; //"300px";
                            blueRoomMaskBoxStroke.color = "white";
                            blueRoomMaskBoxStroke.alpha = 0;
                            blueRoomMaskBoxStroke.background = "transparent";
                            blueRoomMaskBoxStroke.cornerRadius = 10;
                            blueRoomMaskBoxStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            blueRoomMaskBoxStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            blueRoomMaskBox.addControl(blueRoomMaskBoxStroke);
                
                            var blueRoomButton = Button.CreateSimpleButton("blueRoomButton", "");
                            blueRoomButton.width = "28.125%"; //"540px";
                            blueRoomButton.height = "27.77%"; //"300px";
                            blueRoomButton.color = "transparent";
                            blueRoomButton.background = "transparent";
                            blueRoomButton.left = "35.9375%"; //"690px";
                            blueRoomButton.top = "33.46%"; //361.33px"
                            blueRoomButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            blueRoomButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            blueRoomButton._onPointerEnter = function()
                            {
                                blueRoomMaskBoxStroke.alpha = 1;
                            }
                            blueRoomButton._onPointerOut = function()
                            {
                                blueRoomMaskBoxStroke.alpha = 0;
                            }
                            blueRoomButton.onPointerUpObservable.add(function() {
                                updateText('forward');
                            });
                            greyBoxExplore.addControl( blueRoomButton);
                
                            var blueRoomText = new TextBlock("blueRoomText");
                            blueRoomText.fontFamily = "Calendas Plus";
                            blueRoomText.underline = true;
                            blueRoomText.textWrapping = true;
                            blueRoomText.width = "14.01%"; //"269px";
                            blueRoomText.height = "2.87%"; //"31px";
                            blueRoomText.text = "Blue Room";
                            blueRoomText.color = "white";
                            blueRoomText.alpha = 0;
                            blueRoomText.fontSize = "2.25%"; //"30px";
                            blueRoomText.top = "65.3%"; //"705.33px";
                            blueRoomText.left = "43.02%"; //"826px";
                            blueRoomText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            blueRoomText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            greyBoxExplore.addControl(blueRoomText);

//#endregion
                
//#region Green room
                            var greenRoomMaskBox = new Rectangle("label for blue room mask" );
                            greenRoomMaskBox.width = "28.125%"; //"540px";
                            greenRoomMaskBox.height = "27.77%"; //"300px";
                            greenRoomMaskBox.color = "transparent";
                            greenRoomMaskBox.alpha = 0;
                            greenRoomMaskBox.background = "transparent";
                            greenRoomMaskBox.cornerRadius = 10;
                            greenRoomMaskBox.top = "-3%"; //"0px";
                            greenRoomMaskBox.left = "31.25%"; //"600px";
                            greenRoomMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            greenRoomMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            greyBoxExplore.addControl(greenRoomMaskBox);

                            var greenRoom = new Image();
                            greenRoom.color = "transparent";
                            greenRoom.width = "100%"; //"540px";
                            greenRoom.height = "100%"; //"300px";
                            greenRoom.source = "https://i.imgur.com/OKpC4ma.jpg";
                            greenRoom.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            greenRoom.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            greenRoomMaskBox.addControl(greenRoom);
                
                            var greenRoomText = new TextBlock("blueRoomText");
                            greenRoomText.fontFamily = "Calendas Plus";
                            greenRoomText.underline = true;
                            greenRoomText.textWrapping = true;
                            greenRoomText.width = "14.01%"; //"269px";
                            greenRoomText.height = "2.87%"; //"31px";
                            greenRoomText.text = "Green Room";
                            greenRoomText.color = "white";
                            greenRoomText.alpha = 0;
                            greenRoomText.fontSize = "2.25%"; //"30px";
                            greenRoomText.top = "65.3%"; //"705.33px";
                            greenRoomText.left = "74.27%"; //"1426px";
                            greenRoomText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            greenRoomText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            greyBoxExplore.addControl(greenRoomText);

//#endregion
                    
//#endregion

//#endregion

//#region Blue room Main
                        var advancedTextureBlueRoom = AdvancedDynamicTexture.CreateFullscreenUI("ui1");
                
                        var label = new Rectangle("label for " );
                        label.alpha = 1;
                        label.color = "transparent";
                        label.left = "0px";
                        label.zIndex = 0;
                        label.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        label.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;    
                        advancedTextureBlueRoom.addControl(label); 
                
                        advancedTextureBlueRoom.isForeground = false;
                
                        var img1 = new Image();
                        img1.width = "100%";
                        img1.height = "100%";
                        img1.source = "https://i.imgur.com/UdjG5kC.png";
                        img1.color = "transparent";
                        label.addControl(img1);
                
                        var img2 = new Image();
                        img2.width = "100%";
                        img2.height = "100%";
                        img2.source = "https://i.imgur.com/7FFbnuK.png";
                        img2.color = "transparent";
                        img2.zIndex = 1;
                        label.addControl(img2);
//#endregion
                
//#region Grey Box Blur                
                        var greyBoxBlurRoomImage = new Rectangle("label for blue room box" );
                        greyBoxBlurRoomImage.widthInPixels = "100%";
                        greyBoxBlurRoomImage.heightInPixels = "100%";
                        greyBoxBlurRoomImage.color = "transparent";
                        greyBoxBlurRoomImage.background = "#00000099";
                        greyBoxBlurRoomImage.alpha = 0;
                        greyBoxBlurRoomImage.isEnabled = false;
                        greyBoxBlurRoomImage.zIndex = 0;
                        greyBoxBlurRoomImage.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        greyBoxBlurRoomImage.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        advancedTextureBlueRoom.addControl(greyBoxBlurRoomImage);
//#endregion

//#region Blue room Modal
                        var blueRoomImgBox = new Image();
                        blueRoomImgBox.color = "transparent";
                        blueRoomImgBox.width = "34.42%"; //"660.92px";
                        blueRoomImgBox.height = "42%"; //"453.91px";
                        blueRoomImgBox.top = "24.81%"; //"268px"
                        blueRoomImgBox.source = "https://i.imgur.com/Tp1vaBN.jpg";
                        blueRoomImgBox.alpha = 0;
                        blueRoomImgBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        blueRoomImgBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        greyBoxBlurRoomImage.addControl(blueRoomImgBox);
//#endregion
                
//#region want to learn more?
                        var wantToLearnMore = new TextBlock("wantToLearnMore");
                        wantToLearnMore.fontFamily = "Calendas Plus";
                        wantToLearnMore.textWrapping = true;
                        wantToLearnMore.width = "37.5%"; //"720px";
                        wantToLearnMore.height = "3.7%"; //"40px";
                        wantToLearnMore.text = "Want to learn more? Select an event…";
                        wantToLearnMore.color = "white";
                        wantToLearnMore.fontSize = "3.7%"; //"40px";
                        wantToLearnMore.top = "16.66%"; //"180px";
                        wantToLearnMore.left = "31.25%"; //"600px";
                        wantToLearnMore.alpha = 0;
                        wantToLearnMore.isEnabled = false;
                        wantToLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        wantToLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(wantToLearnMore);

//#region Learn more box 1
                        var learnMoreMaskBox1 = new Rectangle("label for image 1 mask" );
                        learnMoreMaskBox1.width = "28.125%"; //"540px";
                        learnMoreMaskBox1.height = "27.77%"; //"300px";
                        learnMoreMaskBox1.color = "transparent";
                        learnMoreMaskBox1.background = "transparent";
                        learnMoreMaskBox1.cornerRadius = 10;
                        learnMoreMaskBox1.top = "33.33%"; //"360px";
                        learnMoreMaskBox1.left = "18.75%"; //"360px";
                        learnMoreMaskBox1.alpha = 0;
                        learnMoreMaskBox1.isEnabled = false;
                        learnMoreMaskBox1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        learnMoreMaskBox1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(learnMoreMaskBox1);
                
                        var learnMoreImgBox1 = Button.CreateImageOnlyButton("but1", "https://i.imgur.com/Tp1vaBN.jpg");
                        learnMoreImgBox1.color = "white";
                        learnMoreImgBox1.width = "104.64%"; //"565px";
                        learnMoreImgBox1.height = "129%"; //"387px";
                        learnMoreImgBox1.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        learnMoreImgBox1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        learnMoreImgBox1.onPointerClickObservable.add(function() {
                            updateText('forward');
                        });
                        learnMoreMaskBox1.addControl(learnMoreImgBox1);
                
                        var learnMoreText1 = new TextBlock("learnMoreText1");
                        learnMoreText1.fontFamily = "Calendas Plus";
                        learnMoreText1.underline = true;
                        learnMoreText1.textWrapping = true;
                        learnMoreText1.width = "26%"; //"500px";
                        learnMoreText1.height = "5%"; //"54px";
                        learnMoreText1.text = "Signing of the Emancipation Proclamation following the New Year Day’s Reception";
                        learnMoreText1.color = "white";
                        learnMoreText1.fontSize = "2.25%"; //"24px";
                        learnMoreText1.top = "64.8%"; //"700px";
                        learnMoreText1.left = "19.8%"; //"380px";
                        learnMoreText1.alpha = 0;
                        learnMoreText1.isEnabled = false;
                        learnMoreText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        learnMoreText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(learnMoreText1);
//#endregion

//#region Learn more box 2
                        var learnMoreMaskBox2 = new Rectangle("label for image 2 mask" );
                        learnMoreMaskBox2.width = "28.125%"; //"540px";
                        learnMoreMaskBox2.height = "27.77%"; //"300px";
                        learnMoreMaskBox2.color = "transparent";
                        learnMoreMaskBox2.background = "transparent";
                        learnMoreMaskBox2.cornerRadius = 10;
                        learnMoreMaskBox2.top = "33.33%"; //"360px";
                        learnMoreMaskBox2.left = "53.125%"; //"1020px";
                        learnMoreMaskBox2.alpha = 0;
                        learnMoreMaskBox2.isEnabled = false;
                        learnMoreMaskBox2.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        learnMoreMaskBox2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(learnMoreMaskBox2);
                
                        var learnMoreImgBox2 = new Image();
                        learnMoreImgBox2.color = "transparent";
                        learnMoreImgBox2.width = "103.5%"; //"559px";
                        learnMoreImgBox2.height = "110.66%"; //"332px";
                        learnMoreImgBox2.top = "-2%"; //"-6px";
                        learnMoreImgBox2.source = "https://i.imgur.com/AFVeTwe.jpg";
                        learnMoreImgBox2.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        learnMoreImgBox2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        learnMoreMaskBox2.addControl(learnMoreImgBox2);
                
                        var learnMoreText2 = new TextBlock("learnMoreText2");
                        learnMoreText2.fontFamily = "Calendas Plus";
                        learnMoreText2.underline = true;
                        learnMoreText2.textWrapping = true;
                        learnMoreText2.width = "21.875%"; //"420px";
                        learnMoreText2.height = "5%"; //"54px";
                        learnMoreText2.text = "President Ulysses S. Grant hosts King Kalahaua of the Kingdom of Hawaii";
                        learnMoreText2.color = "white";
                        learnMoreText2.fontSize = "2.25%"; //"24px";
                        learnMoreText2.top = "64.8%"; //"700px";
                        learnMoreText2.left = "56.25%"; //"1080px";
                        learnMoreText2.alpha = 0;
                        learnMoreText2.isEnabled = false;
                        learnMoreText2.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        learnMoreText2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(learnMoreText2);
//#endregion

//#endregion

//#region Examine Modal

//#region examine Text
                        var examineText = new TextBlock("examineText");
                        examineText.fontFamily = "Calendas Plus";
                        examineText.textWrapping = true;
                        examineText.width = "51%"; //"979px";
                        examineText.height = "8.4%"; //"80px";
                        examineText.text = "Examine the different topics and primary sources related to the Emancipation Proclamation";
                        examineText.color = "white";
                        examineText.fontSize = "3.7%"; //"40px";
                        examineText.top = "16.66%"; //"180px";
                        examineText.left = "24.5%"; //"471px";
                        examineText.alpha = 0;
                        examineText.isEnabled = false;
                        examineText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        examineText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(examineText);

//#endregion
                        var scrollModal = new Rectangle("label for scroll modal")
                        scrollModal.width = "156.25%"; //"3000px";
                        scrollModal.height = "44.44%"; //"480px";
                        scrollModal.color = "transparent";
                        scrollModal.background = "transparent";
                        scrollModal.cornerRadius = 10;
                        scrollModal.top = "33.33%"; //"360px";
                        scrollModal.left = "9.375%"; //"180px";
                        scrollModal.alpha = 0;
                        scrollModal.isEnabled = false;
                        scrollModal.isPointerBlocker = true;
                        scrollModal.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        scrollModal.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        scrollModal.onPointerUpObservable.add(ev => {
                            dragging = false;
                            scrollModal.isPointerBlocker = true;
                            waitingImgBox.isPointerBlocker = true;
                            camera.attachControl(canvas, true);
                            console.log("done dragging");
                        })
                        scrollModal.onPointerDownObservable.add(ev => {
                            dragging = true;
                            mouseStart.x = scene.pointerX;
                            mouseStart.y = scene.pointerY;
                            camera.detachControl();
                            scrollModal.isPointerBlocker = false;
                            waitingImgBox.isPointerBlocker = false;
                        });  
                        scrollModal.onPointerMoveObservable.add(ev => {
                            if(dragging)
                            {
                                if(scrollModal.leftInPixels < 200 && scrollModal.leftInPixels > -2500)
                                {
                                    const deltaX = scene.pointerX - mouseStart.x;
                                    scrollModal.leftInPixels += deltaX;
                                    mouseStart.x = scene.pointerX;
                                }
        
                                else
                                {
                                    if(scrollModal.leftInPixels > 200)
                                    {
                                        scrollModal.leftInPixels = 199;
                                    }

                                    if(scrollModal.leftInPixels < -2500)
                                    {
                                        scrollModal.leftInPixels = -2499;
                                    }
                                }
                            }
                            
                        })
                        greyBoxBlurRoomImage.addControl(scrollModal);

//#region Lincoln Option
                        var lincolnMaskBox = new Rectangle("label for licoln mask" );
                        lincolnMaskBox.width = "18%"; //"540px";
                        lincolnMaskBox.height = "62.5%"; //"300px";
                        lincolnMaskBox.color = "transparent";
                        lincolnMaskBox.background = "transparent";
                        lincolnMaskBox.cornerRadius = 10;
                        lincolnMaskBox.top = "12.5%"; //"60px";
                        lincolnMaskBox.left = "0%"; //"0px";
                        lincolnMaskBox.alpha = 0;
                        lincolnMaskBox.isEnabled = false;
                        lincolnMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        lincolnMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(lincolnMaskBox);
                
                        var lincolnImgBox = new Image();
                        lincolnImgBox.color = "transparent";
                        lincolnImgBox.width = "120.55%"; //"651px";
                        lincolnImgBox.height = "287.33%"; //"862px";
                        lincolnImgBox.top = "55%"; //"165px";
                        lincolnImgBox.source = "https://i.imgur.com/H0DrJX2.jpg";
                        lincolnImgBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        lincolnImgBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        lincolnMaskBox.addControl(lincolnImgBox);

                        var lincolnText1 = new TextBlock("lincolnText1");
                        lincolnText1.fontFamily = "Calendas Plus";
                        lincolnText1.underline = true;
                        lincolnText1.textWrapping = true;
                        lincolnText1.width = "16.17%"; //"485px";
                        lincolnText1.height = "6.46%"; //"31px";
                        lincolnText1.text = "Lincoln’s View on Slavery";
                        lincolnText1.color = "white";
                        lincolnText1.fontSize = "6.25%"; //"30px";
                        lincolnText1.top = "82.1%"; //"394px";
                        lincolnText1.left = ".33%"; //"10px";
                        lincolnText1.alpha = 0;
                        lincolnText1.isEnabled = false;
                        lincolnText1.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        lincolnText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        lincolnText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(lincolnText1);
//#endregion

//#region waiting option
                        var waitingMaskBox = new Rectangle("label for waiting mask" );
                        waitingMaskBox.width = "18%"; //"540px";
                        waitingMaskBox.height = "62.5%"; //"300px";
                        waitingMaskBox.color = "transparent";
                        waitingMaskBox.background = "transparent";
                        waitingMaskBox.cornerRadius = 10;
                        waitingMaskBox.top = "12.5%"; //"60px";
                        waitingMaskBox.left = "19%"; //"570px";
                        waitingMaskBox.alpha = 0;
                        waitingMaskBox.isEnabled = false;
                        waitingMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        waitingMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(waitingMaskBox);
                
                        var waitingImgBox = Button.CreateImageOnlyButton("", "https://i.imgur.com/FosX3Gu.jpg");
                        waitingImgBox.color = "transparent";
                        waitingImgBox.width = "100.37%"; //"542px";
                        waitingImgBox.height = "145.66%"; //"437px";
                        waitingImgBox.source = "https://i.imgur.com/FosX3Gu.jpg";
                        waitingImgBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        waitingImgBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        waitingImgBox.onPointerClickObservable.add(function() {
                            learnMoreWaiting();
                        });
                        waitingMaskBox.addControl(waitingImgBox);


                        var waitingText1 = new TextBlock("waitingText1");
                        waitingText1.fontFamily = "Calendas Plus";
                        waitingText1.underline = true;
                        waitingText1.textWrapping = true;
                        waitingText1.width = "16.17%"; //"485px";
                        waitingText1.height = "6.46%"; //"31px";
                        waitingText1.text = "Waiting for the Hour";
                        waitingText1.color = "white";
                        waitingText1.fontSize = "6.25%"; //"30px";
                        waitingText1.top = "82.1%"; //"394px";
                        waitingText1.left = "19.33%"; //"760px";
                        waitingText1.alpha = 0;
                        waitingText1.isEnabled = false;
                        waitingText1.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        waitingText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        waitingText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(waitingText1);
//#endregion

//#region Engraving Option
                        var engravingMaskBox = new Rectangle("label for engraving mask" );
                        engravingMaskBox.width = "18%"; //"540px";
                        engravingMaskBox.height = "62.5%"; //"300px";
                        engravingMaskBox.color = "transparent";
                        engravingMaskBox.background = "transparent";
                        engravingMaskBox.cornerRadius = 10;
                        engravingMaskBox.top = "12.5%"; //"60px";
                        engravingMaskBox.left = "38%"; //"1320px";
                        engravingMaskBox.alpha = 0;
                        engravingMaskBox.isEnabled = false;
                        engravingMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        engravingMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(engravingMaskBox);
                
                        var engravingImgBox = new Image();
                        engravingImgBox.color = "transparent";
                        engravingImgBox.width = "124.25%"; //"671px";
                        engravingImgBox.height = "156.66%"; //"470px";
                        engravingImgBox.source = "https://i.imgur.com/Vk7p04O.jpg";
                        engravingImgBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        engravingImgBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        engravingMaskBox.addControl(engravingImgBox);

                        var engravingText1 = new TextBlock("engravingText1");
                        engravingText1.fontFamily = "Calendas Plus";
                        engravingText1.underline = true;
                        engravingText1.textWrapping = true;
                        engravingText1.width = "16.17%"; //"485px";
                        engravingText1.height = "13.54%"; //"65px";
                        engravingText1.text = "Engraving: The First Reading of the Emancipation Proclamation";
                        engravingText1.color = "white";
                        engravingText1.fontSize = "6.25%"; //"30px";
                        engravingText1.top = "82.1%"; //"394px";
                        engravingText1.left = "38.33%"; //"1330px";
                        engravingText1.alpha = 0;
                        engravingText1.isEnabled = false;
                        engravingText1.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        engravingText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        engravingText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(engravingText1);
//#endregion

//#region Frederick Option
                        var frederickMaskBox = new Rectangle("label for frederick mask" );
                        frederickMaskBox.width = "18%"; //"540px";
                        frederickMaskBox.height = "62.5%"; //"300px";
                        frederickMaskBox.color = "transparent";
                        frederickMaskBox.background = "transparent";
                        frederickMaskBox.cornerRadius = 10;
                        frederickMaskBox.top = "12.5%"; //"60px";
                        frederickMaskBox.left = "57%"; //"1890px";
                        frederickMaskBox.alpha = 0;
                        frederickMaskBox.isEnabled = false;
                        frederickMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        frederickMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(frederickMaskBox);
                
                        var frederickImgBox = new Image();
                        frederickImgBox.color = "transparent";
                        frederickImgBox.width = "101.48%"; //"548px";
                        frederickImgBox.height = "102.66%"; //"308px";
                        frederickImgBox.source = "https://i.imgur.com/406NGIR.jpg";
                        frederickImgBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        frederickImgBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        frederickMaskBox.addControl(frederickImgBox);

                        var frederickText1 = new TextBlock("frederickText1");
                        frederickText1.fontFamily = "Calendas Plus";
                        frederickText1.underline = true;
                        frederickText1.textWrapping = true;
                        frederickText1.width = "16.17%"; //"485px";
                        frederickText1.height = "6.46%"; //"31px";
                        frederickText1.text = "Positive Reactions";
                        frederickText1.color = "white";
                        frederickText1.fontSize = "6.25%"; //"30px";
                        frederickText1.top = "82.1%"; //"394px";
                        frederickText1.left = "57.33%"; //"1900px";
                        frederickText1.alpha = 0;
                        frederickText1.isEnabled = false;
                        frederickText1.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        frederickText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        frederickText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(frederickText1);
//#endregion

//#region Fifth Option
                        var fifthMaskBox = new Rectangle("label for fifth mask" );
                        fifthMaskBox.width = "18%"; //"540px";
                        fifthMaskBox.height = "62.5%"; //"300px";
                        fifthMaskBox.color = "transparent";
                        fifthMaskBox.background = "white";
                        fifthMaskBox.cornerRadius = 10;
                        fifthMaskBox.top = "12.5%"; //"60px";
                        fifthMaskBox.left = "76%"; //"2460px";
                        fifthMaskBox.alpha = 0;
                        fifthMaskBox.isEnabled = false;
                        fifthMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        fifthMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(fifthMaskBox);

                        /*var fifthImgBox = new Image();
                        fifthImgBox.color = "transparent";
                        fifthImgBox.width = "101.48%"; //"548px";
                        fifthImgBox.height = "102.66%"; //"308px";
                        fifthImgBox.source = "https://i.imgur.com/406NGIR.jpg";
                        fifthImgBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        fifthImgBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        fifthMaskBox.addControl(fifthImgBox);*/

                        var fifthText1 = new TextBlock("fifthText1");
                        fifthText1.fontFamily = "Calendas Plus";
                        fifthText1.underline = true;
                        fifthText1.textWrapping = true;
                        fifthText1.width = "16.17%"; //"485px";
                        fifthText1.height = "6.46%"; //"31px";
                        fifthText1.text = "Negative Reactions";
                        fifthText1.color = "white";
                        fifthText1.fontSize = "6.25%"; //"30px";
                        fifthText1.top = "82.1%"; //"394px";
                        fifthText1.left = "76.33%"; //"1900px";
                        fifthText1.alpha = 0;
                        fifthText1.isEnabled = false;
                        fifthText1.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        fifthText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        fifthText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        scrollModal.addControl(fifthText1);
//#endregion

//#endregion

//#region Learn More Box
                        var labelForLearnAboutWaiting = new Rectangle("labelForLearnAboutWaiting" );
                        labelForLearnAboutWaiting.width = "78.125%"; //"1500px";
                        labelForLearnAboutWaiting.height = "72.22%"; //"780px";
                        labelForLearnAboutWaiting.color = "transparent";
                        labelForLearnAboutWaiting.background = "#FFFFFF";
                        labelForLearnAboutWaiting.left = "18.75%"; //"360px";
                        labelForLearnAboutWaiting.top = "16.66%"; //"180px";
                        labelForLearnAboutWaiting.alpha = 0;
                        labelForLearnAboutWaiting.isEnabled = false;
                        labelForLearnAboutWaiting.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        labelForLearnAboutWaiting.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl( labelForLearnAboutWaiting);

                        var scrollbarForLearnMore = new Rectangle("scrollbarForLearnMore" );
                        scrollbarForLearnMore.width = "0.66%"; //"10px";
                        scrollbarForLearnMore.height = "10.77%"; //"84px";
                        scrollbarForLearnMore.color = "transparent";
                        scrollbarForLearnMore.background = "#D9D9D9";
                        scrollbarForLearnMore.left = "39.26%"; //"589px";
                        scrollbarForLearnMore.top = "-0.64%"; //"-5px";
                        scrollbarForLearnMore.cornerRadius = 15;
                        scrollbarForLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        scrollbarForLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl( scrollbarForLearnMore);

                        var scrollbarSideForLearnMore = new Rectangle("scrollbarSideForLearnMore" );
                        scrollbarSideForLearnMore.width = "2px";
                        scrollbarSideForLearnMore.height = "100%"; //"780px";
                        scrollbarSideForLearnMore.color = "transparent";
                        scrollbarSideForLearnMore.background = "#D9D9D9";
                        scrollbarSideForLearnMore.left = "39.8%"; //"597px";
                        scrollbarSideForLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        scrollbarSideForLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl( scrollbarSideForLearnMore);

                        var textTitleLearnMore = new TextBlockWithUnderlineColor("textTitleLearnMore");
                        textTitleLearnMore.fontFamily = "Calendas Plus";
                        textTitleLearnMore.textWrapping = true;
                        textTitleLearnMore.width = "32%"; //"480px";
                        textTitleLearnMore.height = "6%"; //"40px";
                        textTitleLearnMore.text = "Waiting on the Hour";
                        textTitleLearnMore.color = "black";
                        textTitleLearnMore.fontSize = "5.128%"; //"40px";
                        textTitleLearnMore.top = "7.69%"; //"60px";
                        textTitleLearnMore.left = "4%"; //"60px";
                        textTitleLearnMore.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        textTitleLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        textTitleLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl(textTitleLearnMore);

                        var textBodyLearnMore = new TextBlockWithUnderlineColor("textBodyLearnMore");
                        textBodyLearnMore.fontFamily = "Calendas Plus";
                        textBodyLearnMore.textWrapping = true;
                        textBodyLearnMore.width = "32%"; //"480px";
                        textBodyLearnMore.height = "89.74%"; //"700px";
                        textBodyLearnMore.text = "The Emancipation Proclamation was signed on January 1, 1863, and granted freedom to enslaved people in Confederate states that remained in rebellion. It’s important to note that the Emancipation Proclamation did not free enslaved people in the Border States of Kentucky, Missouri, Maryland, and Delaware because those states were not in rebellion against the Union. The proclamation also changed the meaning of the war, as Union troops were no longer just fighting to save the Union but also abolish slavery. Additionally, by issuing this order, Lincoln opened the door for Black Americans (and formerly enslaved men) to enlist in the fight against the Confederacy. By the end of the war, some 200,000 Black soldiers and sailors had joined the Union cause to defeat the Confederacy and end slavery. \n\nThe Confederate states didn’t recognize Abraham Lincoln as their president—instead, they elected Jefferson Davis to serve as the provisional president of the Confederacy. How do you think enslaved people in Confederate states reacted?";
                        textBodyLearnMore.color = "black";
                        textBodyLearnMore.fontSize = "2.63%"; //"21.5px";
                        textBodyLearnMore.top = "6.41%"; //"50px";
                        textBodyLearnMore.left = "4%"; //"60px";
                        textBodyLearnMore.lineSpacing = 5;
                        textBodyLearnMore.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        textBodyLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        textBodyLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl(textBodyLearnMore);

                        var waitingMaskBoxLearnMore = new Rectangle("label for waiting mask learn more" );
                        waitingMaskBoxLearnMore.width = "52%"; //"780px";
                        waitingMaskBoxLearnMore.height = "80%"; //"624px";
                        waitingMaskBoxLearnMore.color = "transparent";
                        waitingMaskBoxLearnMore.background = "transparent";
                        waitingMaskBoxLearnMore.top = "7.69%"; //"60px";
                        waitingMaskBoxLearnMore.left = "44%"; //"660px";
                        waitingMaskBoxLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        waitingMaskBoxLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl(waitingMaskBoxLearnMore);
                
                        var waitingImgBoxLearnMore = new Image();
                        waitingImgBoxLearnMore.color = "transparent";
                        waitingImgBoxLearnMore.width = "102.56%"; //"800px";
                        waitingImgBoxLearnMore.height = "103.2%"; //"644px";
                        waitingImgBoxLearnMore.top = "1.6%"; //"10px";
                        waitingImgBoxLearnMore.source = "https://i.imgur.com/FosX3Gu.jpg";
                        waitingImgBoxLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        waitingImgBoxLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        waitingMaskBoxLearnMore.addControl(waitingImgBoxLearnMore);

                        var leftArrowBoxLearnMore = new Rectangle("leftArrowBoxLearnMore" );
                        leftArrowBoxLearnMore.width = "4.26%"; //"64px";
                        leftArrowBoxLearnMore.height = "8.2%"; //"64px";
                        leftArrowBoxLearnMore.color = "transparent";
                        leftArrowBoxLearnMore.background = "#FFFFFF";
                        leftArrowBoxLearnMore.left = "41.86%"; //"628px";
                        leftArrowBoxLearnMore.top = "43.58%"; //"340px";
                        leftArrowBoxLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        leftArrowBoxLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl( leftArrowBoxLearnMore);

                        var leftArrowBoxLearnMoreStroke = new Rectangle("leftArrowBoxLearnMoreStroke" );
                        leftArrowBoxLearnMoreStroke.width = "84.375%"; //"54px";
                        leftArrowBoxLearnMoreStroke.height = "84.375%"; //"54px";
                        leftArrowBoxLearnMoreStroke.color = "#959BA1";
                        leftArrowBoxLearnMoreStroke.background = "transparent";
                        leftArrowBoxLearnMoreStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        leftArrowBoxLearnMoreStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        leftArrowBoxLearnMore.addControl( leftArrowBoxLearnMoreStroke);

                        var leftArrowBoxLearnMoreImg = new Image();
                        leftArrowBoxLearnMoreImg.color = "transparent";
                        leftArrowBoxLearnMoreImg.width = "40.74%"; //"22px";
                        leftArrowBoxLearnMoreImg.height = "40.74%"; //"22px";
                        leftArrowBoxLearnMoreImg.source = "https://i.imgur.com/FsQy7Oh.png";
                        leftArrowBoxLearnMoreImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        leftArrowBoxLearnMoreImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        leftArrowBoxLearnMoreStroke.addControl(leftArrowBoxLearnMoreImg);

                        var rightArrowBoxLearnMore = new Rectangle("rightArrowBoxLearnMore" );
                        rightArrowBoxLearnMore.width = "4.26%"; //"64px";
                        rightArrowBoxLearnMore.height = "8.2%"; //"64px";
                        rightArrowBoxLearnMore.color = "transparent";
                        rightArrowBoxLearnMore.background = "#FFFFFF";
                        rightArrowBoxLearnMore.left = "93.86%"; //"1408px";
                        rightArrowBoxLearnMore.top = "43.58%"; //"340px";
                        rightArrowBoxLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        rightArrowBoxLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl( rightArrowBoxLearnMore);

                        var rightArrowBoxLearnMoreStroke = new Rectangle("rightArrowBoxLearnMoreStroke" );
                        rightArrowBoxLearnMoreStroke.width = "84.375%"; //"54px";
                        rightArrowBoxLearnMoreStroke.height = "84.375%"; //"54px";
                        rightArrowBoxLearnMoreStroke.color = "#959BA1";
                        rightArrowBoxLearnMoreStroke.background = "transparent";
                        rightArrowBoxLearnMoreStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        rightArrowBoxLearnMoreStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        rightArrowBoxLearnMore.addControl( rightArrowBoxLearnMoreStroke);

                        var rightArrowBoxLearnMoreImg = new Image();
                        rightArrowBoxLearnMoreImg.color = "transparent";
                        rightArrowBoxLearnMoreImg.width = "40.74%"; //"22px";
                        rightArrowBoxLearnMoreImg.height = "40.74%"; //"22px";
                        rightArrowBoxLearnMoreImg.source = "https://i.imgur.com/FsQy7Oh.png";
                        rightArrowBoxLearnMoreImg.rotation = 3.1;
                        rightArrowBoxLearnMoreImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        rightArrowBoxLearnMoreImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        rightArrowBoxLearnMoreStroke.addControl(rightArrowBoxLearnMoreImg);

                        var expandImageBox = new Rectangle("expandImageBox" );
                        expandImageBox.width = "3.2%"; //"44px";
                        expandImageBox.height = "6%"; //"44px";
                        expandImageBox.color = "transparent";
                        expandImageBox.background = "#FFFFFF";
                        expandImageBox.left = "93.1%"; //"1396px";
                        expandImageBox.top = "82.1%"; //"640px";
                        expandImageBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        expandImageBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        labelForLearnAboutWaiting.addControl( expandImageBox);

                        var expandImageBoxMoreStroke = new Rectangle("expandImageBoxMoreStroke" );
                        expandImageBoxMoreStroke.width = "86.36%"; //"38px";
                        expandImageBoxMoreStroke.height = "86.36%"; //"38px";
                        expandImageBoxMoreStroke.color = "#959BA1";
                        expandImageBoxMoreStroke.background = "transparent";
                        expandImageBoxMoreStroke.isPointerBlocker = false;
                        expandImageBoxMoreStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        expandImageBoxMoreStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        expandImageBox.addControl( expandImageBoxMoreStroke);

                        var exapndImg = Button.CreateImageOnlyButton("", "https://i.imgur.com/3H5Dtxo.png");
                        exapndImg.color = "transparent";
                        exapndImg.width = "65%"; //"22px";
                        exapndImg.height = "65%"; //"22px";
                        exapndImg.source = "https://i.imgur.com/3H5Dtxo.png";
                        exapndImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        exapndImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        exapndImg.isPointerBlocker = true;
                        exapndImg.onPointerClickObservable.add(function() {
                            learnMoreExpandedImgHolder.alpha = 1;
                            learnMoreExpandedImgHolder.isEnabled = true;
                        });
                        expandImageBox.addControl(exapndImg);

                        //Learn More Menu
                        var learnMoreMenuMaskBox = new Rectangle("label for menu box mask learn more" );
                        learnMoreMenuMaskBox.width = "17.6%"; //"338px";
                        learnMoreMenuMaskBox.height = "44.44%"; //"480px";
                        learnMoreMenuMaskBox.color = "transparent";
                        learnMoreMenuMaskBox.background = "transparent";
                        learnMoreMenuMaskBox.top = "25.92%"; //"280px";
                        learnMoreMenuMaskBox.alpha = 0;
                        learnMoreMenuMaskBox.isEnabled = false;
                        learnMoreMenuMaskBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        learnMoreMenuMaskBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        greyBoxBlurRoomImage.addControl(learnMoreMenuMaskBox);

                        var textBodyLearnMoreMenu = new TextBlockWithUnderlineColor("textBodyLearnMoreMenu");
                        textBodyLearnMoreMenu.fontFamily = "Calendas Plus";
                        textBodyLearnMoreMenu.textWrapping = true;
                        textBodyLearnMoreMenu.width = "68%"; //"230px";
                        textBodyLearnMoreMenu.height = "80%"; //"385px";
                        textBodyLearnMoreMenu.text = "Lincoln’s View on Slavery \n\n\nWaiting for the Hour \n\n\nEngraving: The First \nReading of the \nEmancipation Proclamation \n\n\nPositive Reactions \n\n\nNegative Reactions";
                        textBodyLearnMoreMenu.color = "white";
                        textBodyLearnMoreMenu.fontSize = "3.75%"; //"19px";
                        textBodyLearnMoreMenu.top = "11.45%"; //"55px";
                        textBodyLearnMoreMenu.left = "10.65%"; //"36px";
                        textBodyLearnMoreMenu.lineSpacing = 2;
                        textBodyLearnMoreMenu.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        textBodyLearnMoreMenu.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        textBodyLearnMoreMenu.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        learnMoreMenuMaskBox.addControl( textBodyLearnMoreMenu);

                        var learnMoreMenuBoxLongPiece = new Rectangle("learnMoreMenuBoxLongPiece" );
                        learnMoreMenuBoxLongPiece.width = "2px";
                        learnMoreMenuBoxLongPiece.height = "100%"; //"480px";
                        learnMoreMenuBoxLongPiece.color = "transparent";
                        learnMoreMenuBoxLongPiece.background = "#D9D9D9";
                        learnMoreMenuBoxLongPiece.left = "88.75%"; //"300px";
                        learnMoreMenuBoxLongPiece.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        learnMoreMenuBoxLongPiece.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        learnMoreMenuMaskBox.addControl( learnMoreMenuBoxLongPiece);

                        var learnMoreMenuBox = new Rectangle("learnMoreMenuBox" );
                        learnMoreMenuBox.width = "9.46%"; //"32px";
                        learnMoreMenuBox.height = "25%"; //"120px";
                        learnMoreMenuBox.color = "transparent";
                        learnMoreMenuBox.background = "#FFFFFF";
                        learnMoreMenuBox.left = "88.75%"; //"300px";
                        learnMoreMenuBox.top = "5.2%"; //"25px";
                        learnMoreMenuBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        learnMoreMenuBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        learnMoreMenuMaskBox.addControl(learnMoreMenuBox);

                        var learnMoreMenuBoxStroke = new Rectangle("learnMoreMenuBoxStroke" );
                        learnMoreMenuBoxStroke.width = "81.25%"; //"26px";
                        learnMoreMenuBoxStroke.height = "95%"; //"114px";
                        learnMoreMenuBoxStroke.color = "#959BA1";
                        learnMoreMenuBoxStroke.background = "transparent";
                        learnMoreMenuBoxStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        learnMoreMenuBoxStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        learnMoreMenuBox.addControl(learnMoreMenuBoxStroke);

                        var leftArrowBoxLearnMoreMenuImg = new Image();
                        leftArrowBoxLearnMoreMenuImg.color = "transparent";
                        leftArrowBoxLearnMoreMenuImg.width = "107.69%"; //"28px";
                        leftArrowBoxLearnMoreMenuImg.height = "24.56%"; //"28px";
                        leftArrowBoxLearnMoreMenuImg.source = "https://i.imgur.com/4vveLLN.png";
                        leftArrowBoxLearnMoreMenuImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        leftArrowBoxLearnMoreMenuImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        learnMoreMenuBoxStroke.addControl(leftArrowBoxLearnMoreMenuImg);

                        var learnMoreMenuBoxButton = Button.CreateSimpleButton("learnMoreMenuBoxButton", " ");;
                        learnMoreMenuBoxButton.width = "100%"; //"26px";
                        learnMoreMenuBoxButton.height = "100%"; //"114px";
                        learnMoreMenuBoxButton.color = "transparent";
                        learnMoreMenuBoxButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
                        learnMoreMenuBoxButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER; 
                        learnMoreMenuBoxButton.onPointerClickObservable.add(function() {
                            menuIsOpen = !menuIsOpen;
                            menuPosition();
                        });
                        learnMoreMenuBoxStroke.addControl(learnMoreMenuBoxButton);

//#endregion
                
//#region Constant UI
                        var advancedTextureConstant = AdvancedDynamicTexture.CreateFullscreenUI("uiConstant");

                        var constantRect = new Rectangle("constantContainer");
                        constantRect.width = "100%";
                        constantRect.height = "100%";
                        constantRect.color = "transparent";
                        advancedTextureConstant.addControl(constantRect);
                
//#region Walk Left Button
                        var leftArrowBox = Button.CreateSimpleButton("leftArrowBox", "walk left");;
                        leftArrowBox.width = "13.8%"; //"265px"; 
                        leftArrowBox.height = "7.685%"; //"83px";
                        leftArrowBox.color = "transparent";
                        leftArrowBox.top = "46.2%"; //"499px";
                        leftArrowBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        leftArrowBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT; 
                        leftArrowBox.isEnabled = false;
                        leftArrowBox.onPointerClickObservable.add(function() {
                            previousIndex = currentIndex
                            currentIndex--;
                            if(currentIndex < 0)
                            {
                                currentIndex = sources.length - 1;
                            }
                            imageCarousel(img1, (screen.width / 2) * -1, 0, 100, img2);
                        });
                        constantRect.addControl(leftArrowBox); 
                
                        var arrowImgA = new Image();
                        arrowImgA.color = "transparent";
                        arrowImgA.width = "36px";
                        arrowImgA.height = "36px";
                        arrowImgA.left = "0";
                        arrowImgA.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgA.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        arrowImgA.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        leftArrowBox.addControl(arrowImgA);
                
                        var arrowImgB = new Image();
                        arrowImgB.color = "transparent";
                        arrowImgB.alpha = 0.60;
                        arrowImgB.width = "36px";
                        arrowImgB.height = "36px";
                        arrowImgB.left = "12px";
                        arrowImgB.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgB.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        arrowImgB.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        leftArrowBox.addControl(arrowImgB);
                
                        var arrowImgC = new Image();
                        arrowImgC.color = "transparent";
                        arrowImgC.alpha = 0.30;
                        arrowImgC.width = "36px";
                        arrowImgC.height = "36px";
                        arrowImgC.left = "24px";
                        arrowImgC.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgC.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        arrowImgC.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        leftArrowBox.addControl(arrowImgC);
                
                        var walkLeftText = new TextBlock("Walk Left");
                        
                        walkLeftText.fontFamily = "Calendas Plus";
                        walkLeftText.textWrapping = true;
                        walkLeftText.width = "68.67%"; //"182px";
                        walkLeftText.height = "37.34%"; //"31px";
                        walkLeftText.text = "Walk Around";
                        walkLeftText.color = "white";
                        walkLeftText.fontSize = "35%"; //"30px";
                        walkLeftText.left = "2%"; //"20px";
                        walkLeftText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        walkLeftText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        leftArrowBox.addControl(walkLeftText);
//#endregion
                
//#region Walk Right Button
                        var rightArrowBox = Button.CreateSimpleButton("rightArrowBox", "walk right");;
                        rightArrowBox.width = "13.8%"; //"265px"; 
                        rightArrowBox.height = "7.685%"; //"83px";
                        rightArrowBox.color = "transparent";
                        rightArrowBox.top = "46.2%"; //"499px";
                        rightArrowBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        rightArrowBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        rightArrowBox.isEnabled = false; 
                        rightArrowBox.onPointerClickObservable.add(function() {
                            previousIndex = currentIndex;
                            currentIndex++;
                            if(currentIndex > sources.length - 1)
                            {
                                currentIndex = 0;
                            }
                            imageCarousel(img2, screen.width - (screen.width / 2), 0, 100, img1);
                        });
                        constantRect.addControl(rightArrowBox); 
                
                        var arrowImgARight = new Image();
                        arrowImgARight.color = "transparent";
                        arrowImgARight.width = "36px";
                        arrowImgARight.height = "36px";
                        arrowImgARight.left = "-2";
                        arrowImgARight.rotation = 3.15;
                        arrowImgARight.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgARight.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        arrowImgARight.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        rightArrowBox.addControl(arrowImgARight);
                
                        var arrowImgBRight = new Image();
                        arrowImgBRight.color = "transparent";
                        arrowImgBRight.alpha = 0.60;
                        arrowImgBRight.width = "36px";
                        arrowImgBRight.height = "36px";
                        arrowImgBRight.left = "-14px";
                        arrowImgBRight.rotation = 3.15;
                        arrowImgBRight.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgBRight.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        arrowImgBRight.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        rightArrowBox.addControl(arrowImgBRight);
                
                        var arrowImgCRight = new Image();
                        arrowImgCRight.color = "transparent";
                        arrowImgCRight.alpha = 0.30;
                        arrowImgCRight.width = "36px";
                        arrowImgCRight.height = "36px";
                        arrowImgCRight.left = "-26px";
                        arrowImgCRight.rotation = 3.15;
                        arrowImgCRight.source = "https://i.imgur.com/obU8TgU.png";
                        arrowImgCRight.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        arrowImgCRight.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        rightArrowBox.addControl(arrowImgCRight);
                
                        var walkRightText = new TextBlock("Walk Right");
                        
                        walkRightText.fontFamily = "Calendas Plus";
                        walkRightText.textWrapping = true;
                        walkRightText.width = "68.67%"; //"182px";
                        walkRightText.height = "37.34%"; //"31px";
                        walkRightText.text = "Walk Around";
                        walkRightText.color = "white";
                        walkRightText.fontSize = "35%"; //"30px";
                        walkRightText.left = "-2%"; //"-22px";
                        walkRightText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        walkRightText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        rightArrowBox.addControl(walkRightText);
//#endregion
        
//#region Navigation Button
                            var navButton = Button.CreateSimpleButton("nav", "Navigation");
                            navButton.width = "6.25%"; //"120px"
                            navButton.height = "7.4%"; //"80px";
                            navButton.background = "#2B3E56";
                            navButton.color = "#2B3E56";
                            navButton.shadowColor = "#00000080";
                            navButton.shadowOffsetX = 3;
                            navButton.shadowOffsetY = 3;
                            navButton.shadowBlur = 6;
                            navButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            navButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                            navButton.left = "1.04%"; //"20px";
                            navButton.top = "1.85%"; //"20px";
                            navButton.onPointerUpObservable.add(function() {
                                easyAnimation(navBackgroundRect, 'left', 30, -100, 0, 90);
                                easyAnimation(entranceRect, 'left', 30, 0, 30, 90);
                                easyAnimation(constantRect, 'left', 30, 0, 30, 90);
                                easyAnimation(label, 'left', 30, 0, 30, 90);
                                easyAnimation(greyBoxBlurRoomImage, 'left', 30, 0, 30, 90);
                            });
                            constantRect.addControl(navButton);

                            var navButtonStroke = new Rectangle("label for button stroke" );
                            navButtonStroke.width = "95%"; //"114px";
                            navButtonStroke.height = "92.5%" //"74px";
                            navButtonStroke.left = ".75%";
                            navButtonStroke.top = "0.75%";
                            navButtonStroke.color = "white";
                            navButton.addControl(navButtonMenuStroke);

                            var navButtonImg = new Image();
                            navButtonImg.color = "transparent";
                            navButtonImg.width = "50%"; //57.4px
                            navButtonImg.height = "47%"; //35.43px
                            navButtonImg.top = "16%"; //11.23px
                            navButtonImg.source = "https://i.imgur.com/cmNSnse.png";
                            navButtonImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            navButtonImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            navButton.addControl(navButtonImg);

                            var navButtonText = new TextBlock("navButtonText");    
                            navButtonText.fontFamily = "Calendas Plus";
                            navButtonText.textWrapping = true;
                            navButtonText.width = "99.16%"; //119px
                            navButtonText.height = "22%"; //15px
                            navButtonText.text = "Navigation";
                            navButtonText.color = "white";
                            navButtonText.fontSize = "19%"; //14px
                            navButtonText.top = "70%"; //57px
                            navButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            navButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            navButton.addControl(navButtonText);
//#endregion
    
//#region Main Menu

//#region Main Menu Tab
                            var menuPicMain = Button.CreateSimpleButton("menuTab", "");
                            menuPicMain.width = "12.5%"; //"240px";
                            menuPicMain.height = "4.5%"; //"40px";
                            menuPicMain.color = "transparent";
                            menuPicMain.background = "#2B3E56";
                            //menuPicMain.topInPixels = 5;
                            menuPicMain.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM; 
                            menuPicMain.horizontalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;  
                            menuPicMain.onPointerUpObservable.add(function() {
                                menuIsUp = !menuIsUp;
                                openMenu();
                            });
                            constantRect.addControl( menuPicMain);
                
                            var menuBarPicAMain = new Rectangle("menuBarPicA" );
                            menuBarPicAMain.width = "21.35%"; //"50px";
                            menuBarPicAMain.height = "7.5%"; //"2px";
                            menuBarPicAMain.color = "transparent";
                            menuBarPicAMain.background = "#D9D9D9";
                            menuBarPicAMain.leftInPixels = 0;
                            menuBarPicAMain.top = "37.5%"; //"15px";
                            menuBarPicAMain.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuBarPicAMain.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            menuPicMain.addControl( menuBarPicAMain);
                
                            var menuBarPicBMain = new Rectangle("menuBarPicB" );
                            menuBarPicBMain.width = "21.35%"; //"50px";
                            menuBarPicBMain.height = "7.5%"; //"2px";
                            menuBarPicBMain.color = "transparent";
                            menuBarPicBMain.background = "#D9D9D9";
                            menuBarPicBMain.leftInPixels = 0;
                            menuBarPicBMain.top = "62.5%"; //"25px";
                            menuBarPicBMain.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuBarPicBMain.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            menuPicMain.addControl( menuBarPicBMain);
                
                            var menuTabText = new TextBlock("menuTabText");
                            menuTabText.fontFamily = "Calendas Plus";
                            menuTabText.fontStyle = "bold";
                            menuTabText.textWrapping = true;
                            menuTabText.width = "100%"; //"240px";
                            menuTabText.height = "50%"; //"20px";
                            menuTabText.text = "Entrance Hall";
                            menuTabText.color = "white";
                            menuTabText.fontSize = "50%"; //"20px";
                            menuTabText.alpha = 0;
                            menuTabText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            menuTabText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            menuPicMain.addControl(menuTabText);
//#endregion

//#region Main menu rect
                            var menuPicMainRect = new Rectangle("menuPicRect" );
                            menuPicMainRect.width = "100%";
                            menuPicMainRect.height = "27.77%"; //"300px"; used to be 200
                            menuPicMainRect.color = "transparent";
                            menuPicMainRect.background = "#2B3E56";
                            menuPicMainRect.top = "27.65%"; //used to be 18.52
                            menuPicMainRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM; 
                            menuPicMainRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            constantRect.addControl( menuPicMainRect);
//#endregion

//#region Main Menu Stars
                            var menuStarAImg = new Image();
                            menuStarAImg.color = "transparent";
                            menuStarAImg.width = ".65%"; //8.36px
                            menuStarAImg.height = "5.11%"; //8.36px used to be 6.5%
                            menuStarAImg.top = "8%"; //8px
                            menuStarAImg.left = "-.7%";
                            menuStarAImg.source = "https://i.imgur.com/6fRUrr7.png";
                            menuStarAImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuStarAImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            menuPicMainRect.addControl(menuStarAImg);

                            var menuStarBImg = new Image();
                            menuStarBImg.color = "transparent";
                            menuStarBImg.width = ".65%"; //8.36px
                            menuStarBImg.height = "5.11%"; //8.36px
                            menuStarBImg.top = "8%"; //8px
                            menuStarBImg.source = "https://i.imgur.com/6fRUrr7.png";
                            menuStarBImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuStarBImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            menuPicMainRect.addControl(menuStarBImg);

                            var menuStarCImg = new Image();
                            menuStarCImg.color = "transparent";
                            menuStarCImg.width = ".65%"; //8.36px
                            menuStarCImg.height = "5.11%"; //8.36px
                            menuStarCImg.top = "8%"; //8px
                            menuStarCImg.left = ".65%";
                            menuStarCImg.source = "https://i.imgur.com/6fRUrr7.png";
                            menuStarCImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuStarCImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            menuPicMainRect.addControl(menuStarCImg);
//#endregion
                
//#region Menu Bar bars
                            var menuPicMainLeftBar = new Rectangle("menuPicLeftBar" );
                            menuPicMainLeftBar.height = "75%"; //"150px";
                            menuPicMainLeftBar.width = "1px";
                            menuPicMainLeftBar.color = "transparent";
                            menuPicMainLeftBar.background = "white";
                            menuPicMainLeftBar.left = "21.875%"; //"420px";
                            menuPicMainLeftBar.top = "12.75%"; //"25.5px";
                            menuPicMainLeftBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuPicMainLeftBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            menuPicMainRect.addControl( menuPicMainLeftBar);
                
                            var menuPicMainRightBar = new Rectangle("menuPicRightBar" );
                            menuPicMainRightBar.widthInPixels = screen.width;
                            menuPicMainRightBar.height = "75%"; //"150px";
                            menuPicMainRightBar.width = "1px";
                            menuPicMainRightBar.color = "transparent";
                            menuPicMainRightBar.background = "white";
                            menuPicMainRightBar.left = "78.125%"; //"1500px";
                            menuPicMainRightBar.top = "12.75%"; //"25.5px";
                            menuPicMainRightBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuPicMainRightBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            menuPicMainRect.addControl( menuPicMainRightBar);
//#endregion
                
//#region Menu Bar Text
                            var menuBarText = new TextBlock("menuBarText");
                            menuBarText.fontFamily = "Calendas Plus";
                            menuBarText.textWrapping = true;
                            menuBarText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            menuBarText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                            menuBarText.width = "50%"; //"960px";
                            menuBarText.height = "82.5%"; //"122px";
                            menuBarText.text = "Welcome to the White House located in Washington, D.C. at 1600 Pennsylvania Avenue! Constructed from 1792-1800, the White House was built with the labor of free and enslaved people. John Adams was the first president to live in the White House and since then the building has served as the official workplace and residence for the President of the United States and their family.";
                            menuBarText.color = "white";
                            menuBarText.fontSize = "8.25%"; //21.5; used to be 11.5%
                            menuBarText.lineSpacing = "5%";
                            menuBarText.top = "21.82%"; //"43.64px";
                            menuBarText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            menuBarText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            menuPicMainRect.addControl(menuBarText);
//#endregion
//#endregion

                
                        //Menu Callouts
                            /*var architectCalloutButton = Button.CreateSimpleButton("architect", "architect");
                            architectCalloutButton.width = "4.27%"; //"82px"
                            architectCalloutButton.height = "21.33%"; //"32px";
                            architectCalloutButton.fontFamily = "Calendas Plus";
                            architectCalloutButton.fontSizeInPixels = "11%"; //21.5;
                            architectCalloutButton.color = "#2B3E56";
                            architectCalloutButton.cornerRadius = 0;
                            architectCalloutButton.background = "#ECDE81";
                            architectCalloutButton.alpha = 0;
                            architectCalloutButton.isEnabled = false;
                            architectCalloutButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            architectCalloutButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                            architectCalloutButton.left = "896px";
                            architectCalloutButton.top = "-90px";
                            architectCalloutButton.onPointerUpObservable.add(function() {
                                architectCallout.alpha = 1;
                                architectCallout.isEnabled = true;
                                exitCalloutButton_arch.isEnabled = true;
                                exitCalloutButton_arch.isVisible = true;
                            });
                            menuPicMainRect.addControl(architectCalloutButton);
                
                            var architectCallout = new Rectangle("menuPicRect" );
                            architectCallout.width = "300px";
                            architectCallout.height = "240px";
                            architectCallout.alpha = 0;
                            architectCallout.isEnabled = false;
                            architectCallout.color = "transparent";
                            architectCallout.background = "#235BA0";
                            architectCallout.leftInPixels = 1620;
                            architectCallout.topInPixels = 641;
                            architectCallout.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            architectCallout.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            advancedTextureConstant.addControl( architectCallout);
                
                            var exitCalloutButton_arch = Button.CreateSimpleButton("exitCalloutButton_arch", "X");
                            exitCalloutButton_arch.width = "44px"
                            exitCalloutButton_arch.height = "44px";
                            exitCalloutButton_arch.color = "transparent";
                            exitCalloutButton_arch.cornerRadius = 0;
                            exitCalloutButton_arch.background = "white";
                            exitCalloutButton_arch.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            exitCalloutButton_arch.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                            exitCalloutButton_arch.left = "248px";
                            exitCalloutButton_arch.top = "10px";
                            exitCalloutButton_arch.onPointerUpObservable.add(function() {
                                architectCallout.alpha = 0;
                                architectCallout.isEnabled = false;
                                exitCalloutButton_arch.isEnabled = false;
                                exitCalloutButton_arch.isVisible = false;
                            });
                            architectCallout.addControl(exitCalloutButton_arch);
                            
                            var xButton_arch = new Image();
                            xButton_arch.color = "transparent";
                            xButton_arch.width = "12px";
                            xButton_arch.height = "12px";
                            xButton_arch.source = "https://i.imgur.com/NjbQrlP.png";
                            xButton_arch.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            xButton_arch.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            exitCalloutButton_arch.addControl(xButton_arch);
                
                            var calloutTitle_arch = new Rectangle("archTitle");
                            calloutTitle_arch.height = "32px";
                            calloutTitle_arch.width = "85px";
                            calloutTitle_arch.color = "transparent";
                            calloutTitle_arch.background = "#ECDE81";
                            calloutTitle_arch.left = "18px";
                            calloutTitle_arch.top = "22px";
                            calloutTitle_arch.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            calloutTitle_arch.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            architectCallout.addControl( calloutTitle_arch);
                
                            var calloutTitle_archText = new TextBlock("nextButtonText");
                            calloutTitle_archText.fontFamily = "Calendas Plus";
                            calloutTitle_archText.textWrapping = true;
                            calloutTitle_archText.width = "80px";
                            calloutTitle_archText.height = "20px";
                            calloutTitle_archText.text = "architect";
                            calloutTitle_archText.color = "black";
                            calloutTitle_archText.fontSize = "20px";
                            calloutTitle_archText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            calloutTitle_archText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            calloutTitle_arch.addControl(calloutTitle_archText);
                
                            var calloutBody_archText = new TextBlock("nextButtonText");
                            calloutBody_archText.fontFamily = "Calendas Plus";
                            calloutBody_archText.textWrapping = true;
                            calloutBody_archText.width = "263px";
                            calloutBody_archText.height = "115px";
                            calloutBody_archText.text = "An architect is a person who designs buildings and in many cases also supervises their construction.";
                            calloutBody_archText.color = "white";
                            calloutBody_archText.fontSize = "20px";
                            calloutBody_archText.lineSpacing = 4;
                            calloutBody_archText.left = "18px";
                            calloutBody_archText.top = "91px";
                            calloutBody_archText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            calloutBody_archText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            calloutBody_archText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            architectCallout.addControl(calloutBody_archText);

                            var unionCalloutButton = Button.CreateSimpleButton("Union", "Union");
                            unionCalloutButton.width = "60px"
                            unionCalloutButton.height = "32px";
                            unionCalloutButton.fontFamily = "Calendas Plus";
                            unionCalloutButton.fontSizeInPixels = 21;
                            unionCalloutButton.color = "#2B3E56";
                            unionCalloutButton.cornerRadius = 0;
                            unionCalloutButton.background = "#ECDE81";
                            unionCalloutButton.alpha = 0;
                            unionCalloutButton.isEnabled = false;
                            unionCalloutButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            unionCalloutButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                            unionCalloutButton.left = "1190px";
                            unionCalloutButton.top = "-48px";
                            unionCalloutButton.onPointerUpObservable.add(function() {
                                
                            });
                            menuPicMainRect.addControl(unionCalloutButton);

                            var conCalloutButton = Button.CreateSimpleButton("Confederacy", "Confederacy.");
                            conCalloutButton.width = "120px"
                            conCalloutButton.height = "32px";
                            conCalloutButton.fontFamily = "Calendas Plus";
                            conCalloutButton.fontSizeInPixels = 21;
                            conCalloutButton.color = "#2B3E56";
                            conCalloutButton.cornerRadius = 0;
                            conCalloutButton.background = "#ECDE81";
                            conCalloutButton.alpha = 0;
                            conCalloutButton.isEnabled = false;
                            conCalloutButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            conCalloutButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                            conCalloutButton.left = "1313px";
                            conCalloutButton.top = "-48px";
                            conCalloutButton.onPointerUpObservable.add(function() {
                                
                            });
                            menuPicMainRect.addControl(conCalloutButton);

                            var secCalloutButton = Button.CreateSimpleButton("secede", "secede");
                            secCalloutButton.width = "65px"
                            secCalloutButton.height = "32px";
                            secCalloutButton.fontFamily = "Calendas Plus";
                            secCalloutButton.fontSizeInPixels = 21.5;
                            secCalloutButton.color = "#2B3E56";
                            secCalloutButton.cornerRadius = 0;
                            secCalloutButton.background = "#ECDE81";
                            secCalloutButton.alpha = 0;
                            secCalloutButton.isEnabled = false;
                            secCalloutButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            secCalloutButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                            secCalloutButton.left = "1112px";
                            secCalloutButton.top = "-118px";
                            secCalloutButton.onPointerUpObservable.add(function() {
                                
                            });
                            menuPicMainRect.addControl(secCalloutButton);*/
                
//#region Audio Button
                            var audioButton = Button.CreateSimpleButton("audio", "");
                            audioButton.width = "3.125%"; //"60px"
                            audioButton.height = "20%"; //"60px";
                            audioButton.color = "transparent";
                            audioButton.cornerRadius = 0;
                            audioButton.background = "#D9D9D9";
                            audioButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            audioButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                            audioButton.left = "3.125%"; //"60px";
                            audioButton.top = "40%"; //"80px";
                            audioButton.onPointerUpObservable.add(function() {
                                fullscreenGo();
                            });
                            menuPicMainRect.addControl(audioButton);
                
                            var audioButtonStroke = new Rectangle("audioButtonStroke" );
                            audioButtonStroke.height = "95%"; //"54px";
                            audioButtonStroke.width = "95%"; //"54px";
                            audioButtonStroke.color = "black";
                            audioButtonStroke.background = "transparent";
                            audioButtonStroke.left = "3.25%";
                            audioButtonStroke.top = "4%";
                            audioButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            audioButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            audioButton.addControl( audioButtonStroke);
                
                            var speakerButton = new Image();
                            speakerButton.color = "transparent";
                            speakerButton.width = "46.66%"; //"28px";
                            speakerButton.height = "46.66%"; //"28px";
                            speakerButton.source = "https://i.imgur.com/89lytUS.png";
                            speakerButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            speakerButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            audioButton.addControl(speakerButton);
//#endregion

                
//#region Back Button
                            var backButton = Button.CreateSimpleButton("back", "");
                            backButton.width = "3.645%"; //"70px"
                            backButton.height = "6.33%"; //"19px";
                            backButton.color = "transparent";
                            backButton.background = "transparent";
                            backButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            backButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                            backButton.left = "12.5%"; //"240px";
                            backButton.top = "50.25%"; //"100.5px";
                            backButton.onPointerUpObservable.add(function() {
                                updateText('back');
                            });
                            menuPicMainRect.addControl(backButton);
                
                            var backButtonImg = new Image();
                            backButtonImg.color = "transparent";
                            backButtonImg.width = "22px";
                            backButtonImg.height = "22px";
                            backButtonImg.left = "0px";
                            backButtonImg.source = "https://i.imgur.com/u2mV0JU.png";
                            backButtonImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            backButtonImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            backButton.addControl(backButtonImg);
                
                            var backButtonText = new TextBlock("backButtonText");
                            backButtonText.fontFamily = "Calendas Plus";
                            backButtonText.fontStyle = "italic";
                            backButtonText.textWrapping = true;
                            backButtonText.width = "60%"; //"42px";
                            backButtonText.height = "100%"; //"19px";
                            backButtonText.left = "17.14%"; //"12px";
                            backButtonText.text = "Back";
                            backButtonText.color = "white";
                            backButtonText.fontSize = "110%"; //"18px";
                            backButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            backButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            backButton.addControl(backButtonText);
//#endregion

//#region Next Button          
                        //Next Button
                            var nextButton = Button.CreateSimpleButton("next", "");
                            nextButton.width = "12.5%"; //"240px"
                            nextButton.height = "20%"; //"60px"; 
                            nextButton.color = "transparent";
                            nextButton.background = "#235BA0";
                            nextButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                            nextButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                            nextButton.left = "-3.125%"; //"-60px";
                            nextButton.top = "40%"; //"80px";
                            nextButton._onPointerEnter = function()
                            {
                                nextButtonStroke.height = "100%";
                                nextButtonStroke.width = "100%";
                            }
                            nextButton._onPointerOut = function()
                            {
                                nextButtonStroke.height = "83.33%";
                                nextButtonStroke.width = "95.83%";
                            }
                            nextButton.onPointerUpObservable.add(function() {
                                updateText('forward');
                            });
                            menuPicMainRect.addControl(nextButton);
                
                            var nextButtonStroke = new Rectangle("nextButtonStroke" );
                            nextButtonStroke.height = "83.33%"; //"50px";
                            nextButtonStroke.width = "95.83%"; //"230px";
                            nextButtonStroke.color = "white";
                            nextButtonStroke.background = "transparent";
                            nextButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            nextButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            nextButton.addControl( nextButtonStroke);
                
                            var nextButtonImg = new Image();
                            nextButtonImg.color = "transparent";
                            nextButtonImg.width = "21px";
                            nextButtonImg.height = "21px";
                            nextButtonImg.rotation = 3.15;
                            nextButtonImg.left = "63.33%"; //"152px";
                            nextButtonImg.source = "https://i.imgur.com/u2mV0JU.png";
                            nextButtonImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            nextButtonImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                            nextButton.addControl(nextButtonImg);
                
                            var nextButtonText = new TextBlock("nextButtonText");
                            nextButtonText.fontFamily = "Calendas Plus";
                            nextButtonText.fontStyle = "italic";
                            nextButtonText.textWrapping = true;
                            nextButtonText.width = "25.42%"; //"61px";
                            nextButtonText.height = "45%"; //"27px";
                            nextButtonText.text = "Next";
                            nextButtonText.color = "white";
                            nextButtonText.fontSize = "50%"; //"26px";
                            nextButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            nextButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            nextButton.addControl(nextButtonText);
//#endregion

//#endregion

//#region Navigation Page
                    var advancedTextureNavigation = AdvancedDynamicTexture.CreateFullscreenUI("uiNavigation");

                    var navBackgroundRect = new Rectangle("navBackgroundRect" );
                    navBackgroundRect.height = "100%"; //"50px";
                    navBackgroundRect.width = "100%"; //"230px";
                    navBackgroundRect.color = "#D9D9D9";
                    navBackgroundRect.background = "#D9D9D9";
                    navBackgroundRect.left = canvas.width * -1;
                    navBackgroundRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    navBackgroundRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                    advancedTextureNavigation.addControl( navBackgroundRect);

                    var whiteHouseIconImg = new Image();
                    whiteHouseIconImg.color = "transparent";
                    whiteHouseIconImg.width = "46.875%"; //900px
                    whiteHouseIconImg.height = "43.89%"; //474px
                    whiteHouseIconImg.alpha = .10;
                    whiteHouseIconImg.source = "https://i.imgur.com/ij7gPpq.png";
                    whiteHouseIconImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM; 
                    whiteHouseIconImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                    navBackgroundRect.addControl(whiteHouseIconImg);

                    var navBackgroundStroke = new Rectangle("label for background stroke" );
                    navBackgroundStroke.width = "97.4%"; //"114px";
                    navBackgroundStroke.height = "95.37%" //"74px";
                    navBackgroundStroke.color = "#959BA1";
                    navBackgroundStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                    navBackgroundStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                    navBackgroundRect.addControl(navBackgroundStroke);
//#endregion

//#region Text for Navigation
                    var entranceHallButton = Button.CreateSimpleButton("entranceHallButton", "");
                    entranceHallButton.width = "15%"; //"61px";
                    entranceHallButton.height = "2.96%"; //"27px";
                    entranceHallButton.background = "transparent";
                    entranceHallButton.color = "transparent";
                    entranceHallButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    entranceHallButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    entranceHallButton.left = "9.375%";
                    entranceHallButton.top = "19.26%";
                    entranceHallButton.onPointerUpObservable.add(function() {
                        updateText('entrance');
                        closeNavigation();
                    });
                    navBackgroundRect.addControl(entranceHallButton);

                    var entranceHallText = new TextBlockWithUnderlineColor("entranceHallText");
                    entranceHallText.fontFamily = "Calendas Plus";
                    entranceHallText.fontStyle = "italic";
                    entranceHallText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    entranceHallText.width = "100%"; //"61px";
                    entranceHallText.height = "100%"; //"27px";
                    entranceHallText.text = "Entrance Hall";
                    entranceHallText.color = "#235BA0";
                    entranceHallText.underline = true;
                    entranceHallText.underlineColor = "#235BA0";
                    entranceHallText.left = "0%";
                    entranceHallText.top = "0%";
                    entranceHallText.resizeToFit = true;
                    entranceHallText.fontSize = "100%"; //"32px";
                    entranceHallText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    entranceHallText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    entranceHallButton.addControl(entranceHallText);

//#region red room nav
                    var redRoomButton = Button.CreateSimpleButton("redRoom", "");
                    redRoomButton.width = "12.45%"; //"239px"
                    redRoomButton.height = "4.72%"; //"51px";
                    redRoomButton.background = "transparent";
                    redRoomButton.color = "transparent";
                    redRoomButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    redRoomButton.left = "9.375%"; //"181px";
                    redRoomButton.top = "27.8%"; //"300px";
                    redRoomButton.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(redRoomButton);

                    var redRoomButtonText = new TextBlock("redRoomButtonText");
                    redRoomButtonText.fontFamily = "Calendas Plus";
                    redRoomButtonText.fontStyle = "italic";
                    redRoomButtonText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomButtonText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    redRoomButtonText.width = "100%"; //"61px";
                    redRoomButtonText.height = "100%"; //"27px";
                    redRoomButtonText.text = "Red Room";
                    redRoomButtonText.color = "black";
                    redRoomButtonText.top = "-15%";
                    redRoomButtonText.resizeToFit = true;
                    redRoomButtonText.fontSize = "100%"; //"32px";
                    redRoomButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    redRoomButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomButton.addControl(redRoomButtonText);

                    var redRoomEventsText = new TextBlock("entranceHallText");
                    redRoomEventsText.fontFamily = "Calendas Plus";
                    redRoomEventsText.fontStyle = "italic";
                    redRoomEventsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventsText.width = "5%"; //"61px";
                    redRoomEventsText.height = "2.96%"; //"27px";
                    redRoomEventsText.text = "Events:";
                    redRoomEventsText.color = "#235BA0";
                    redRoomEventsText.left = "9.375%";
                    redRoomEventsText.top = "36.67%";
                    redRoomEventsText.resizeToFit = true;
                    redRoomEventsText.fontSize = "2.5%"; //"32px";
                    redRoomEventsText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    redRoomEventsText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navBackgroundRect.addControl(redRoomEventsText);

                    var redRoomEventButtonA = Button.CreateSimpleButton("redRoomEventButtonA", "");
                    redRoomEventButtonA.width = "21.875%"; //"420px"
                    redRoomEventButtonA.height = "9.62%"; //"104px";
                    redRoomEventButtonA.background = "transparent";
                    redRoomEventButtonA.color = "transparent";
                    redRoomEventButtonA.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventButtonA.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    redRoomEventButtonA.left = "9.375%"; //"180px";
                    redRoomEventButtonA.top = "42.5%"; //"459px";
                    redRoomEventButtonA.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(redRoomEventButtonA);

                    var redRoomEventButtonAText = new TextBlockWithUnderlineColor("redRoomEventButtonAText");
                    redRoomEventButtonAText.fontFamily = "Calendas Plus";
                    redRoomEventButtonAText.textWrapping = true;
                    redRoomEventButtonAText.underline = true;
                    redRoomEventButtonAText.underlineColor = "#363D45";
                    redRoomEventButtonAText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventButtonAText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    redRoomEventButtonAText.lineSpacing = 8;
                    redRoomEventButtonAText.width = "100%"; //"61px";
                    redRoomEventButtonAText.height = "100%"; //"27px";
                    redRoomEventButtonAText.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt esse";
                    redRoomEventButtonAText.color = "#363D45";
                    redRoomEventButtonAText.resizeToFit = true;
                    redRoomEventButtonAText.fontSize = "25%"; //"24px";
                    redRoomEventButtonAText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    redRoomEventButtonAText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventButtonA.addControl(redRoomEventButtonAText);

                    var redRoomEventButtonB = Button.CreateSimpleButton("redRoomEventButtonB", "");
                    redRoomEventButtonB.width = "21.875%"; //"420px"
                    redRoomEventButtonB.height = "5.92%"; //"64px";
                    redRoomEventButtonB.background = "transparent";
                    redRoomEventButtonB.color = "transparent";
                    redRoomEventButtonB.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventButtonB.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    redRoomEventButtonB.left = "9.375%"; //"180px";
                    redRoomEventButtonB.top = "57.685%"; //"623px";
                    redRoomEventButtonB.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(redRoomEventButtonB);

                    var redRoomEventButtonBText = new TextBlockWithUnderlineColor("redRoomEventButtonBText");
                    redRoomEventButtonBText.fontFamily = "Calendas Plus";
                    redRoomEventButtonBText.textWrapping = true;
                    redRoomEventButtonBText.underline = true;
                    redRoomEventButtonBText.underlineColor = "#363D45";
                    redRoomEventButtonBText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventButtonBText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    redRoomEventButtonBText.lineSpacing = 8;
                    redRoomEventButtonBText.width = "100%"; //"61px";
                    redRoomEventButtonBText.height = "100%"; //"27px";
                    redRoomEventButtonBText.text = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu";
                    redRoomEventButtonBText.color = "#363D45";
                    redRoomEventButtonBText.resizeToFit = true;
                    redRoomEventButtonBText.fontSize = "40%"; //"24px";
                    redRoomEventButtonBText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    redRoomEventButtonBText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    redRoomEventButtonB.addControl(redRoomEventButtonBText);

//#endregion

//#region blue room nav
                    var blueRoomButton = Button.CreateSimpleButton("blueRoomButton", "");
                    blueRoomButton.width = "12.45%"; //"239px"
                    blueRoomButton.height = "4.72%"; //"51px";
                    blueRoomButton.background = "transparent";
                    blueRoomButton.color = "transparent";
                    blueRoomButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    blueRoomButton.left = "40.73%"; //"789px"
                    blueRoomButton.top = "27.8%"; //"300px";
                    blueRoomButton.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(blueRoomButton);

                    var blueRoomButtonText = new TextBlock("blueRoomButtonText");
                    blueRoomButtonText.fontFamily = "Calendas Plus";
                    blueRoomButtonText.fontStyle = "italic";
                    blueRoomButtonText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomButtonText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    blueRoomButtonText.width = "100%"; //"61px";
                    blueRoomButtonText.height = "100%"; //"27px";
                    blueRoomButtonText.text = "Blue Room";
                    blueRoomButtonText.color = "black";
                    blueRoomButtonText.top = "-15%";
                    blueRoomButtonText.resizeToFit = true;
                    blueRoomButtonText.fontSize = "100%"; //"32px";
                    blueRoomButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    blueRoomButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomButton.addControl(blueRoomButtonText);

                    var blueRoomEventsText = new TextBlock("blueRoomEventsText");
                    blueRoomEventsText.fontFamily = "Calendas Plus";
                    blueRoomEventsText.fontStyle = "italic";
                    blueRoomEventsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventsText.width = "5%"; //"61px";
                    blueRoomEventsText.height = "2.96%"; //"27px";
                    blueRoomEventsText.text = "Events:";
                    blueRoomEventsText.color = "#235BA0";
                    blueRoomEventsText.left = "40.73%"; //"789px"
                    blueRoomEventsText.top = "36.67%";
                    blueRoomEventsText.resizeToFit = true;
                    blueRoomEventsText.fontSize = "2.5%"; //"32px";
                    blueRoomEventsText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    blueRoomEventsText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navBackgroundRect.addControl(blueRoomEventsText);

                    var blueRoomEventButtonA = Button.CreateSimpleButton("blueRoomEventButtonA", "");
                    blueRoomEventButtonA.width = "21.875%"; //"420px"
                    blueRoomEventButtonA.height = "9.62%"; //"104px";
                    blueRoomEventButtonA.background = "transparent";
                    blueRoomEventButtonA.color = "transparent";
                    blueRoomEventButtonA.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventButtonA.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    blueRoomEventButtonA.left = "40.73%"; //"789px"
                    blueRoomEventButtonA.top = "42.5%"; //"459px";
                    blueRoomEventButtonA.onPointerUpObservable.add(function() {
                        //add functionality here
                        jumpToEmanicpation();
                        closeNavigation();
                    });
                    navBackgroundRect.addControl(blueRoomEventButtonA);

                    var blueRoomEventButtonAText = new TextBlockWithUnderlineColor("blueRoomEventButtonAText");
                    blueRoomEventButtonAText.fontFamily = "Calendas Plus";
                    blueRoomEventButtonAText.textWrapping = true;
                    blueRoomEventButtonAText.underline = true;
                    blueRoomEventButtonAText.underlineColor = "#363D45";
                    blueRoomEventButtonAText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventButtonAText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    blueRoomEventButtonAText.lineSpacing = 8;
                    blueRoomEventButtonAText.width = "100%"; //"61px";
                    blueRoomEventButtonAText.height = "100%"; //"27px";
                    blueRoomEventButtonAText.text = "Signing of the Emancipation Proclamation following the New Year’s Day Reception";
                    blueRoomEventButtonAText.color = "#363D45";
                    blueRoomEventButtonAText.resizeToFit = true;
                    blueRoomEventButtonAText.fontSize = "25%"; //"24px";
                    blueRoomEventButtonAText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    blueRoomEventButtonAText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventButtonA.addControl(blueRoomEventButtonAText);

                    var blueRoomEventButtonB = Button.CreateSimpleButton("blueRoomEventButtonB", "");
                    blueRoomEventButtonB.width = "21.875%"; //"420px"
                    blueRoomEventButtonB.height = "5.92%"; //"64px";
                    blueRoomEventButtonB.background = "transparent";
                    blueRoomEventButtonB.color = "transparent";
                    blueRoomEventButtonB.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventButtonB.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    blueRoomEventButtonB.left = "40.73%"; //"789px"
                    blueRoomEventButtonB.top = "57.685%"; //"623px";
                    blueRoomEventButtonB.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(blueRoomEventButtonB);

                    var blueRoomEventButtonBText = new TextBlockWithUnderlineColor("blueRoomEventButtonBText");
                    blueRoomEventButtonBText.fontFamily = "Calendas Plus";
                    blueRoomEventButtonBText.textWrapping = true;
                    blueRoomEventButtonBText.underline = true;
                    blueRoomEventButtonBText.underlineColor = "#363D45";
                    blueRoomEventButtonBText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventButtonBText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    blueRoomEventButtonBText.lineSpacing = 8;
                    blueRoomEventButtonBText.width = "100%"; //"61px";
                    blueRoomEventButtonBText.height = "100%"; //"27px";
                    blueRoomEventButtonBText.text = "President Ulysses S. Grant hosts King Kalahaua of the Kingdom of Hawaii";
                    blueRoomEventButtonBText.color = "#363D45";
                    blueRoomEventButtonBText.resizeToFit = true;
                    blueRoomEventButtonBText.fontSize = "40%"; //"24px";
                    blueRoomEventButtonBText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    blueRoomEventButtonBText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    blueRoomEventButtonB.addControl(blueRoomEventButtonBText);
//#endregion

//#region green room nav
                    var greenRoomButton = Button.CreateSimpleButton("greenRoomButton", "");
                    greenRoomButton.width = "12.45%"; //"239px"
                    greenRoomButton.height = "4.72%"; //"51px";
                    greenRoomButton.background = "transparent";
                    greenRoomButton.color = "transparent";
                    greenRoomButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    greenRoomButton.left = "71.92%"; //"1381px"
                    greenRoomButton.top = "27.8%"; //"300px";
                    greenRoomButton.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(greenRoomButton);

                    var greenRoomButtonText = new TextBlock("greenRoomButtonText");
                    greenRoomButtonText.fontFamily = "Calendas Plus";
                    greenRoomButtonText.fontStyle = "italic";
                    greenRoomButtonText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomButtonText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    greenRoomButtonText.width = "100%"; //"61px";
                    greenRoomButtonText.height = "100%"; //"27px";
                    greenRoomButtonText.text = "Green Room";
                    greenRoomButtonText.color = "black";
                    greenRoomButtonText.top = "-15%";
                    greenRoomButtonText.resizeToFit = true;
                    greenRoomButtonText.fontSize = "100%"; //"32px";
                    greenRoomButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    greenRoomButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomButton.addControl(greenRoomButtonText);

                    var greenRoomEventsText = new TextBlock("greenRoomEventsText");
                    greenRoomEventsText.fontFamily = "Calendas Plus";
                    greenRoomEventsText.fontStyle = "italic";
                    greenRoomEventsText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventsText.width = "5%"; //"61px";
                    greenRoomEventsText.height = "2.96%"; //"27px";
                    greenRoomEventsText.text = "Events:";
                    greenRoomEventsText.color = "#235BA0";
                    greenRoomEventsText.left = "71.92%"; //"1381px"
                    greenRoomEventsText.top = "36.67%";
                    greenRoomEventsText.resizeToFit = true;
                    greenRoomEventsText.fontSize = "2.5%"; //"32px";
                    greenRoomEventsText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    greenRoomEventsText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navBackgroundRect.addControl(greenRoomEventsText);

                    var greenRoomEventButtonA = Button.CreateSimpleButton("greenRoomEventButtonA", "");
                    greenRoomEventButtonA.width = "21.875%"; //"420px"
                    greenRoomEventButtonA.height = "5.92%"; //"64px";
                    greenRoomEventButtonA.background = "transparent";
                    greenRoomEventButtonA.color = "transparent";
                    greenRoomEventButtonA.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventButtonA.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    greenRoomEventButtonA.left = "71.92%"; //"1381px"
                    greenRoomEventButtonA.top = "42.5%"; //"459px";
                    greenRoomEventButtonA.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(greenRoomEventButtonA);

                    var greenRoomEventButtonAText = new TextBlockWithUnderlineColor("greenRoomEventButtonAText");
                    greenRoomEventButtonAText.fontFamily = "Calendas Plus";
                    greenRoomEventButtonAText.textWrapping = true;
                    greenRoomEventButtonAText.underline = true;
                    greenRoomEventButtonAText.underlineColor = "#363D45";
                    greenRoomEventButtonAText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventButtonAText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    greenRoomEventButtonAText.lineSpacing = 8;
                    greenRoomEventButtonAText.width = "100%"; //"61px";
                    greenRoomEventButtonAText.height = "100%"; //"27px";
                    greenRoomEventButtonAText.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do";
                    greenRoomEventButtonAText.color = "#363D45";
                    greenRoomEventButtonAText.resizeToFit = true;
                    greenRoomEventButtonAText.fontSize = "40%"; //"24px";
                    greenRoomEventButtonAText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    greenRoomEventButtonAText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventButtonA.addControl(greenRoomEventButtonAText);

                    var greenRoomEventButtonB = Button.CreateSimpleButton("greenRoomEventButtonB", "");
                    greenRoomEventButtonB.width = "21.875%"; //"420px"
                    greenRoomEventButtonB.height = "5.92%"; //"64px";
                    greenRoomEventButtonB.background = "transparent";
                    greenRoomEventButtonB.color = "transparent";
                    greenRoomEventButtonB.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventButtonB.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    greenRoomEventButtonB.left = "71.92%"; //"1381px"
                    greenRoomEventButtonB.top = "57.685%"; //"623px";
                    greenRoomEventButtonB.onPointerUpObservable.add(function() {
                        //add functionality here
                    });
                    navBackgroundRect.addControl(greenRoomEventButtonB);

                    var greenRoomEventButtonBText = new TextBlockWithUnderlineColor("blueRoomEventButtonBText");
                    greenRoomEventButtonBText.fontFamily = "Calendas Plus";
                    greenRoomEventButtonBText.textWrapping = true;
                    greenRoomEventButtonBText.underline = true;
                    greenRoomEventButtonBText.underlineColor = "#363D45";
                    greenRoomEventButtonBText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventButtonBText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    greenRoomEventButtonBText.lineSpacing = 8;
                    greenRoomEventButtonBText.width = "100%"; //"61px";
                    greenRoomEventButtonBText.height = "100%"; //"27px";
                    greenRoomEventButtonBText.text = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum";
                    greenRoomEventButtonBText.color = "#363D45";
                    greenRoomEventButtonBText.resizeToFit = true;
                    greenRoomEventButtonBText.fontSize = "40%"; //"24px";
                    greenRoomEventButtonBText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    greenRoomEventButtonBText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    greenRoomEventButtonB.addControl(greenRoomEventButtonBText);
//#endregion

//#endregion

//#region close nav button
                    var closeNavButton = Button.CreateSimpleButton("closeNav", "");
                    closeNavButton.width = "6.25%"; //"120px"
                    closeNavButton.height = "7.4%"; //"80px";
                    closeNavButton.background = "#FFFFFF";
                    closeNavButton.color = "#FFFFFF";
                    closeNavButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    closeNavButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    closeNavButton.left = "2%"; //"40px";
                    closeNavButton.top = "3.7%"; //"20px";
                    closeNavButton.onPointerUpObservable.add(function() {
                        easyAnimation(navBackgroundRect, 'left', 30, 0, -100, 90);
                        easyAnimation(entranceRect, 'left', 30, 30, 0, 90);
                        easyAnimation(constantRect, 'left', 30, 30, 0, 90);
                        easyAnimation(label, 'left', 30, 30, 0, 90);
                        easyAnimation(greyBoxBlurRoomImage, 'left', 30, 30, 0, 90);
                    });
                    navBackgroundRect.addControl(closeNavButton);

                    var closeNavButtonStroke = new Rectangle("label for button stroke" );
                    closeNavButtonStroke.width = "95%"; //"114px";
                    closeNavButtonStroke.height = "92.5%" //"74px";
                    closeNavButtonStroke.left = ".75%";
                    closeNavButtonStroke.top = "0.75%";
                    closeNavButtonStroke.color = "black";
                    closeNavButton.addControl(closeNavButtonStroke);

                    var closeNavButtonImg = new Image();
                    closeNavButtonImg.color = "transparent";
                    closeNavButtonImg.width = "23%"; //57.4px
                    closeNavButtonImg.height = "35%"; //35.43px
                    closeNavButtonImg.top = "-6%"; //11.23px
                    closeNavButtonImg.source = "https://i.imgur.com/YH78eY3.png";
                    closeNavButtonImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                    closeNavButtonImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                    closeNavButton.addControl(closeNavButtonImg);

                    var closeNavButtonText = new TextBlock("closeNavButtonText");    
                    closeNavButtonText.fontFamily = "Calendas Plus";
                    closeNavButtonText.textWrapping = true;
                    closeNavButtonText.width = "99.16%"; //119px
                    closeNavButtonText.height = "22%"; //15px
                    closeNavButtonText.text = "Close";
                    closeNavButtonText.color = "black";
                    closeNavButtonText.fontSize = "15%"; //14px
                    closeNavButtonText.top = "70%"; //57px
                    closeNavButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    closeNavButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                    closeNavButton.addControl(closeNavButtonText);
//#endregion

//#region Nav Audio Button
                    var navAudioButton = Button.CreateSimpleButton("audio", "");
                    navAudioButton.width = "3.125%"; //"60px"
                    navAudioButton.height = "5.55%"; //"60px";
                    navAudioButton.color = "transparent";
                    navAudioButton.cornerRadius = 0;
                    navAudioButton.background = "#D9D9D9";
                    navAudioButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navAudioButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    navAudioButton.left = "3.125%"; //"60px";
                    navAudioButton.top = "88.88%"; //"960px";
                    navAudioButton.onPointerUpObservable.add(function() {
                        fullscreenGo();
                    });
                    navBackgroundRect.addControl(navAudioButton);

                    var navAudioButtonStroke = new Rectangle("audioButtonStroke" );
                    navAudioButtonStroke.height = "95%"; //"54px";
                    navAudioButtonStroke.width = "95%"; //"54px";
                    navAudioButtonStroke.color = "black";
                    navAudioButtonStroke.background = "transparent";
                    navAudioButtonStroke.left = "3.25%";
                    navAudioButtonStroke.top = "4%";
                    navAudioButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    navAudioButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                    navAudioButton.addControl( navAudioButtonStroke);

                    var navSpeakerButton = new Image();
                    navSpeakerButton.color = "transparent";
                    navSpeakerButton.width = "46.66%"; //"28px";
                    navSpeakerButton.height = "46.66%"; //"28px";
                    navSpeakerButton.source = "https://i.imgur.com/89lytUS.png";
                    navSpeakerButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                    navSpeakerButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                    navAudioButton.addControl(navSpeakerButton);
//#endregion

//#region Nav Reset Button
                    var navResetButton = Button.CreateSimpleButton("reset", "");
                    navResetButton.width = "5.73%"; //"110px"
                    navResetButton.height = "5.55%"; //"60px";
                    navResetButton.color = "transparent";
                    navResetButton.cornerRadius = 0;
                    navResetButton.background = "#D9D9D9";
                    navResetButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navResetButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                    navResetButton.left = "6.77%"; //"130px";
                    navResetButton.top = "88.88%"; //"960px";
                    navResetButton.onPointerUpObservable.add(function() {
                        window.location.reload();
                    });
                    navBackgroundRect.addControl(navResetButton);

                    var navResetButtonStroke = new Rectangle("audioButtonStroke" );
                    navResetButtonStroke.height = "95%"; //"54px";
                    navResetButtonStroke.width = "95%"; //"54px";
                    navResetButtonStroke.color = "black";
                    navResetButtonStroke.background = "transparent";
                    navResetButtonStroke.left = "3.25%";
                    navResetButtonStroke.top = "4%";
                    navResetButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                    navResetButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                    navResetButton.addControl( navResetButtonStroke);

                    var navResetImg = new Image();
                    navResetImg.color = "transparent";
                    navResetImg.width = "11.35%"; //"12.33px";
                    navResetImg.height = "23.63%"; //"14.18px";
                    navResetImg.left = "16.1%"; //"17.67px";
                    navResetImg.resizeToFit = true;
                    navResetImg.source = "https://i.imgur.com/wiaNJ05.png";
                    navResetImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                    navResetImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navResetButton.addControl(navResetImg);

                    var resetButtonText = new TextBlock("resetButtonText");    
                    resetButtonText.fontFamily = "Calendas Plus";
                    resetButtonText.textWrapping = true;
                    resetButtonText.width = "61.82%"; //68px
                    resetButtonText.height = "31.67%"; //19px
                    resetButtonText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    resetButtonText.text = "Restart";
                    resetButtonText.color = "black";
                    resetButtonText.fontSize = "32.5%"; //14px
                    resetButtonText.left = "32.73%"; //36px
                    resetButtonText.resizeToFit = true;
                    resetButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                    resetButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                    navResetButton.addControl(resetButtonText);
//#endregion

//#region Welcome Page
                        var advancedTextureWelcome = AdvancedDynamicTexture.CreateFullscreenUI("uiWelcome");

                        var welBackgroundRect = new Rectangle("welBackgroundRect" );
                        welBackgroundRect.height = "100%"; //"1080px";
                        welBackgroundRect.width = "100%"; //"1920px";
                        welBackgroundRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        welBackgroundRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        advancedTextureWelcome.addControl( welBackgroundRect);

                        var welcomeSplashScreen = new Image();
                        welcomeSplashScreen.color = "transparent";
                        welcomeSplashScreen.width = "140%"; //1920px
                        welcomeSplashScreen.height = "140%"; //1080px
                        welcomeSplashScreen.source = "https://i.imgur.com/mVFHZmz.jpg";
                        welcomeSplashScreen.top = "15%";
                        welcomeSplashScreen.left = "-1.25%";
                        welcomeSplashScreen.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeSplashScreen.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welBackgroundRect.addControl(welcomeSplashScreen);

                        var welcomeBackgroundMask = new Rectangle("label for background mask" );
                        welcomeBackgroundMask.width = "100%"; //"114px";
                        welcomeBackgroundMask.height = "100%" //"74px";
                        welcomeBackgroundMask.color = "#000000";
                        welcomeBackgroundMask.background = "000000";
                        welcomeBackgroundMask.alpha = .45;
                        welcomeBackgroundMask.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeBackgroundMask.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welBackgroundRect.addControl(welcomeBackgroundMask);

                        var welcomeBackgroundStroke = new Rectangle("label for background stroke" );
                        welcomeBackgroundStroke.width = "97.4%"; //"114px";
                        welcomeBackgroundStroke.height = "95.37%" //"74px";
                        welcomeBackgroundStroke.color = "#FFFFFF";
                        welcomeBackgroundStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeBackgroundStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welBackgroundRect.addControl(welcomeBackgroundStroke);

                        var welcomeTextImg = new Image();
                        welcomeTextImg.color = "transparent";
                        welcomeTextImg.width = "35.47%"; //680px
                        welcomeTextImg.height = "20.37%"; //220px
                        welcomeTextImg.source = "https://i.imgur.com/8Wc9d2D.png";
                        welcomeTextImg.top = "-5%";
                        welcomeTextImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeTextImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welBackgroundRect.addControl(welcomeTextImg);

//#region Start Button          
                        //Start Button
                        var startButton = Button.CreateSimpleButton("startButton", "");
                        startButton.width = "12.5%"; //"240px"
                        startButton.height = "5.55%"; //"60px"; 
                        startButton.color = "transparent";
                        startButton.background = "#235BA0";
                        startButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        startButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        //startButton.left = "43.75%"; //"840px";
                        startButton.top = "63%"; //"656px";
                        startButton._onPointerEnter = function()
                        {
                            startButtonStroke.height = "100%";
                            startButtonStroke.width = "100%";
                        }
                        startButton._onPointerOut = function()
                        {
                            startButtonStroke.height = "83.33%";
                            startButtonStroke.width = "95.83%";
                        }
                        startButton.onPointerUpObservable.add(function() {
                            startButton.isEnabled = false;
                            easyScale(welcomeSplashScreen, 30, 140, 230, 140, 230, 30);
                        });
                        welBackgroundRect.addControl(startButton);
            
                        var startButtonStroke = new Rectangle("startButtonStroke" );
                        startButtonStroke.height = "83.33%"; //"50px";
                        startButtonStroke.width = "95.83%"; //"230px";
                        startButtonStroke.color = "white";
                        startButtonStroke.background = "transparent";
                        startButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        startButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        startButton.addControl( startButtonStroke);
            
                        var startButtonImg = new Image();
                        startButtonImg.color = "transparent";
                        startButtonImg.width = "21px";
                        startButtonImg.height = "21px";
                        startButtonImg.rotation = 3.15;
                        startButtonImg.left = "63.33%"; //"152px";
                        startButtonImg.source = "https://i.imgur.com/u2mV0JU.png";
                        startButtonImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        startButtonImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        startButton.addControl(startButtonImg);
            
                        var startButtonText = new TextBlock("startButtonText");
                        startButtonText.fontFamily = "Calendas Plus";
                        startButtonText.fontStyle = "italic";
                        startButtonText.textWrapping = true;
                        startButtonText.width = "25.42%"; //"61px";
                        startButtonText.height = "45%"; //"27px";
                        startButtonText.text = "Start";
                        startButtonText.color = "white";
                        startButtonText.fontSize = "50%"; //"26px";
                        startButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        startButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        startButton.addControl(startButtonText);
//#endregion

//#region Nav Audio Button
                        var welcomeAudioButton = Button.CreateSimpleButton("welcomeaudio", "");
                        welcomeAudioButton.width = "3.125%"; //"60px"
                        welcomeAudioButton.height = "5.55%"; //"60px";
                        welcomeAudioButton.color = "transparent";
                        welcomeAudioButton.cornerRadius = 0;
                        welcomeAudioButton.background = "#D9D9D9";
                        welcomeAudioButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        welcomeAudioButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        welcomeAudioButton.left = "3.125%"; //"60px";
                        welcomeAudioButton.top = "88.88%"; //"960px";
                        welcomeAudioButton.onPointerUpObservable.add(function() {
                            fullscreenGo();
                        });
                        welBackgroundRect.addControl(welcomeAudioButton);

                        var welcomeAudioButtonStroke = new Rectangle("welcomeAudioButtonStroke" );
                        welcomeAudioButtonStroke.height = "95%"; //"54px";
                        welcomeAudioButtonStroke.width = "95%"; //"54px";
                        welcomeAudioButtonStroke.color = "black";
                        welcomeAudioButtonStroke.background = "transparent";
                        welcomeAudioButtonStroke.left = "3.25%";
                        welcomeAudioButtonStroke.top = "4%";
                        welcomeAudioButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        welcomeAudioButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        welcomeAudioButton.addControl( welcomeAudioButtonStroke);

                        var welcomeSpeakerButton = new Image();
                        welcomeSpeakerButton.color = "transparent";
                        welcomeSpeakerButton.width = "46.66%"; //"28px";
                        welcomeSpeakerButton.height = "46.66%"; //"28px";
                        welcomeSpeakerButton.source = "https://i.imgur.com/89lytUS.png";
                        welcomeSpeakerButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeSpeakerButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        welcomeAudioButton.addControl(welcomeSpeakerButton);
//#endregion
                        
//#region Welcome screen logos
                        var welLogoRect = new Rectangle("welLogoRect" );
                        welLogoRect.height = "5.6%"; //"60.32px";
                        welLogoRect.width = "18.75%"; //"360px";
                        welLogoRect.color = "transparent";
                        welLogoRect.left = "-3.125%"; //"60px";
                        welLogoRect.top = "88.88%"; //"960px";
                        welLogoRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        welLogoRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;  
                        welBackgroundRect.addControl(welLogoRect);

                        var welcomeWhitehouseLogo = new Image();
                        welcomeWhitehouseLogo.color = "transparent";
                        welcomeWhitehouseLogo.width = "62.22%"; //"224px";
                        welcomeWhitehouseLogo.height = "59.68%"; //"36px";
                        welcomeWhitehouseLogo.source = "https://i.imgur.com/cPdvEX4.png";
                        welcomeWhitehouseLogo.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeWhitehouseLogo.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        welLogoRect.addControl(welcomeWhitehouseLogo);

                        var welLogoLine = new Rectangle("welLogoLine" );
                        welLogoLine.height = "100%"; //"60px";
                        welLogoLine.width = "0.55%%"; //"2px";
                        welLogoLine.color = "white";
                        welLogoLine.left = "-65.5%"; //"60px";
                        welLogoLine.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welLogoLine.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;  
                        welLogoRect.addControl(welLogoLine);

                        var welcomeAWSLogo = new Image();
                        welcomeAWSLogo.color = "transparent";
                        welcomeAWSLogo.width = "25.23%"; //"120px";
                        welcomeAWSLogo.height = "90%"; //"72px";
                        welcomeAWSLogo.source = "https://i.imgur.com/smOUoJv.png";
                        welcomeAWSLogo.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        welcomeAWSLogo.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        welLogoRect.addControl(welcomeAWSLogo);
//#endregion

//#endregion

//#region Language Selection Page
                        var advancedTextureLanguage = AdvancedDynamicTexture.CreateFullscreenUI("uiLanguage");

                        var lanBackgroundRect = new Rectangle("lanBackgroundRect" );
                        lanBackgroundRect.height = "100%"; //"50px";
                        lanBackgroundRect.width = "100%"; //"230px";
                        lanBackgroundRect.color = "#D9D9D9";
                        lanBackgroundRect.background = "#D9D9D9";
                        //lanBackgroundRect.left = canvas.width * -1;
                        lanBackgroundRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        lanBackgroundRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                        advancedTextureLanguage.addControl( lanBackgroundRect);

                        var lanWhiteHouseIconImg = new Image();
                        lanWhiteHouseIconImg.color = "transparent";
                        lanWhiteHouseIconImg.width = "46.875%"; //900px
                        lanWhiteHouseIconImg.height = "43.89%"; //474px
                        lanWhiteHouseIconImg.alpha = .10;
                        lanWhiteHouseIconImg.source = "https://i.imgur.com/ij7gPpq.png";
                        lanWhiteHouseIconImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM; 
                        lanWhiteHouseIconImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                        lanBackgroundRect.addControl(lanWhiteHouseIconImg);

                        var lanBackgroundStroke = new Rectangle("label for background stroke" );
                        lanBackgroundStroke.width = "97.4%"; //"114px";
                        lanBackgroundStroke.height = "95.37%" //"74px";
                        lanBackgroundStroke.color = "#959BA1";
                        lanBackgroundStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        lanBackgroundStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        lanBackgroundRect.addControl(lanBackgroundStroke);
//#endregion

//#region Language selection buttons
                        var lanChooseRect = new Rectangle("lanChooseRect" );
                        lanChooseRect.width = "44.53%"; //"855px";
                        lanChooseRect.height = "4%"; //"40px";
                        lanChooseRect.color = "transparent";
                        lanChooseRect.background = "transparent";
                        lanChooseRect.top = "-10%";
                        lanChooseRect.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        lanChooseRect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        lanBackgroundRect.addControl( lanChooseRect);

                        var languageButtonText = new TextBlock("LanguageButtonText");
                        languageButtonText.fontFamily = "Calendas Plus";
                        languageButtonText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        languageButtonText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        languageButtonText.width = "100%"; //"61px";
                        languageButtonText.height = "100%"; //"27px";
                        languageButtonText.text = "Choose a language";
                        languageButtonText.color = "#363D45";
                        languageButtonText.top = "-20%";
                        languageButtonText.fontSize = "90%"; //"32px";
                        languageButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                        languageButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        lanChooseRect.addControl(languageButtonText);
//#endregion

//#region Selection Buttons          
                        //English Button
                        var englishButton = Button.CreateSimpleButton("englishButton", "");
                        englishButton.width = "12.5%"; //"240px"
                        englishButton.height = "5.55%"; //"60px"; 
                        englishButton.color = "transparent";
                        englishButton.background = "#235BA0";
                        englishButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        englishButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        englishButton.left = "34.375%"; //"660px";
                        englishButton.top = "47%"; //"656px";
                        englishButton._onPointerEnter = function()
                        {
                            englishButtonStroke.height = "100%";
                            englishButtonStroke.width = "100%";
                        }
                        englishButton._onPointerOut = function()
                        {
                            englishButtonStroke.height = "83.33%";
                            englishButtonStroke.width = "95.83%";
                        }
                        englishButton.onPointerUpObservable.add(function() {
                            console.log("english");
                            easyFade(lanBackgroundRect, 30, 1, 0, 90);
                            englishButton.isEnabled = false;
                        });
                        lanBackgroundRect.addControl(englishButton);
            
                        var englishButtonStroke = new Rectangle("englishButtonStroke" );
                        englishButtonStroke.height = "83.33%"; //"50px";
                        englishButtonStroke.width = "95.83%"; //"230px";
                        englishButtonStroke.color = "white";
                        englishButtonStroke.background = "transparent";
                        englishButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        englishButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        englishButton.addControl( englishButtonStroke);
            
                        var englishButtonText = new TextBlock("englishButtonText");
                        englishButtonText.fontFamily = "Calendas Plus";
                        englishButtonText.fontStyle = "italic";
                        englishButtonText.textWrapping = true;
                        englishButtonText.width = "100%"; //"61px";
                        englishButtonText.height = "100%"; //"27px";
                        englishButtonText.text = "English";
                        englishButtonText.color = "white";
                        englishButtonText.fontSize = "50%"; //"26px";
                        englishButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        englishButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        englishButton.addControl(englishButtonText);

                        //Spanish Button
                        var spanishButton = Button.CreateSimpleButton("spanishButton", "");
                        spanishButton.width = "12.5%"; //"240px"
                        spanishButton.height = "5.55%"; //"60px"; 
                        spanishButton.color = "transparent";
                        spanishButton.background = "#235BA0";
                        spanishButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
                        spanishButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
                        spanishButton.left = "53.125%"; //"660px";
                        spanishButton.top = "47%"; //"656px";
                        spanishButton.onPointerUpObservable.add(function() {
                            console.log("spanish");
                            //easyFade(lanBackgroundRect, 30, 1, 0, 90);
                        });
                        lanBackgroundRect.addControl(spanishButton);
            
                        var spanishButtonStroke = new Rectangle("spanishButtonStroke" );
                        spanishButtonStroke.height = "83.33%"; //"50px";
                        spanishButtonStroke.width = "95.83%"; //"230px";
                        spanishButtonStroke.color = "white";
                        spanishButtonStroke.background = "transparent";
                        spanishButtonStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        spanishButtonStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                        spanishButton.addControl( spanishButtonStroke);
            
                        var spanishButtonText = new TextBlock("spanishButtonText");
                        spanishButtonText.fontFamily = "Calendas Plus";
                        spanishButtonText.fontStyle = "italic";
                        spanishButtonText.textWrapping = true;
                        spanishButtonText.width = "100%"; //"61px";
                        spanishButtonText.height = "100%"; //"27px";
                        spanishButtonText.text = "Spanish";
                        spanishButtonText.color = "white";
                        spanishButtonText.fontSize = "50%"; //"26px";
                        spanishButtonText.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                        spanishButtonText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                        spanishButton.addControl(spanishButtonText);
//#endregion

//#region overlay image for learn more
                            var advancedTextureOverlay = AdvancedDynamicTexture.CreateFullscreenUI("uiOverlay");

                            //Learn more Expanded Image
                            var learnMoreExpandedImgHolder = new Rectangle("learnMoreExpandedImgHolder" );
                            learnMoreExpandedImgHolder.width = "100%"; //"1500px";
                            learnMoreExpandedImgHolder.height = "100%"; //"780px";
                            learnMoreExpandedImgHolder.color = "transparent";
                            learnMoreExpandedImgHolder.background = "#000000";
                            learnMoreExpandedImgHolder.left = "0%"; //"360px";
                            learnMoreExpandedImgHolder.top = "0%"; //"180px";
                            learnMoreExpandedImgHolder.alpha = 0;
                            learnMoreExpandedImgHolder.isEnabled = false;
                            learnMoreExpandedImgHolder.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            learnMoreExpandedImgHolder.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            advancedTextureOverlay.addControl( learnMoreExpandedImgHolder);

                            var waitingExpandedImgBoxLearnMore = new Image();
                            waitingExpandedImgBoxLearnMore.color = "transparent";
                            waitingExpandedImgBoxLearnMore.width = "70.3125%"; //"1350px";
                            waitingExpandedImgBoxLearnMore.height = "100%"; //"1080px";
                            waitingExpandedImgBoxLearnMore.source = "https://i.imgur.com/FosX3Gu.jpg";
                            waitingExpandedImgBoxLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            waitingExpandedImgBoxLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            learnMoreExpandedImgHolder.addControl(waitingExpandedImgBoxLearnMore);

                            var leftArrowBoxExpandedLearnMore = new Rectangle("leftArrowBoxExpandedLearnMore" );
                            leftArrowBoxExpandedLearnMore.width = "3.33%"; //"64px";
                            leftArrowBoxExpandedLearnMore.height = "5.926%"; //"64px";
                            leftArrowBoxExpandedLearnMore.color = "transparent";
                            leftArrowBoxExpandedLearnMore.background = "#FFFFFF";
                            leftArrowBoxExpandedLearnMore.left = "2.917%"; //"56px";
                            leftArrowBoxExpandedLearnMore.top = "47%"; //"508px";
                            leftArrowBoxExpandedLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            leftArrowBoxExpandedLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            learnMoreExpandedImgHolder.addControl( leftArrowBoxExpandedLearnMore);

                            var leftArrowBoxExpandedLearnMoreStroke = new Rectangle("leftArrowBoxExpandedLearnMoreStroke" );
                            leftArrowBoxExpandedLearnMoreStroke.width = "84.375%"; //"54px";
                            leftArrowBoxExpandedLearnMoreStroke.height = "84.375%"; //"54px";
                            leftArrowBoxExpandedLearnMoreStroke.color = "#959BA1";
                            leftArrowBoxExpandedLearnMoreStroke.background = "transparent";
                            leftArrowBoxExpandedLearnMoreStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            leftArrowBoxExpandedLearnMoreStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            leftArrowBoxExpandedLearnMore.addControl( leftArrowBoxExpandedLearnMoreStroke);

                            var leftArrowBoxExpandedLearnMoreImg = new Image();
                            leftArrowBoxExpandedLearnMoreImg.color = "transparent";
                            leftArrowBoxExpandedLearnMoreImg.width = "40.74%"; //"22px";
                            leftArrowBoxExpandedLearnMoreImg.height = "40.74%"; //"22px";
                            leftArrowBoxExpandedLearnMoreImg.source = "https://i.imgur.com/FsQy7Oh.png";
                            leftArrowBoxExpandedLearnMoreImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            leftArrowBoxExpandedLearnMoreImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            leftArrowBoxExpandedLearnMoreStroke.addControl(leftArrowBoxExpandedLearnMoreImg);

                            var rightArrowBoxExpandedLearnMore = new Rectangle("rightArrowBoxExpandedLearnMore" );
                            rightArrowBoxExpandedLearnMore.width = "3.33%"; //"64px";
                            rightArrowBoxExpandedLearnMore.height = "5.926%"; //"64px";
                            rightArrowBoxExpandedLearnMore.color = "transparent";
                            rightArrowBoxExpandedLearnMore.background = "#FFFFFF";
                            rightArrowBoxExpandedLearnMore.left = "94%"; //"1805px";
                            rightArrowBoxExpandedLearnMore.top = "47%"; //"508px";
                            rightArrowBoxExpandedLearnMore.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP; 
                            rightArrowBoxExpandedLearnMore.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;  
                            learnMoreExpandedImgHolder.addControl( rightArrowBoxExpandedLearnMore);

                            var rightArrowBoxExpandedLearnMoreStroke = new Rectangle("rightArrowBoxExpandedLearnMoreStroke" );
                            rightArrowBoxExpandedLearnMoreStroke.width = "84.375%"; //"54px";
                            rightArrowBoxExpandedLearnMoreStroke.height = "84.375%"; //"54px";
                            rightArrowBoxExpandedLearnMoreStroke.color = "#959BA1";
                            rightArrowBoxExpandedLearnMoreStroke.background = "transparent";
                            rightArrowBoxExpandedLearnMoreStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            rightArrowBoxExpandedLearnMoreStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            rightArrowBoxExpandedLearnMore.addControl( rightArrowBoxExpandedLearnMoreStroke);

                            var rightArrowBoxExpandedLearnMoreImg = new Image();
                            rightArrowBoxExpandedLearnMoreImg.color = "transparent";
                            rightArrowBoxExpandedLearnMoreImg.width = "40.74%"; //"22px";
                            rightArrowBoxExpandedLearnMoreImg.height = "40.74%"; //"22px";
                            rightArrowBoxExpandedLearnMoreImg.source = "https://i.imgur.com/FsQy7Oh.png";
                            rightArrowBoxExpandedLearnMoreImg.rotation = 3.1;
                            rightArrowBoxExpandedLearnMoreImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            rightArrowBoxExpandedLearnMoreImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            rightArrowBoxExpandedLearnMoreStroke.addControl(rightArrowBoxExpandedLearnMoreImg);

                            var expandExpandedImageBox = new Rectangle("expandExpandedImageBox" );
                            expandExpandedImageBox.width = "2.3%"; //"44px";
                            expandExpandedImageBox.height = "4.07%"; //"44px";
                            expandExpandedImageBox.color = "transparent";
                            expandExpandedImageBox.background = "#235BA0";
                            expandExpandedImageBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM; 
                            expandExpandedImageBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;  
                            learnMoreExpandedImgHolder.addControl( expandExpandedImageBox);

                            var expandExpandedImageBoxMoreStroke = new Rectangle("expandExpandedImageBoxMoreStroke" );
                            expandExpandedImageBoxMoreStroke.width = "86.36%"; //"38px";
                            expandExpandedImageBoxMoreStroke.height = "86.36%"; //"38px";
                            expandExpandedImageBoxMoreStroke.color = "#FFFFFF";
                            expandExpandedImageBoxMoreStroke.background = "transparent";
                            expandExpandedImageBoxMoreStroke.isPointerBlocker = false;
                            expandExpandedImageBoxMoreStroke.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            expandExpandedImageBoxMoreStroke.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;  
                            expandExpandedImageBox.addControl( expandExpandedImageBoxMoreStroke);

                            var exapndExpandedImg = Button.CreateImageOnlyButton("", "https://i.imgur.com/sVzTWjl.png");
                            exapndExpandedImg.color = "transparent";
                            exapndExpandedImg.width = "65%"; //"22px";
                            exapndExpandedImg.height = "65%"; //"22px";
                            exapndExpandedImg.source = "https://i.imgur.com/sVzTWjl.png";
                            exapndExpandedImg.alpha = 1;
                            exapndExpandedImg.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER; 
                            exapndExpandedImg.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
                            exapndExpandedImg.pointerEnterAnimation = function(){

                            }
                            exapndExpandedImg.pointerOutAnimation = function(){
                                
                            }
                            exapndExpandedImg.onPointerUpObservable.add(function() {
                                //console.log("hit!");
                                learnMoreExpandedImgHolder.isEnabled = false;
                                learnMoreExpandedImgHolder.alpha = 0;
                            });
                            expandExpandedImageBox.addControl(exapndExpandedImg);
//#endregion
            return scene;
        };

        window.initFunction = async function() {
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();// createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        //engineHost._startRenderLoop(engine, canvas);
        window.scene = createScene();
        };

        initFunction().then(() => {sceneToRender = scene        
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });