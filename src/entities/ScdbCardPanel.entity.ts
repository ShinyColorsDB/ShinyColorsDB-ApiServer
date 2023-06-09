import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList.entity';

@Index('LinkSkillID', ['linkSkillId'], {})
@Index('CardIndex', ['enzaId'], {})
@Entity('SCDB_CardPanel', { schema: 'shinycolors' })
export class ScdbCardPanel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'TableIndex' })
  tableIndex: number;

  @Column('bigint', { name: 'EnzaID', select: false })
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

  @Column('bigint', { name: 'LinkSkillID', nullable: true })
  linkSkillId: string | null;

  @Column('text', { name: 'LinkSkillDesc', nullable: true })
  linkSkillDesc: string | null;

  @Column('text', { name: 'LinkWith', nullable: true })
  linkWith: string | null;

  @Column('json', { name: 'LinkEffects', nullable: true })
  linkEffects: object | null;

  @Column('bigint', { name: 'PlusSkillID', nullable: true })
  plusSkillId: string | null;

  @Column('text', { name: 'PlusSkillDesc', nullable: true })
  plusSkillDesc: string | null;

  @Column('text', { name: 'PlusSkillEffects', nullable: true })
  plusSkillEffects: string | null;

  @Column('bigint', { name: 'ExchangeSkillID', nullable: true })
  exchangeSkillId: string | null;

  @Column('text', { name: 'ExchangeSkillDesc', nullable: true })
  exchangeSkillDesc: string | null;

  @Column('text', { name: 'ExchangeWith', nullable: true })
  exchangeWith: string | null;

  @Column('text', { name: 'ExchangeSkillEffects', nullable: true })
  exchangeSkillEffects: string | null;

  @ManyToOne(() => ScdbCardList, (scdbCardList) => scdbCardList.cardPanels, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
