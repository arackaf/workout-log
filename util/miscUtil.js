export const sortLabelsBy = ([x, s1], [y, s2]) => {
    let a = s1.toLowerCase(),
        b = s2.toLowerCase();

    if (a == b) return 0;
    else if (a < b) return -1;
    return 1;
};