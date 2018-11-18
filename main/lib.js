"use strict";

let counter = 0;

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
            () => resolve(a.name + a.id),
            Math.round(Math.random() * 9000) + 1000
        )
    });

    queue(objects, mapper, 10);
}

function generateArray() {
    var n = 100;
    var arr = [];
    for (var i = 0; i < n; i++)
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
    Promise.map(objects, function(item) {
        return mapper(item).then(
            result => {
                console.log(++counter + " Completed: " + result);
            }
        );
    }, {concurrency: limit});

}