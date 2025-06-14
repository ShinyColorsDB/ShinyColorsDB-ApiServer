import { Column, Entity, Index } from 'typeorm';

@Index('idx_16504_enzaid', ['enzaId'], {})
@Index('idx_16504_fesidolindex', ['fesIdolIndex'], {})
@Index('idx_16504_primary', ['fessupportIdolIndex'], { unique: true })
@Index('idx_16504_idolid', ['idolId'], {})
@Entity('scdb_fessupportidol', { schema: 'shinycolors' })
export class ScdbFesSupportIdol {
  @Column('integer', { primary: true, name: 'fessupportidolindex' })
  fesSupportIdolIndex: number;

  @Column('int', { name: 'fesidolindex' })
  fesIdolIndex: number;

  @Column('int', { name: 'idolid' })
  idolId: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('int', { name: 'level' })
  level: number;

  @Column('int', { name: 'evolutionstage' })
  evolutionStage: number;

  @Column('int', { name: 'exskill1', nullable: true })
  exSkill1: number | null;

  @Column('int', { name: 'exskill2', nullable: true })
  exSkill2: number | null;

  @Column('int', { name: 'exskill3', nullable: true })
  exSkill3: number | null;
}
