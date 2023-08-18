import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbExtraSkillEffect } from './ScdbExtraSkillEffect';

@Index('CardIndex', ['enzaId'], {})
@Index('ExtraSkillEffectIndex', ['extraSkillIndex'], {})
@Entity('SCDB_CardPanel', { schema: 'dev_shinycolors' })
export class ScdbCardPanel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'TableIndex' })
  tableIndex: number;

  @Column('bigint', { name: 'EnzaID' })
  enzaId: string;

  @Column('bigint', { name: 'PanelID' })
  panelId: string;

  @Column('int', { name: 'PanelIcon' })
  panelIcon: number;

  @Column('bigint', { name: 'SkillID' })
  skillId: string;

  @Column('int', { name: 'PanelSlot' })
  panelSlot: number;

  @Column('tinyint', { name: 'PanelIsGold', width: 1 })
  panelIsGold: boolean;

  @Column('int', { name: 'PanelReleaseEvolution' })
  panelReleaseEvolution: number;

  @Column('tinyint', { name: 'PanelReleaseByEvent', width: 1 })
  panelReleaseByEvent: boolean;

  @Column('text', { name: 'PanelReleaseDesc', nullable: true })
  panelReleaseDesc: string | null;

  @Column('text', { name: 'SkillTitle' })
  skillTitle: string;

  @Column('text', { name: 'SkillDesc' })
  skillDesc: string;

  @Column('text', { name: 'SkillType' })
  skillType: string;

  @Column('json', { name: 'SkillEffects' })
  skillEffects: object;

  @Column('int', { name: 'ExtraSkillIndex', nullable: true })
  extraSkillIndex: number | null;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardPanels, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;

  @ManyToOne(
    () => ScdbExtraSkillEffect,
    (extraSkillEffect) => extraSkillEffect.cardPanels,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'ExtraSkillIndex', referencedColumnName: 'extraSkillIndex' },
  ])
  extraEffect: ScdbExtraSkillEffect;
}
