// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// import "react-toggle/style.css"
import "prism-theme-night-owl";

require("prismjs/plugins/command-line/prism-command-line.css")
// Inject CSS reset before typography plugin in development
export const onClientEntry = () => {
    if (process.env.BUILD_STAGE === 'develop') {
        // TODO: make the logic of css reset more clear.
        const head = document.head;
        const typographyEl = document.getElementById('typography.js');

        const CSSReset = require('!postcss-loader!./src/css/index.css');
        const styleNode = document.createElement('style')
        styleNode.id = 'css-reset';
        styleNode.innerHTML = CSSReset;

        const ReactToggleCSS = require('!postcss-loader!react-toggle/style.css');
        const ReactToggleStyleNode = document.createElement('style')
        ReactToggleStyleNode.id = 'react-toggle-css';
        ReactToggleStyleNode.innerHTML = ReactToggleCSS;

        if (typographyEl) {
            head.insertBefore(styleNode, typographyEl);
            head.insertBefore(ReactToggleStyleNode, styleNode);
        } else {
            if (head.firstChild) {
                head.insertBefore(styleNode, head.firstChild);
            } else {
                head.appendChild(styleNode);
            }
        }
    }
}