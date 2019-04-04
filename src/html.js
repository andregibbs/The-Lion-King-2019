import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          {process.env.NODE_ENV == 'production' &&
            <script
              dangerouslySetInnerHTML={{
                __html: `
                (function (a, b, c, d) {
                  var prodDomain = 'thelionking.co.uk'; // The URL of the production website
                  var profile = 'emea'; // the name of the Tealium profile
                  a = (document.domain == prodDomain ? '//tags.disneyinternational.com/tealium/' + profile + '/prod/utag.js' : '//tags.disneyinternational.com/tealium/' + profile + '/dev/utag.js');
                  b = document; c = 'script'; d = b.createElement(c); d.src = a; d.type = 'text/java' + c; d.async = true;
                  a = b.getElementsByTagName(c)[0]; a.parentNode.insertBefore(d, a);
                })();
              `,
              }}
            />
          }
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <div id="goc-footer"></div>
          {/* <script src="https://snavbar.disneyinternational.com/emea/inc-chrome.js"></script> */}
          <script src="https://snavbar.disneyinternational.com/emea/inc-chrome-cookie.js?preference_manager=0"></script>
          <link href="https://fast.fonts.net/t/1.css?apiType=css&amp;projectid=492ff5f6-ecf8-48e8-b54e-5bfa6c5c1874" rel="stylesheet" />
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
