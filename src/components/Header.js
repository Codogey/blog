import React from 'react'
import { Link } from "gatsby"

const Header = ({ title }) => {

    return (
        <div className="w-full flex justify-between items-center py-8">
            <div>
                <Link
                    className="border-none text-textTitle font-medium text-2xl"
                    style={{
                        boxShadow: 'none',
                        textDecoration: 'none',
                    }}
                    to={'/'}
                >
                    {title}
                </Link>
            </div>
            <div className="font-normal text-xl">
                <span className="px-5 py-3 hover:bg-background-hover rounded-md mr-3">Articles</span>
                <span className="px-5 py-3 hover:bg-background-hover rounded-md mr-3">🌙</span>
                <span className="px-5 py-3 hover:bg-background-hover rounded-md mr-3">☀️</span>
            </div>
        </div>
    )
}

export default Header