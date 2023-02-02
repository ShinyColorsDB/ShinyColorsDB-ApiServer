import * as crypto from 'crypto';
import * as fs from 'fs';

import { CardIdolEvent } from 'src/entities/cardIdolEvent.entity';
import { CardMemoryAppeal } from 'src/entities/cardMemoryAppeal.entity';
import { CardPanel } from 'src/entities/cardPanel.entity';
import { CardProficiency } from 'src/entities/cardProficiency.entity';
import { CardSupportEvent } from 'src/entities/cardSupportEvent.entity';
import { CardSupportSkill } from 'src/entities/cardSupportSkill.entity';

export class UpdateUtilities {
  idolCardPath = '/assets/images/content/idols/card/';
  idolFesPath = '/assets/images/content/idols/fes_card/';
  idolIconPath = '/assets/images/content/idols/icon/';

  idolCardMovie = '/assets/movies/idols/card/';
  idolCostumeMovie = '/assets/movies/idols/card_costume/';

  supportIdolCardPath = '/assets/images/content/support_idols/card/';
  supportIdolIconPath = '/assets/images/content/support_idols/icon/';

  removeSpace(name: string): string {
    const nameMatch = name.match(/(【.*】)(.*)/);
    return nameMatch[1] + nameMatch[2].replace(/\s/g, '');
  }

  getSupportEvents(events: any[]): CardSupportEvent[] {
    const eArray: {
      enzaId: string;
      eventId: number;
      eventName: string;
      eventAddVo: number;
      eventAddDa: number;
      eventAddVi: number;
      eventAddMe: number;
      eventAddSp: number;
    }[] = [];

    events.forEach(
      (element: {
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
      }) => {
        eArray.push({
          enzaId: element.supportIdolId,
          eventId: Number(element.id),
          eventName: element.title,
          eventAddVo: element.eventParam.vocal,
          eventAddDa: element.eventParam.dance,
          eventAddVi: element.eventParam.visual,
          eventAddMe: element.eventParam.mental,
          eventAddSp: element.eventParam.skillPoint,
        });
      },
    );

    return eArray as CardSupportEvent[];
  }

  getSupportSkills(skills: any[]): CardSupportSkill[] {
    const sArray: {
      enzaId: string;
      skillId: string;
      skillName: string;
      skillDesc: string;
      skillAttribute: string;
      skillType: string;
      gainedAt: number;
      skillLevel: number;
    }[] = [];

    skills.forEach(
      (element: {
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
      }) => {
        sArray.push({
          enzaId: element.supportIdolId,
          skillId: element.id,
          skillName: element.name,
          skillDesc: element.description,
          skillAttribute: element.supportSkillEffect.attribute,
          skillType: element.effectType,
          skillLevel: element.level,
          gainedAt: element.supportSkillLevel,
        });
      },
    );

    return sArray as CardSupportSkill[];
  }

  getProficiencies(
    p: { proficiency: string; value: number }[],
    supportIdolId: string,
  ): CardProficiency[] {
    const pArray: {
      enzaId: string;
      proficiency: string;
      value: number;
    }[] = [];
    p.forEach((element: { proficiency: string; value: number }) => {
      pArray.push({
        enzaId: supportIdolId,
        proficiency: element.proficiency,
        value: element.value,
      });
    });
    return pArray as CardProficiency[];
  }

