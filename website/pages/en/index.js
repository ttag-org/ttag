/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('ttag.svg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('quickstart.html', language)}>Docs</Button>
            <Button href='https://jsfiddle.net/0atw0hgh/'>Demo</Button>
            <Button href='https://github.com/ttag-org/ttag'>Github</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align={props.align || 'center'} contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: 'Just tag your strings to make them translatable. Use simple ttag-cli tool for translations extraction',
        image: imgUrl('good.svg'),
        imageAlign: 'top',
        title: 'Usability',
      },
      {
        content: 'Can be easily integrated with almost any workflow as it uses babel-plugin for strings extraction',
        image: imgUrl('gear.svg'),
        imageAlign: 'top',
        title: 'Integration',
      },
      {
        content: 'Allows you to place translations in to the sources on a build step',
        image: imgUrl('rocket.svg'),
        imageAlign: 'top',
        title: 'Performance',
      }
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <h2>Based on GNU gettext</h2>
    <MarkdownBlock>
      Gettext is a simple localization format with the rich ecosystem.
      Ttag has support for plurals, contexts, translator comments and much more.
    </MarkdownBlock>
  </div>
);

const LearnHowContent = `
#### Simple use case:
\`\`\`js
import { t } from "ttag";

t\`This string will be translated\`;
\`\`\`

#### Plurals:
\`\`\`js
import { ngettext, msgid } from "ttag";

ngettext(msgid\`\${n} banana\`, \`\${n} bananas\`, n);
\`\`\`

#### Contexts:
\`\`\`js
import { c } from "ttag";

c('email').t\`this text will be in email context\`;
\`\`\`

#### JSX:
\`\`\`jsx
import { jt } from "ttag";

jt\`can use \$\{\<JSXElement\/\>\} inside the translations\`;
\`\`\`
`;

const LearnHow = props => (
  <Block background="light" align="left">
    {[
      {
        content: LearnHowContent,
        image: imgUrl('ttag-library.svg'),
        imageAlign: 'left',
        title: 'Just so simple to use',
      },
    ]}
  </Block>
);

const CliDescriptionContent = `
Command line utility that is used for translations extraction and different .po files manipulations.

#### Simple translations extraction to .po file:
\`\`\`sh
ttag extract index.js 
\`\`\`

#### Update .po file with new translations:
\`\`\`sh
ttag update out.po index.js 
\`\`\`

#### Create a new file with all strings replaced with translations from .po file:
\`\`\`sh
ttag replace out.po index.js index-translated.js
\`\`\`
`;

const CliDescription = props => (
  <Block id="try" align="left">
    {[
      {
        content: CliDescriptionContent,
        image: imgUrl('ttag-cli.svg'),
        imageAlign: 'left',
        title: 'ttag cli',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="dark">
    {[
      {
        content: 'Follow [this reference to get started quick](docs/quickstart.html)',
        image: imgUrl('ttag.svg'),
        imageAlign: 'right',
        title: 'Quickstart',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <CliDescription />
          <Description />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
