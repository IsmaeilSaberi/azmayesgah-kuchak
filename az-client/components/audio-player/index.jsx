"use client";
import { IoPlay, IoPause } from "react-icons/io5";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { BiFullscreen } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(0);

  // PLAY AND PAUSE
  const playingHandler = (inp) => {
    inp == 1 ? audioRef.current.play() : audioRef.current.pause();
    setIsPlaying(inp);
  };

  // VOLUME
  const [volume, setVolume] = useState(1);
  const [oldVolume, setOLdVolume] = useState(1);
  const volumeInputRef = useRef();

  // SPEED
  const [audioSpeed, setAudioSpeed] = useState(1);
  const speedHandler = () => {
    let newSpeed = audioSpeed + 0.25;
    if (newSpeed > 2.25) {
      newSpeed = 0.5;
    }
    setAudioSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed;
  };

  // FULLSCREEN
  const fullscreenRef = useRef();
  const fullscreenHandler = (inp) => {
    if (inp == 1) {
      fullscreenRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // DURATION
  const [nowTime, setNowTime] = useState(0);
  const [fullTime, setFullTime] = useState(821.5);
  const audioTimeRef = useRef();

  const timeBeauty = (inp) => {
    let minutes = Math.floor(inp / 60);
    let seconds = Math.floor(inp % 60);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    let output = `${minutes}:${seconds}`;
    return output;
  };

  const intervalManager = () => {
    setInterval(() => {
      if (audioRef.current) {
        if (audioRef.current.currentTime != null) {
          setNowTime(audioRef.current.currentTime);
          audioTimeRef.current.value = audioRef.current.currentTime;
          setFullTime(audioRef.current.duration);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    intervalManager();
  }, [src]);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={fullscreenRef}
        className="relative w-[95%] max-w-[1000px] h-16 md:h-24 rounded bg-indigo-800"
      >
        <div className="ctrls absolute right-2 left-2 bottom-1 z-30">
          <div className="bg-transparent text-white p-1 md:p-3 flex flex-col gap-2 transition-all duration-300 hover:opacity-100">
            <div className="duration-bar w-full flex justify-center md:justify-between items-center gap-3 md:gap-2 p-1">
              <div className="text-xs md:text-base w-4 md:w-10">
                {timeBeauty(nowTime)}
              </div>
              <div className="w-[90%] flex justify-center items-center md:w-full">
                <input
                  onChange={(e) => {
                    setNowTime(e.target.value);
                    audioTimeRef.current.value = e.target.value;
                    audioRef.current.currentTime = e.target.value;
                  }}
                  ref={audioTimeRef}
                  type="range"
                  step={"any"}
                  min={0}
                  max={fullTime}
                  defaultValue={0}
                  className="audio-player-input h-[0.1rem] cursor-pointer appearance-none rounded-lg border-transparent transparent w-[95%] md:w-full"
                />
              </div>
              <div className="text-xs md:text-base w-4 md:w-10">
                {timeBeauty(fullTime) == "Nan:Nan"
                  ? "00:00"
                  : timeBeauty(fullTime)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 md:gap-2">
                <button className="text-md md:text-2xl">
                  {isPlaying == 0 ? (
                    <IoPlay
                      onClick={() => {
                        playingHandler(1);
                      }}
                    />
                  ) : (
                    <IoPause
                      onClick={() => {
                        playingHandler(0);
                      }}
                    />
                  )}
                </button>
                <button className="text-md md:text-2xl">
                  {volume == 0 ? (
                    <FiVolumeX
                      onClick={(e) => {
                        setVolume(oldVolume);
                        volumeInputRef.current.value = oldVolume;
                        audioRef.current.volume = oldVolume;
                      }}
                    />
                  ) : (
                    <FiVolume2
                      onClick={(e) => {
                        setVolume(0);
                        volumeInputRef.current.value = 0;
                        audioRef.current.volume = 0;
                      }}
                    />
                  )}
                </button>
                <div className="flex justify-center items-center w-[50%]">
                  <input
                    onChange={(e) => {
                      volumeInputRef.current.value = e.target.value;
                      setVolume(e.target.value);
                      setOLdVolume(e.target.value);
                      audioRef.current.volume = e.target.value;
                    }}
                    ref={volumeInputRef}
                    type="range"
                    step={"any"}
                    min={0}
                    max={1}
                    className="audio-player-input w-[90%] h-[0.1rem] cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                  />
                </div>
              </div>
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => speedHandler()}
                  className="text-xs md:text-xl"
                >
                  {audioSpeed}x
                </button>
                <button className="text-md md:text-2xl">
                  <BiFullscreen
                    onClick={() => {
                      !document.fullscreenElement
                        ? fullscreenHandler(1)
                        : fullscreenHandler(0);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <audio
          onClick={() =>
            isPlaying == 1 ? playingHandler(0) : playingHandler(1)
          }
          loop
          ref={audioRef}
          src={src}
          className=" rounded w-full z-20"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
