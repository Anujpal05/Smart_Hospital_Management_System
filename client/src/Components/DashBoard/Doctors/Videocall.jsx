import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsCameraVideoOffFill,
  BsTelephoneXFill,
  BsArrowLeftCircle,
  BsFillVolumeUpFill,
  BsChevronDown,
  BsGridFill,
} from "react-icons/bs";

import {
  AiFillPlusCircle,
  AiOutlineHistory,
  AiOutlineProfile,
} from "react-icons/ai";

import {
  TbTestPipe,
  TbScan,
} from "react-icons/tb";

import {
  BiUserCircle,
} from "react-icons/bi";

import {
  GiWaves,
} from "react-icons/gi";

import {
  useNavigate,
} from "react-router-dom";

import Peer from "peerjs";

import {
  v4 as uuidv4,
} from "uuid";

import socket from "../../../socket";

const Videocall = () => {

  const navigate =
    useNavigate();

  const localVideoRef =
    useRef(null);

  const remoteVideoRef =
    useRef(null);

  const peerInstance =
    useRef(null);

  const currentCall =
    useRef(null);

  const [stream, setStream] =
    useState(null);

  const [micOn, setMicOn] =
    useState(true);

  const [videoOn, setVideoOn] =
    useState(true);

  const [callTime, setCallTime] =
    useState(0);

  const roomId =
    "appointment-room-1";

  // ======================================================
  // TIMER
  // ======================================================

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCallTime(
          (prev) => prev + 1
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  // ======================================================
  // VIDEO CALL SETUP
  // ======================================================

  useEffect(() => {

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {

        setStream(mediaStream);

        // LOCAL VIDEO
        if (
          localVideoRef.current
        ) {

          localVideoRef.current.srcObject =
            mediaStream;
        }

        // CREATE PEER
        const peer =
          new Peer(uuidv4());

        peerInstance.current =
          peer;

        // PEER OPEN
        peer.on(
          "open",
          (peerId) => {

            socket.emit(
              "join-room",
              {
                roomId,
                peerId,
                user:
                  "Doctor",
              }
            );
          }
        );

        // RECEIVE CALL
        peer.on(
          "call",
          (call) => {

            call.answer(
              mediaStream
            );

            call.on(
              "stream",
              (
                remoteStream
              ) => {

                if (
                  remoteVideoRef.current
                ) {

                  remoteVideoRef.current.srcObject =
                    remoteStream;
                }
              }
            );

            currentCall.current =
              call;
          }
        );

        // USER CONNECTED
        socket.on(
          "user-connected",
          ({
            peerId,
          }) => {

            const call =
              peer.call(
                peerId,
                mediaStream
              );

            call.on(
              "stream",
              (
                remoteStream
              ) => {

                if (
                  remoteVideoRef.current
                ) {

                  remoteVideoRef.current.srcObject =
                    remoteStream;
                }
              }
            );

            currentCall.current =
              call;
          }
        );
      });

    return () => {

      socket.off(
        "user-connected"
      );

      stream
        ?.getTracks()
        .forEach((track) =>
          track.stop()
        );
    };

  }, []);

  // ======================================================
  // TOGGLE MIC
  // ======================================================

  const toggleMic = () => {

    if (!stream) return;

    stream
      .getAudioTracks()[0]
      .enabled =
      !stream.getAudioTracks()[0]
        .enabled;

    setMicOn(
      stream.getAudioTracks()[0]
        .enabled
    );
  };

  // ======================================================
  // TOGGLE VIDEO
  // ======================================================

  const toggleVideo = () => {

    if (!stream) return;

    stream
      .getVideoTracks()[0]
      .enabled =
      !stream.getVideoTracks()[0]
        .enabled;

    setVideoOn(
      stream.getVideoTracks()[0]
        .enabled
    );
  };

  // ======================================================
  // END CALL
  // ======================================================

  const endCall = () => {

    currentCall.current?.close();

    peerInstance.current?.destroy();

    stream
      ?.getTracks()
      .forEach((track) =>
        track.stop()
      );

    navigate(-1);
  };

  // ======================================================
  // FORMAT TIME
  // ======================================================

  const formatTime = (
    seconds
  ) => {

    const hrs =
      String(
        Math.floor(
          seconds / 3600
        )
      ).padStart(2, "0");

    const mins =
      String(
        Math.floor(
          (seconds % 3600) /
            60
        )
      ).padStart(2, "0");

    const secs =
      String(
        seconds % 60
      ).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  return (

    <div className="bg-gray-100 min-h-screen p-4 md:p-6 font-sans">

      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px]">

          {/* ====================================================== */}
          {/* LEFT SECTION */}
          {/* ====================================================== */}

          <div className="p-4 md:p-5 flex flex-col">

            {/* HEADER */}

            <div className="flex flex-wrap gap-3 items-center justify-between mb-5">

              <button
                onClick={() =>
                  navigate(-1)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50"
              >
                <BsArrowLeftCircle />

                <span>
                  Call with
                  Patient
                </span>
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-700">

                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>

                <span className="font-mono">
                  {formatTime(
                    callTime
                  )}
                </span>
              </div>
            </div>

            {/* VIDEO AREA */}

            <div className="flex-grow relative bg-slate-900 rounded-2xl overflow-hidden border border-gray-300 mb-5 aspect-video">

              {/* REMOTE VIDEO */}

              <video
                ref={
                  remoteVideoRef
                }
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* USER NAME */}

              <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-lg">
                Patient
              </div>

              {/* LOCAL VIDEO */}

              <div className="absolute top-4 right-4 w-32 md:w-44 h-24 md:h-32 bg-black rounded-xl overflow-hidden border-2 border-white shadow-xl">

                <video
                  ref={
                    localVideoRef
                  }
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                  You
                </div>
              </div>

              {/* CONTROLS */}

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">

                {/* MIC */}

                <button
                  onClick={
                    toggleMic
                  }
                  className="w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                >
                  {micOn ? (
                    <BsFillMicFill />
                  ) : (
                    <BsFillMicMuteFill />
                  )}
                </button>

                {/* VIDEO */}

                <button
                  onClick={
                    toggleVideo
                  }
                  className="w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                >
                  {videoOn ? (
                    <BsFillCameraVideoFill />
                  ) : (
                    <BsCameraVideoOffFill />
                  )}
                </button>

                {/* END CALL */}

                <button
                  onClick={
                    endCall
                  }
                  className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-xl hover:bg-red-700 transition"
                >
                  <BsTelephoneXFill />
                </button>

                {/* PROFILE */}

                <button className="w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
                  <AiOutlineProfile />
                </button>

                {/* ADD */}

                <button className="w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition">
                  <AiFillPlusCircle />
                </button>
              </div>

              {/* VOLUME */}

              <div className="absolute bottom-24 left-6 flex items-center gap-3 text-white">

                <BsFillVolumeUpFill />

                <input
                  type="range"
                  className="w-24 accent-blue-600"
                />
              </div>
            </div>

            {/* CHAT INPUT */}

            <div className="border border-gray-200 rounded-2xl p-4 bg-white flex items-center gap-3">

              <GiWaves className="text-gray-500 text-xl" />

              <p className="text-gray-600 text-sm">
                Hi Patient,
                how are you
                feeling today?
              </p>
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ====================================================== */}

          <div className="p-5 bg-gray-50 border-l border-gray-200 flex flex-col max-h-screen overflow-y-auto">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Patient
              Information
            </h2>

            {/* PATIENT CARD */}

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                  <BiUserCircle />
                </div>

                <div>

                  <h3 className="text-lg font-bold text-gray-900">
                    Sanath Deo
                  </h3>

                  <p className="text-sm text-gray-500">
                    Age: 72
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">

                <p>
                  <strong>
                    Gender:
                  </strong>{" "}
                  Male
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>{" "}
                  +91
                  9876543210
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  patient@email.com
                </p>
              </div>
            </div>

            {/* RECORDS */}

            <div className="mt-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex-grow">

              <div className="flex items-center gap-2 mb-5">

                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium flex items-center gap-1">
                  Diagnostic
                  Images
                  <BsChevronDown />
                </button>

                <button className="px-3 py-2 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100">
                  Lab Results
                </button>
              </div>

              <div className="space-y-3">

                <RecordItem
                  title="Chest X-Ray"
                  type="Radiology"
                  date="01/15/2026"
                  icon={
                    BsGridFill
                  }
                />

                <RecordItem
                  title="ECG Report"
                  type="Cardiology"
                  date="01/15/2026"
                  icon={TbScan}
                />

                <RecordItem
                  title="CBC Report"
                  type="Lab"
                  date="01/15/2026"
                  icon={
                    TbTestPipe
                  }
                />

                <RecordItem
                  title="History"
                  type="Medical"
                  date="01/15/2026"
                  icon={
                    AiOutlineHistory
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// RECORD ITEM
// ======================================================

const RecordItem = ({
  title,
  type,
  date,
  icon: Icon,
}) => {

  return (

    <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition cursor-pointer">

      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
        <Icon />
      </div>

      <div className="flex-grow">

        <h4 className="font-semibold text-gray-900">
          {title}
        </h4>

        <p className="text-xs text-gray-600">
          {type} • {date}
        </p>
      </div>

      <button className="text-sm text-blue-600 hover:underline">
        View
      </button>
    </div>
  );
};

export default Videocall;