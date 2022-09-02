import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CardIdolEvent } from "./cardIdolEvent.entity";
import { Idol } from "./idol.entity";
import { CardMemoryAppeal } from "./cardMemoryAppeal.entity";
import { CardPanel } from "./cardPanel.entity";
import { CardProficiency } from "./cardProficiency.entity";
import { CardSupportEvent } from "./cardSupportEvent.entity";
import { CardSupportSkill } from "./cardSupportSkill.entity";

@Index("Index", ["cardIndex"], { unique: true })
@Index("IdolID", ["idolId"], {})
@Index("EnzaID", ["enzaId"], {})
@Entity("SCDB_CardList", { schema: "shinycolors_dev2" })
export class CardList {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "CardIndex",
    comment: "self defined index",
  })
  cardIndex: number;

  @Column("bigint", { name: "EnzaID", comment: "enza ID", select: false })
  enzaId: string;

  @Column("int", { name: "IdolID" })
  idolId: number;

  @Column("text", { name: "CardName" })
  cardName: string;

  @Column("text", { name: "CardUUID" })
  cardUuid: string;

  @Column("text", { name: "BigPic1", nullable: true })
  bigPic1: string | null;

  @Column("text", { name: "BigPic2", nullable: true })
  bigPic2: string | null;

  @Column("text", { name: "SmlPic", nullable: true })
  smlPic: string | null;

  @Column("text", { name: "CardType" })
  cardType: string;

  @Column("text", { name: "GetMethod", nullable: true })
  getMethod: string | null;

  @Column("text", { name: "IdeaMark", nullable: true })
  ideaMark: string | null;

  @Column("text", { name: "CardHash", nullable: true, select: false })
  cardHash: string | null;

  @Column("date", { name: "ReleaseDate", nullable: true })
  releaseDate: string | null;

  @OneToMany(
    () => CardIdolEvent,
    (cardIdolEvent) => cardIdolEvent.enza
  )
  cardIdolEvents: CardIdolEvent[];

  @ManyToOne(() => Idol, (idol) => idol.cardLists, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "IdolID", referencedColumnName: "idolId" }])
  idol: Idol;

  @OneToMany(
    () => CardMemoryAppeal,
    (cardMemoryAppeal) => cardMemoryAppeal.enza
  )
  cardMemoryAppeals: CardMemoryAppeal[];

  @OneToMany(() => CardPanel, (cardPanel) => cardPanel.enza)
  cardPanels: CardPanel[];

  @OneToMany(
    () => CardProficiency,
    (cardProficiency) => cardProficiency.enza
  )
  cardProficiencies: CardProficiency[];

  @OneToMany(
    () => CardSupportEvent,
    (cardSupportEvent) => cardSupportEvent.enza
  )
  cardSupportEvents: CardSupportEvent[];

  @OneToMany(
    () => CardSupportSkill,
    (cardSupportSkill) => cardSupportSkill.enza
  )
  cardSupportSkills: CardSupportSkill[];
}
