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

const Page = ({ data, pageContext }) => {
  const {
    page: {
      featuredImage,
      tghpImage,
      tghpImageMultiple,
      tghpReallyLongContent,
    },
    terms,
  } = data;

  console.log(terms);

  const { testIteration } = pageContext;

  return (
    <main style={pageStyles}>
      <h1 data-test-iteration={testIteration}>
        Test Iteration: {testIteration}
      </h1>
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
      {tghpImage?.nodes &&
        tghpImage.nodes.map((image, i) => (
          <p style={paragraphStyles} key={i}>
            <GatsbyImage image={image.gatsbyImage} alt="" style={imageStyles} />
          </p>
        ))}
      <p style={paragraphStyles}>Multiple Image (should be 3)</p>
      {tghpImageMultiple?.nodes &&
        tghpImageMultiple.nodes.map((image, i) => (
          <p style={paragraphStyles} key={i}>
            <GatsbyImage image={image.gatsbyImage} alt="" style={imageStyles} />
          </p>
        ))}
      <p style={paragraphStyles}>Term Images (should be 3)</p>
      {terms?.nodes &&
        terms.nodes.map((term, i) =>
          term?.tghpFeaturedImage?.nodes ? (
            <p style={paragraphStyles} key={i}>
              <GatsbyImage
                image={term.tghpFeaturedImage.nodes[0].gatsbyImage}
                alt=""
                style={imageStyles}
              />
            </p>
          ) : null,
        )}
      {tghpReallyLongContent && (
        <div dangerouslySetInnerHTML={{ __html: tghpReallyLongContent }} />
      )}
    </main>
  );
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    page: wpPage(slug: { eq: $slug }) {
      slug
      title
      tghpReallyLongContent

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

    terms: allWpTghpCustomtax {
      nodes {
        name
        tghpFeaturedImage {
          nodes {
            gatsbyImage(layout: FULL_WIDTH, width: 600, placeholder: NONE)
          }
        }
      }
    }
  }
`;

export const Head = () => <title>A Page</title>;
