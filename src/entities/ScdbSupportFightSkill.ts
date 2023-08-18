import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('EnzaId', ['enzaId'], {})
@Entity('SCDB_SupportFightSkill', { schema: 'dev_shinycolors' })
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

  @OneToOne(() => ScdbCardList, (cardList) => cardList.supportFightSkills, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
