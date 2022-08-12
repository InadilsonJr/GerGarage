import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/user/user.interface';
import { EntityManager, getManager } from "typeorm";
import {User} from "./user.entity";
//import * bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    manager:EntityManager
    async createUser(newUser:UserInterface):Promise<User> {
      this.manager = getManager();
      const user = this.manager.create(User,newUser);
      return this.manager.save(user);
    }
    async findOne(email:string):Promise<User | undefined> {
      this.manager = getManager();
      const user = this.manager.findOneOrFail(User,{email});
      return user;
    }
}