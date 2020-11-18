module.exports = {
    now: Date.now(),
    random() {
        const segment = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return `${segment()}-${segment()}-${segment()}`;
    },
    toArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        return [value];
    }
  };
