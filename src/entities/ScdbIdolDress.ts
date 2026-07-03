import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbIdols } from './ScdbIdols';

/** One Spine asset entry, e.g. { type: "cb_costume" } */
export interface DressAsset {
  /** directory name under the category, e.g. "cb", "stand_costume" */
  type: string;
  /** path to the asset file, e.g. "spine/idols/stand_costume/1040140140/" */
  path: string;
}

/** category (top-level dir) -> asset entries, e.g. { idols: [...], awake_idols: [...] } */
export type DressAssets = Record<string, DressAsset[]>;

@Index('idx_16512_primary', ['dressIndex'], { unique: true })
@Index('idx_16512_idolid', ['idolId'], {})
@Entity('scdb_idoldress', { schema: 'shinycolors' })
export class ScdbIdolDress {
  @Column('integer', { primary: true, name: 'dressindex' })
  dressIndex: number;

  @Column('int', { name: 'idolid' })
  idolId: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('text', { name: 'dressname' })
  dressName: string;

  @Column('text', { name: 'dressuuid' })
  dressUuid: string;

  @Column('boolean', { name: 'sml_cloth0' })
  smlCloth0: boolean;

  @Column('boolean', { name: 'sml_cloth1' })
  smlCloth1: boolean;

  @Column('boolean', { name: 'big_cloth0' })
  bigCloth0: boolean;

  @Column('boolean', { name: 'big_cloth1' })
  bigCloth1: boolean;

  @Column('text', { name: 'dresstype' })
  dressType: string;

  @Column('boolean', { name: 'exist' })
  exist: boolean;

  @Column('jsonb', { name: 'assets', default: () => "'{}'" })
  assets: DressAssets;

  @ManyToOne(() => ScdbIdols, (scdbIdols) => scdbIdols.idolDresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'idolid', referencedColumnName: 'idolId' }])
  idol: ScdbIdols;
}
