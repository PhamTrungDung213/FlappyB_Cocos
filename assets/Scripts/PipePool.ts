import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
import { Pipe } from './Pipe';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab,
        tooltip: 'The prefab of pipes'

    })
    public prefabPipes = null;
    
    @property({
        type: Node,
        tooltip: 'Where the new pipes go'
    })
    public pipePoolHome;

    public pool = new NodePool;
    public createPipe:Node = null; 

    initPool(){
        let initCount = 3;
        for (let i = 0; i < initCount; i++) {
            let createPipe = instantiate(this.prefabPipes);
            if (i == 0) {
                this.pipePoolHome.addChild(createPipe);
            } else {
                this.pool.put(createPipe);
            }
        }

    }

    addPool() {
        if (this.pool.size() > 0) {
            this.createPipe = this.pool.get();
        } else {
            this.createPipe = instantiate(this.prefabPipes);
        }
        this.pipePoolHome.addChild(this.createPipe);
      }

    reset(){
        const activePipes = this.pipePoolHome.children.slice();
        for (const pipe of activePipes) {
            pipe.destroy();
        }

        this.pool.clear();
        this.initPool();
    }

}
