async function wait() {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    return await new Promise((resolve,reject) => setTimeout(()=>resolve(10), 1000));
    // setTimeout(result => {console.log(result + " 5555 ");console.log(Date.now())}, 1000)
    // await (async () => 10)();

    // return 11;
}

function f() {
    // 1 秒后显示 10
    wait().then(result => {console.log(result + " 4444 ");console.log(Date.now())});
    console.log("Date.now() 2222 ")
    console.log(Date.now())
}
console.log("Date.now() 1111 ")
console.log(Date.now())
f();
console.log("Date.now() 3333 ")
console.log(Date.now())