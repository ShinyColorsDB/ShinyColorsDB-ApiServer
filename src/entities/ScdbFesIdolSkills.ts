import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('FesIdolIndex', ['fesIdolIndex'], {})
@Entity('SCDB_FesIdolSkills', { schema: 'shinycolors' })
export class ScdbFesIdolSkills {
  @PrimaryGeneratedColumn({ type: 'int', name: 'FesIdolSkillIndex' })
  fesIdolSkillIndex: number;

  @Column('int', { name: 'FesIdolIndex' })
  fesIdolIndex: number;

  @Column('text', { name: 'SkillType' })
  skillType: string;

  @Column('bigint', { name: 'SkillId' })
  skillId: string;
}
