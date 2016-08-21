import { Female } from '../Model/Human/Female'
import { Gender } from '../Model/Human/Human'
import { Male } from '../Model/Human/Male'
import { Human } from '../Model/Human/Human'

var names = {};
names[Gender.Female] = [
  'Jessica',
  'Stessy',
  'Stephany',
  'Kimberley',
  'Magalie',
  'Cynthia',
  'Debora',
  'Jacqueline',
  'Josiane',
  'Germaine',
  'Odette',
  'Madelene'
];
names[Gender.Male] = [
  'Dylan',
  'Kevin',
  'Killian',
  'Jordan',
  'Brian',
  'Anthony',
  'Jimmy',
  'Gary',
  'Johny',
  'Sulivan',
  'Jean-Michel',
  'Jacquie',
  'Didier',
  'Marcel',
  'Raymond'
];

class HumanFactory {
  create(mother: Female, father: Male, gender: Gender = null, age: number = -9) {
    if (null === gender) {
      gender = Math.random() < 0.5 ? Gender.Female : Gender.Male;
    }

    var humanClass = gender === Gender.Female ? Female : Male;

    return new humanClass(mother, father, names[gender][Math.floor(Math.random() * names[gender].length)], 100, age)
  }
}

export var humanFactory = new HumanFactory();
