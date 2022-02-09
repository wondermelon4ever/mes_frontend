const createDiv = (id) => {
    var div = document.createElement('div');
    div.id = id;
    div.style.position = 'absolute';
    div.style.zIndex = "100";
    div.style.padding = "2px 2px 2px 2px";
    div.style.background = "#ffffff";
    div.style.opacity = 0.85;

    return div;
};

export {
    createDiv
}