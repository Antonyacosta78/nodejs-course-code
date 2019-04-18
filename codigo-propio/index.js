

Array.prototype.modifyThis = function(){
    const cache = this.map(e=>e);
    console.log(`cache = ${cache}
    this = ${this}`);
    cache[0] = "LALALA";
    console.log(`cache = ${cache}
    this = ${this}`);
}


const a = [1,2,3,5,6,7,2]

a.modifyThis()