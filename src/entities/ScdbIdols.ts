import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbIdolDress } from './ScdbIdolDress';
import { ScdbUnits } from './ScdbUnits';
import { ScdbSpinePreset } from './ScdbSpinePreset';

@Index('idx_16517_primary', ['idolId'], { unique: true })
@Index('idx_16517_idolid', ['idolId'], { unique: true })
@Index('idx_16517_idolname_2', ['idolName'], { unique: true })
@Index('idx_16517_idx_d6dc406e941c2d9876683d456b', ['idolName'], {
  unique: true,
})
@Index('idx_16517_idolname', ['idolName'], {})
@Index('idx_16517_unit', ['unitId'], {})
@Entity('scdb_idols', { schema: 'shinycolors' })
export class ScdbIdols {
  @Column('integer', { primary: true, name: 'idolid' })
  idolId: number;

  @Column('varchar', { name: 'idolname', unique: true, length: 6 })
  idolName: string;

  @Column('text', { name: 'idolfirstname' })
  idolFirstName: string;

  @Column('text', { name: 'idollastname' })
  idolLastName: string;

  @Column('text', { name: 'hiragana' })
  hiragana: string;

  @Column('text', { name: 'nickname' })
  nickName: string;

  @Column('int', { name: 'unitid' })
  unitId: number;

  @Column('int', { name: 'age' })
  age: number;

  @Column('text', { name: 'bloodtype' })
  bloodType: string;

  @Column('text', { name: 'birthday' })
  birthday: string;

  @Column('text', { name: 'starsign' })
  starSign: string;

  @Column('int', { name: 'height' })
  height: number;

  @Column('int', { name: 'weight' })
  weight: number;

  @Column('text', { name: 'threesize' })
  threeSize: string;

  @Column('text', { name: 'usedhand' })
  usedHand: string;

  @Column('text', { name: 'interest' })
  interest: string;

  @Column('text', { name: 'specialskill' })
  specialSkill: string;

  @Column('text', { name: 'birthplace' })
  birthPlace: string;

  @Column('text', { name: 'precv', nullable: true })
  preCv: string | null;

  @Column('text', { name: 'cv' })
  cv: string;

  @Column('text', { name: 'hirameki' })
  hirameki: string;

  @Column('text', { name: 'color1' })
  color1: string;

  @Column('text', { name: 'color2' })
  color2: string;

  @Column('text', { name: 'idolhash' })
  idolHash: string;

  @OneToMany(() => ScdbCardList, (cardList) => cardList.idol)
  cardLists: ScdbCardList[];

  @OneToMany(() => ScdbIdolDress, (idolDress) => idolDress.idol)
  idolDresses: ScdbIdolDress[];

  @ManyToOne(() => ScdbUnits, (units) => units.idols, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'unitid', referencedColumnName: 'unitId' }])
  unit: ScdbUnits;

  @OneToMany(() => ScdbSpinePreset, (spinePreset) => spinePreset.idol)
  spinePresets: ScdbSpinePreset[];
}
