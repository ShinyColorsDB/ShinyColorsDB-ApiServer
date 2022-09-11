export interface UpdatePCard {
    idolId: string;
    idol: {
        character: {
            id: string;
        }
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
        produceIdolEvents: {
            eventCategoryName: string;
            hash: string;
            id: string;
            idolId: string;
            title: string;
        }[];
        memoryAppeals: {
            comment: string;
            id: string;
            memoryAppealEffects: any[];
            name: string;
            linkSkill?: {
                comment: string;
                id: string;
                linkSkillCharacters: {
                    character: {
                        id: string;
                    };
                }[];
                skillEffects: any[];
            }
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