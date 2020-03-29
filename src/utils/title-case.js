const titleCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const displayFormat = (string) => {
    let newString = ""
    let words = string.replace("_", " ").split(/\s/)
    for (let i = 0; i < words.length; i++) {
        newString += titleCase(words[i]) + ( i === words.length - 1 ? "" : " ")
    }
    return newString
}

export { titleCase, displayFormat }