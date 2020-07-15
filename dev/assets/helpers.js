import { symbol } from "prop-types";

function MakeCounter() {
    const initial = 0;
    let count = initial;
    this.inc = function () {
        return (count += 1);
    };
    this.dec = function () {
        return (count -= 1);
    };
    this.current = function () {
        return count;
    };
    this.changeTo = function (num) {
        return (count = num);
    };
    this.reset = function (num) {
        return (count = initial);
    }
}

export const counter = new MakeCounter();

let storage = {};

export const finder = (name, data, keyName, recursionName) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i][keyName] === name) {
            const storageData = data[i][recursionName];
            if (storageData) {
                storage[name] = { idx: i, rndName: name, parents: [], rndData: storageData }
            } else {
                storage[name] = { idx: i, rndName: name, parents: [], rndData: !!storageData }
            }
            return { element: data[i], detailInfo: storage[name] };
        };
    }
    for (const key in storage) {
        if (storage.hasOwnProperty(key)) {
            const element = storage[key];
            const arrInElement = element.rndData;
            for (let i = 0; i < arrInElement.length; i++) {
                if (arrInElement[i][keyName] === name) {
                    const storageData = arrInElement[i][recursionName];
                    if (storageData) {
                        storage[name] = { idx: i, rndName: name, parents: [...storage[key].parents, key], rndData: storageData };
                    } else {
                        storage[name] = { idx: i, rndName: name, parents: [...storage[key].parents, key], rndData: !!storageData };
                    }
                    // console.log('findByText', storage);
                    return { element: arrInElement[i], detailInfo: storage[name] };
                }
            }
        }
    }
    return null;
};
