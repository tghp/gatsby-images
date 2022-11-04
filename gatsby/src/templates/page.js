import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const paragraphStyles = {
  marginBottom: 48,
};

const imageStyles = {
  width: '500px',
};

const Page = ({ data }) => {
  const {
    page: { title, featuredImage, tghpImage, tghpImageMultiple },
  } = data;

  console.log(data);

  return (
    <main style={pageStyles}>
      <p style={paragraphStyles}>Featured Image (should be 1)</p>
      <p style={paragraphStyles}>
        {featuredImage?.node && (
          <GatsbyImage
            image={featuredImage.node.gatsbyImage}
            alt=""
            style={imageStyles}
          />
        )}
      </p>
      <p style={paragraphStyles}>Single Image (should be 1)</p>
      <p style={paragraphStyles}>
        {tghpImage?.nodes &&
          tghpImage.nodes.map((image, i) => (
            <GatsbyImage
              image={image.gatsbyImage}
              alt=""
              key={i}
              style={imageStyles}
            />
          ))}
      </p>
      <p style={paragraphStyles}>Multiple Image (should be 3)</p>
      <p style={paragraphStyles}>
        {tghpImageMultiple?.nodes &&
          tghpImageMultiple.nodes.map((image, i) => (
            <GatsbyImage
              image={image.gatsbyImage}
              alt=""
              key={i}
              style={imageStyles}
            />
          ))}
      </p>
    </main>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    page: wpPage(slug: { eq: $slug }) {
      slug
      title

      featuredImage {
        node {
          gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
        }
      }

      tghpImage {
        nodes {
          gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
        }
      }

      tghpImageMultiple {
        nodes {
          gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
        }
      }
    }
  }
`;

export const Head = () => <title>A Page</title>;
