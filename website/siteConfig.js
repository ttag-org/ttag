/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */

const users = [
  {
    caption: 'prom.ua',
    image: '/img/prom-ua.png',
    infoLink: 'https://prom.ua',
    pinned: true,
  },
  {
    caption: 'bigl.ua',
    image: '/img/bigl.png',
    infoLink: 'https://bigl.ua',
    pinned: true,
  },
  {
    caption: 'zakupki.prom.ua',
    image: '/img/zakupki.svg',
    infoLink: 'https://zakupki.prom.ua',
    pinned: true,
  },
  {
    caption: 'kabanchik.ua',
    image: '/img/kabanchik.png',
    infoLink: 'https://kabanchik.ua/',
    pinned: true,
  },
  {
    caption: 'metabase.com',
    image: '/img/metabase.png',
    infoLink: 'https://metabase.com/',
    pinned: true,
  },
];

const siteConfig = {
  title: 'ttag' /* title for your website */,
  tagline: 'Modern javascript i18n localization tool based on es6 tags',
  url: 'https://your-docusaurus-test-site.com' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'ttag',
  organizationName: 'facebook',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'quickstart', label: 'Docs' },
    { blog: true, label: 'Blog' },
    { href: 'https://github.com/ttag-org/ttag/', label: 'Github' }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/short-icon.svg',
  footerIcon: 'img/short-icon.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#088c17',
    secondaryColor: '#034c0b',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' ttag',
  usePrism: ['jsx'],
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'atom-one-dark',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  repoUrl: 'https://github.com/ttag-org/ttag',
  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
