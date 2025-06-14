import { Column, Entity, Index } from 'typeorm';

@Index('idx_16499_fesidolindex', ['fesIdolIndex'], {})
@Index('idx_16499_primary', ['fesIdolSkillIndex'], { unique: true })
@Entity('scdb_fesidolskills', { schema: 'shinycolors' })
export class ScdbFesIdolSkills {
  @Column('integer', { primary: true, name: 'fesidolskillindex' })
  fesIdolSkillIndex: number;

  @Column('int', { name: 'fesidolindex' })
  fesIdolIndex: number;

  @Column('text', { name: 'skilltype' })
  skillType: string;

  @Column('bigint', { name: 'skillid' })
  skillId: string;
}
