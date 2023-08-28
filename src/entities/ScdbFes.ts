import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SCDB_Fes', { schema: 'shinycolors' })
export class ScdbFes {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FesIndex' })
  fesIndex: number;

  @Column('timestamp', { name: 'FesStart' })
  fesStart: Date;

  @Column('timestamp', { name: 'FesEnd' })
  fesEnd: Date;

  @Column('text', { name: 'Rules' })
  rules: string;

  @Column('text', { name: 'BonusTeam' })
  bonusTeam: string;
}
