/**
 * 
 * @param {*} frac [0..1] percentage of completion on the progress bar
 * @param {*} delay number of miliseconds for the returned Promise to be resolved
 * @returns new Promise that resolves after {delay} miliseconds to simulate a sense of actual loading
 */
export const updateLoadingProgressBar = async (frac, delay=200) => {
    return new Promise(resolve => {
        const progress = document.getElementById("progress")
        // 200px is the width of the progress bar defined in index.html
        progress.style.width = `${frac * 200}px`
        setTimeout(resolve, delay)
    })
}