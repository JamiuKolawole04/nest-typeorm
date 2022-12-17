import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { User } from './user';

@Entity({ name: 'user_posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.posts)
  user: User;
}
