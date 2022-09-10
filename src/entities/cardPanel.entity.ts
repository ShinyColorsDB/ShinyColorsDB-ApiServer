import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CardList } from "./cardList.entity";

@Index("LinkSkillID", ["linkSkillId"], {})
@Index("CardIndex", ["enzaId"], {})
@Entity("SCDB_CardPanel", { schema: "shinycolors_dev2" })
export class CardPanel {
  @PrimaryGeneratedColumn({ type: "int", name: "TableIndex" })
  tableIndex: number;

  @Column("bigint", { name: "EnzaID", select: false })
  enzaId: string;

  @Column("bigint", { name: "PanelID" })
  panelId: string;

  @Column("int", { name: "PanelIcon" })
  panelIcon: number;

  @Column("bigint", { name: "SkillID" })
  skillId: string;

  @Column("int", { name: "PanelSlot" })
  panelSlot: number;

  @Column("tinyint", { name: "PanelIsGold", width: 1 })
  panelIsGold: boolean;

  @Column("int", { name: "PanelReleaseEvolution" })
  panelReleaseEvolution: number;

  @Column("tinyint", { name: "PanelReleaseByEvent", width: 1 })
  panelReleaseByEvent: boolean;

  @Column("text", { name: "PanelReleaseDesc", nullable: true, default: null })
  panelReleaseDesc: string | null;

  @Column("text", { name: "SkillTitle" })
  skillTitle: string;

  @Column("text", { name: "SkillDesc" })
  skillDesc: string;

  @Column("text", { name: "SkillType" })
  skillType: string;

  @Column("json", { name: "SkillEffects" })
  skillEffects: object;

  @Column("bigint", { name: "LinkSkillID", nullable: true, default: null })
  linkSkillId: string | null;

  @Column("text", { name: "LinkSkillDesc", nullable: true, default: null })
  linkSkillDesc: string | null;

  @Column("text", { name: "LinkWith", nullable: true, default: null })
  linkWith: string | null;

  @Column("json", { name: "LinkEffects", nullable: true, default: null })
  linkEffects: object | null;

  @Column("bigint", { name: "PlusSkillID", nullable: true, default: null })
  plusSkillId: string | null;

  @Column("text", { name: "PlusSkillDesc", nullable: true, default: null })
  plusSkillDesc: string | null;

  @Column("text", { name: "PlusSkillEffects", nullable: true, default: null })
  plusSkillEffects: object | null;

  @ManyToOne(
    () => CardList,
    (cardList) => cardList.cardPanels,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "EnzaID", referencedColumnName: "enzaId" }])
  enza: CardList;
}
