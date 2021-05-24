/*
发布订阅模式
*/ 
class EventEmitter {
    constructor(){
        this.events = {}
    }

    on(key,fn){
        if(typeof fn !== 'function'){
            throw new TypeError('您输入的fn不是一个函数类型。')        
        }

        if(!this.events[key]){
            this.events[key] = [];
        }
        this.events[key].push(fn);
    }

    once(key,fn){
        if(typeof fn !== 'function'){
            throw new TypeError('您输入的fn不是一个函数类型。')        
        }
        let _this = this;

        function onceFanc(...args){
            _this.off(key, onceFanc)
            fn.apply(_this, args);
        }
        onceFanc.fn = fn;
        _this.on(key, onceFanc);
        console.log('onceFn',onceFanc)
        return this;
    }

    off(key,fn){
        if(typeof fn !== 'function'){
            throw new TypeError('您输入的fn不是一个函数类型。')        
        }

        const event = this.events[key];
        if(event && event.length > 0) {
            let cb;
            for(let i = 0; i < event.length;i++){
                cb = event[i];
                if(cb === fn || cb.fn === fn){
                    event.splice(i,1);
                    break;
                }
            }
        }
        return this;
    }

    emit(key, ...arg){
        const event = this.events[key];
        if(event && event.length > 0){
            for(let cb of event){
                cb.apply(arg)
            }
            return true;
        }else{
            return false;
        }
    }
}

const event = new EventEmitter ();
const addTestFn = () => console.log('test 事件被触发了')
event.on('test', addTestFn);
event.emit('test');
event.off('test', addTestFn);
event.emit('test');
event.once('test-once', () => console.log('test-once 一次事件被触发了'));
event.emit('test-once');
event.emit('test-once');
