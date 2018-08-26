export function info(tag: any, payload?: any): void {
    if (__DEV__) {
        console.log(tag, payload);
        if (tag instanceof String) {
            if (!payload) {
                console.tron.log(tag);
            } else {
                console.tron.display({
                    name: tag,
                    important: true,
                    value: {
                        payload
                    }
                });
            }
        } else {
            console.tron.display({
                name: tag,
                important: true,
                value: {
                    tag
                }
            });
        }
    }
}

export function debug(tag: any, payload?: any): void {
    if (__DEV__) {
        console.log(tag, payload);
        if (!payload) {
            console.tron.log(tag);
        } else {
            console.tron.display({
                name: tag,
                important: false,
                value: {
                    payload
                }
            });
        }
    }
}
