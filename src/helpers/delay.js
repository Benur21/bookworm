
/**
 * Delays for a given amount of ms.
 * @param {number} ms Amount of milliseconds to delay for.
 */
const delay = async ms => {
    await (new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    }));
};

export default delay;
