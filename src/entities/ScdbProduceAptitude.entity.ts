import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScdbCardList } from './ScdbCardList.entity';

@Index('EnzaID', ['enzaId'], {})
@Entity('SCDB_ProduceAptitude', { schema: 'shinycolors' })
export class ScdbProduceAptitude {
  @PrimaryGeneratedColumn({ type: 'int', name: 'AptIndex' })
  aptIndex: number;

  @Column('bigint', { name: 'EnzaID' })
  enzaId: string;

  @Column('text', { name: 'AptClass' })
  aptClass: string;

  @Column('text', { name: 'AptType' })
  aptType: string;

  @Column('text', { name: 'AptCategory' })
  aptCategory: string;

  @Column('text', { name: 'AptName' })
  aptName: string;

  @Column('text', { name: 'AptStepName' })
  aptStepName: string;

  @Column('text', { name: 'AptStepType' })
  aptStepType: string;

  @ManyToOne(
    () => ScdbCardList,
    (scdbCardList) => scdbCardList.cardProduceAptitudes,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'EnzaID', referencedColumnName: 'enzaId' }])
  enza: ScdbCardList;
}
