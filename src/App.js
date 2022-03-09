import React from "react";
import { useRef, useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);
// import microPhoneIcon from "./microphone.svg";

function App() {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("https://" + website.split(" ").join(""));
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "* reset",
      callback: () => {
        handleReset();
      },
    },
    ,
    {
      command: "change to dark theme",
      callback: () => {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        handleStop();
      },
    },
    {
      command: "change to light theme",
      callback: () => {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        handleStop();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="microphone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListening = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const handleStop = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    handleStop();
    resetTranscript();
  };

  return (
    <>
      <div className="microphone-wrapper">
        <div className="microphone-container">
          <div
            className="microphone-icon-container"
            ref={microphoneRef}
            onClick={handleListening}
          >
            <FontAwesomeIcon icon="microphone-lines" />
          </div>
          <div className="microphone-status">
            {isListening ? "Listening........" : "Click to start Listening"}
          </div>
          {isListening && (
            <button className="microphone-stop btn" onClick={handleStop}>
              Stop
            </button>
          )}
        </div>
        {transcript && (
          <div className="microphone-result-container">
            <div className="microphone-result-text">{transcript}</div>
            <button className="microphone-reset btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
      <div className="credit-section">
        {" "}
        Reference tuitorials :{" "}
        <a
          href="https://blog.logrocket.com/using-the-react-speech-recognition-hook-for-voice-assistance/#:~:text=React%20Speech%20Recognition%20is%20a,on%20a%20specific%20speech%20phrase."
          nofollow
        >
          blog.logrocket.com
        </a>
      </div>
    </>
  );
}

export default App;
