export function ValidateKey<T>(privateKey: string, failsValidation?: (val: T) => boolean) {
    return function(target: any, key: string,  {get, configurable, enumerable}: PropertyDescriptor) {
        return {
            get,
            set(value: T) {
                if(!value) 
                    throw `Invalid argument '${value}' passed to: ${key}.`;

                if(!!failsValidation && failsValidation(value))
                    throw `Invalid argument: '${value}' failed validation.`;

                target[privateKey] = value;
            },
            configurable,
            enumerable
        };
    };
}
