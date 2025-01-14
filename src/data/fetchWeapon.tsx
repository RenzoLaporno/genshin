import { Weapon } from "../types/genshinTypes";

export const fetchAllWeapon = async (): Promise<Weapon[]> => {
  try {
    const response = await fetch("https://genshin.jmp.blue/weapons/all");
    if (!response.ok) {
      throw new Error("Network Response");
    }
    const data: Weapon[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error on fetch",error);
    return [];
  }
};
