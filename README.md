#node-uarm - WIP

A node module to talk to a uarm running the `UArmProtocol` sketch.

# Description
An old sketch for the UArm allowed users to communicate using the Firmata protocol to the arm to get it to move etc. I can no longer get that to work. Instead i'm using the up to date UArmProtocol sketch with some modifications for my personal preference.

Most of this library re-immplements parts of the firmata node module but its targeting the uarm with a path of least resistance. Thus querying the actual microprocessor for capabilities & data is skipped. We just want to control the arm.


# Setup
1. Update the arm to firmware `1.7.3`. Do not calibrate it! chances are your arm is calibrated already.
1. Install the sketch from the UArmProtocol folder
1. Get coding, see example.js for a reference guide that does a few things. 
