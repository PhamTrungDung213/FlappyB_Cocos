import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({type:Label})
    public ScoreLabel:Label;
    
    @property({type:Label})
    public HighScore:Label;
    
    @property({type:Label})
    public ResultEnd:Label;

    maxScore:number =0;
    currentScore:number;
}


