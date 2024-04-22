---
title: "Accessible Sky Remote"
tags: ["sky", "ino", "arduino"]
date: 2023-01-01
description: This project builds a Sky Remote suitable for a user with limited fine motor controls
---
## Accessible sky remote
Building An Accessible Sky remote with Arduino Mega

Code at [Github](https://github.com/zeph1rus/skyremote)

Sketchup Diagram: ![Box Diagram](/images/skyremote-1.jpg)

This project builds a Sky Remote suitable for a user with limited fine motor controls (sutch as users with MS or other degenerative nerve conditions. It was conceived to help my father operate the  TV, once his fine movement left him unable to operate a standard (or even traditional 'accessible') remote.

This project uses an Arduino Mega processor, however any Arduino board compatible with the IRremote library and enough digital inputs for your buttons will suffice.  The mega is admittedly overkill for the functionality required.

## Dependencies:

* An arduino board! - One supported by the IRremote library - see: [link](https://github.com/z3t0/Arduino-IRremote)
* Aformentioned library selected for your sketch.
* Switches and a joystick, I recommend Arcade joysticks and switches as they have very definite actions, but require little force to actuate. They are also widely available.
* An IR LED and appropriate current limiting resistor for it. You can desolder from an existing remote if you want, however I suggest you keep a working remote around for the equipment.
* Wires, Wiring tools and soldering equipment.  A lot of switches come with Spade connectors which may be more flexible to solder to than the switches directly.
* An appropriate enclosure,
* A Step drill will be useful to drill holes in the enclosure for the switches and joystick.

## Example Wiring Diagram

TinyCad: ![Wiring Diagram](/images/skyremote-2.jpg)

### Credits

#### I used the fantasic IRremote library for Arduino, without which this would not have been possible. [Arduino IRremote](https://github.com/z3t0/Arduino-IRremote)
#### hexreader at the Edaboard forums for this post detailing reverse engineering of the Sky Plus remove codes: [Edaboards](http://www.edaboard.com/thread299046.html#post1279512)
#### The SB-Projects detailing of the RC6 Protocol [RC6](http://www.sbprojects.com/knowledge/ir/rc6.php)

## Appendix:

I have detailed the remote codes from the post linked above here in case this goes down. I've only implemented the ones I require in the header file, however it will be simple to add/remove as you need.


```
Sky+ commander buttons - cover closed
00c00-00c09             0 to 9
00c0c                   on/off
00c20                   ch+
00c21                   ch-
00c24			pause
00c28			fast forward
00c3c   	        text
00c3d			rewind
00c3e			play
00c3f			stop
00c40			record
00c58			up
00c59			down
00c5a			left
00c5b			right
00c5c			select
00c6d			red
00c6e			green
00c6f			yellow
00c70			blue
00c7d			box office
00c7e			services
00c80			sky
00c81			help
00c83			backup
00ccb			i
00ccc			tv guide
00cf5			interactive
```
 
