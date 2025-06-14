import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16460_cardindex', ['enzaId'], {})
@Index('idx_16460_primary', ['proficiencyIndex'], { unique: true })
@Entity('scdb_cardproficiency', { schema: 'shinycolors' })
export class ScdbCardProficiency {
  @Column('integer', { primary: true, name: 'proficiencyindex' })
  proficiencyIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('text', { name: 'proficiency' })
  proficiency: string;

  @Column('int', { name: 'value' })
  value: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardProficiencies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
