import "./App.css";
import { fetchAllCharacters } from "./data/fetchCharacter";
import { useEffect, useState } from "react";
import { Character, Weapon } from "./types/genshinTypes";
import { fetchAllWeapon } from "./data/fetchWeapon";

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

  const performWish = (): (Character | Weapon) => {
    let rarity = 3;
    if (wishType === "character") {
      if (pityCounterCharacter >= 80 || last5StarCharacter) {
        rarity = 5;
        setLast5StarCharacter(true);
        setPityCounterCharacter(0);
      } else if (pityCounterCharacter >= 10) {
        rarity = 4;
      }
      setPityCounterCharacter((prev) => prev + 1);
    } else if (wishType === "weapon") {
      if (pityCounterWeapon >= 80 || last5StarWeapon) {
        rarity = 5;
        setLast5StarWeapon(true);
        setPityCounterWeapon(0);
      } else if (pityCounterWeapon >= 10) {
        rarity = 4;
      }
      setPityCounterWeapon((prev) => prev + 1);
    }

    const pool = rarity === 5 || rarity === 4
      ? wishType === "character" ? characters : weapons
      : weapons; // Only weapons are 3-star

    const pulledItem = pool[Math.floor(Math.random() * pool.length)];
    return pulledItem;
  };

  const handleSingleWish = () => {
    const item = performWish();
    setPulledItems((prev) => [item, ...prev]);
  };

  const handleTenWishes = () => {
    const items = Array.from({ length: 10 }, performWish);
    setPulledItems((prev) => [...items, ...prev]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Genshin Impact Wish System</h1>
      <div>
        <button onClick={() => setWishType("character")}>Wish for Character</button>
        <button onClick={() => setWishType("weapon")}>Wish for Weapon</button>
      </div>
      <div>
        <h2>{wishType === "character" ? "Character" : "Weapon"} Pity Counter: {wishType === "character" ? pityCounterCharacter : pityCounterWeapon}</h2>
        <button onClick={handleSingleWish}>Pull 1 Wish</button>
        <button onClick={handleTenWishes}>Pull 10 Wishes</button>
      </div>

      <h2>Wished Items:</h2>
      <ul>
        {pulledItems.map((item, index) => (
          <li key={index}>
            <div>{item.name}</div>
            <div>Rarity: {item.rarity}</div>
          </li>
        ))}
      </ul>
{/* 
      <h2>Characters:</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.name}>
            <div>{character.name}</div>
            <div>Rarity: {character.rarity}</div>
          </li>
        ))}
      </ul>

      <h2>Weapons:</h2>
      <ul>
        {weapons.map((weapon) => (
          <li key={weapon.name}>
            <div>{weapon.name}</div>
            <div>Rarity: {weapon.rarity}</div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
