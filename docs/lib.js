"use strict";

function makeObject(name, id) {
    return {
        name: name,
        id: id
    };
}

function test() {
    let objects = generateArray();

    let mapper = (a) => new Promise((resolve) => {
        console.log("Scheduling " + a.name + a.id);
        setTimeout(
            () => {
                console.log("Resolving:" + a.name + a.id);
                resolve(a.name + a.id);
            },
            Math.round(Math.random() * 9000) + 1000
        )
    });

    queue(objects, mapper, 10);
}

function generateArray() {
    let n = 100;
    let arr = [];
    for (let i = 0; i < n; i++)
        arr.push(
            makeObject(
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзиклмнопрстуфхцчшщъыьэюя'.charAt(i),
                i
            )
        );
    console.log(arr);
    return arr;
}

function queue(objects, mapper, limit = 10) {
    const promises = objects.map(o => () => mapper(o));

    let current = 0;
    let ret = [];

    function next(index) {
        if (current > promises.length) {
            return;
        }

        return promises[index]().then(function (result) {
            ret[index] = result;
            return next(current++);
        });
    }

    let list = [];

    for (let i = 0; i < limit; i++) {
        list.push(next(current++));
    }

    return Promise.all(list).then(function () {
        return ret;
    });
}