import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { FavouritesModule } from './resources/favourites/favourites.module';

@Module({
  imports: [UserModule, AuthModule, FavouritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
