const bodies = new BodyStream ({
    posenet: posenet,
    architecture: modelArchitecture.ResNet50,
    detectionType: detectionType.singleBody,
    videoElement: document.getElementById('video'),
    samplingRate: 2500
});

let body;
let buildSpeed = 0;
//This is the sheit that causes the lag
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0);
});

function drawCameraIntoCanvas() {

    if (body) {
        //......................................................................................................................
//.BBBBBBBBBB.....OOOOOOO.....DDDDDDDDD...DYYY....YYYY...... PPPPPPPP.....AAAA.....AAARRRRRRRR..RRRTTTTTTTTT.TSSSSSS....
//.BBBBBBBBBBB...OOOOOOOOOO...DDDDDDDDDD..DYYYY..YYYYY...... PPPPPPPPP...AAAAAA....AAARRRRRRRRR.RRRTTTTTTTTTTTSSSSSSS...
//.BBBBBBBBBBB..OOOOOOOOOOOO..DDDDDDDDDDD..YYYY..YYYY....... PPPPPPPPPP..AAAAAA....AAARRRRRRRRR.RRRTTTTTTTTTTTSSSSSSSS..
//.BBBB...BBBB..OOOOO..OOOOO..DDDD...DDDD..YYYYYYYYY........ PPP...PPPP..AAAAAAA...AAAR....RRRR.....TTTT...TTTS...SSSS..
//.BBBB...BBBB.BOOOO....OOOOO.DDDD....DDDD..YYYYYYYY........ PPP...PPPP.PAAAAAAA...AAAR....RRRR.....TTTT...TTTSS........
//.BBBBBBBBBBB.BOOO......OOOO.DDDD....DDDD...YYYYYY......... PPPPPPPPPP.PAAAAAAA...AAARRRRRRRRR.....TTTT....TTSSSSS.....
//.BBBBBBBBBB..BOOO......OOOO.DDDD....DDDD...YYYYYY......... PPPPPPPPP..PAAA.AAAA..AAARRRRRRRR......TTTT.....TSSSSSSS...
//.BBBBBBBBBBB.BOOO......OOOO.DDDD....DDDD....YYYY.......... PPPPPPPP..PPAAAAAAAA..AAARRRRRR........TTTT.......SSSSSSS..
//.BBBB....BBBBBOOOO....OOOOO.DDDD....DDDD....YYYY.......... PPP.......PPAAAAAAAAA.AAAR.RRRRR.......TTTT..........SSSS..
//.BBBB....BBBB.OOOOO..OOOOO..DDDD...DDDDD....YYYY.......... PPP......PPPAAAAAAAAA.AAAR..RRRRR......TTTT...TTTS...SSSS..
//.BBBBBBBBBBBB.OOOOOOOOOOOO..DDDDDDDDDDD.....YYYY.......... PPP......PPPA....AAAA.AAAR...RRRRR.....TTTT...TTTSSSSSSSS..
//.BBBBBBBBBBB...OOOOOOOOOO...DDDDDDDDDD......YYYY.......... PPP......PPPA....AAAAAAAAR....RRRR.....TTTT....TTSSSSSSSS..
//.BBBBBBBBBB......OOOOOO.....DDDDDDDDD.......YYYY.......... PPP.....PPPPA.....AAAAAAAR.....RRRR....TTTT.....TSSSSSS....
//......................................................................................................................
        const leftShoulder = body.getBodyPart(bodyParts.leftShoulder);
        const rightShoulder = body.getBodyPart(bodyParts.rightShoulder);
        const leftEye = body.getBodyPart(bodyParts.leftEye);
        const rightEye = body.getBodyPart(bodyParts.rightEye);
        const leftEar = body.getBodyPart(bodyParts.leftEar);
        const rightEar = body.getBodyPart(bodyParts.rightEar);
        const nose = body.getBodyPart(bodyParts.nose);

        let distanceBetweenEyes = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftEye, bodyParts.rightEye));
        const distanceFromScreen = distanceCm(distanceBetweenEyes);

        const distanceBetweenShoulders = leftShoulder.position.x - rightShoulder.position.x;
        const turnHeadLeft = nose.position.x - leftEar.position.x;
        const turnHeadRight = nose.position.x - rightEar.position.x;
        const sideTiltHeadLeft = nose.position.y - leftEar.position.y;
        const sideTiltHeadRight = nose.position.y - rightEar.position.y;

