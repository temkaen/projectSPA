class Utils {
    static parseRequestURL() {
        const url = location.hash.slice(1),
            request = {};

        [, request.id, request.resource] = url.split('/');


        return request;
    }
}

export default Utils;