!function () {
    const name = "Corry";
    const greeting = `Hello, my name is ${name}!`;
    //console.log(greeting);
}()

!function () {
    function makeGreeting(name) { return `Hello, my name is ${name}!`; }
    const name = "Corry";
    const greeting = makeGreeting(name);
    //console.log(greeting);
}()

!function () {
    const MAX_PRIME = 1000000
    function isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) { return false }
        }
        return n > 1
    };
    const random = (max) => Math.floor(Math.random() * max);
    function generatePrimes(quota) {
        const primes = [];
        while (primes.length < quota) {
            const candidate = random(MAX_PRIME);
            if (isPrime(candidate)) { primes.push(candidate); }
        }
        return primes;
    };
    const quota = document.querySelector('#quota');
    const output = document.querySelector('#output');
    document.querySelector('#generate').addEventListener('click', () => {
        const primes = generatePrimes(quota.value);
        output.textContent = `Finished gererating ${quota.value} primes!`;
    });
    document.querySelector('#reload').addEventListener('click', () => { document.location.reload(); });
}()

!function () {
    const log = document.querySelector('.event-log');
    document.querySelector('#xhr').addEventListener('click', () => {
        log.textContent = '';
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('loadend', () => { log.textContent = `${log.textContent}Finished with status: ${xhr.status}`; });
        xhr.open('GET', 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json',);
        xhr.send();
        log.textContent = `${log.textContent}Started XHR request\n`;
    })
    document.querySelector('#reload').addEventListener('click', () => {
        log.textContent = '';
        document.location.reload();
    })
}()

!function () {
    function doStep1(init) { return init + 1 }
    function doStep2(init) { return init + 2 }
    function doStep3(init) { return init + 3 }
    function doOperation() {
        let result = 0;
        result = doStep1(result);
        result = doStep2(result);
        result = doStep3(result);
        console.log(`result: ${result}`);
    }
    //doOperation();
}()

!function () {
    function doStep1(init, callback) { const result = init + 1; callback(result) }
    function doStep2(init, callback) { const result = init + 2; callback(result) }
    function doStep3(init, callback) { const result = init + 3; callback(result) }
    function doOperation() { doStep1(0, (result1) => { doStep2(result1, (result2) => { doStep3(result2, (result3) => { console.log(`result: ${result3}`); }); }); }) };
    //doOperation();
}()

!function () {
    function walkDog() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const dogWalked = true;
                if (dogWalked) {
                    resolve('You walk the dog');
                }
                else {
                    reject('You DIDN\'T walk the dog');
                }
            }, 1500);
        });
    }

    function cleanTheKitchen() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const cleanedKitchen = true;
                if (cleanedKitchen) {
                    resolve('You cleaned the kitchen');
                }
                else {
                    reject('You DIDN\'T cleaned the kitchen');
                }
            }, 1500);
        });
    }

    function takeOutTrash() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const tookOutTrash = true;
                if (tookOutTrash) {
                    resolve('You take out the trash');
                }
                else {
                    reject('You DIDN\'T take out the trash');
                }
            }, 1500);
        });
    }

    //walkDog()
    //    .then(value => {console.log(value); return cleanTheKitchen()})
    //    .then(value => {console.log(value); return takeOutTrash()})
    //    .then(value => {console.log(value); console.log('You finished all the chores')})
    //    .catch(error => console.log(error));

    async function doChores() {
        try {
            const walkDogResult = await walkDog();
            console.log(walkDogResult);
            const cleanKitchenResult = await cleanTheKitchen();
            console.log(cleanKitchenResult);
            const takeOutTrashResult = await takeOutTrash();
            console.log(takeOutTrashResult);
            console.log('You finished all the chores!')
        }
        catch (error) {
            console.log(error)
        }
    }
    //doChores()
}()

!function () {
    function resolveAfter25Seconds(x) { return new Promise((resolve) => { setTimeout(() => { resolve(x) }, 2000); }); }
    async function f1() { const x = await resolveAfter25Seconds(10); console.log(x); }
    //f1()

    async function f2() {
        const thenable = { then(resolve) { resolve('resolved!') }, };
        console.log(await thenable);
    }
    //f2();

}()


!function () {
    async function f2() {
        const thenable = { then(_, reject) { reject(new Error('rejected!')) }, };
        await thenable;
    }
    //f2();
}()

!function () {
    async function f3() {
        const y = await 20;
        console.log(y)
        const obj = {};
        console.log((await obj) === obj);
    }
    //f3();
}()

!function () {
    async function f4() {
        try { const z = await Promise.reject(30); }
        catch (e) { console.error(e); }
    }
    //f4();
}()

!function () {
    function promisedFunction() { return new Promise((resolve, reject) => { resolve(() => { return 'resolved response' }); }) }

    async function f5() {
        const response = await promisedFunction().catch((err) => {
            console.error(err);
            return 'default response';
        })
        console.log(response())
    }
    //f5();
}()

!function () {
    async function getModule() {
        //const module = await fetch('../scripts/module.js');
        //console.log(module)
        const data = await fetch('../scripts/data/colors.json').then((response) => response.json())

        console.log(data)
    }
    //getModule()
}()

!function () {
    async function foo(name) {
        console.log(name, 'start');
        await console.log(name, 'middle');
        console.log(name, 'end');
    }
    //foo('first first')
    //foo('first second')
}()

!function () {
    function foo(name) {
        return new Promise((resolve) => {
            console.log(name, 'start');
            resolve(console.log(name, 'middle'));
        }).then(() => {
            console.log(name, 'end');
        });
    }
    //foo('second first');
    //foo('second second');
}()

!function () {
    function f6() {
        let i = 0;
        queueMicrotask(function test() {
            i++;
            console.log('microtask', i)
            if (i < 3) { queueMicrotask(test); }
        });

        (async () => {
            console.log('async function start');

            for (let i = 1; i < 3; i++) {
                await null;
                console.log('async function resume', i)
            }

            await null;
            console.log('async function end');
        })();

        queueMicrotask(() => { console.log('queueMicrotask() after calling async function'); })
        console.log('script sync part end');
    }
    //f6();
}()

!function () {
    async function lastAsyncTast() {
        await null;
        throw new Error('failed');
    }

    async function noAwait() {
        //const lastAsyncTast = () => {console.log('the last async task')}
        return lastAsyncTast()
    }

    async function withAwait() {
        return await lastAsyncTast();
    }
    //noAwait()
    //withAwait()
}()

!function () {
    const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let results = null;
    async function getPokemon(url) {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            doStuff(data);
        }
    }

    function doStuff(data) {
        results = data;
        console.log('first', results);
    }
    //getPokemon(url);
    //console.log('second', results)
}()