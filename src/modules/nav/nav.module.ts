import { NavController } from './nav.controller';
import { NavService } from './nav.service';
import { Module } from '@nestjs/common';
import { NavSchema } from '../../schemas/nav.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'nav', schema: NavSchema }])],
    controllers: [
        NavController,],
    providers: [
        NavService,],
})
export class NavModule { }
