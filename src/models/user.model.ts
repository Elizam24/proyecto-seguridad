import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Password } from "./password.model";

@Entity()
export class Passwords extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (user) => user.passwords, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: Users;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  site: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
  })
  username: string;

  @Column("varchar", {
    nullable: false,
  })
  password: string;
}
