import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbIdols } from './ScdbIdols';

@Index('IdolID', ['idolId'], {})
@Entity('SCDB_SpinePreset', { schema: 'shinycolors' })
export class ScdbSpinePreset {
  @PrimaryGeneratedColumn({ type: 'int', name: 'PresetIndex' })
  presetIndex: number;

  @Column('text', { name: 'PresetID' })
  presetId: string;

  @Column('int', { name: 'IdolID' })
  idolId: number;

  @Column('text', { name: 'Animation1' })
  animation1: string;

  @Column('text', { name: 'Animation2' })
  animation2: string;

  @Column('text', { name: 'Animation3' })
  animation3: string;

  @Column('text', { name: 'Animation4' })
  animation4: string;

  @Column('text', { name: 'Lip' })
  lip: string;

  @Column('text', { name: 'Comment' })
  comment: string;

  @Column('text', { name: 'SpeakerName' })
  speakerName: string;

  @Column('text', { name: 'Voice' })
  voice: string;

  @Column('text', { name: 'VoiceName' })
  voiceName: string;

  @Column('text', { name: 'ReleaseCondition' })
  releaseCondition: string;

  @ManyToOne(() => ScdbIdols, (idols) => idols.spinePresets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'IdolID', referencedColumnName: 'idolId' }])
  idol: ScdbIdols;
}
