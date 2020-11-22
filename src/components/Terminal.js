import React, {useEffect } from 'react'
import '../css/termynal.css'



const Terminal = () => {
    // Comment Box
  const terminalBox = React.createRef()

  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.async = true
    scriptEl.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/316871/termynal.min.js'
    // scriptEl.setAttribute('repo', 'LiXuanqi/blog')
    // // Use directoryName as post identifier, so different language version will use same github issue as comment source.
    scriptEl.setAttribute('data-termynal-container', '#termynal')
    // scriptEl.setAttribute('label', 'blog-comment')
    // scriptEl.setAttribute('id', 'utterances')
    // scriptEl.setAttribute('theme', 'github-dark')
    // scriptEl.setAttribute('crossorigin', 'anonymous')
    if (terminalBox && terminalBox.current) {
        terminalBox.current.appendChild(scriptEl)
    } else {
      console.log(`Error adding utterances comments on: ${terminalBox}`)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={terminalBox} id="termynal" data-termynal>
            <span data-ty="input">me = new Developer('1_x7')</span>
            {/* <span data-ty="progress"></span> */}
            <span data-ty="input">me.getSkills()</span>
            <span data-ty data-ty-prompt=">>>">Python, Javascript</span>
            <span data-ty="input">me.getSkills()</span>
            <span data-ty data-ty-prompt=">>>">Python, Javascript</span>
            <span data-ty="input">me.getSkills()</span>
            <span data-ty data-ty-prompt=">>>">Python, Javascript</span>
            <span data-ty="input">me.getSkills()</span>
            <span data-ty data-ty-prompt=">>>">Python, Javascript</span>
        </div>
    )

}

export default Terminal