import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import {innerHtml} from '../utils/wordpressHelpers';
import {phoneLink, emailLink} from '../utils/componentHelpers';
import Button from '../components/button';
import PageWrap from '../components/page';
import FlexibleContent from '../components/flexibleContent';
import ScrollTo from '../components/scrollTo';
import Seo from '../components/seo';
import CSS from '../css/modules/vendors.module.scss';

export default class VendorsTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.getVendorsInCategory = this.getVendorsInCategory.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    site: PropTypes.object
  };

  getVendorsInCategory(category) {
    const {vendors} = this.props.data;

    return vendors.edges
      .filter(i => {
        const {node: vendor} = i;

        return vendor.vendorcategory[0] === category;
      })
      .map(v => v.node);
  }

  getCategoryById(id) {
    const {categories} = this.props.data;
    const found = categories.edges.find(c => c.node.wordpress_id === id);

    if (!found) {
      return;
    }

    return found.node;
  }

  render() {
    const {
      currentPage,
      options: {options}
    } = this.props.data;

    const vendorCats = options.vendorCategories.map(c => c.category[0]);
    const vendorTitle = `Boston's Most Trusted Wedding Vendors`;

    return (
      <PageWrap contain>
        <Seo currentPage={currentPage} site={this.props.site} location={this.props.location} />
        <FlexibleContent page={currentPage} />
        <div className={CSS.categories}>
          <h3>{vendorTitle}</h3>
          <ul>
            {vendorCats.map(c => {
              const category = this.getCategoryById(c);

              return (
                <li key={c}>
                  <ScrollTo target={`#vendorSection${c}`}>
                    {/* eslint-disable-next-line react/no-danger */}
                    <p dangerouslySetInnerHTML={innerHtml(category.name)} />
                  </ScrollTo>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={CSS.vendors}>
          {vendorCats.map(categoryId => {
            const category = this.getCategoryById(categoryId);
            const vendors = this.getVendorsInCategory(categoryId);

            return (
              <div key={categoryId} id={`vendorSection${categoryId}`} className={CSS.vendorSection}>
                {/* eslint-disable-next-line react/no-danger */}
                <h3 dangerouslySetInnerHTML={innerHtml(category.name)} />
                <ul>
                  {vendors.map(vendor => {
                    return <li key={vendor.wordpress_id}>{this.renderVendor(vendor)}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </PageWrap>
    );
  }

  renderVendor(vendor) {
    const {title} = vendor;
    const {phone, email, link, venuePage} = vendor.acf;
    return (
      <div className={CSS.vendor}>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h5
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={innerHtml(title)}
            />
          </a>
        ) : (
          <h5
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={innerHtml(title)}
          />
        )}
        <ul className={CSS.vendorDetails}>
          {phone ? (
            <li>
              <span className="fa fa-phone" />
              <a href={phoneLink(phone)}>{phone}</a>
            </li>
          ) : null}
          {email ? (
            <li>
              <span className="fa fa-envelope" />
              <a href={emailLink(email)}>{email}</a>
            </li>
          ) : null}
          {link ? (
            <li>
              <span className="fa fa-keyboard" />
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ) : null}
          {venuePage && venuePage.url ? (
            <li style={{marginTop: 10}}>
              <Button to={venuePage.url} size="xs" style={{display: 'block', width: 105, boxShadow: 'none'}}>
                See Photos
              </Button>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

// import {Page, Vendor} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const pageQuery = graphql`
  query vendorsTemplateQuery($id: String!) {
    currentPage: wordpressPage(id: {eq: $id}) {
      ...Page
    }
    categories: allWordpressWpVendorcategory {
      edges {
        node {
          wordpress_id
          name
          count
        }
      }
    }
    vendors: allWordpressWpVendor {
      edges {
        node {
          ...Vendor
        }
      }
    }
    options: wordpressAcfOptions {
      options {
        vendorCategories {
          category
        }
      }
    }
  }
`;
