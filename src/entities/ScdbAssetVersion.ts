import { Column, Entity, Index } from 'typeorm';

@Index('idx_16434_primary', ['assetIndex'], { unique: true })
@Entity('scdb_assetversion', { schema: 'shinycolors' })
export class ScdbAssetVersion {
  @Column('integer', { primary: true, name: 'assetIndex' })
  assetIndex: number;

  @Column('text', { name: 'AssetChunk', nullable: true })
  assetChunk: string | null;

  @Column('text', { name: 'AssetPath' })
  assetPath: string;

  @Column('text', { name: 'AssetEncryptedPath' })
  assetEncryptedPath: string;

  @Column('int', { name: 'AssetVersion' })
  assetVersion: number;

  @Column('boolean', { name: 'AssetExist' })
  assetExist: boolean;
}
