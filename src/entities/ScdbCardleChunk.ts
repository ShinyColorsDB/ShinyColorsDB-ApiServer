import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardle } from './ScdbCardle';

@Index('idx_16481_cardleindex', ['cardleIndex'], {})
@Index('idx_16481_primary', ['chunkIndex'], { unique: true })
@Entity('scdb_cardlechunk', { schema: 'shinycolors' })
export class ScdbCardleChunk {
  @PrimaryGeneratedColumn({ name: 'chunkindex' })
  chunkIndex: number;

  @Column('int', { name: 'cardleindex' })
  cardleIndex: number;

  @Column('int', { name: 'chunkx' })
  chunkX: number;

  @Column('int', { name: 'chunky' })
  chunkY: number;

  @ManyToOne(() => ScdbCardle, (cardle) => cardle.cardleChunks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'cardleindex', referencedColumnName: 'cardleIndex' }])
  cardleIndex2: ScdbCardle;
}
