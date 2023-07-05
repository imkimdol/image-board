const getServerLoc = () => {
    return localStorage.getItem("serverLoc");
}

// code from https://stackoverflow.com/a/5767357
const removeByValue = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

export { getServerLoc, removeByValue };