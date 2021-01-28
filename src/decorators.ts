import ServiceContainer from "./ServiceContainer";

export const inject = (target: any, key: string) => {
    
    // property getter
    const getter = () => {
        return ServiceContainer.get(key.toLocaleLowerCase());
    };

    // // property setter
    // var setter = function (newVal) {
    //     console.log(`Set: ${key} => ${newVal}`);
    //     _val = newVal;
    // };

    // Delete property.
    // @ts-ignore
    if (delete this[key]) {

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: undefined,
            enumerable: true,
            configurable: true
        });
    }
}

