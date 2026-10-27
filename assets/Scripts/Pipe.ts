import { _decorator, Collider2D, Component, Node, Vec3, screen, UITransform} from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

//make a random number generator for the gap
const random = (min,max) => {
    return Math.random() * (max - min) + min
}


@ccclass('Pipe')
export class Pipe extends Component {
    @property({type:Collider2D})
    public topPipe:Collider2D;

    @property({type:Collider2D})
    public bottomPipe:Collider2D;

    @property({type:Collider2D})
    public scoreZone:Collider2D;

    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    public TopPipe: Node;
    
    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public BottomPipe: Node;
    
    @property({
        type: Node,
        tooltip: 'ScoreZone node'
    })
    public ScoreZone: Node;

    //temporary Locations
    public tempStartLocationUp:Vec3 = new Vec3(0,0,0); 
    public tempStartLocationDown:Vec3 = new Vec3(0,0,0);
    public tempStartLocationScore:Vec3 = new Vec3(0,0,0);
    public scene = screen.windowSize; 

    public pipeSpeed:number; 
    //public upSpeed:number = 100;

    onLoad(){
        this.pipeSpeed=GameCtrl.instance.pipeSpeed;
        this.initPos();
    }
    
    initListener(){
        
    }

    initPos(){
        this.tempStartLocationUp.x = (this.TopPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.BottomPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationScore.x = (this.ScoreZone.getComponent(UITransform).width + this.scene.width);

        let gap=random(110,120);
        let topHeight = random(250,900); 

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap*10));
        
        this.TopPipe.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.BottomPipe.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);
        this.ScoreZone.setPosition(this.tempStartLocationScore.x, this.tempStartLocationScore.y);
    }

    update(dt: number){

        const pos = this.node.position;
        this.node.setPosition(pos.x - this.pipeSpeed* dt, pos.y, pos.z);

        if (this.node.position.x < -820){
            GameCtrl.instance.createPipe();
            this.node.destroy();
        };

    }
}