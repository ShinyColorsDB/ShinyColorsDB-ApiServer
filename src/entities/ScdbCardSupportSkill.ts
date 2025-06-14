import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16473_cardindex', ['enzaId'], {})
@Index('idx_16473_primary', ['skillIndex'], { unique: true })
@Entity('scdb_cardsupportskill', { schema: 'shinycolors' })
export class ScdbCardSupportSkill {
  @Column('integer', { primary: true, name: 'skillindex' })
  skillIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('text', { name: 'skillid' })
  skillId: string;

  @Column('text', { name: 'skillname' })
  skillName: string;

  @Column('text', { name: 'skilldesc' })
  skillDesc: string;

  @Column('text', { name: 'skillattribute' })
  skillAttribute: string;

  @Column('text', { name: 'skilltype' })
  skillType: string;

  @Column('int', { name: 'gainedat' })
  gainedAt: number;

  @Column('int', { name: 'skilllevel' })
  skillLevel: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardSupportSkills, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
