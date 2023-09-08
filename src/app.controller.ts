import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly authService: AuthService) {}



}
