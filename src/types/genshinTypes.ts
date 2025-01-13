export interface Characters {
  id: number
  chars: Character[];
}

export interface Character {
    name: string;
    title: string;
    vision: string;
    weapon: string;
    gender: string;
    nation: string;
    affiliation: string;
    rarity: number;
    release: string;
    constellation: string;
    birthday: string;
    description: string;
    skillTalents: SkillTalent[];
    passiveTalents: PassiveTalent[];
    constellations: Constellation[];
    vision_key: string;
    weapon_type: string;
    ascension_materials: Ascensionmaterials;
    id: string;
  }
  
  export interface Ascensionmaterials {
    level_20: Level20[];
    level_40: Level20[];
    level_50: Level20[];
    level_60: Level20[];
    level_70: Level20[];
    level_80: Level20[];
  }
  
  export interface Level20 {
    name: string;
    value: number;
  }
  
  export interface Constellation {
    name: string;
    unlock: string;
    description: string;
    level: number;
  }
  
  export interface PassiveTalent {
    name: string;
    unlock: string;
    description: string;
    level?: number;
  }
  
  export interface SkillTalent {
    name: string;
    unlock: string;
    description: string;
    upgrades: Upgrade[];
    type: string;
  }
  
  export interface Upgrade {
    name: string;
    value: string;
  }
export interface Weapons {
  chars: Weapon[];
}

export interface Weapon {
  name: string;
}
