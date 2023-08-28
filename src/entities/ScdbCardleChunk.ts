import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardle } from './ScdbCardle';

@Index('CardleIndex', ['cardleIndex'], {})
@Entity('SCDB_CardleChunk', { schema: 'shinycolors' })
export class ScdbCardleChunk {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ChunkIndex' })
  chunkIndex: number;

  @Column('int', { name: 'CardleIndex' })
  cardleIndex: number;

  @Column('int', { name: 'ChunkX' })
  chunkX: number;

  @Column('int', { name: 'ChunkY' })
  chunkY: number;

  @ManyToOne(() => ScdbCardle, (cardle) => cardle.cardleChunks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'CardleIndex', referencedColumnName: 'cardleIndex' }])
  cardleIndex2: ScdbCardle;
}
