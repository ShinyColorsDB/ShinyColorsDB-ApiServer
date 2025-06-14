import { Column, Entity, Index } from 'typeorm';

@Index('idx_16507_fesindex', ['fesIndex'], {})
@Index('idx_16507_primary', ['fesUnitIndex'], { unique: true })
@Entity('scdb_fesunit', { schema: 'shinycolors' })
export class ScdbFesUnit {
  @Column('integer', { primary: true, name: 'fesunitindex' })
  fesUnitIndex: number;

  @Column('int', { name: 'fesindex' })
  fesIndex: number;

  @Column('date', { name: 'username' })
  username: string;

  @Column('text', { name: 'fesgroup' })
  fesGroup: string;

  @Column('int', { name: 'fesgrade' })
  fesGrade: number;

  @Column('int', { name: 'fesrank' })
  fesRank: number;

  @Column('timestamp', { name: 'logtime' })
  logTime: Date;
}
