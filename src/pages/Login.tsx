import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { TextField, Button, CircularProgress } from '@mui/material';

const Login = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFaceVerified, setIsFaceVerified] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      ]);
    } catch (error) {
      console.error('Error loading face recognition models:', error);
    }
  };

  const verifyAadhar = async () => {
    if (aadharNumber.length !== 12) {
      alert('Please enter a valid 12-digit Aadhar number');
      return;
    }
    setIsLoading(true);
    // Simulate Aadhar verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    startFaceVerification();
  };

  const startFaceVerification = async () => {
    if (!webcamRef.current) return;
    
    try {
      const image = webcamRef.current.getScreenshot();
      if (!image) return;

      const img = await faceapi.bufferToImage(image);
      const detections = await faceapi.detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        setIsFaceVerified(true);
        navigate('/vote');
      } else {
        alert('Face verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Face verification error:', error);
      alert('Face verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">தமிழ்நாடு தேர்தல் அமைப்பு</h1>
        <div className="space-y-4">
          <TextField
            fullWidth
            label="ஆதார் எண்"
            variant="outlined"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            type="number"
          />
          <div className="webcam-container">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded"
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={verifyAadhar}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'உள்நுழைய'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;