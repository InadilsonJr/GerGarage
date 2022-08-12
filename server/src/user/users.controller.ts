import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-ayth.guard';
import { User } from 'src/user/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) { }

  @Post('register')
  async create(@Body() body: any, @Res() res: Response): Promise<UserInterface | { errorMessage }> {
    console.log(body)
    return this.userService.createUser(body.data)
      .then((userSaved) => {
        return <UserInterface>userSaved
      })
      .catch((error) => {
        console.error(error)
        if (error.code) {
          res.status(HttpStatus.BAD_REQUEST).send();
          return {
            errorMessage: ""
          }
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        return { errorMessage: "" }
      })
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    let user: User = await this.authService.validateUser(body.email, body.password)
    if (user) {
      let token = await this.authService.login(user)
      console.log(user, user.email === "admin")
      res.send({ access_token: token, id: user.id, isAdmin: user.email === "admin" })
    } else {
      throw new HttpException({
        errorMessage: 'Token invalid'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
