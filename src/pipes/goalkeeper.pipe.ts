import { Injectable, PipeTransform } from "@nestjs/common"
import GoalKeeper from "../utils/GoalKeeper"
import Translator from "../utils/Translator"

@Injectable()
export class GoalKeeperPipe implements PipeTransform {
  transform(value: any) {
    const translator = new Translator(Translator.FALLBACK_LOCALE)
    return GoalKeeper.startShift(() => value, translator)
  }
}
