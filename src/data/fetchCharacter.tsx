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

