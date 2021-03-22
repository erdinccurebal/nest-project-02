import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../schemas/user.schema';
import { RoleModel } from '../../schemas/role.schema';
import { AuthLoginDto, AuthRegisterDto } from '../../dtos/auth.dto';
import { AuditModel } from 'src/models/audit.model';
import environment from 'src/environments/environment';
import * as nodemailer from 'nodemailer';
import * as rateLimit from 'express-rate-limit';
import * as slugUrl from 'url-slug';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as gs from 'generate-password';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private userMongo: Model<UserModel>) {}

  async convertHash(value: string): Promise<string> {
    let hash: any;
    await bcrypt.hash(environment.hashText + value, 10).then(data => {
      hash = data;
    });
    return await hash;
  }

  async comporeHash(pwd, hashPwd) {
    const match = await bcrypt.compareSync(environment.hashText + pwd, hashPwd);
    return await match;
  }

  async confirmation(confirm: string): Promise<UserModel> {
    let jwtDecoded = jwt.verify(confirm, environment.jwtText);
    let userExist = await this.userMongo
      .findOne({ email: jwtDecoded.email })
      .exec();
    if (!userExist) {
      throw new HttpException('User is invalid!', HttpStatus.FORBIDDEN);
    } else {
      userExist.audit.active = true;
      return await this.userMongo
        .findByIdAndUpdate(userExist._id, userExist, { new: true })
        .exec();
    }
  }

  transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.yandex.com.tr',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'iletisim@erdinccurebal.com',
      pass: 'Ec83849954208.',
    },
  });

  mailOptions = {
    from: 'iletisim@erdinccurebal.com',
    to: 'erdinccurebal@hotmail.com',
    subject: '',
    html: '',
  };

  async emailConfirmation(getEmail: string): Promise<UserModel> {
    const user = await this.userMongo.findOne({ email: getEmail });

    if (!user) {
      throw new HttpException(
        'There is no such email!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const token = jwt.sign({ email: user.email }, environment.jwtText, {
        expiresIn: '10m',
      });
      let activationHref =
        'http://localhost:3000/api/auth/confirmation/' + token;
      this.mailOptions.subject = 'User Email Confirm';
      this.mailOptions.to = user.email;
      this.mailOptions.html = `
    <h1>Erdinç Cürebal - Web Site</h1>
    <h3>Hello - ${user.username}</h3>
    <h4>This mail has been sent to activate the user.</h4>
    <a href="${activationHref}">Click to activate the user</a>
    `;

      await this.transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      throw new HttpException(
        'User verification code has been sent to your email.',
        HttpStatus.CREATED,
      );
    }
  }

  async lostConfirm(token: string): Promise<UserModel> {
    let jwtDecoded = jwt.verify(token, environment.jwtText);
    let userExist = await this.userMongo.findOne({ email: jwtDecoded.email });
    if (!jwtDecoded) {
      throw new HttpException('Jwt invalid!', HttpStatus.FORBIDDEN);
    } else if (token) {
      let newPwd = gs.generate({ length: 10, numbers: true });
      let pwdHash = await this.convertHash(newPwd);
      userExist.password = pwdHash;

      this.mailOptions.subject = 'Your new password has arrived.';
      this.mailOptions.to = userExist.email;
      this.mailOptions.html = `
    <h1>Erdinç Cürebal - Web Site</h1>
    <h3>Hello - ${userExist.username}</h3>
    <h4>This mail has been sent to activate the user.</h4>
    <p>Your new password: ${newPwd}
    `;

      await this.transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      let newUser = await this.userMongo.findByIdAndUpdate(
        userExist._id,
        userExist,
      );
      return newUser;
    }
  }

  async lostPassword(email: string): Promise<any> {
    const user = await this.userMongo.findOne({ email: email }).exec();
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    } else if (user.email === email) {
      const token = jwt.sign({ email: email }, environment.jwtText, {
        expiresIn: '10m',
      });
      let activationHash = token;
      let activationHref =
        'http://localhost:3000/api/auth/lostconfirm/' + activationHash;
      this.mailOptions.subject = 'User - Lost Password';
      this.mailOptions.to = user.email;
      this.mailOptions.html = `
        <h1>Erdinç Cürebal - Web Site</h1>
        <h3>Hello - ${user.username}</h3>
        <h4>You lost your password.<h4>
      <a href="${activationHref}">Send my new password to my email.</a>
    `;

      await this.transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      throw new HttpException(
        'An e-mail has been sent to your e-mail to create a new password.',
        HttpStatus.CREATED,
      );
    }
  }

  async register(body: AuthRegisterDto): Promise<UserModel> {
    const emailExist = await this.userMongo.findOne({ email: body.email });
    const usernameExist = await this.userMongo.findOne({
      username: body.username,
    });

    if (usernameExist) {
      throw new HttpException('This user has!', HttpStatus.FORBIDDEN);
    } else if (emailExist) {
      throw new HttpException('This email has!', HttpStatus.FORBIDDEN);
    } else if (!emailExist && !usernameExist) {
      body.role = '5f3011110639d127772bd802';
      let audit = new AuditModel();
      audit.active = false;
      audit.createdBy = 'Register Page';
      audit.createdDate = new Date();
      body.audit = audit;

      const token = jwt.sign({ email: body.email }, environment.jwtText, {
        expiresIn: '10m',
      });
      let activationHash = token;
      let activationHref =
        'http://localhost:3000/api/auth/confirmation/' + activationHash;
      this.mailOptions.subject = 'User Email Confirm';
      this.mailOptions.to = body.email;
      this.mailOptions.html = `
    <h1>Erdinç Cürebal - Web Site</h1>
    <h3>Hello - ${body.username}</h3>
    <h4>This mail has been sent to activate the user.</h4>
    <a href="${activationHref}">Click to activate the user</a>
    `;

      await this.transporter.sendMail(this.mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      const model = new this.userMongo({ ...body });
      return await model.save();
    } else {
      throw new HttpException(
        'There is an uncertain error!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async login(body: AuthLoginDto): Promise<any> {
    const loginExist = await this.userMongo.findOne({
      username: body.username,
    });
    if (!loginExist) {
      throw new HttpException('Login exist error!', HttpStatus.FORBIDDEN);
    } else if (!loginExist.audit.active) {
      throw new HttpException(
        'Please activate your user!',
        HttpStatus.FORBIDDEN,
      );
    } else {
      if (loginExist.username == body.username) {
        const statusHash = await this.comporeHash(
          body.password,
          loginExist.password,
        );
        class loginExistType {
          status: string;
          message: string;
          token: Object;
        }
        const exLoginExist = new loginExistType();

        if (statusHash) {
          const token = jwt.sign({ user: loginExist }, environment.jwtText);
          exLoginExist.status = statusHash;
          exLoginExist.message = 'Success user login.';
          exLoginExist.token = token;
          throw await new HttpException(exLoginExist, HttpStatus.ACCEPTED);
        } else {
          exLoginExist.status = statusHash;
          exLoginExist.message = 'Unsuccessful user login.';
          throw await new HttpException(
            exLoginExist,
            HttpStatus.FAILED_DEPENDENCY,
          );
        }
      }
    }
  }
}
