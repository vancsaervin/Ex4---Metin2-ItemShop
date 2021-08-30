// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    'numSegments'       : 8,                // Specify number of segments.
    'outerRadius'       : 200,              // Set outer radius so wheel fits inside the background.
    'drawText'          : true,             // Code drawn text can be used with segment images.
    'textFontSize'      : 9.5,               // Set text options as desired.
    'textOrientation'   : 'curved',
    'textAlignment'     : 'inner',
    'textMargin'        : 185,
    'textFontFamily'    : 'monospace',
    'textStrokeStyle'   : 'black',
    'textLineWidth'     : 3,
    'textFillStyle'     : 'white',
    'drawMode'          : 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
    'segments'          :                                 // Define segments including image and text.
    [
       {'image' : 'sabie.png',  'text' : 'Sabie Inscripționată+9'},
       {'image' : 'sabie2.png',   'text' : 'Sabie din Cianit+9'},
       {'image' : 'glaive.png',  'text' : 'Glaive Zodiac+9'},
       {'image' : 'armura.png',  'text' : 'Armură Hwang'},
       {'image' : 'cercei.png', 'text' : 'Colier Beril+9'},
       {'image' : 'cutie.png', 'text' : 'Cutie cu Pui'},
       {'image' : 'pergament.png',  'text' : '60x Pergament'},
       {'image' : 'cal.png', 'text' : 'Cal Negru'}
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 15,     // Duration in seconds.
        'spins'    : 8,     // Number of complete spins.
        'callbackFinished' : alertPrize,
        'callbackSound'    : playSound,   // Function to call when the tick sound is to be triggered.
        'soundTrigger'     : 'pins'        // Specify pins are to trigger the sound, the other option is 'segment'.
    },
    'pins' :				// Turn pins on.
    {
        'number'     : 8,
        'fillStyle'  : 'transparent',
        'outerRadius': 4,
    }
});

// Loads the tick audio sound in to an audio object.
let audio = new Audio('assets/audio/tick.mp3');

// This function is called when the sound is to be played.
function playSound()
{
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

// Vars used by the code in this page to do power controls.
let wheelPower    = 0;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel)
{
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false) {
        // Reset all to grey incase this is not the first time the user has selected the power.
        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";

        // Now light up all cells below-and-including the one selected by changing the class.
        if (powerLevel >= 1) {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2) {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3) {
            document.getElementById('pw3').className = "pw3";
        }

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    if (localStorage.clickcount && localStorage.clickcount >= 50) {
        localStorage.clickcount = Number(localStorage.clickcount)-50;
        document.getElementById("money-bani").innerHTML = localStorage.clickcount + " BANI";
        // Ensure that spinning can't be clicked again while already running.
        if (wheelSpinning == false) {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            if (wheelPower == 1) {
                theWheel.animation.spins = 3;
            } else if (wheelPower == 2) {
                theWheel.animation.spins = 8;
            } else if (wheelPower == 3) {
                theWheel.animation.spins = 15;
            }

            // Begin the spin animation by calling startAnimation on the wheel object.
            theWheel.startAnimation();
            // document.getElementById('spin_button').disabled = "true";

            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            wheelSpinning = true;
            document.getElementById("spin_button").disabled = true;
        }
    }
    else {
        alert("Nu mai ai bani!");
    }
}
    

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.
    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    document.getElementById("spin_button").disabled = false;
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment)
{
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    alert('Ai câștigat: ' + indicatedSegment.text);
    resetWheel();
}