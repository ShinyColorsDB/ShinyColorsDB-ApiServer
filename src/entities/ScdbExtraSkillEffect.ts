import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScdbCardMemoryAppeal } from './ScdbCardMemoryAppeal';
import { ScdbCardPanel } from './ScdbCardPanel';

@Entity('SCDB_ExtraSkillEffect', { schema: 'shinycolors' })
export class ScdbExtraSkillEffect {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ExtraSkillIndex' })
  extraSkillIndex: number;

  @Column('text', { name: 'ExtraEffectType' })
  extraEffectType: string;

  @Column('bigint', { name: 'ExtraEffectId' })
  extraEffectId: string;

  @Column('text', { name: 'ExtraEffectDesc' })
  extraEffectDesc: string;

  @Column('text', { name: 'ExtraEffectMember', nullable: true })
  extraEffectMember: string | null;

  @Column('json', { name: 'ExtraSkillEffect' })
  extraSkillEffect: object;

  @OneToMany(
    () => ScdbCardMemoryAppeal,
    (cardMemoryAppeal) => cardMemoryAppeal.extraEffect,
  )
  cardMemoryAppeals: ScdbCardMemoryAppeal[];

  @OneToMany(() => ScdbCardPanel, (cardPanel) => cardPanel.extraEffect)
  cardPanels: ScdbCardPanel[];
}
