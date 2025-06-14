import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16593_primary', ['chargeSkillIndex'], { unique: true })
@Index('idx_16593_enzaid', ['enzaId'], {})
@Entity('scdb_memorychargeskill', { schema: 'shinycolors' })
export class ScdbMemoryChargeSkill {
  @Column('integer', { primary: true, name: 'chargeskillindex' })
  chargeSkillIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('text', { name: 'skillname' })
  skillName: string;

  @Column('text', { name: 'skilldesc' })
  skillDesc: string;

  @Column('int', { name: 'releaseevolution' })
  releaseEvolution: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.memoryChargeSkills, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
