import { _decorator, AudioClip, AudioSource, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class Audio extends Component {
    @property({type:[AudioClip]})
    public clips: AudioClip[]=[];

    @property({type:AudioSource})
    public audioSource: AudioSource = null;

    onAudioQueue(index: number){
        const clip = this.clips[index];
        if (!clip || !this.audioSource) {
            return;
        }

        this.audioSource.playOneShot(clip);
    }
}

