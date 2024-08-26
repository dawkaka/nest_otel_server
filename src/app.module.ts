import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosService } from './axios.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AxiosService],
})
export class AppModule {}
