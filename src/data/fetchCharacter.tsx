import { Character } from "../types/genshinTypes";

export const fetchAllCharacters = async (name:string): Promise <Character> => {
  try {
    const response = await fetch(`https://genshin.jmp.blue/characters/${name}/`);
    if (!response.ok) {
      throw new Error("Network Response");
    }
    const data: Character = await response.json();
    return data;
  } catch (error) {
    console.error("Error on fetch:", error);
    throw error; // Rethrow the error
  }
};
