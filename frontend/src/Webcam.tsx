import { useEffect, useRef } from "react";
import axios from "axios";

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error(`Error accessing webcam: ${error}`);
      }
    };

    startWebcam();

    // Cleanup function to stop the webcam stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const captureWebcam = () => {
    if (videoRef.current === null || context === null) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (blob === null) return;

      const formData = new FormData();
      formData.append("imageFile", blob, "screenshot.jpg");

      try {
        await axios.post(
          "http://localhost:8000/api/capture-webcam/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Success");
      } catch (error) {
        console.log(`Error sending image: ${error}`);
      }
    }, "image/jpeg");
  };

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="border-2 rounded block h-[540px]"
      ></video>
      <button
        className="bg-gray-200 mt-2 p-2 rounded-lg hover:bg-gray-400"
        onClick={captureWebcam}
      >
        Capture
      </button>
    </div>
  );
};

export default Webcam;
