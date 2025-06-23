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

@Index('idx_16477_primary', ['cardleIndex'], { unique: true })
@Index('idx_16477_scdb_cradle_ibfk_1', ['enzaId'], {})
@Entity('scdb_cardle', { schema: 'shinycolors' })
export class ScdbCardle {
  @PrimaryGeneratedColumn({ name: 'cardleindex' })
  cardleIndex: number;

  @Column('timestamp', { name: 'cardledate' })
  cardleDate: Date;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('integer', { name: 'cardletype' })
  cardleType: number;

  @ManyToOne(() => ScdbCardList, (cardList) => cardList.cardles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;

  @OneToMany(() => ScdbCardleChunk, (cardleChunk) => cardleChunk.cardleIndex2)
  cardleChunks: ScdbCardleChunk[];
}
