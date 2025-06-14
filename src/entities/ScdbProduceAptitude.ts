import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16598_primary', ['aptIndex'], { unique: true })
@Index('idx_16598_enzaid', ['enzaId'], {})
@Entity('scdb_produceaptitude', { schema: 'shinycolors' })
export class ScdbProduceAptitude {
  @Column('integer', { primary: true, name: 'aptindex' })
  aptIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('text', { name: 'aptclass' })
  aptClass: string;

  @Column('text', { name: 'apttype' })
  aptType: string;

  @Column('text', { name: 'aptcategory' })
  aptCategory: string;

  @Column('text', { name: 'aptname' })
  aptName: string;

  @Column('text', { name: 'aptstepname' })
  aptStepName: string;

  @Column('text', { name: 'aptsteptype' })
  aptStepType: string;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardProduceAptitude, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
