import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "../../config";

// created to transfer data 


class UserService {

    async signup(data) {
        return axios(
            {
                url: Config.API_URL + '/users/register',
                method: "POST",
                timeout: Config.TIMEOUT_REQUEST,
                data: data,
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })
    }

    async login(data) {
        return axios(
            {
                url: Config.API_URL + 'users/login',
                method: "POST",
                timeout: Config.TIMEOUT_REQUEST,
                data: data,
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => {
                return Promise.resolve(response)
            }).catch((error) => {
                return Promise.reject(error)
            })
    }
}

const userService = new UserService();
export default userService;