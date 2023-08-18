import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('EnzaId', ['enzaId'], {})
@Index('IdolId', ['idolId'], {})
@Index('FesIdolIndex', ['fesIdolIndex'], {})
@Entity('SCDB_FesSupportIdol', { schema: 'dev_shinycolors' })
export class ScdbFesSupportIdol {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FesSupportIdolIndex' })
  fesSupportIdolIndex: number;

  @Column('int', { name: 'FesIdolIndex' })
  fesIdolIndex: number;

  @Column('int', { name: 'IdolId' })
  idolId: number;

  @Column('bigint', { name: 'EnzaId' })
  enzaId: string;

  @Column('int', { name: 'Level' })
  level: number;

  @Column('int', { name: 'EvolutionStage' })
  evolutionStage: number;

  @Column('int', { name: 'ExSkill1', nullable: true })
  exSkill1: number | null;

  @Column('int', { name: 'ExSkill2', nullable: true })
  exSkill2: number | null;

  @Column('int', { name: 'ExSkill3', nullable: true })
  exSkill3: number | null;
}
