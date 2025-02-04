import "./App.css";
import { fetchAllCharacters } from "./data/fetchCharacter";
import { useEffect, useState } from "react";
import { Character, Weapon } from "./types/genshinTypes";
import { fetchAllWeapon } from "./data/fetchWeapon";
import background from "./assets/background.jpg"
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
  const [primo, setprimo] = useState<number>(3600);
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

  const red = characters.filter((x) => x.name === "xiao");
  const wat = red.map((x) => x.name);
  console.log(wat);

  // console.log(red[rand2]);
  const performWish = () => {
    const rand = Math.random() * 100; // Generate a random number between 0 and 100
    let pulledItem: Character | Weapon | null = null;

    if (wishType === "character") {
      if (pityCounterCharacter === 90 || last5StarCharacter) {
        const fiveStarCharacters = characters.filter((x) => x.rarity === 5);
        pulledItem = fiveStarCharacters[Math.floor(Math.random() * fiveStarCharacters.length)];
        setLast5StarCharacter(false);
        setPityCounterCharacter(0);
      } else if (rand <= 0.06) {
        const fiveStarCharacters = characters.filter((x) => x.rarity === 5);
        pulledItem = fiveStarCharacters[Math.floor(Math.random() * fiveStarCharacters.length)];
        setLast5StarCharacter(true);
        setPityCounterCharacter(0);
      } else if (rand <= 0.5|| pityCounterCharacter%10 == 0) {
        // 4-star character (15% chance)
        const fourStarCharacters = characters.filter((x) => x.rarity === 4);
        pulledItem = fourStarCharacters[Math.floor(Math.random() * fourStarCharacters.length)];
      } else {
        const lowerRarityItems = weapons.filter(
          (x) => x.rarity >= 1 && x.rarity <= 3
        );
        pulledItem = lowerRarityItems[Math.floor(Math.random() * lowerRarityItems.length)];
      }

      setPityCounterCharacter((prev) => prev + 1);
    } else if (wishType === "weapon") {
      if (pityCounterWeapon === 80 || last5StarWeapon) {
        const fiveStarWeapons = weapons.filter((x) => x.rarity === 5);
        pulledItem =
          fiveStarWeapons[Math.floor(Math.random() * fiveStarWeapons.length)];
        setLast5StarWeapon(false);
        setPityCounterWeapon(0);
      } else if (rand >= 95) {
        const fiveStarWeapons = weapons.filter((x) => x.rarity === 5);
        pulledItem =
          fiveStarWeapons[Math.floor(Math.random() * fiveStarWeapons.length)];
        setLast5StarWeapon(true);
        setPityCounterWeapon(0);
      } else if (rand >= 80) {
        const fourStarWeapons = weapons.filter((x) => x.rarity === 4);
        pulledItem =
          fourStarWeapons[Math.floor(Math.random() * fourStarWeapons.length)];
      } else {
        const lowerRarityItems = weapons.filter(
          (x) => x.rarity >= 1 && x.rarity <= 3
        );
        pulledItem =
          lowerRarityItems[Math.floor(Math.random() * lowerRarityItems.length)];
      }

      setPityCounterWeapon((prev) => prev + 1);
    }

    if (pulledItem) {
      setPulledItems((prev) => [pulledItem, ...prev]);
    }
  };

  const handleTenWishes = () => {
    const newPulledItems: (Character | Weapon)[] = [];

    for (let i = 0; i < 10; i++) {
      const rand = Math.random() * 100;
      let pulledItem: Character | Weapon | null = null;

      if (wishType === "character") {
        if (pityCounterCharacter === 90 || last5StarCharacter) {
          const fiveStarCharacters = characters.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarCharacters[
              Math.floor(Math.random() * fiveStarCharacters.length)
            ];
          setLast5StarCharacter(false);
          setPityCounterCharacter(0);
        } else if (rand >= 95) {
          const fiveStarCharacters = characters.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarCharacters[
              Math.floor(Math.random() * fiveStarCharacters.length)
            ];
          setLast5StarCharacter(true);
          setPityCounterCharacter(0);
        } else if (rand >= 80) {
          const fourStarCharacters = characters.filter((x) => x.rarity === 4);
          pulledItem =
            fourStarCharacters[
              Math.floor(Math.random() * fourStarCharacters.length)
            ];
        } else {
          const lowerRarityItems = weapons.filter(
            (x) => x.rarity >= 1 && x.rarity <= 3
          );
          pulledItem =
            lowerRarityItems[
              Math.floor(Math.random() * lowerRarityItems.length)
            ];
        }

        setPityCounterCharacter((prev) => prev + 1);
      } else if (wishType === "weapon") {
        if (pityCounterWeapon === 80 || last5StarWeapon) {
          const fiveStarWeapons = weapons.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarWeapons[Math.floor(Math.random() * fiveStarWeapons.length)];
          setLast5StarWeapon(false);
          setPityCounterWeapon(0);
        } else if (rand >= 95) {
          const fiveStarWeapons = weapons.filter((x) => x.rarity === 5);
          pulledItem =
            fiveStarWeapons[Math.floor(Math.random() * fiveStarWeapons.length)];
          setLast5StarWeapon(true);
          setPityCounterWeapon(0);
        } else if (rand >= 80) {
          const fourStarWeapons = weapons.filter((x) => x.rarity === 4);
          pulledItem =
            fourStarWeapons[Math.floor(Math.random() * fourStarWeapons.length)];
        } else {
          const lowerRarityItems = weapons.filter(
            (x) => x.rarity >= 1 && x.rarity <= 3
          );
          pulledItem =
            lowerRarityItems[
              Math.floor(Math.random() * lowerRarityItems.length)
            ];
        }

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
      handleTenWishes();  
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div
        className="min-h-screen min-w-screen bg-cover"
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
            <button onClick={()=>handleClick()}>Pull 1 Wish</button>
            <button onClick={() => handleClick10()}>Pull 10 Wishes</button>
          </div>
        </div>

        <h2>Wished Items:</h2>
        <ul>
          {pulledItems.map((item, index) => (
            <div key={index}>
              <div>{item.name}</div>
              <div>Rarity: {item.rarity}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
