export interface UpdatePCard {
    idol: {
        hash: string;
        id: string;
        name: string;
        rarity: number;
        produceAfterEvents: {
            eventCategoryName: string;
            idolId: string;
            id: string;
            title: string;
        }[];
        produveIdolEvents: {
            eventCategoryName: string;
            hash: string;
            id: string;
            idolId: string;
            title: string;
        }[];
        skillPanels: {
            evolutionStage: number;
            id: string;
            idolId: string;
            releaseConditions: string;
            sequence: number;
            skill: {
                comment: string;
                iconImage: string;
                id: string;
                rarity: number;
                name: string;
                skillEffects: any[];
                linkSkill?: {
                    comment: string;
                    id: string;
                    linkSkillCharacters: {
                        id: string;
                    }[];
                    skillEffects: any[];
                }
                plusSkill?: {
                    comment: string;
                    id: string;
                    skillEffects: any[];
                }
            };
            skillCategory: string;
            skillId: string;
            step: number;
        }[]
    }
}