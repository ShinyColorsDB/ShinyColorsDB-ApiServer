import { Column, Entity, Index } from 'typeorm';

@Index('idx_16628_primary', ['supSkillIndex'], { unique: true })
@Entity('scdb_supportskilllist', { schema: 'shinycolors' })
export class ScdbSupportSkillList {
  @Column('integer', { primary: true, name: 'supskillindex' })
  supSkillIndex: number;

  @Column('text', { name: 'supskillname' })
  supSkillName: string;

  @Column('boolean', { name: 'hassuboption' })
  hasSubOption: boolean;
}
