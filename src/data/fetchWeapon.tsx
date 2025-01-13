import { Characters } from "../types/genshinTypes";

export const fetchAllCharacters = async (): Promise<Characters[]> => {
  try {
    const response = await fetch("https://genshin.jmp.blue/weapons/");
    if (!response.ok) {
      throw new Error("Network Response");
    }
    const data: Characters[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error on fetch");
    return [];
  }
};
