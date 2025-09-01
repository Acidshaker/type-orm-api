import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
