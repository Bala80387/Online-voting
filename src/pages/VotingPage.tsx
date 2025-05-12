import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia } from '@mui/material';

interface Party {
  id: string;
  name: string;
  symbol: string;
  candidate: string;
}

const parties: Party[] = [
  {
    id: 'admk',
    name: 'அதிமுக',
    symbol: 'https://example.com/admk-symbol.png',
    candidate: 'எடப்பாடி கே. பழனிசாமி'
  },
  {
    id: 'dmk',
    name: 'திமுக',
    symbol: 'https://example.com/dmk-symbol.png',
    candidate: 'மு.க. ஸ்டாலின்'
  },
  {
    id: 'tvk',
    name: 'தமிழக வெற்றி கழகம்',
    symbol: 'https://example.com/tvk-symbol.png',
    candidate: 'வேல் முருகன்'
  }
];

const VotingPage = () => {
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVote = () => {
    if (!selectedParty) {
      alert('கட்சியைத் தேர்ந்தெடுக்கவும்');
      return;
    }
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">வாக்களிக்கவும்</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parties.map((party) => (
          <Card 
            key={party.id}
            className={`cursor-pointer ${selectedParty === party.id ? 'border-4 border-blue-500' : ''}`}
            onClick={() => setSelectedParty(party.id)}
          >
            <CardMedia
              component="img"
              height="140"
              image={party.symbol}
              alt={party.name}
            />
            <CardContent>
              <h3 className="text-xl font-bold">{party.name}</h3>
              <p className="text-gray-600">{party.candidate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleVote}
          disabled={!selectedParty}
        >
          வாக்களிக்கவும்
        </Button>
      </div>
    </div>
  );
};

export default VotingPage;