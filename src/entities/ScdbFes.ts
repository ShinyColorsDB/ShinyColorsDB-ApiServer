import { Column, Entity, Index } from 'typeorm';

@Index('idx_16489_primary', ['fesIndex'], { unique: true })
@Entity('scdb_fes', { schema: 'shinycolors' })
export class ScdbFes {
  @Column('integer', { primary: true, name: 'fesindex' })
  fesIndex: number;

  @Column('timestamp', { name: 'fesstart' })
  fesStart: Date;

  @Column('timestamp', { name: 'fesend' })
  fesEnd: Date;

  @Column('text', { name: 'rules' })
  rules: string;

  @Column('text', { name: 'bonusteam' })
  bonusTeam: string;
}
