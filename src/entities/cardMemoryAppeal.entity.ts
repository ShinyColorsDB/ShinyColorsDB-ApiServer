import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CardList } from "./cardList.entity";

@Index("CardIndex", ["enzaId"], {})
@Entity("SCDB_CardMemoryAppeal", { schema: "shinycolors_dev2" })
export class CardMemoryAppeal {
  @PrimaryGeneratedColumn({ type: "int", name: "MemoryIndex" })
  memoryIndex: number;

  @Column("bigint", { name: "EnzaID" })
  enzaId: string;

  @Column("bigint", { name: "MemoryID" })
  memoryId: string;

  @Column("text", { name: "MemoryTitle" })
  memoryTitle: string;

  @Column("text", { name: "MemoryDesc" })
  memoryDesc: string;

  @Column("json", { name: "MemoryEffects" })
  memoryEffects: object;

  @Column("bigint", { name: "MemoryLinkSkillID" })
  memoryLinkSkillId: string;

  @Column("text", { name: "LinkSkillDesc", nullable: true })
  linkSkillDesc: string | null;

  @Column("text", { name: "LinkWith", nullable: true })
  linkWith: string | null;

  @Column("json", { name: "LinkEffects", nullable: true })
  linkEffects: object | null;

  @ManyToOne(
    () => CardList,
    (cardList) => cardList.cardMemoryAppeals,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "EnzaID", referencedColumnName: "enzaId" }])
  enza: CardList;
}
