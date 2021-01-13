import { Injectable } from '@nestjs/common';
import twilio = require('twilio');

const fs = require('fs');

const MessagingResponse = twilio.twiml.MessagingResponse;

interface User {
  id: string;
  Surname: string;
  First_Name : string;
  Other_Name: string;
  photo: string;
  dob: string;
  gender: string;
  Place_of_Birth: string;
  Serial_Number: string;
}


@Injectable()
export class AppService {

  getWelcomMessage() :string {
    const twiml = new MessagingResponse();
    twiml.message("Welcome to DEMO Institution. To register kindy type your ID in the formart ID(YOURIDNUMBER)");
    return twiml.toString();
  }

  async getIPRSInformation(id: string) {
    const twiml = new MessagingResponse();
    // TODO Fetch user data from IPRS system and register user.
  
    const users = <Array<User>> await this.getUsers();

    const user = users.filter(user => user.id === id);

    if(!user.length) {
      twiml.message(`Kindly check your id for errors`);
      return twiml.toString();
    }

    twiml.message(`Hey ${user[0].First_Name} ${user[0].Surname}. You have been registered successfully.`);
    return twiml.toString();
  }
  

  getUsers() {
    return new Promise((res, rej) => {
      // Fetch users from the ./users.json file
      fs.readFile('src/users.json', 'utf8', (err: any, jsonString: string) => {
        if (err) {
            rej(err)
            return;
        }
        res(JSON.parse(jsonString));
    })
    });
  }
}