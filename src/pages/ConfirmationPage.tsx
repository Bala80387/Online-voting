import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    playThankYouMessage();
  }, []);

  const playThankYouMessage = () => {
    const audio = new Audio(
      userGender === 'male' 
        ? '/audio/thanks-male-tamil.mp3'
        : '/audio/thanks-female-tamil.mp3'
    );
    audio.play();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">நன்றி!</h1>
        <p className="text-xl mb-8">
          தங்களது வாக்கை பதிவு செய்ததற்கு நன்றி.
          நீங்கள் உங்கள் கடமையை நிறைவேற்றியுள்ளீர்கள்.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
        >
          முடிந்தது
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;