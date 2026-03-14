/**
 * Warrior Component Registry
 *
 * Maps character.id → specific figure component.
 * Characters without a custom component fall through to GenericWarrior.
 */
import GenericWarrior from './GenericWarrior'
import KrishnaFigure from './KrishnaFigure'
import ArjunaFigure from './ArjunaFigure'
import BhismaFigure from './BhismaFigure'
import DuryodhanaFigure from './DuryodhanaFigure'
import DronaFigure from './DronaFigure'
import BhimaFigure from './BhimaFigure'
import YudhishthiraFigure from './YudhishthiraFigure'
import KarnaFigure from './KarnaFigure'
import DhrishtadyumnaFigure from './DhrishtadyumnaFigure'

const WARRIOR_COMPONENTS = {
  krishna: KrishnaFigure,
  arjuna: ArjunaFigure,
  bhisma: BhismaFigure,
  duryodhana: DuryodhanaFigure,
  drona: DronaFigure,
  bhima: BhimaFigure,
  yudhishthira: YudhishthiraFigure,
  karna: KarnaFigure,
  dhrishtadyumna: DhrishtadyumnaFigure,
}

/**
 * Get the appropriate figure component for a character.
 * Returns the custom component if one exists, otherwise GenericWarrior.
 */
export function getWarriorComponent(characterId) {
  return WARRIOR_COMPONENTS[characterId] || GenericWarrior
}
