const audio = {
  play(direction, isMusic) {
    const path = "../assets/audio/" + (isMusic ? "music" : "sounds") + "/" + direction;
    
    //console.log("Audio path: " + path);
    
    const aud = new Audio(path);
    aud.volume = 0.25;
    aud.play();
    
  }
}

export default audio;