import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ScdbCardMemoryAppeal } from './ScdbCardMemoryAppeal';
import { ScdbCardPanel } from './ScdbCardPanel';

@Index('idx_16484_primary', ['extraSkillIndex'], { unique: true })
@Entity('scdb_extraskilleffect', { schema: 'shinycolors' })
export class ScdbExtraSkillEffect {
  @Column('integer', { primary: true, name: 'extraskillindex' })
  extraSkillIndex: number;

  @Column('text', { name: 'extraeffecttype' })
  extraEffectType: string;

  @Column('bigint', { name: 'extraeffectid' })
  extraEffectId: string;

  @Column('text', { name: 'extraeffectdesc' })
  extraEffectDesc: string;

  @Column('text', { name: 'extraeffectmember', nullable: true })
  extraEffectMember: string | null;

  @Column('json', { name: 'extraskilleffect' })
  extraSkillEffect: object;

  @OneToMany(
    () => ScdbCardMemoryAppeal,
    (cardMemoryAppeal) => cardMemoryAppeal.extraEffect,
  )
  cardMemoryAppeals: ScdbCardMemoryAppeal[];

  @OneToMany(() => ScdbCardPanel, (cardPanel) => cardPanel.extraEffect)
  cardPanels: ScdbCardPanel[];
}
