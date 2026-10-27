import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { Audio } from './BirdAudio';
const { ccclass, property } = _decorator;


@ccclass('GameCtrl')
export class GameCtrl extends Component {
    public static instance: GameCtrl = null!; 

    @property({type:Ground, tooltip:'This is ground'})
    public ground: Ground;

    @property({type:Results})
    public result:Results;
    
    @property({type:Bird})
    public bird:Bird;

    @property({
        type: PipePool,
        tooltip: "Add canvas here",
    })
    public pipeQueue: PipePool;

    @property({type:Audio})
    public clip: Audio

    @property({type: CCInteger})
    public speed: number = 300;
    
    @property({type: CCInteger})
    public pipeSpeed: number = 200;

    onLoad(){
        GameCtrl.instance=this;
        if (!this.clip) {
            const scene = director.getScene();
            const audioNode = scene && scene.getChildByName('AudioCtrl');
            this.clip = audioNode ? audioNode.getComponent(Audio) : null;
        }
        this.initListener();
        this.resetScore();
    }

    initListener(){
        this.node.on(Node.EventType.TOUCH_START, ()=>{
            this.bird.fly();    
        })
    }

    startGame(){
        this.hideResult();
        director.resume();
    }

    gameOver(){
        if (this.clip) {
            this.clip.onAudioQueue(3);
        }
        this.showResult();
        director.pause();
    }

    resetGame(){
        this.resetScore();
        this.startGame();
    }

    updateScore(num:number){
        this.result.currentScore=num;
        this.result.ScoreLabel.string=this.result.currentScore.toString();
    }

    resetScore(){
        this.bird.resetBird();
        this.bird.resetScoreZones();
        this.updateScore(0);
        this.pipeQueue.reset();
        this.hideResult();
    }

    addScore(){
        this.updateScore(this.result.currentScore+1);
        if (this.clip) {
            this.clip.onAudioQueue(1);
        }
    }

    showResult(){
        this.result.maxScore=Math.max(this.result.maxScore,this.result.currentScore);
        this.result.HighScore.string='High Score: '+this.result.maxScore;
        this.result.ResultEnd.node.active=true;
        this.result.HighScore.node.active=true;
    }

    hideResult(){
        this.result.ResultEnd.node.active=false;
        this.result.HighScore.node.active=false;
    }

    createPipe() {
        this.pipeQueue.addPool();
    }
}