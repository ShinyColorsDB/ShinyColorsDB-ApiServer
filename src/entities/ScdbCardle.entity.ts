import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList.entity';
import { ScdbCardleChunk } from './ScdbCardleChunk.entity';

@Index('EnzaId', ['enzaId'], {})
@Entity('SCDB_Cardle', { schema: 'shinycolors' })
export class ScdbCardle {
  @PrimaryGeneratedColumn({ type: 'int', name: 'CardleIndex' })
  cardleIndex: number;

  @Column('date', { name: 'CardleDate' })
  cardleDate: Date;

  @Column('bigint', { name: 'EnzaId' })
  enzaId: string;

  @Column('int', { name: 'CardleType' })
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
