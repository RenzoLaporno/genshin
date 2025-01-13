import './App.css';
import { fetchAllCharacters } from './data/fetchCharacter';
import genshinBackground from './assets/genshinBackground.jpg';
import { useEffect, useState } from 'react';
import { Character } from './types/genshinTypes';
import Card from './pages/components/cards'; // Assuming Card component is defined

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [pulls, setPulls] = useState<number>(0); // Track the number of pulls
  const [pity, setPity] = useState<number>(0); // Track the pity counter
  const [result, setResult] = useState<string>(''); // Store the result of the pull (for display)

  const XiaoBanner = ['Xiao', 'Ningguang', 'Fischl', 'Bennett', 'Barbara'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const characterPromises = XiaoBanner.map(async (characterName) => {
          const selectedCharacter = await fetchAllCharacters(characterName);
          return selectedCharacter as Character;
        });

        const allCharacters = await Promise.all(characterPromises);
        setCharacters(allCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs once on mount

  const handlePull = () => {
    if (loading) return; // Avoid pulling when loading characters

    setPulls(pulls + 1); // Update the pulls count
    setPity(pity + 1); // Update the pity counter

    // Logic for pity system: Every 90 pulls guarantees a 5-star
    if (pity >= 89) {
      // 5-Star guaranteed pull
      const guaranteedCharacter = characters[Math.floor(Math.random() * characters.length)];
      setResult(`5-Star Pull! You got: ${guaranteedCharacter.name}`);
      setPity(0); // Reset pity after a 5-star pull
      setPulls(100)
    } else {
      // Random pull based on rarity
      const randomIndex = Math.floor(Math.random() * characters.length);
      const selectedCharacter = characters[randomIndex];

      if (selectedCharacter.rarity === 5) {
        // 5-Star pull
        setResult(`5-Star Pull! You got: ${selectedCharacter.name}`);
        setPity(0); // Reset pity after a 5-star pull
      } else if (selectedCharacter.rarity === 4) {
        // 4-Star pull
        setResult(`4-Star Pull! You got: ${selectedCharacter.name}`);
      } else {
        // 3-Star pull
        setResult(`3-Star Pull. You got: ${selectedCharacter.name}`);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(${genshinBackground})`,
    backgroundSize: 'cover',  
    backgroundPosition: 'center',  
    height: '100vh', 
    width: '100%',  
  };

  return (
    <div style={backgroundStyle}>
      <h1 className="text-center text-white text-4xl mt-8">Genshin Impact Xiao Banner</h1>
      <div className="text-center text-white mt-4">
        <p>Pulls: {pulls}</p>
        <p>Pity: {pity}</p>
        <p>Guaranteed 5-Star in {90 - pity} pulls!</p>
        <p>{result}</p>
        <button
          onClick={handlePull}
          className="bg-blue-500 text-white p-3 rounded-full mt-4"
        >
          Pull
        </button>
      </div>
      {/* <div className="character-cards grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {characters.map((character) => (
          <Card key={character.id} character={character} /> // Display each character using the Card component
        ))}
      </div> */}
    </div>
  );
};

export default App;
