import asciiJSON from 'ascii-json';

class Universal {

  /**
    * Escapes the json object to make it suitable for being injected into the markup
    * @param {Object} - A JSON object with a feature toggles setup
    * @returns {String} - A stringified json
   **/
  static escapeJson(toggles) {
    return asciiJSON.stringify(toggles).replace(/<\//g, '<\\/');
  }

  /**
    * Injects the json object with the selected feature toggles into the
    * markup, following the same approach as React Transmit:
    * https://github.com/RickWong/react-transmit/blob/master/src/lib/injectIntoMarkup.js
    *
    * @param {String} markup - The page's markup, rendered to string
    * @param {Object} toggles - The feature toggles object
    * @param {String} name - The name you wish to give to the global variable to will contain the
    * stringified feature toggles JSON object
    * @returns {String} - The original markup with a <script> tag containing the
    * feature toggles setup assigned to a global (window.[name]) variable
    **/
  static injectIntoMarkup({markup, toggles, name} = {}) {
    const injected = `<script>window.${name}=${Universal.escapeJson(toggles)}</script>`;

    return (markup.indexOf('</body>') > -1) ? markup.replace('</body>', injected + '$&')
                                            : markup + injected;
  }
}

export { Universal };
