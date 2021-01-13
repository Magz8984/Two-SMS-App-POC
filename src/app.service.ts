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
    // TODO Fetch user data from IPRS system
    const users = (<Array<User>> await this.getUsers()).filter(user => user.id === id);
    
    if(!users.length) {
      twiml.message(`Kindly check your id for errors`);
      return twiml.toString();
    }
    // TODO Register user
    twiml.message(`Hey ${users[0].First_Name} ${users[0].Surname}. You have been registered successfully.`);
    return twiml.toString();
  }
  

  getUsers() {
    return new Promise((res, rej) => {
      // Fetch users from the ./users.json file
      fs.readFile('./users.json', 'utf8', (err: any, jsonString: string) => {
        if (err) {
            rej(err)
            return;
        }
        res(JSON.parse(jsonString));
    })
    });
  }
}