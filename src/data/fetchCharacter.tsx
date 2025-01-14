import { Character } from "../types/genshinTypes";

export const fetchAllCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch("https://genshin.jmp.blue/characters/all");
    if (!response.ok) {
      throw new Error("Network Response");
    }
    const data: Character[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error on fetch:", error);
    throw error;
  }
};

// export const fetchAllCharacterName = async (character:Name): Promise<Character[]> => {
//   try {
//     const response = await fetch(`https://genshin.jmp.blue/characters$${character}`);
//     if (!response.ok) {
//       throw new Error("Network Response");
//     }
//     const data: Character[] = await response.json();
//     console.log(data.map((x) => x));
//     return data;
//   } catch (error) {
//     console.error("Error on fetch:", error);
//     throw error;
//   }
// };