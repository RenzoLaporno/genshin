import "./App.css";
import { fetchAllCharacters } from "./data/fetchCharacter";
import { useEffect, useState } from "react";
import { Character, Weapon } from "./types/genshinTypes";
import { fetchAllWeapon } from "./data/fetchWeapon";
import background from "./assets/background.jpg";
import Card from "./pages/components/cards";
import GradientButton from "./pages/components/button";
const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishType, setWishType] = useState<"character" | "weapon">("character");
  const [pityCounterCharacter, setPityCounterCharacter] = useState<number>(0);
  const [pityCounterWeapon, setPityCounterWeapon] = useState<number>(0);
  const [last5StarCharacter, setLast5StarCharacter] = useState<boolean>(false);
  const [last5StarWeapon, setLast5StarWeapon] = useState<boolean>(false);
  const [pulledItems, setPulledItems] = useState<(Character | Weapon)[]>([]);
  const [primo, setprimo] = useState<number>(360000);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allCharacters = await fetchAllCharacters();
        setCharacters(allCharacters);
        const allWeapons = await fetchAllWeapon();
        setWeapons(allWeapons);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isCharacter = (item: Character | Weapon): item is Character => {
    // Assuming 'id' is a property unique to 'Character'
    return (
      (item as Character).id !== undefined &&
      (item as Character).description !== undefined
    );
  };

  const isWeapon = (item: Character | Weapon): item is Weapon => {
    // Assuming 'type' is a property unique to 'Weapon'
    return (
      (item as Weapon).type !== undefined &&
      (item as Weapon).passiveDesc !== undefined
    );
  };

  // console.log(red[rand2]);
  const performWish = (pulls: number = 1) => {
    const newPulledItems: (Character | Weapon)[] = [];
    
    for (let i = 0; i < pulls; i++) {
      const rand = Math.random() * 100; // Generate a random number between 0 and 100
      let pulledItem: Character | Weapon | null = null;
  
      if (wishType === "character") {
        if (pityCounterCharacter >= 90 || last5StarCharacter) {
          // Guarantee a 5-star character if pity counter hits 90 or after a 5-star pull
          const fiveStarCharacters = characters.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarCharacters[Math.floor(Math.random() * fiveStarCharacters.length)];
          setLast5StarCharacter(false);
          setPityCounterCharacter(0);
        } else if (rand <= 1) {
          // 1% chance for a 5-star character
          const fiveStarCharacters = characters.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarCharacters[Math.floor(Math.random() * fiveStarCharacters.length)];
          setLast5StarCharacter(true);
          setPityCounterCharacter(0);
        } else if (rand <= 6 || pityCounterCharacter % 10 === 0) {
          // 5% chance for a 4-star character or 10-pity mechanism
          const fourStarCharacters = characters.filter((x) => x.rarity === 4);
          pulledItem =
            fourStarCharacters[Math.floor(Math.random() * fourStarCharacters.length)];
        } else {
          // Default to lower rarity items
          const lowerRarityItems = weapons.filter(
            (x) => x.rarity >= 1 && x.rarity <= 3
          );
          pulledItem =
            lowerRarityItems[Math.floor(Math.random() * lowerRarityItems.length)];
        }
  
        // Increment the pity counter for each individual pull
        setPityCounterCharacter((prev) => prev + 1);
      } else if (wishType === "weapon") {
        if (pityCounterWeapon >= 80 || last5StarWeapon) {
          // Guarantee a 5-star weapon if pity counter hits 80 or after a 5-star pull
          const fiveStarWeapons = weapons.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarWeapons[Math.floor(Math.random() * fiveStarWeapons.length)];
          setLast5StarWeapon(false);
          setPityCounterWeapon(0);
        } else if (rand <= 1) {
          // 1% chance for a 5-star weapon
          const fiveStarWeapons = weapons.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarWeapons[Math.floor(Math.random() * fiveStarWeapons.length)];
          setLast5StarWeapon(true);
          setPityCounterWeapon(0);
        } else if (rand <= 6 || pityCounterWeapon % 10 === 0) {
          // 5% chance for a 4-star weapon or 10-pity mechanism
          const fourStarWeapons = weapons.filter((x) => x.rarity === 4);
          pulledItem =
            fourStarWeapons[Math.floor(Math.random() * fourStarWeapons.length)];
        } else {
          // Default to lower rarity items
          const lowerRarityItems = weapons.filter(
            (x) => x.rarity >= 1 && x.rarity <= 3
          );
          pulledItem =
            lowerRarityItems[Math.floor(Math.random() * lowerRarityItems.length)];
        }
  
        // Increment the pity counter for each individual pull
        setPityCounterWeapon((prev) => prev + 1);
      }
  
      if (pulledItem) {
        newPulledItems.push(pulledItem);
      }
    }
  
    setPulledItems((prev) => [...newPulledItems, ...prev]);
  };
  
  const handleClick = (): void => {
    if (primo <= 160) {
      console.log("Not enough");
    } else {
      setprimo(primo - 160);
      performWish();
    }
  };
  const handleClick10 = (): void => {
    if (primo <= 1600) {
      console.log("Not enough");
    } else {
      setprimo(primo - 1600);
      performWish(10);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div>
        <h1>Genshin Impact Wish System</h1>
        <h1>primo {primo}</h1>
        <div>
          <button onClick={() => setWishType("character")}>
            Wish for Character
          </button>
          <button onClick={() => setWishType("weapon")}>Wish for Weapon</button>
        </div>
        <div>
          <h2>
            {wishType === "character" ? "Character" : "Weapon"} Pity Counter:{" "}
            {wishType === "character"
              ? pityCounterCharacter
              : pityCounterWeapon}
          </h2>
          <div>
            <button onClick={() => handleClick()}>Pull 1 Wish</button>
            <button onClick={() => handleClick10()}>Pull 10 Wishes</button>
          </div>
        </div>

        <h2>Wished Items:</h2>
        <ul>
          <>
            {pulledItems.map((item, index) => (
              <div key={index}>
                <Card
                  name={item.name}
                  rarity={item.rarity}
                  description={
                    "description" in item ? item.description : item?.passiveDesc
                  }
                  image={
                    isCharacter(item)
                      ? `https://genshin.jmp.blue/characters/${item.id}/icon` // For Characters
                      : isWeapon(item)
                      ? `https://genshin.jmp.blue/weapons/${item.id}/icon` // For Weapons
                      : "" // Fallback if neither
                  }
                />
              </div>
            ))}
          </>
        </ul>
      </div>
    </div>
  );
};

export default App;
