export const sortLabelsBy = ([x, s1], [y, s2]) => {
    let a = s1.toLowerCase(),
        b = s2.toLowerCase();

    if (a == b) return 0;
    else if (a < b) return -1;
    return 1;
};

export const adjustTags = tags => tags.map(t => {
    if (typeof t.className != 'undefined'){
        return {display: t.label};
    }
    return {_id: t.value, display: t.label};
})