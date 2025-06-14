import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ScdbIdols } from './ScdbIdols';

@Index('idx_16633_unitid', ['unitId'], { unique: true })
@Index('idx_16633_primary', ['unitId'], { unique: true })
@Entity('scdb_units', { schema: 'shinycolors' })
export class ScdbUnits {
  @Column('integer', { primary: true, name: 'unitid' })
  unitId: number;

  @Column('text', { name: 'unitname' })
  unitName: string;

  @Column('text', { name: 'unithiragana' })
  unitHiragana: string;

  @Column('text', { name: 'color1' })
  color1: string;

  @Column('text', { name: 'color2' })
  color2: string;

  @Column('text', { name: 'unitpv' })
  unitPv: string;

  @OneToMany(() => ScdbIdols, (idols) => idols.unit)
  idols: ScdbIdols[];
}
