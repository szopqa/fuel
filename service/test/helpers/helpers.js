module.exports = (() => {

    const generateRandomStringOfLength = (length) => {
        const source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let randomString = '';
        for (let i=0; i<length; i++) {
            randomString += source[Math.floor(Math.random() * source.length)]
        }
        return randomString;
    };


    return {
        generateRandomStringOfLength
    }
})();
