import React from 'react'
import { Link } from "gatsby"

const Header = ({ location, title }) => {
    const HomeHeader = (
        <h1 className='my-0'>
            <Link
                className='text-textTitle border-none'
                style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                }}
                to={'/'}
            >
                {title}
            </Link>
        </h1>
    );

    const PostPageHeader = (
        <h3
            style={{
                fontFamily: 'Montserrat, sans-serif',
                marginTop: 0,
                marginBottom: 0,
                height: 42, // because
                lineHeight: '2.625rem',
            }}
        >
            <Link
                className="border-none text-textTitle"
                style={{
                    boxShadow: 'none',
                    textDecoration: 'none',
                }}
                to={'/'}
            >
                {title}
            </Link>
        </h3>

    );

    const rootPath = `${__PATH_PREFIX__}/`
    {/* TODO: theme toggle */}
    if (location.pathname === rootPath) {
        return HomeHeader;
    } else {
        return PostPageHeader;
    }
}

export default Header