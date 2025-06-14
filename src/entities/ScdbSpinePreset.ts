import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScdbIdols } from './ScdbIdols';

@Index('idx_16613_idolid', ['idolId'], {})
@Index('idx_16613_primary', ['presetIndex'], { unique: true })
@Entity('scdb_spinepreset', { schema: 'shinycolors' })
export class ScdbSpinePreset {
  @Column('integer', { primary: true, name: 'presetindex' })
  presetIndex: number;

  @Column('text', { name: 'presetid' })
  presetId: string;

  @Column('int', { name: 'idolid' })
  idolId: number;

  @Column('text', { name: 'animation1' })
  animation1: string;

  @Column('text', { name: 'animation2' })
  animation2: string;

  @Column('text', { name: 'animation3' })
  animation3: string;

  @Column('text', { name: 'animation4' })
  animation4: string;

  @Column('text', { name: 'lip' })
  lip: string;

  @Column('text', { name: 'comment' })
  comment: string;

  @Column('text', { name: 'speakername' })
  speakerName: string;

  @Column('text', { name: 'voice' })
  voice: string;

  @Column('text', { name: 'voicename' })
  voiceName: string;

  @Column('text', { name: 'releasecondition' })
  releaseCondition: string;

  @ManyToOne(() => ScdbIdols, (idols) => idols.spinePresets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'idolid', referencedColumnName: 'idolId' }])
  idol: ScdbIdols;
}
