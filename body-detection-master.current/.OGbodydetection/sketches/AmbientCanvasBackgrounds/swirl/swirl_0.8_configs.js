// CanvasSwirl 0.8 Configuration list (2011 09 21)

// The original author of this code is Andrew Stibbard at http://xhva.net
// (xhva.net@gmail.com), copyright 2011 except where noted.
// You are hereby granted a licence to copy, extend and produce derivative
// works based upon this code for non-commercial purposes as long as this
// notice is reproduced in plain sight inside the derivative file or project.
// For commercial use please contact Andrew at the above address.

// Questions? Improvements? Contact me: http://xhva.net/work or xhva.net@gmail.com .
// Cheers!

// each one of these sets applies over the top of a default set, meaning that
// if a value is missing on a set then it inherits the default value.
swirlConfigs = {
    "Default": {
        // Note: if this changes, update the built-in default to match.
        // A general rule: where a minimum and maximum can be specified, a random
        // value will be generated between those two numbers for each point. For
        // example, setting opacityMin to 0.5 and opacityMax to 1 means that each
        // point will have a random opacity between 0.5 and 1.
        count:                     400,      // number of points
        shape:                     "lines",  // "lines", "rects" or "random". todo: circles? line styles? array of shape names?
        radiusInnerMax:            "0%",     // maximum inner radius of circles (pixels, or a percentage of the canvas' width or height, whichever is smaller)
        radiusInnerMin:            "0%",     // minimum inner radius of circles (pixels, or a percentage of the canvas' width or height, whichever is smaller)
        radiusOuterMax:            "50%",    // maximum outer radius of circles (pixels, or a percentage of the canvas' width or height, whichever is smaller)
        radiusOuterMin:            "50%",    // minimum outer radius of circles (pixels, or a percentage of the canvas' width or height, whichever is smaller)
        thicknessMin:              1,        // minimum thickness of lines (typically drawn as pixels)
        thicknessMax:              1,        // maximum
        fadeTime:                  0.25,     // number of seconds it takes for a line to fade from the canvas (seconds)
        rotationVelMin:            0.2,      // minimum angular velocity of points (full revolutions around the circle per second)
        rotationVelMax:            0.4,      // maximum
        originX:                   "center", // the horizontal position of the center of the circle ("left", "right", "center", percentage of the canvas from the left, or pixels)
        originY:                   "center", // the vertical position of the center of the circle ("top", "bottom", "center", percentage of the canvas from the top, or pixels)
        originXOffsetMin:          0,        // minimum amount of random horizontal offset to apply to each point (pixels)
        originXOffsetMax:          0,        // maximum
        originYOffsetMin:          0,        // minimum amount of random vertical offset to apply to each point (pixels)
        originYOffsetMax:          0,        // maximum
        distanceVelMin:            0.25,     // minimum distance velocity of points, eg. how fast a point moves from the center to the edge (full movements between the center and edge per second)
        distanceVelMax:            0.6,      // maximum
        saturationMin:             35,       // minimum color saturation of points (percentage)
        saturationMax:             75,       // maximum
        lightnessMin:              30,       // minimum color lightness of points (percentage)
        lightnessMax:              70,       // maximum
        hueMin:                    0,        // minimum color hue for each point. The hue will reset to this colour when it reach the maximum below. (number >= 0)
        hueMax:                    360,      // maximum
        hueIncrement:              1,        // amount to increase the point's hue each frame (any number; negative will cause the hue to shift backwards)
        opacityMin:                1,        // minimum amount of opacity for each point
        opacityMax:                1,        // maximum
        opacityScaleAtCenter:      1,        // scale used for a point's opacity as it approaches the center of the circle. If this number is above 1, it dominates over the edge value below. (number >= 0, typically between 0 and 1)
        opacityScaleAtEdge:        1,        // scale used for a point's opacity as it approaches the edge of the circle. If this number is above 1, it dominates over the center value above. (number >= 0, typically between 0 and 1)
        opacityScaleIsRelative:    true,     // if true, the opacityScale settings can't force a point's opacity above its generated value. If false, the point's opacity can be scaled fully to 1. (boolean)
        lightnessScaleAtCenter:    1,        // scale used for a point's lightness as it approaches the center of the circle. If this number is above 1, it dominates over the edge value below. (number >= 0, typically between 0 and 1)
        lightnessScaleAtEdge:      1,        // scale used for a point's lightness as it approaches the edge of the circle. If this number is above 1, it dominates over the center value above. (number >= 0, typically between 0 and 1)
        lightnessScaleIsRelative:  true,     // if true, the lightnessScale settings can't force a point's lightness above its generated value. If false, the point's lightness can be scaled fully to 100. (boolean)
        saturationScaleAtCenter:   1,        // scale used for a point's saturation as it approaches the center of the circle. If this number is above 1, it dominates over the edge value below. (number >= 0, typically between 0 and 1)
        saturationScaleAtEdge:     1,        // scale used for a point's saturation as it approaches the edge of the circle. If this number is above 1, it dominates over the center value above. (number >= 0, typically between 0 and 1)
        saturationScaleIsRelative: true,     // if true, the saturationScale settings can't force a point's saturation above its generated value. If false, the point's saturation can be scaled fully to 1. (boolean)
        distanceJitterMin:         0,        // minimum amount of distance added or subtracted from the true distance when drawing to the canvas (pixels)
        distanceJitterMax:         0,        // maximum
        rotationJitterMin:         0,        // minimum amount of rotation added or substracted from the true rotation when drawing to the canvas (revolutions per second)
        rotationJitterMax:         0,        // maximum
        // rotationJitterScaleAtCenter? etc
    },
    "Distance Jitter 1": {
        count: 400,
        radiusOuterMin: "42.5%",
        radiusOuterMax: "42.5%",
        thicknessMin: 1,
        thicknessMax: 1,
        fadeTime: 0.25,
        rotationVelMin: 0.2,
        rotationVelMax: 0.4,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 0.25,
        distanceVelMax: 0.6,
        saturationMin: 35,
        saturationMax: 65,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 0,
        hueMax: 360,
        opacityMin: .75,
        opacityMax: 1,
        opacityScaleAtCenter: 1,
        opacityScaleAtEdge: 1,
        opacityScaleIsRelative: false,
        lightnessScaleAtCenter: 1,
        lightnessScaleAtEdge: 1,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: 1,
        hueIncrement: 1,
        distanceJitterMin: -50,
        distanceJitterMax: 50,
    },
    "Distance Jitter 2": {
        count: 400,
        thicknessMin: 1,
        thicknessMax: 1,
        fadeTime: 0.25,
        rotationVelMin: 0.2,
        rotationVelMax: 0.4,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 0.25,
        distanceVelMax: 0.6,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 300,
        hueMax: 400,
        opacityMin: 1,
        opacityMax: 1,
        opacityScaleAtCenter: 1,
        opacityScaleAtEdge: 0,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: 1,
        lightnessScaleAtEdge: 1,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: .1,
        saturationScaleIsRelative: false,
        hueIncrement: 1,
        distanceJitterMin: -25,
        distanceJitterMax: 50,
    },
    "Angle Jitter Plasma": {
        count: 400,
        thicknessMin: 1,
        thicknessMax: 1,
        fadeTime: 0.35,
        rotationVelMin: 0.0,
        rotationVelMax: 0.1,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .55,
        distanceVelMax: 1.1,
        saturationMin: 45,
        saturationMax: 80,
        lightnessMin: 30,
        lightnessMax: 60,
        hueMin: 190,
        hueMax: 290,
        opacityMin: 1,
        opacityMax: 1,
        opacityScaleAtCenter: .9,
        opacityScaleAtEdge: 1,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: .8,
        lightnessScaleAtEdge: 1,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: .9,
        saturationScaleIsRelative: true,
        hueIncrement: 1,
        distanceJitterMin: 0,
        distanceJitterMax: 4,
        rotationJitterMin: -.1,
        rotationJitterMax: .1
    },
    "Bugfight": {
        count: 125,
        radiusOuterMin: "15%",
        radiusOuterMax: "45%",
        thicknessMin: 1,
        thicknessMax: 2,
        fadeTime: .03	,
        rotationVelMin: -1.7,
        rotationVelMax: 1.7,
        originXOffsetMin: 0,
        originXOffsetMax: 50,
        originYOffsetMin: 0,
        originYOffsetMax: 50,
        distanceVelMin: 3.25,
        distanceVelMax: 5.6,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 0,
        hueMax: 200,
        opacityMin: .5,
        opacityMax: 1
    },
    "Electrostatic": {
        count: 500,
        radiusOuterMin: "15%",
        radiusOuterMax: "45%",
        thicknessMin: 1,
        thicknessMax: 2,
        fadeTime: .1	,
        rotationVelMin: -1.7,
        rotationVelMax: 1.7,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 3.25,
        distanceVelMax: 5.6,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 200,
        hueMax: 360,
        opacityMin: .2,
        opacityMax: 1
    },
    "Void": {
        count: 500,
        radiusOuterMin: "15%",
        radiusOuterMax: "45%",
        thicknessMin: 1,
        thicknessMax: 2,
        fadeTime: .1	,
        rotationVelMin: -.2,
        rotationVelMax: .2,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 3.25,
        distanceVelMax: 5.6,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 200,
        hueMax: 300,
        opacityMin: .2,
        opacityMax: 1
    },
    "Fireflower": {
        count: 500,
        radiusOuterMin: "15%",
        radiusOuterMax: "45%",
        thicknessMin: 1,
        thicknessMax: 2,
        fadeTime: .1	,
        rotationVelMin: -.2,
        rotationVelMax: .2,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 1.25,
        distanceVelMax: 1.6,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 30,
        lightnessMax: 65,
        hueMin: 300,
        hueMax: 400,
        opacityMin: 1,
        opacityMax: 1
    },
    "Flamewreath": {
        count: 500,
        radiusOuterMin: "32%",
        radiusOuterMax: "45%",
        thicknessMin: 1,
        thicknessMax: 4,
        fadeTime: .2	,
        rotationVelMin: .05,
        rotationVelMax: .6,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .45,
        distanceVelMax: .8,
        saturationMin: 85,
        saturationMax: 90,
        lightnessMin: 25,
        lightnessMax: 60,
        hueMin: 355,
        hueMax: 400,
        opacityMin: 1,
        opacityMax: 1,
        opacityScaleAtEdge: .9,
        hueIncrement: 1,
        saturationScaleAtCenter: 1
    },
    "Oddbox": {
        count: 12,
        radiusOuterMin: "32%",
        radiusOuterMax: "45%",
        thicknessMin: 2,
        thicknessMax: 2,
        fadeTime: .2	,
        rotationVelMin: 15.0, // the effect depends on the rotation being very close
        rotationVelMax: 15.1, // to the framerate divided by 4 (here, 60 fps).
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .02,
        distanceVelMax: .25,
        saturationMin: 80,
        saturationMax: 100,
        lightnessMin: 35,
        lightnessMax: 85,
        hueMin: 0,
        hueMax: 360,
        opacityMin: .35,
        opacityMax: 1
    },
    "Lasershow 1": {
        count: 12,
        radiusOuterMin: "32%",
        radiusOuterMax: "45%",
        thicknessMin: 2,
        thicknessMax: 2,
        fadeTime: .1	,
        rotationVelMin: 30.0, // the effect depends on the rotation being very close
        rotationVelMax: 30.1, // to the framerate divided by 2 (here, 60 fps).
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .02,
        distanceVelMax: .25,
        saturationMin: 80,
        saturationMax: 100,
        lightnessMin: 35,
        lightnessMax: 85,
        hueMin: 0,
        hueMax: 360,
        opacityMin: .35,
        opacityMax: 1
    },
    "Lasershow 2": {
        count: 80,
        radiusOuterMin: "32%",
        radiusOuterMax: "45%",
        thicknessMin: 2,
        thicknessMax: 2,
        fadeTime: .05,
        rotationVelMin: 30.1,
        rotationVelMax: 30.1,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 3.02,
        distanceVelMax: 3.25,
        saturationMin: 80,
        saturationMax: 100,
        lightnessMin: 35,
        lightnessMax: 85,
        hueMin: 0,
        hueMax: 360,
        opacityMin: .35,
        opacityMax: 1
    },
    "Lasershow 3": {
        count: 80,
        radiusOuterMin: "32%",
        radiusOuterMax: "45%",
        thicknessMin: 2,
        thicknessMax: 2,
        fadeTime: .05,
        rotationVelMin: 30.1,
        rotationVelMax: 30.1,
        originXOffsetMin: 0,
        originXOffsetMax: 50,
        originYOffsetMin: 0,
        originYOffsetMax: 50,
        distanceVelMin: 1.02,
        distanceVelMax: 1.25,
        saturationMin: 80,
        saturationMax: 100,
        lightnessMin: 35,
        lightnessMax: 85,
        hueMin: 0,
        hueMax: 360,
        opacityMin: .5,
        opacityMax: 1
    },
    "Illuminatus": {
        count: 14,
        radiusOuterMin: "15%",
        thicknessMin: 1,
        thicknessMax: 3,
        fadeTime: 1	,
        rotationVelMin: 20.0, // the effect depends on the rotation being very close
        rotationVelMax: 20.1, // to the framerate divided by 3 (here, 60 fps).
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .02,
        distanceVelMax: .25,
        saturationMin: 30,
        saturationMax: 90,
        lightnessMin: 20,
        lightnessMax: 65,
        hueMin: 260,
        hueMax: 360,
        opacityMin: .35,
        opacityMax: 1
    },
    "Rosecut": {
        count: 14,
        radiusOuterMin: "15%",
        thicknessMin: 1,
        thicknessMax: 3,
        fadeTime: 1	,
        rotationVelMin: 10.0,
        rotationVelMax: 10.1,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .02,
        distanceVelMax: .25,
        saturationMin: 30,
        saturationMax: 90,
        lightnessMin: 20,
        lightnessMax: 65,
        hueMin: 100,
        hueMax: 180,
        opacityMin: .35,
        opacityMax: 1
    },
    "Burning core": {
        count: 8,
        radiusOuterMin: "15%",
        thicknessMin: 1,
        thicknessMax: 3,
        fadeTime: .85	,
        rotationVelMin: 18.0, // the effect depends on the rotation being very close
        rotationVelMax: 18.0, // to the framerate multiplied by 0.3 (here, 60 fps).
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .05,
        distanceVelMax: .15,
        saturationMin: 80,
        saturationMax: 90,
        lightnessMin: 45,
        lightnessMax: 55,
        hueMin: 355,
        hueMax: 375,
        opacityMin: .35,
        opacityMax: 1
    },
    "Frangipani": {
        count: 4,
        radiusOuterMin: "15%",
        thicknessMin: 1,
        thicknessMax: 2,
        fadeTime: 2,
        rotationVelMin: 36.025, // the effect depends on the rotation being very close
        rotationVelMax: 36.05,  // to the framerate multiplied by 0.6 (here, 60 fps).
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .3,
        distanceVelMax: .5,
        saturationMin: 50,
        saturationMax: 70,
        lightnessMin: 55,
        lightnessMax: 65,
        hueMin: 280,
        hueMax: 420,
        opacityMin: .75,
        opacityMax: 1
    },
    "Electrosphere": {
        count: 100,
        radiusOuterMin: "15%",
        thicknessMin: .5,
        thicknessMax: 2,
        fadeTime: 0.1,
        rotationVelMin: .2,
        rotationVelMax: 1,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 8,
        distanceVelMax: 15,
        saturationMin: 50,
        saturationMax: 90,
        lightnessMin: 25,
        lightnessMax: 80,
        hueMin: 350,
        hueMax: 410,
        opacityMin: .5,
        opacityMax: 1,
        distanceJitterMin: -20,
        distanceJitterMax: 20
    },
    "Death by Post-it note": {
        count: 100,
        radiusOuterMin: "15%",
        radiusOuterMax: "44%",
        thicknessMin: 10,
        thicknessMax: 30,
        fadeTime: 0.1,
        rotationVelMin: .1,
        rotationVelMax: .5,
        originXOffsetMin: 20,
        originXOffsetMax: 50,
        originYOffsetMin: 20,
        originYOffsetMax: 50,
        distanceVelMin: 3,
        distanceVelMax: 6,
        saturationMin: 50,
        saturationMax: 90,
        lightnessMin: 25,
        lightnessMax: 80,
        hueMin: 340,
        hueMax: 420,
        opacityMin: .5,
        opacityMax: 1
    },
    "Broken geometry": {
        count: 100,
        radiusOuterMin: "25%",
        radiusOuterMax: "41%",
        thicknessMin: 1,
        thicknessMax: 75,
        fadeTime: 0.02,
        rotationVelMin: .15,
        rotationVelMax: .35,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: .36,
        distanceVelMax: .75,
        saturationMin: 50,
        saturationMax: 90,
        lightnessMin: 25,
        lightnessMax: 80,
        hueMin: 180,
        hueMax: 400,
        opacityMin: .5,
        opacityMax: 1
    },
    "Bag in a vortex": {
        count: 100,
        radiusOuterMin: "25%",
        radiusOuterMax: "41%",
        thicknessMin: 5,
        thicknessMax: 20,
        fadeTime: 0.1,
        rotationVelMin: .75,
        rotationVelMax: .85,
        originXOffsetMin: 50,
        originXOffsetMax: 50,
        originYOffsetMin: 50,
        originYOffsetMax: 50,
        distanceVelMin: 1.20,
        distanceVelMax: 1.75,
        saturationMin: 60,
        saturationMax: 90,
        lightnessMin: 0,
        lightnessMax: 80,
        hueMin: 180,
        hueMax: 400,
        opacityMin: 0,
        opacityMax: 1
    },
    "Seizure windmills": {
        count: 100,
        radiusOuterMin: "30%",
        radiusOuterMax: "30%",
        thicknessMin: 150,
        thicknessMax: 150,
        fadeTime: .001,
        rotationVelMin: .75,
        rotationVelMax: .75,
        originXOffsetMin: 50,
        originXOffsetMax: 50,
        originYOffsetMin: 50,
        originYOffsetMax: 50,
        distanceVelMin: .05,
        distanceVelMax: .1,
        saturationMin: 60,
        saturationMax: 90,
        lightnessMin: 0,
        lightnessMax: 80,
        hueMin: 180,
        hueMax: 400,
        opacityMin: 0,
        opacityMax: 1
    },
    "Paper fans": {
        count: 100,
        radiusOuterMin: "30%",
        radiusOuterMax: "30%",
        thicknessMin: 150,
        thicknessMax: 150,
        fadeTime: .1,
        rotationVelMin: .45,
        rotationVelMax: .85,
        originXOffsetMin: 20,
        originXOffsetMax: 50,
        originYOffsetMin: 20,
        originYOffsetMax: 50,
        distanceVelMin: .05,
        distanceVelMax: .1,
        saturationMin: 00,
        saturationMax: 40,
        lightnessMin: 10,
        lightnessMax: 80,
        hueMin: 150,
        hueMax: 400,
        opacityMin: 0,
        opacityMax: 1
    },
    "Akira exit": {
        count: 500,
        shape: "random",
        radiusOuterMin: "48%",
        radiusOuterMax: "48%",
        thicknessMin: 1,
        thicknessMax: 2,
        fadeTime: 0.25,
        rotationVelMin: -.03,
        rotationVelMax:  .03,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 1.6,
        distanceVelMax: 2,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 300,
        hueMax: 400,
        opacityMin: 1,
        opacityMax: 1,
        opacityScaleAtCenter: 1,
        opacityScaleAtEdge: 0,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: 0,
        lightnessScaleAtEdge: 1.5,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: .1,
        saturationScaleAtEdge: .1,
        saturationScaleIsRelative: true,
        hueIncrement: 1,
        distanceJitterMin: -50,
        distanceJitterMax: 50,
    },
    "Quartz": {
        count: 80,
        radiusOuterMin: "30%",
        radiusOuterMax: "30%",
        thicknessMin: 200,
        thicknessMax: 200,
        fadeTime: .2,
        rotationVelMin: .02,
        rotationVelMax: .08,
        originXOffsetMin: 30,
        originXOffsetMax: 60,
        originYOffsetMin: 30,
        originYOffsetMax: 60,
        distanceVelMin: .05,
        distanceVelMax: .1,
        saturationMin: 0,
        saturationMax: 0,
        lightnessMin: 60,
        lightnessMax: 80,
        hueMin: 150,
        hueMax: 400,
        opacityMin: .05,
        opacityMax: .35
    },
    "Crystal refraction": {
        count: 100,
        radiusOuterMin: "30%",
        radiusOuterMax: "30%",
        thicknessMin: 500,
        thicknessMax: 500,
        fadeTime: 1,
        rotationVelMin: -0.02,
        rotationVelMax: 0.02,
        originXOffsetMin: 30,
        originXOffsetMax: 60,
        originYOffsetMin: 30,
        originYOffsetMax: 60,
        distanceVelMin: .005,
        distanceVelMax: .015,
        saturationMin: 20,
        saturationMax: 30,
        lightnessMin: 75,
        lightnessMax: 80,
        hueMin: 5,
        hueMax: 15,
        opacityMin: .25,
        opacityMax: .25
    },
    "Kitten delight": {
        count: 500,
        thicknessMin: 1,
        thicknessMax: 1,
        fadeTime: .5,
        rotationVelMin: .08,
        rotationVelMax: .12,
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 1,
        distanceVelMax: 1.35,
        saturationMin: 55,
        saturationMax: 85,
        lightnessMin: 45,
        lightnessMax: 65,
        hueMin: 320,
        hueMax: 400,
        opacityMin: .75,
        opacityMax: 1
    },
    "Gathering feathers": {
        count: 200,
        shape: "lines",
        radiusOuterMax: "50%",
        radiusOuterMin: "50%",
        thicknessMin: 1,
        thicknessMax: 1,
        fadeTime: .25,
        rotationVelMin: 0.1,
        rotationVelMax: 0.4,
        originX: "center",
        originY: "center",
        originXOffsetMin: 0,
        originXOffsetMax: 50,
        originYOffsetMin: 0,
        originYOffsetMax: 50,
        distanceVelMin: 0.25,
        distanceVelMax: 1.6,
        saturationMin: 35,
        saturationMax: 75,
        lightnessMin: 40,
        lightnessMax: 70,
        hueMin: 180,
        hueMax: 400,
        hueIncrement: 1,
        opacityMin: 1,
        opacityMax: 1,
        opacityScaleAtCenter: 1,
        opacityScaleAtEdge: 0,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: 1,
        lightnessScaleAtEdge: 1,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: .1,
        saturationScaleIsRelative: false,
        distanceJitterMin: 20,
        distanceJitterMax: 50,
        rotationJitterMin: .08,
        rotationJitterMax: .1
    },
    "Sun worship": {
        count: 20,
        shape: "random",
        radiusOuterMax: "40%",
        radiusOuterMin: "15%",
        thicknessMin: 3,
        thicknessMax: 5,
        fadeTime: 0.7,
        rotationVelMin: 3,
        rotationVelMax: 3,
        originX: "center",
        originY: "center",
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 0.04,
        distanceVelMax: 0.06,
        saturationMin: 0,
        saturationMax: 100,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 380,
        hueMax: 420,
        hueIncrement: 1,
        opacityMin: 0.5,
        opacityMax: 1,
        opacityScaleAtCenter: 1,
        opacityScaleAtEdge: 0.65,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: 1,
        lightnessScaleAtEdge: 0.65,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: 0.75,
        saturationScaleIsRelative: true,
        distanceJitterMin: 0,
        distanceJitterMax: 0,
        rotationJitterMin: 0,
        rotationJitterMax: 0
    },
    "Shimmering plates": {
        count: 800,
        shape: "random",
        radiusOuterMax: "40%",
        radiusOuterMin: "20%",
        thicknessMin: 1,
        thicknessMax: 4,
        fadeTime: 0.1,
        rotationVelMin: 1,
        rotationVelMax: 0.4,
        originX: "center",
        originY: "center",
        originXOffsetMin: 50,
        originXOffsetMax: 50,
        originYOffsetMin: 10,
        originYOffsetMax: 10,
        distanceVelMin: 0,
        distanceVelMax: 0,
        saturationMin: "100%",
        saturationMax: "100%",
        lightnessMin: 50,
        lightnessMax: 80,
        hueMin: 10,
        hueMax: 60,
        hueIncrement: 1,
        opacityMin: 0.8,
        opacityMax: 1,
        opacityScaleAtCenter: 0.8,
        opacityScaleAtEdge: 0.5,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: 1,
        lightnessScaleAtEdge: 0.5,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: 0.5,
        saturationScaleIsRelative: false,
        distanceJitterMin: 0.3,
        distanceJitterMax: 0.5,
        rotationJitterMin: 1,
        rotationJitterMax: 1.5
    },
    "Gold Sand": {
        count: 400,
        shape: "random",
        radiusOuterMax: "40%",
        radiusOuterMin: "15%",
        thicknessMin: 1,
        thicknessMax: 1.5,
        fadeTime: 0.5,
        rotationVelMin: -0.5,
        rotationVelMax: 0.5,
        originX: "center",
        originY: "center",
        originXOffsetMin: 0,
        originXOffsetMax: 0,
        originYOffsetMin: 0,
        originYOffsetMax: 0,
        distanceVelMin: 0.05,
        distanceVelMax: 0,
        saturationMin: 0,
        saturationMax: 100,
        lightnessMin: 30,
        lightnessMax: 70,
        hueMin: 380,
        hueMax: 420,
        hueIncrement: 1,
        opacityMin: 0.5,
        opacityMax: 1,
        opacityScaleAtCenter: 1,
        opacityScaleAtEdge: 0.65,
        opacityScaleIsRelative: true,
        lightnessScaleAtCenter: 1,
        lightnessScaleAtEdge: 0.65,
        lightnessScaleIsRelative: true,
        saturationScaleAtCenter: 1,
        saturationScaleAtEdge: 0.75,
        saturationScaleIsRelative: true,
        distanceJitterMin: 0,
        distanceJitterMax: 0.25,
        rotationJitterMin: 0,
        rotationJitterMax: 0.25
    }
}