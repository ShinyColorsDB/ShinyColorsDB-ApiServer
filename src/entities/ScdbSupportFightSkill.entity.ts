import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList.entity';

@Index('EnzaId', ['enzaId'], {})
@Entity('SCDB_SupportFightSkill', { schema: 'shinycolors' })
export class ScdbSupportFightSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FtIndex' })
  ftIndex: number;

  @Column('bigint', { name: 'EnzaID' })
  enzaId: string;

  @Column('text', { name: 'FtComment' })
  ftComment: string;

  @Column('int', { name: 'FtId' })
  ftId: number;

  @Column('text', { name: 'FtName' })
  ftName: string;

  @Column('json', { name: 'FtNormal' })
  ftNormal: object;

  @Column('json', { name: 'FtGood' })
  ftGood: object;

  @Column('json', { name: 'FtPerfect' })
  ftPerfect: object;

  @ManyToOne(
    () => ScdbCardList,
    (scdbCardList) => scdbCardList.cardSupportFightSkills,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
