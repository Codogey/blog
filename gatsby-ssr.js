// gatsby-ssr.js
import React from 'react'
// import { wrapRootElement as wrap } from './wrap-root-element'
import CSSReset from '!postcss-loader!./src/css/index.css'

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  if (process.env.BUILD_STAGE === 'build-html') {
    replaceHeadComponents(
      [
        <style
          key="custom-styles"
          id="css-reset-ssr"
          dangerouslySetInnerHTML={{
            __html: CSSReset,
          }}
        />,
      ].concat(getHeadComponents())
    )
  }
}

// export const wrapRootElement = wrap