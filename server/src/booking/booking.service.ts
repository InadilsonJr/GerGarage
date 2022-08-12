import { Injectable, Inject } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository, getConnection } from 'typeorm';
//import * as bcrypt from 'bcrypt';
import { Booking } from './booking.entity';
import { BookingRegisterDto } from './dto/booking.register.dto';
import { User } from 'src/user/user.entity';

//method to list all the users
@Injectable()
export class BookingService {
  constructor(
    @Inject('BOOKING_REPOSITORY')
    private bookingRepository: Repository<Booking>,
  ) { }

  async viewAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async register(data: BookingRegisterDto, user: User): Promise<ResponseDto> {
    let booking = new Booking()
    booking.serviceType = data.serviceType || ""
    booking.vehicle_type = data.vehicle_type || ""
    booking.enginee_type = data.enginee_type || ""
    booking.license = data.license || ""
    booking.user = user
    booking.date = data.date
    booking.time = data.time
    booking.cost = data.cost || ""
    booking.status = data.status || ""
    booking.addCost = data.addCost || "0"
    booking.mechanic = data.mechanic || "0"

    return this.bookingRepository.save(booking).then(() => {
      return <ResponseDto>{
        status: true,
        message: "Appointment booked"
      }
    }).catch((error) => {
      console.log(error)
      return <ResponseDto>{
        status: false,
        message: "Error in the booking"
      }
    })
  }
  // view will receive the id of the user and return all the bookings with this id
  async view(id): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { user: { id } } });
  }
  //return the payments with the id from the user.
  async payment(id): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { user: { id }, status: "Completed" } });
  }
  //updating the data in booking, each item will be upadated with a query
  async updateBooking(data) {
    if (data.cost != "null" || data.cost != "") {
      await getConnection()
        .createQueryBuilder()
        .update(Booking)
        .set({ cost: data.cost })
        .where("booking.id = :id", { id: data.id })
        .execute();
    }
    if (data.status != "null" || data.status != "") {
      await getConnection()
        .createQueryBuilder()
        .update(Booking)
        .set({ status: data.status })
        .where("booking.id = :id", { id: data.id })
        .execute();
    }
    if (data.addCost != "null" || data.addCost != "") {
      await getConnection()
        .createQueryBuilder()
        .update(Booking)
        .set({ addCost: data.addCost })
        .where("booking.id = :id", { id: data.id })
        .execute();
    }
    if (data.mechanic != "null" || data.mechanic != "") {
      await getConnection()
        .createQueryBuilder()
        .update(Booking)
        .set({ mechanic: data.mechanic })
        .where("booking.id = :id", { id: data.id })
        .execute();
    }

  }

}