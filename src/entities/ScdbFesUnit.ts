import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('FesIndex', ['fesIndex'], {})
@Entity('SCDB_FesUnit', { schema: 'dev_shinycolors' })
export class ScdbFesUnit {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FesUnitIndex' })
  fesUnitIndex: number;

  @Column('int', { name: 'FesIndex' })
  fesIndex: number;

  @Column('date', { name: 'Username' })
  username: string;

  @Column('text', { name: 'FesGroup' })
  fesGroup: string;

  @Column('int', { name: 'FesGrade' })
  fesGrade: number;

  @Column('int', { name: 'FesRank' })
  fesRank: number;

  @Column('timestamp', { name: 'LogTime' })
  logTime: Date;
}
