import {Entity, PrimaryGeneratedColumn, Column} from"typeorm"

@Entity({name: "user"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date

    @Column({nullable: true})
    authStartegy: string;
}