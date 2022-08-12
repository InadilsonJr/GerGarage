import { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "../../config";

class bookingService {
  async Booking(data) {
    console.log(data)
    data.user = await AsyncStorage.getItem("ID")
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + 'booking/register',
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      return Promise.resolve(response)
    }).catch(error => {
      return Promise.reject(error)
    })
  }

  async findAll() {
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + "booking/findall",
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,

      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      console.log(response)
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  async seeBooking(data) {
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + "booking/findall",
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      console.log(response)
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  async updateBooking(data) {
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + "booking/update",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {

      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  async deleteBooking(data) {
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + "booking/delete",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {

      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  async payment(data) {
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + "booking/payment",
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      console.log(response)
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }

  async viewBookingDate(data) {
    let token = await AsyncStorage.getItem("TOKEN")
    return axios({
      url: Config.API_URL + "booking/schedule",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      console.log(response)
      return Promise.resolve(response)
    }).catch((error) => {
      console.log(error)
      return Promise.reject(error)
    })
  }

}

const bookingServices = new bookingService(); // creating the object
export default bookingServices; // export  because i want to use the data after press save buttom
