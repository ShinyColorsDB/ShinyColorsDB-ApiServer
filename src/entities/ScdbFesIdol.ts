import { Column, Entity, Index } from 'typeorm';

@Index('idx_16494_enzaid', ['enzaId'], {})
@Index('idx_16494_primary', ['fesIdolIndex'], { unique: true })
@Index('idx_16494_fesunitindex', ['fesUnitIndex'], {})
@Index('idx_16494_idolid', ['idolId'], {})
@Entity('scdb_fesidol', { schema: 'shinycolors' })
export class ScdbFesIdol {
  @Column('integer', { primary: true, name: 'fesidolindex' })
  fesIdolIndex: number;

  @Column('int', { name: 'fesunitindex' })
  fesUnitIndex: number;

  @Column('int', { name: 'idolid' })
  idolId: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('int', { name: 'position' })
  position: number;

  @Column('int', { name: 'vocal' })
  vocal: number;

  @Column('int', { name: 'dance' })
  dance: number;

  @Column('int', { name: 'visual' })
  visual: number;

  @Column('int', { name: 'mental' })
  mental: number;

  @Column('text', { name: 'producemode' })
  produceMode: string;

  @Column('int', { name: 'memorylevel' })
  memoryLevel: number;

  @Column('int', { name: 'exskill1', nullable: true })
  exSkill1: number | null;

  @Column('int', { name: 'exskill2', nullable: true })
  exSkill2: number | null;

  @Column('int', { name: 'exskill3', nullable: true })
  exSkill3: number | null;
}
