import { Column, Entity, Index } from 'typeorm';

@Index('idx_16391_primary', ['accountindex'], { unique: true })
@Entity('scdb_accountsessions', { schema: 'shinycolors' })
export class ScdbAccountSessions {
  @Column('integer', { primary: true, name: 'accountindex' })
  accountIndex: number;

  @Column('text', { name: 'apptoken' })
  appToken: string;

  @Column('text', { name: 'accountsession' })
  accountSession: string;

  @Column('text', { name: 'accountapptoken' })
  accountAppToken: string;
}
