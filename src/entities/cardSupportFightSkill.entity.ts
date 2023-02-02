import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardList } from './cardList.entity';

@Index('EnzaId', ['enzaId'], {})
@Entity('SCDB_SupportFightSkill', { schema: 'shinycolors_dev2' })
export class CardSupportFightSkill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FtIndex' })
  ftIndex: number;

  @Column('bigint', { name: 'EnzaId' })
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

  @OneToOne(() => CardList, (cardList) => cardList.cardSupportFightSkills, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'EnzaId', referencedColumnName: 'enzaId' }])
  enza: CardList;
}
