import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { TokenService } from 'src/token/token.service';
import { BookingRegisterDto } from './dto/booking.register.dto';
import { User } from 'src/user/user.entity';
import { ResponseDto } from 'src/dto/response.dto';
import { Body, Get, HttpException, HttpStatus, Post, Req, Res} from '@nestjs/common';
import { Booking } from './booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService,
    private readonly tokenService: TokenService) { }

  @Post('register')
  async register(@Body() data: BookingRegisterDto, @Req() req, @Res() res): Promise<ResponseDto> {
    //console.log(req)
    //let token = req.headers.authorization
    //console.log(token)
    //let user: User = await this.tokenService.getUserByToken(token) // i need to call tokenService in the constructor
    //if (user) {
      let user = new User()
      user.id = +data.user
      console.log(data)
      return this.bookingService.register(data, user)
    //} else {
      // throw new HttpException({
      //   errorMessage: 'Token invalid'
      // }, HttpStatus.UNAUTHORIZED)

    //}

  }

  @Get('findall')
  async viewAll(): Promise<Booking[]> {
    return this.bookingService.viewAll()
  }

}

