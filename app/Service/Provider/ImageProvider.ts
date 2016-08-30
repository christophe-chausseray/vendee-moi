import { GameState } from '../../State/Game'
import { Gender } from '../../Model/Human/Human'
import { Human } from '../../Model/Human/Human'
import { Good } from '../../Model/Item/Good'
import { Tool } from '../../Model/Item/Tool'

class ImageProvider {
    private gameState: GameState;

    getImageIdentifier(item: any) {
        if (item instanceof Human) {
            return (item.getGender() === Gender.Female ? 'female' : 'male') + '_' + (item.getId() + 1);
        }
    }

    getImageUrl(item: any) {
        if (item instanceof Human) {
            return 'assets/images/' +
            (item.getGender() === Gender.Female ? 'female' : 'male') +
            '/' +
            (item.getId() + 1) +
            '.png';
        } else if (item instanceof Good || item instanceof Tool) {
            return 'assets/images/shop/' +
            item.code +
            '.png';
        }
    }
}

export var imageProvider = new ImageProvider();
