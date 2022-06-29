Status = "";
input_text = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 290);
    canvas.position();
    video = createCapture(VIDEO);
    video.size(380, 290);
    video.hide();
}

function start(){
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("Model_Loaded");
    status = true;
}

function gotResults(error, results){
    if (error){
       console.error(error);

    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0 ,0, 380, 290);
    if(status != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.lenght);
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

                if(objects[i].label == input_text){
                    video.stop();
                    object_Detector.detect(gotResults);
                    document.getElementById("object_found").innerHTML = input_text+" Found";
                    var synth = window.speechSynthesis;
                    var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                    synth.speak(utterThis);
                }
                else{
                    document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }
    }
}


