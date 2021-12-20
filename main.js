song="";
scoreLeftWrist="";
scoreRightWrist="";

rightWristX="";
leftWristX="";

leftWristY="";
rightWristY="";

function setup(){
    canvas=createCanvas(420, 420);
    canvas.position(400, 150);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function preload(){
    song=loadSound("music.mp3");
}
function draw(){
    image(video, 0, 0, 420, 420);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist> 0.2){
    circle(rightWristX, rightWristY, 20);

    if(rightWristY> 0 && rightWristY<= 100){
        document.getElementById("speed").innerHTML= "Speed= 0.5x";
        sonf.rate(0.5);
    }
    else if(rightWristY> 100 && rightWristY<= 200){
        document.getElementById("speed").innerHTML= "Speed= 1.0x";
        sonf.rate(1.0);
    }
    else if(rightWristY> 200 && rightWristY<= 300){
        document.getElementById("speed").innerHTML= "Speed= 1.5x";
        sonf.rate(1.5);
    }
    else if(rightWristY> 300 && rightWristY<= 400){
        document.getElementById("speed").innerHTML= "Speed= 2.0x";
        sonf.rate(2.0);
    }
    else if(rightWristY> 400 && rightWristY<= 500){
        document.getElementById("speed").innerHTML= "Speed= 2.5x";
        song.rate(2.5);
    }
    }

    if(scoreLeftWrist> 0.2){
    circle(leftWristX, leftWristY, 20);
    numberLeftWristY= Number(leftWristY);
    leftWristY_decimal= floor(numberLeftWristY);
    leftWristY_divide_1000= leftWristY_decimal/1000;
    Volume= leftWristY_divide_1000*2;
    document.getElementById("volume").innerHTML= "Volume= "+ Volume;
    song.setVolume(Volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if (results.length> 0){
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist=" +scoreRightWrist +"scoreLeftWrist= "+ scoreLeftWrist);

        leftWristY= results[0].pose.leftWrist.y;
        rightWristY= results[0].pose.rightWrist.y;

        leftWristX= results[0].pose.leftWrist.x;
        rightWristX= results[0].pose. rightWrist.x;
    }
}