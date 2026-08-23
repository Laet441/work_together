const audio = {
  play(fileName, isMusic) {
    const path = "../assets/audio/" + (isMusic ? "music" : "sounds") + "/" + fileName;
    
    console.log("Audio path: " + path);
    
    const aud = new Audio(path);
    aud.volume = 0.2;
    aud.play();
    
  }
}

export default audio;