import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbIdols } from './ScdbIdols.entity';

@Index('UnitID', ['unitId'], { unique: true })
@Entity('SCDB_Units', { schema: 'shinycolors' })
export class ScdbUnits {
  @PrimaryGeneratedColumn({ type: 'int', name: 'UnitID' })
  unitId: number;

  @Column('text', { name: 'UnitName' })
  unitName: string;

  @Column('text', { name: 'UnitHiragana' })
  unitHiragana: string;

  @Column('text', { name: 'Color1' })
  color1: string;

  @Column('text', { name: 'Color2' })
  color2: string;

  @Column('text', { name: 'UnitPV' })
  unitPv: string;

  @OneToMany(() => ScdbIdols, (scdbIdols) => scdbIdols.unit)
  idols: ScdbIdols[];
}
