import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ScdbCardList } from './ScdbCardList';

@Index('idx_16623_enzaid', ['enzaId'], {})
@Index('idx_16623_primary', ['ftIndex'], { unique: true })
@Entity('scdb_supportfightskill', { schema: 'shinycolors' })
export class ScdbSupportFightSkill {
  @Column('integer', { primary: true, name: 'ftindex' })
  ftIndex: number;

  @Column('bigint', { name: 'enzaid' })
  enzaId: string;

  @Column('text', { name: 'ftcomment' })
  ftComment: string;

  @Column('int', { name: 'ftid' })
  ftId: number;

  @Column('text', { name: 'ftname' })
  ftName: string;

  @Column('json', { name: 'ftnormal' })
  ftNormal: object;

  @Column('json', { name: 'ftgood' })
  ftGood: object;

  @Column('json', { name: 'ftperfect' })
  ftPerfect: object;

  @OneToOne(() => ScdbCardList, (cardList) => cardList.supportFightSkills, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'enzaid', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
