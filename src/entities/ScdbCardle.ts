import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbCardleChunk } from './ScdbCardleChunk';

@Index('SCDB_Cradle_ibfk_1', ['enzaId'], {})
@Entity('SCDB_Cardle', { schema: 'dev_shinycolors' })
export class ScdbCardle {
  @PrimaryGeneratedColumn({ type: 'int', name: 'CardleIndex' })
  cardleIndex: number;

  @Column('timestamp', { name: 'CardleDate' })
  cardleDate: Date;

  @Column('bigint', { name: 'EnzaId' })
  enzaId: string;

  @Column('int', {
    name: 'CardleType',
    comment: '0 for S & P normal, 1 for costume ',
  })
  cardleType: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaId', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;

  @OneToMany(() => ScdbCardleChunk, (cardleChunk) => cardleChunk.cardleIndex2)
  cardleChunks: ScdbCardleChunk[];
}
