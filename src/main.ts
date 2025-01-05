import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { UsersService } from './users/users.service';
import * as passport from 'passport';
import { Request } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  interface User {
    email: string;
    // Add other user properties if needed
  }

  passport.serializeUser(
    (user: User, done: (err: any, email?: string) => void) => {
      done(null, user.email);
    },
  );

  interface DoneFunction {
    (err: any, user?: any): void;
  }

  interface DeserializeUserFunction {
    (email: string, done: DoneFunction): Promise<void>;
  }

  const deserializeUser: DeserializeUserFunction = async (email, done) => {
    try {
      const user = await app.get(UsersService).findOne(email);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  };

  passport.deserializeUser(deserializeUser);

  await app.listen(3000);
}
bootstrap();