//........................................................................................................................
//.BBBBBBBBBB...EEEEEEEEEEE.EHHH...HHHH.....AAAAA..AAAAV....VVVVVVVI....OOOOOOO....OOOU....UUUU.UUURRRRRRRR....RSSSSSS....
//.BBBBBBBBBBB..EEEEEEEEEEE.EHHH...HHHH.....AAAAA...AAAV....VVVVVVVI...IOOOOOOOOO..OOOU....UUUU.UUURRRRRRRRR..RRSSSSSSS...
//.BBBBBBBBBBB..EEEEEEEEEEE.EHHH...HHHH....AAAAAA...AAAV...VVVVVVVVI..IIOOOOOOOOOO.OOOU....UUUU.UUURRRRRRRRR.RRRSSSSSSSS..
//.BBBB...BBBB..EEEE........EHHH...HHHH....AAAAAAA..AAAVV..VVVV.VVVI.IIIOO...OOOOO.OOOU....UUUU.UUUR....RRRR.RRRS...SSSS..
//.BBBB...BBBB..EEEE........EHHH...HHHH...AAAAAAAA...AAVV..VVVV.VVVI.IIIO.....OOOOOOOOU....UUUU.UUUR....RRRR.RRRSS........
//.BBBBBBBBBBB..EEEEEEEEEE..EHHHHHHHHHH...AAAAAAAA...AAVV..VVVV.VVVI.IIIO......OOOOOOOU....UUUU.UUURRRRRRRRR..RRSSSSS.....
//.BBBBBBBBBB...EEEEEEEEEE..EHHHHHHHHHH...AAAA.AAAA..AAVV.VVVV..VVVI.IIIO......OOOOOOOU....UUUU.UUURRRRRRRR....RSSSSSSS...
//.BBBBBBBBBBB..EEEEEEEEEE..EHHHHHHHHHH..HAAAAAAAAA...AVVVVVVV..VVVI.IIIO......OOOOOOOU....UUUU.UUURRRRRR........SSSSSSS..
//.BBBB....BBBB.EEEE........EHHH...HHHH..HAAAAAAAAAA..AVVVVVVV..VVVI.IIIO.....OOOOOOOOUU...UUUU.UUUR.RRRRR..........SSSS..
//.BBBB....BBBB.EEEE........EHHH...HHHH..HAAAAAAAAAA..AVVVVVV...VVVI.IIIOOO..OOOOO..OOUU..UUUUU.UUUR..RRRRR..RRRS...SSSS..
//.BBBBBBBBBBBB.EEEEEEEEEEE.EHHH...HHHH.HHAA....AAAA...VVVVVV...VVVI..IIOOOOOOOOOO..OOUUUUUUUUU.UUUR...RRRRR.RRRSSSSSSSS..
//.BBBBBBBBBBB..EEEEEEEEEEE.EHHH...HHHH.HHAA.....AAAA..VVVVVV...VVVI...IOOOOOOOOO...OOUUUUUUUU..UUUR....RRRR..RRSSSSSSSS..
//.BBBBBBBBBB...EEEEEEEEEEE.EHHH...HHHHHHHAA.....AAAA..VVVVV....VVVI....OOOOOOO.......UUUUUUU...UUUR.....RRRR..RSSSSSS....
//........................................................................................................................
        console.log(distanceBetweenShoulders);
        //baseLength = cBaseLength + (distanceBetweenShoulders*2);

        if(distanceBetweenShoulders >= 1){
            temp = (300 - distanceBetweenShoulders) / 100)
            if(temp > 0.0001){speedModifier = temp}
        } else if(Math.sign(distanceBetweenShoulder) === -1){

        }

    }
    requestAnimationFrame(drawCameraIntoCanvas);
}

bodies.start();
drawCameraIntoCanvas();