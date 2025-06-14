import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbExtraSkillEffect } from './ScdbExtraSkillEffect';

@Index('idx_16455_cardindex', ['enzaId'], {})
@Index('idx_16455_extraskilleffectindex', ['extraSkillIndex'], {})
@Index('idx_16455_primary', ['tableIndex'], { unique: true })
@Entity('scdb_cardpanel', { schema: 'shinycolors' })
export class ScdbCardPanel {
  @Column('integer', { primary: true, name: 'tableindex' })
  tableIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('bigint', { name: 'panelid' })
  panelId: string;

  @Column('int', { name: 'panelicon' })
  panelIcon: number;

  @Column('bigint', { name: 'skillid' })
  skillId: string;

  @Column('int', { name: 'panelslot' })
  panelSlot: number;

  @Column('smallint', { name: 'panelisgold' })
  panelIsGold: number;

  @Column('int', { name: 'panelreleaseevolution' })
  panelReleaseEvolution: number;

  @Column('int', { name: 'panelreleasebyevent' })
  panelReleaseByEvent: number;

  @Column('text', { name: 'panelreleasedesc', nullable: true })
  panelReleaseDesc: string | null;

  @Column('text', { name: 'skilltitle' })
  skillTitle: string;

  @Column('text', { name: 'skilldesc' })
  skillDesc: string;

  @Column('text', { name: 'skilltype' })
  skillType: string;

  @Column('json', { name: 'skilleffects' })
  skillEffects: object;

  @Column('int', { name: 'extraskillindex', nullable: true })
  extraSkillIndex: number | null;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardPanels, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;

  @ManyToOne(
    () => ScdbExtraSkillEffect,
    (extraSkillEffect) => extraSkillEffect.cardPanels,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'extraskillindex', referencedColumnName: 'extraSkillIndex' },
  ])
  extraEffect: ScdbExtraSkillEffect;
}
