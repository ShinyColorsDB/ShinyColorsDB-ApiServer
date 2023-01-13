export interface UpdateSCard {
  musicSupportProficiencyBonuses: { proficiency: string; value: number }[];
  supportIdolId: string;
  supportIdol: {
    character: { id: string };
    hash: string;
    id: string;
    ideaMark: string;
    name: string;
    produceSupportIdolEvents: {
      category: string;
      eventCategoryName: string;
      eventParam: {
        dance: number;
        fan: number;
        friendship: number;
        memoryPoint: number;
        mental: number;
        selectNum: number;
        skillId: string;
        skillLevel: number;
        skillPoint: number;
        stamina: number;
        tension: number;
        visual: number;
        vocal: number;
      };
      hash: string;
      id: string;
      supportIdolId: string;
      title: string;
    }[];
    skillPanels: {
      evolutionStage: number;
      id: string;
      idolId: string;
      releaseConditions: string;
      sequence: number;
      skill: {
        iconImage: string;
        id: string;
        rarity: number;
        name: string;
        comment: string;
        skillEffects: any[];
      };
      skillCategory: string;
      skillId: string;
      step: number;
    }[];
    supportIdolActiveSkill: {};

    supportSkills: {
      description: string;
      effectType: string;
      hash: string;
      id: string;
      level: number;
      name: string;
      supportIdolId: string;
      //replaceDescription: string;
      supportSkillEffect: {
        attribute: string;
      };
      supportSkillLevel: number;
    }[];
  };
}
