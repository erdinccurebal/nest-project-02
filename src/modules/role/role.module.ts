import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/schemas/role.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'role', schema: RoleSchema }])],
    controllers: [
        RoleController,],
    providers: [
        RoleService,],
    exports: [RoleService]
})
export class RoleModule { }