  getPanels(panels: any[]): CardPanel[] {
    const pArray: {
      enzaId: string;
      panelId: string;
      panelIcon: number;
      skillId: string;
      panelSlot: number;
      panelIsGold: number;
      panelReleaseEvolution: number;
      panelReleaseByEvent: boolean;
      panelReleaseDesc: string | null;
      skillTitle: string;
      skillDesc: string;
      skillType: string;
      skillEffects: object;
      linkSkillId: string | null;
      linkSkillDesc: string | null;
      linkWith: string | null;
      linkEffects: object | null;
      plusSkillId: string | null;
      plusSkillDesc: string | null;
      plusSkillEffects: object | null;
    }[] = [];

    panels.forEach(
      (panel: {
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
              character: {
                id: string;
              };
            }[];
            skillEffects: any[];
          };
          plusSkill?: {
            comment: string;
            id: string;
            skillEffects: any[];
          };
        };
        skillCategory: string;
        skillId: string;
        step: number;
      }) => {
        let linkWith = '';
        if (panel.skill?.linkSkill) {
          panel.skill.linkSkill.linkSkillCharacters.forEach(
            (cId: { character: { id: string } }) => {
              linkWith += cId.character.id;
              linkWith += ',';
            },
          );
          linkWith = linkWith.slice(0, -1);
        }
        pArray.push({
          enzaId: panel.idolId,
          panelId: panel.id,
          panelIcon: Number(panel.skill.iconImage),
          skillId: panel.skill.id,
          panelSlot: Number(`${panel.step}${panel.sequence}`),
          panelIsGold: panel.skill?.rarity ? panel.skill?.rarity - 1 : 0,
          panelReleaseEvolution: panel.evolutionStage,
          panelReleaseByEvent: panel.releaseConditions.match(/イベント/)
            ? true
            : false,
          panelReleaseDesc: panel.releaseConditions
            ? panel.releaseConditions
            : null,
          skillTitle: panel.skill.name,
          skillDesc: panel.skill.comment,
          skillType: panel.skillCategory,
          skillEffects: panel.skill.skillEffects,
          linkSkillId: panel.skill?.linkSkill ? panel.skill.linkSkill.id : null,
          linkSkillDesc: panel.skill?.linkSkill
            ? panel.skill.linkSkill.comment
            : null,
          linkWith: panel.skill?.linkSkill ? linkWith : null,
          linkEffects: panel.skill?.linkSkill
            ? panel.skill.linkSkill.skillEffects
            : null,
          plusSkillId: panel.skill?.plusSkill ? panel.skill.plusSkill.id : null,
          plusSkillDesc: panel.skill?.plusSkill
            ? panel.skill.plusSkill.comment
            : null,
          plusSkillEffects: panel.skill?.plusSkill
            ? panel.skill.plusSkill.skillEffects
            : null,
        });
      },
    );

    return pArray as CardPanel[];
  }

  getMemoryAppeals(memoryAppeals: any[], idolId: string): CardMemoryAppeal[] {
    const mArray: {
      enzaId: string;
      memoryId: string;
      memoryTitle: string;
      memoryDesc: string;
      memoryEffects: object;
      memoryLinkSkillId: string;
      linkSkillDesc: string | null;
      linkWith: string | null;
      linkEffects: object | null;
    }[] = [];

    memoryAppeals.forEach(
      (element: {
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
        };
      }) => {
        let linkWith = '';
        if (element?.linkSkill) {
          element.linkSkill.linkSkillCharacters.forEach(
            (character: { character: { id: string } }) => {
              linkWith += character.character.id;
              linkWith += ',';
            },
          );
          linkWith = linkWith.slice(0, -1);
        }
        mArray.push({
          enzaId: idolId,
          memoryId: element.id,
          memoryTitle: element.name,
          memoryDesc: element.comment,
          memoryEffects: element.memoryAppealEffects,
          memoryLinkSkillId: element?.linkSkill
            ? element.linkSkill.id
            : String(0),
          linkSkillDesc: element?.linkSkill ? element.linkSkill.comment : null,
          linkWith: element?.linkSkill ? linkWith : null,
          linkEffects: element?.linkSkill
            ? element.linkSkill.skillEffects
            : null,
        });
      },
    );

    return mArray as CardMemoryAppeal[];
  }

  getCardType(enzaId: string) {
    let prefix: string, rarity: string;
    enzaId[0] == '1' ? (prefix = 'P') : (prefix = 'S');
    switch (enzaId[2]) {
      case '1':
        rarity = 'N';
        break;
      case '2':
        rarity = 'R';
        break;
      case '3':
        rarity = 'SR';
        break;
      case '4':
        rarity = 'SSR';
        break;
    }
    return `${prefix}_${rarity}`;
  }

  getIdolEvents(idolEvents: any[], afterEvents: any[]): CardIdolEvent[] {
    const eventArray: {
      enzaId: string;
      eventCategory: string;
      eventId: number;
      eventHash: string;
      eventTitle: string;
    }[] = [];
    idolEvents.forEach(
      (event: {
        eventCategoryName: string;
        hash: string;
        id: string;
        idolId: string;
        title: string;
      }) => {
        eventArray.push({
          enzaId: event.idolId,
          eventCategory: event.eventCategoryName,
          eventId: Number(event.id),
          eventHash: event.hash,
          eventTitle: event.title,
        });
      },
    );
    afterEvents.forEach(
      (event: {
        eventCategoryName: string;
        idolId: string;
        id: string;
        title: string;
      }) => {
        eventArray.push({
          enzaId: event.idolId,
          eventCategory: event.eventCategoryName,
          eventId: Number(event.id),
          eventHash: null,
          eventTitle: event.title,
        });
      },
    );
    return eventArray as CardIdolEvent[];
  }

  async getPImage(
    enzaId: string,
    hash: string,
    bigPic1: string,
    bigPic2: string,
    smlPic: string,
  ) {
    const pic1Path = `${this.idolCardPath}${hash}_${enzaId}.jpg`,
      pic2Path = `${this.idolFesPath}${hash}_${enzaId}.jpg`,
      smlPath = `${this.idolIconPath}${hash}_${enzaId}.png`;

    const hash1 = this.getHash(pic1Path),
      hash2 = this.getHash(pic2Path),
      hash3 = this.getHash(smlPath);

    await this.getPicture(hash1, bigPic1, 'bigPic', 'jpg');
    await this.getPicture(hash2, bigPic2, 'bigPic', 'jpg');
    await this.getPicture(hash3, smlPic, 'smlPic', 'png');
  }

  async getSImage(
    enzaId: string,
    hash: string,
    bigPic1: string,
    smlPic: string,
  ) {
    const pic1Path = `${this.supportIdolCardPath}${hash}_${enzaId}.jpg`,
      smlPath = `${this.supportIdolIconPath}${hash}_${enzaId}.png`;

    const hash1 = this.getHash(pic1Path),
      hash3 = this.getHash(smlPath);

    await this.getPicture(hash1, bigPic1, 'bigPic', 'jpg');
    await this.getPicture(hash3, smlPic, 'smlPic', 'png');
  }

  getHash(path: string) {
    const fn = path.split('/').at(-1).split('.');
    const b = fn.slice(0, -1).join('.');
    return crypto
      .createHash('sha256')
      .update(b[0] + b.at(-1) + path)
      .digest('hex');
  }

  getPicture(hashedPath: string, uuid: string, type: string, subFn: string) {
    return new Promise<void>((resolve, reject) => {
      fetch(`https://shinycolors.enza.fun/assets/${hashedPath}`).then(
        async (res) => {
          if (res.status !== 200) reject();
          fs.writeFileSync(
            `${process.env.FILE_STATIC_PATH}/pictures/${type}/${uuid}.${subFn}`,
            Buffer.from(await res.arrayBuffer()),
          );
          resolve();
        },
      );
    });
  }

  async getPSSRMovie(enzaId: string, hash: string) {
    const idolMoviePath = `${this.idolCardMovie}${hash}_${enzaId}.mp4`,
      idolCostumeMoviePath = `${this.idolCostumeMovie}${hash}_${enzaId}.mp4`;
    const hash1 = this.getHash(idolMoviePath),
      hash2 = this.getHash(idolCostumeMoviePath);
    await this.getMovie(hash1, 'card', enzaId);
    await this.getMovie(hash2, 'card_costume', enzaId);
  }

  async getPSRMovie(enzaId: string, hash: string) {
    const idolCostumeMoviePath = `${this.idolCostumeMovie}${hash}_${enzaId}.mp4`;
    const hash2 = this.getHash(idolCostumeMoviePath);
    await this.getMovie(hash2, 'card_costume', enzaId);
  }

  getMovie(hashedPath: string, savePath: string, cardId: string) {
    return new Promise<void>((resolve, reject) => {
      fetch(`https://shinycolors.enza.fun/assets/${hashedPath}.mp4`).then(
        async (res) => {
          if (res.status !== 200) reject();
          fs.writeFileSync(
            `${process.env.FILE_ASSETS_PATH}/movies/idols/${savePath}/${cardId}.mp4`,
            Buffer.from(await res.arrayBuffer()),
          );
          resolve();
        },
      );
    });
  }

  isPSR(cardId: string) {
    return cardId[0] == '1' && cardId[2] == '3';
  }

  isPSSR(cardId: string) {
    return cardId[0] == '1' && cardId[2] == '4';
  }
}
