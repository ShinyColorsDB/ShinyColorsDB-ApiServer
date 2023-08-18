import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('EnzaId', ['enzaId'], {})
@Index('IdolId', ['idolId'], {})
@Index('FesUnitIndex', ['fesUnitIndex'], {})
@Entity('SCDB_FesIdol', { schema: 'dev_shinycolors' })
export class ScdbFesIdol {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FesIdolIndex' })
  fesIdolIndex: number;

  @Column('int', { name: 'FesUnitIndex' })
  fesUnitIndex: number;

  @Column('int', { name: 'IdolId' })
  idolId: number;

  @Column('bigint', { name: 'EnzaId' })
  enzaId: string;

  @Column('int', { name: 'Position' })
  position: number;

  @Column('int', { name: 'Vocal' })
  vocal: number;

  @Column('int', { name: 'Dance' })
  dance: number;

  @Column('int', { name: 'Visual' })
  visual: number;

  @Column('int', { name: 'Mental' })
  mental: number;

  @Column('text', { name: 'ProduceMode' })
  produceMode: string;

  @Column('int', { name: 'MemoryLevel' })
  memoryLevel: number;

  @Column('int', { name: 'ExSkill1', nullable: true })
  exSkill1: number | null;

  @Column('int', { name: 'ExSkill2', nullable: true })
  exSkill2: number | null;

  @Column('int', { name: 'ExSkill3', nullable: true })
  exSkill3: number | null;
}
