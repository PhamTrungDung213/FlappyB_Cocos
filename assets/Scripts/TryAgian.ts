import { _decorator, Component, Node } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('TryAgian')
export class TryAgian extends Component {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart() {
        GameCtrl.instance.resetGame();
    }
}

