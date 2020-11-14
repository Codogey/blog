import React from "react"

// TODO: most of styles are same.
const H2 = props => <h2 style={{
    fontWeight: 400,
    lineHeight: 1.25,
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '2.25rem'
}} {...props} />

const H3 = props => <h3 style={{
    fontWeight: 400,
    lineHeight: 1.25,
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '1.875rem'
}} {...props} />

const H4 = props => <h4 style={{
    fontWeight: 400,
    lineHeight: 1.25,
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontSize: '1.5rem'
}} {...props} />


const P = props => <p style={{
    lineHeight: 1.625,
    fontWeight: 400,
    color:  'hsl(210,38%,95%)',
    marginBottom: '1.25rem'

}} {...props} />

const components = {
    h2: H2,
    h3: H3,
    h4: H4,
    p: P
}

export default components