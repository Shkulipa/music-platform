import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./track/file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";


@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.f3tos.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`),
        TrackModule,
        FileModule
    ]
})
export class AppModule {}
