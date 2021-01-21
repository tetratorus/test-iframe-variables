window.addEventListener("message", function (ev) {
  const { method, data } = ev.data;
  if (method === "getDimensions") {
    const msg = {
      method: "setDimensions",
      data: {
        height: window.document.documentElement.offsetHeight,
        width: window.document.documentElement.offsetWidth,
      },
    };
    console.log("setting dimensions", msg);
    window.parent.postMessage(msg, ev.origin);
  } else if (method === "setCSS") {
    console.log('SET CSSING NOW')
    const css = data.css;
    window.setCopiedStyle(css)
    console.log('copying style')
  } else {
    console.log('WTF', ev, ev.data)
  }
});

window.shrinkwrap = function () {
  const dataElem = document.getElementById("data");
  console.log("SHRINKWRAP");
  dataElem.style.margin = 0;
  dataElem.style.padding = 0;
  dataElem.style.width = "fit-content";
  dataElem.style.height = "fit-content";
  dataElem.style.whiteSpace = "nowrap";
  dataElem.style["inline-size"] = '';
};

window.document.documentElement.style.height = "min-content";
window.document.documentElement.style.width = "min-content";

window.shrinkwrap();

window.setCopiedStyle = function(computedStyle) {
  const dataElem = document.getElementById('data')
  for (let key in computedStyle) {
    // console.log(key, 'KEY', computedStyle[key])
    if (/[0-9]+/.exec(key)) continue
    if (key === 'inline-size') continue
    if (/[hH]eight/.exec(key) || /[wW]idth/.exec(key)) continue
    if (key.indexOf('margin') !== -1 || key.indexOf('Margin') !== -1) continue
    dataElem.style[key] = computedStyle[key]
  }
  shrinkwrap()
}