import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RefreshToken } from "./RefreshToken.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: "user" | "admin";

  @OneToMany(() => RefreshToken, (rt: RefreshToken) => rt.user)
  refreshTokens: RefreshToken[];
  
}
