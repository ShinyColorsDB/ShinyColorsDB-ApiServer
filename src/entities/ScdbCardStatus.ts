import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16465_enzaid', ['enzaId'], {})
@Index('idx_16465_primary', ['statusIndex'], { unique: true })
@Entity('scdb_cardstatus', { schema: 'shinycolors' })
export class ScdbCardStatus {
  @Column('integer', { primary: true, name: 'statusindex' })
  statusIndex: number;

  @Column('bigint', { name: 'enzaid', select: false })
  enzaId: string;

  @Column('int', { name: 'vocal' })
  vocal: number;

  @Column('int', { name: 'dance' })
  dance: number;

  @Column('int', { name: 'visual' })
  visual: number;

  @Column('int', { name: 'mental' })
  mental: number;

  @OneToOne(() => ScdbCardList, (cardList) => cardList.enzaId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
