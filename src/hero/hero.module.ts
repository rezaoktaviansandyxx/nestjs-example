import { Module } from "@nestjs/common";
import { HeroController } from "./HeroController";
import { HeroService } from "./hero.service";

@Module({
    controllers: [HeroController],
    providers: [HeroService],
})
export class HeroModule {}