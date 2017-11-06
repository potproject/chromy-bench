const statistical = {
    sum(arr) {
        return arr.reduce((prev, current) =>
            (prev + current)
        );
    },
    min(arr) {
        return Math.min(...arr);
    },
    avg(arr) {
        return parseInt(this.sum(arr) / arr.length);
    },
    max(arr) {
        return Math.max(...arr);
    },
    stddev(arr) {
        return parseInt(Math.sqrt(this.avg(arr)));
    }
};

export default statistical;