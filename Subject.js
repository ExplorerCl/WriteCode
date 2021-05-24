
/*
    第一种写法
*/ 
// function Subject(){
//     this.observers = {}
// }

// Subject.prototype = {
//     add(key,observer){
//         if(!this.observers[key]){
//             if(observer && observer.update && typeof observer.update == 'function'){
//                 this.observers[key] = observer;
//             }else{
//                 throw new Error('你所传入的observer数据类型不正确。')
//             }
//         }else{
//             throw new Error('您所输入的key已存在，请确认后重试。')
//         }
//     },

//     notify(){
//         for(var key in this.observers){
//             this.observers[key].update();
//         }
//     },

//     remove(key){
//         if(this.observers[key]){
//             delete(this.observers[key]);
//         }else{
//             throw new Error('您所输入的key不存在，请确认后重试。')
//         }
//     },

//     clear(){
//         this.observers = {};
//     }
// }

// function Observer(sub,name){
//     sub.add(name,this)
//     this.name = name;
// }

// Observer.prototype = {
//     update(){
//         console.log(this.name+'触发了')
//     }
// }


/*
    第二种写法
*/ 
class Subject{
    constructor(){
        this.observers = {}
    }

    add(key,observer){
        if(!this.observers[key]){
            if(observer && observer.update && typeof observer.update == 'function'){
                this.observers[key] = observer;
            }else{
                throw new Error('你所传入的observer数据类型不正确。')
            }
        }else{
            throw new Error('您所输入的key已存在，请确认后重试。')
        }
    }

    notify(){
        for(var key in this.observers){
            this.observers[key].update();
        }
    }

    remove(key){
        if(this.observers[key]){
            delete(this.observers[key]);
        }else{
            throw new Error('您所输入的key不存在，请确认后重试。')
        }
    }

    clear(){
        this.observers = {};
    }
}

class Observer{
    constructor(sub,name){
        sub.add(name,this)
        this.name = name;
    }

    update(){
        console.log(this.name+'触发了')
    }

}



var sub = new Subject();
var obs1 = new Observer(sub,'obs1');
var obs2 = new Observer(sub,'obs2');
var obs3 = new Observer(sub,'obs3');
var obs4 = new Observer(sub,'obs4');
var obs5 = new Observer(sub,'obs5');
sub.notify();
sub.remove('obs1')
sub.notify();
sub.clear()
sub.notify();





