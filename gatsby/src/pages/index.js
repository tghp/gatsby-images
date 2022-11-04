import * as React from "react"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const paragraphStyles = {
  marginBottom: 48,
}
const IndexPage = (
  props
) => {
  console.log(props);

  return (
    <main style={pageStyles}>
      <p style={paragraphStyles}>

      </p>
    </main>
  )
}

export default IndexPage

export const query = graphql`
  query {
    wpPage(slug: { eq: 'home' }) {
      featuredImage {
        node {
          gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
        }
      }
      
      tghpSingleImage {
        node {
          gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
        }
      }
      
      tghpMultipleImages {
        nodes {
          gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
        }
      }
    }
  }
`;

export const Head = () => <title>Home Page</title>
