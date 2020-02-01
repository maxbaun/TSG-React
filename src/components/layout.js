import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, StaticQuery} from 'gatsby';
import 'swiper/css/swiper.css';


import '../css/plugins/normalize.css';
import '../css/plugins/icomoon/style.css';
import '../css/plugins/bootstrap-grid.css';
import '../css/plugins/fontawesome/css/all.css';
import '../css/plugins/simple-line-icons/css/simple-line-icons.css';
import '../css/utils/global.scss';

import Header from '../components/header';
import Footer from '../components/footer';

import {MenuItems} from '../utils/fragments'; // eslint-disable-line no-unused-vars
export const mainLayoutQuery = graphql`
	query mainLayoutQuery {
		mainMenu: wordpressWpApiMenusMenusItems(name: {eq: "Main Nav"}) {
			...MenuItems
		}
		footerMenu1: wordpressWpApiMenusMenusItems(name: {eq: "Footer 1"}) {
			...MenuItems
		}
		footerMenu2: wordpressWpApiMenusMenusItems(name: {eq: "Footer 2"}) {
			...MenuItems
		}
		site {
			id
			siteMeta: siteMetadata {
				title
				subtitle
				siteUrl
			}
		}
		options: wordpressAcfOptions {
			options {
				footerDescription
				phone: contactPhoneNumber
				email: contactEmail
				fax: contactFax
				address: contactAddress
				findUsMessage: contactFindUsMessage
				social: contactSocial {
					facebook
					pinterest
					instagram
					vimeo
					youtube
				}
			}
		}
	}
`;

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.func]),
	};

	render() {
		return (
      <StaticQuery 
        query={mainLayoutQuery}
        render={data => {
          const {mainMenu, site, options: {options}, footerMenu1, footerMenu2} = data;

          return (
            <div id="app">
              <Header menu={mainMenu}/>
              <Header sticky menu={mainMenu}/>
              <main className="main">
                {this.props.children}
              </main>
              <Footer
                menus={[
                  {
                    title: 'Resources',
                    items: footerMenu1 ? footerMenu1.items : []
                  },
                  {
                    title: 'Services',
                    items: footerMenu2 ? footerMenu2.items : []
                  }
                ]}
                phone={options.phone}
                email={options.email}
                social={options.social}
                description={options.footerDescription}
                copy="© TSG Weddings // The Sussman Group, LLC"
              />
            </div>
          )
        }}  
      />
		);
	}
}


