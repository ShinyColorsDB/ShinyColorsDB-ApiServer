import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';
import { ScdbIdolDress } from './ScdbIdolDress';
import { ScdbUnits } from './ScdbUnits';
import { ScdbSpinePreset } from './ScdbSpinePreset';

@Index('IdolID', ['idolId'], { unique: true })
@Index('IdolName_2', ['idolName'], { unique: true })
@Index('IDX_d6dc406e941c2d9876683d456b', ['idolName'], { unique: true })
@Index('Unit', ['unitId'], {})
@Index('IdolName', ['idolName'], {})
@Entity('SCDB_Idols', { schema: 'shinycolors' })
export class ScdbIdols {
  @PrimaryGeneratedColumn({ type: 'int', name: 'IdolID' })
  idolId: number;

  @Column('varchar', { name: 'IdolName', unique: true, length: 6 })
  idolName: string;

  @Column('text', { name: 'IdolFirstName' })
  idolFirstName: string;

  @Column('text', { name: 'IdolLastName' })
  idolLastName: string;

  @Column('text', { name: 'Hiragana' })
  hiragana: string;

  @Column('text', { name: 'NickName' })
  nickName: string;

  @Column('int', { name: 'UnitID' })
  unitId: number;

  @Column('int', { name: 'Age' })
  age: number;

  @Column('text', { name: 'BloodType' })
  bloodType: string;

  @Column('text', { name: 'Birthday' })
  birthday: string;

  @Column('text', { name: 'StarSign' })
  starSign: string;

  @Column('int', { name: 'Height' })
  height: number;

  @Column('int', { name: 'Weight' })
  weight: number;

  @Column('text', { name: 'ThreeSize' })
  threeSize: string;

  @Column('text', { name: 'UsedHand' })
  usedHand: string;

  @Column('text', { name: 'Interest' })
  interest: string;

  @Column('text', { name: 'SpecialSkill' })
  specialSkill: string;

  @Column('text', { name: 'BirthPlace' })
  birthPlace: string;

  @Column('text', { name: 'PreCV', nullable: true })
  preCv: string | null;

  @Column('text', { name: 'CV' })
  cv: string;

  @Column('text', { name: 'Hirameki' })
  hirameki: string;

  @Column('text', { name: 'Color1' })
  color1: string;

  @Column('text', { name: 'Color2' })
  color2: string;

  @Column('text', { name: 'IdolHash' })
  idolHash: string;

  @OneToMany(() => ScdbCardList, (cardList) => cardList.idol)
  cardLists: ScdbCardList[];

  @OneToMany(() => ScdbIdolDress, (idolDress) => idolDress.idol)
  idolDresses: ScdbIdolDress[];

  @ManyToOne(() => ScdbUnits, (units) => units.idols, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UnitID', referencedColumnName: 'unitId' }])
  unit: ScdbUnits;

  @OneToMany(() => ScdbSpinePreset, (spinePreset) => spinePreset.idol)
  spinePresets: ScdbSpinePreset[];
}
