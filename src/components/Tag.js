import React from 'react'

const Tag = ({tag}) => {
    return (
        <span key={tag} className='mr-2 p-1 border border-solid rounded-full text-xs'>{tag}</span>
    )
}

export default Tag;