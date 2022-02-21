
/**
 * Uses requestAnimationFrame, so it supposedly delays for a frame.
 * 
 * It seems to be equivalent to a ~14ms delay.
 */
const instaDelay = async () => {
    await (new Promise((resolve, reject) => {
        requestAnimationFrame(() => {
            resolve();
        });
    }));
};

export default instaDelay;