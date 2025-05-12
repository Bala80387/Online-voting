import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Nomination {
  id: string;
  candidateName: string;
  party: string;
  constituency: string;
  image: string;
  symbol: string;
}

const nominations: Nomination[] = [
  {
    id: '1',
    candidateName: 'எடப்பாடி கே. பழனிசாமி',
    party: 'அதிமுக',
    constituency: 'எடப்பாடி',
    image: 'https://example.com/eps.jpg',
    symbol: 'https://example.com/admk-symbol.png'
  },
  {
    id: '2',
    candidateName: 'மு.க. ஸ்டாலின்',
    party: 'திமுக',
    constituency: 'கோளிவாக்கம்',
    image: 'https://example.com/stalin.jpg',
    symbol: 'https://example.com/dmk-symbol.png'
  },
  {
    id: '3',
    candidateName: 'வேல் முருகன்',
    party: 'தமிழக வெற்றி கழகம்',
    constituency: 'கோயம்புத்தூர்',
    image: 'https://example.com/velmurugan.jpg',
    symbol: 'https://example.com/tvk-symbol.png'
  }
];

const NominationsPage = () => {
  const [selectedConstituency, setSelectedConstituency] = useState<string>('all');

  const filteredNominations = selectedConstituency === 'all'
    ? nominations
    : nominations.filter(nom => nom.constituency === selectedConstituency);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">வேட்பாளர்கள்</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNominations.map((nomination) => (
          <Card key={nomination.id} className="hover:shadow-xl transition-shadow">
            <CardMedia
              component="img"
              height="200"
              image={nomination.image}
              alt={nomination.candidateName}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {nomination.candidateName}
              </Typography>
              <Typography color="text.secondary">
                கட்சி: {nomination.party}
              </Typography>
              <Typography color="text.secondary">
                தொகுதி: {nomination.constituency}
              </Typography>
              <div className="mt-4">
                <img 
                  src={nomination.symbol} 
                  alt={`${nomination.party} symbol`}
                  className="h-16 object-contain"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NominationsPage;