import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Entity('SCDB_CardStatus', { schema: 'shinycolors' })
export class ScdbCardStatus {
  @PrimaryGeneratedColumn({ type: 'int', name: 'StatusIndex' })
  statusIndex: number;

  @Column('bigint', { name: 'EnzaID', select: false })
  enzaId: string;

  @Column('int', { name: 'Vocal' })
  vocal: number;

  @Column('int', { name: 'Dance' })
  dance: number;

  @Column('int', { name: 'Visual' })
  visual: number;

  @Column('int', { name: 'Mental' })
  mental: number;

  @OneToOne(() => ScdbCardList, (cardList) => cardList.enzaId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
