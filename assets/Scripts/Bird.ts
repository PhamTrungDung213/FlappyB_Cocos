import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, RigidBody2D } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({type:CCFloat})
    public jumpHeight:number = 4.2
    
    @property({type:CCFloat})
    public jumpDuration:number = 0.2

    public birdAnimation:Animation;
    public birdLocation:Vec3;   
    private scoredZones = new Set<Node>();
    private initialPosition = new Vec3();
    private rigidBody: RigidBody2D;

    onLoad(){
        this.initialPosition.set(this.node.position);
        this.resetBird();
        this.birdAnimation=this.getComponent(Animation);
        this.rigidBody=this.getComponent(RigidBody2D);
        if (this.rigidBody) {
            this.rigidBody.fixedRotation=true;
        }
        this.initColider();
        PhysicsSystem2D.instance.enable = true;
    }

    resetBird(){
        this.birdLocation= this.initialPosition;
        this.node.setPosition(this.birdLocation);
        this.node.setRotationFromEuler(0, 0, 0);
        if (this.rigidBody) {
            this.rigidBody.angularVelocity=0;
        }
    }

    resetScoreZones() {
        this.scoredZones.clear();
    }

    fly() {
        this.birdAnimation.stop();

        tween(this.node.position)
        .to(
            this.jumpDuration,
            new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {easing: "smooth"
                , onUpdate: (target: Vec3, ratio: number) => {
                this.node.position = target;}
            })
        .start();

        this.birdAnimation.play();
        if (GameCtrl.instance.clip) {
            GameCtrl.instance.clip.onAudioQueue(0);
        }
    }

    initColider(){
        // Lấy Collider2D gắn trên Node Bird
        const collider = this.getComponent(Collider2D);
        if (collider) {
            // Đăng ký sự kiện khi bắt đầu tiếp xúc va chạm
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const otherNode = otherCollider.node;

        // 1. Nếu chạm vào ScoreZone (vùng tính điểm)
        if (otherNode.name === 'ScoreZ') {
            if (this.scoredZones.has(otherNode)) {
                return;
            }

            this.scoredZones.add(otherNode);
            GameCtrl.instance.addScore();
            return;
        }

        // 2. Nếu đâm vào TopPipe, BottomPipe hoặc Đất (Ground)
        if (otherNode.name === 'TPipe' || otherNode.name === 'BPipe' || otherNode.name.includes('base')) {
            GameCtrl.instance.gameOver();
        }
    }

}
