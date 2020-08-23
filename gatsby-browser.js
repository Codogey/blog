// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"
// import "./src/css/index.css"

// Inject CSS reset before typography plugin in development
export const onClientEntry = () => {
    if (process.env.BUILD_STAGE === 'develop') {
        const head = document.head;
        const typographyEl = document.getElementById('typography.js');

        const CSSReset = require('!postcss-loader!./src/css/index.css');
        const styleNode = document.createElement('style')
        styleNode.id = 'css-reset';
        styleNode.innerHTML = CSSReset;
        
        if (typographyEl) {
            head.insertBefore(styleNode, typographyEl);
        } else {
            if (head.firstChild) {
                head.insertBefore(styleNode, head.firstChild);
            } else {
                head.appendChild(styleNode);
            }
        }
    }
}