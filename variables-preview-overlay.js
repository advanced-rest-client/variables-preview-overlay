/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import {IronOverlayBehavior} from '../../@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import {VariablesConsumerMixin} from '../../@advanced-rest-client/variables-consumer-mixin/variables-consumer-mixin.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/paper-button/paper-button.js';
/**
 * An element to display quick preview of variables values for current
 * environment.
 *
 * The element works with
 * [variables-manager](https://github.com/advanced-rest-client/variables-manager/)
 * that provides the events API to get information about environemnts and variables.
 * It also requires `advanced-rest-client/arc-models/variables-model` as an
 * access to the data store.
 *
 * The element renders an overlay controlled by `Polymer.IronOverlayBehavior`
 * with list of variables associated with current environment.
 *
 * It listens for `variables-list-changed` custom event dispatched by the
 * `variables-manager`.
 * If the event cannot be send by the application then set `variables` and
 * `environemnt` properties to the corresponding values.
 *
 * ### Example
 *
 * ```html
 * <variables-preview-overlay id="overlay"></variables-preview-overlay>
 * ```
 * ```javascript
 * document.getElementById('overlay').positionTarget = target; // HTML element
 * ```
 *
 * ### Styling
 *
 * `<variables-preview-overlay>` provides the following custom properties and
 * mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--variables-preview-overlay` | Mixin applied to the element | `{}`
 * `--variables-preview-overlay-background-color` | Background color of the oberlay | `inherit`
 * `--variables-preview-overlay-dialog-color` | Overlay foreground color | `--primary-text-color`
 * `--variables-preview-overlay-title` | Mixin applied to the title element | `{}`
 * `--variables-preview-overlay-var-name-color` | Color of a variable name label | `rgba(0, 0, 0, .54)`
 * `--variables-preview-overlay-var-value-color` | Color of a variable value label | `rgba(0, 0, 0, .87)`
 *
 * @memberof UiElements
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @polymerBehavior Polymer.IronOverlayBehavior
 * @appliesMixin VariablesConsumerMixin
 */
class VariablesPreviewOverlay extends
  VariablesConsumerMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      background-color: var(--variables-preview-overlay-background-color, inherit);
      color: var(--variables-preview-overlay-color, var(--primary-text-color));

      font-size: var(--arc-font-body1-font-size);
      font-weight: var(--arc-font-body1-font-weight);
      line-height: var(--arc-font-body1-line-height);

      box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                  0  6px 30px 5px rgba(0, 0, 0, 0.12),
                  0  8px 10px -5px rgba(0, 0, 0, 0.4);
    }

    header {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
    }

    h2 {
      position: relative;
      margin-top: 20px;
      padding: 0 24px;

      -ms-flex: 1 1 0.000000001px;
      -webkit-flex: 1;
      flex: 1;
      -webkit-flex-basis: 0.000000001px;
      flex-basis: 0.000000001px;

      white-space: var(--arc-font-nowrap-white-space);
      overflow: var(--arc-font-nowrap-overflow);
      text-overflow: var(--arc-font-nowrap-text-overflow);
      font-size: var(--arc-font-title-font-size);
      font-weight: var(--arc-font-title-font-weight);
      line-height: var(--arc-font-title-line-height);
    }

    .container {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: column;
      -webkit-flex-direction: column;
      flex-direction: column;
      max-height: inherit;
    }

    .content {
      overflow: auto;
      -ms-flex: 1 1 0.000000001px;
      -webkit-flex: 1;
      flex: 1;
      -webkit-flex-basis: 0.000000001px;
      flex-basis: 0.000000001px;
      max-height: inherit;
      height: 100vh;
      flex-basis: initial;
      -webkit-flex-basis: initial;
    }

    .buttons {
      position: relative;
      padding: 8px 8px 8px 24px;
      margin: 0;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
      -ms-flex-pack: end;
      -webkit-justify-content: flex-end;
      justify-content: flex-end;
    }

    .buttons .main-action {
      color: var(--variables-preview-overlay-button-color, var(--primary-color));
    }

    .list {
      list-style: none;
    }

    .list,
    .no-vars {
      margin-top: 24px;
      margin-bottom: 24px;
      padding: 0 24px;
      min-width: 300px;
    }

    .list li {
      display: flex;
      word-break: normal;
      user-select: text;
      cursor: text;
    }

    .var-name {
      color: var(--variables-preview-overlay-var-name-color, rgba(0, 0, 0, .54));
      margin-right: 16px;
      min-width: 80px;
    }

    .var-value {
      color: var(--variables-preview-overlay-var-value-color, rgba(0, 0, 0, .87));
      display: inline-block;
      word-break: break-all;
      flex: 1;
    }

    li span {
      text-decoration: line-through;
    }

    li[data-enabled] span {
      text-decoration: none;
    }

    paper-button {
      cursor: pointer;
    }
    </style>
    <div class="container">
      <div class="content">
        <header>
          <h2>Variables for [[environment]]</h2>
          <paper-button on-click="_fireEdit">Edit variables</paper-button>
        </header>
        <template is="dom-if" if="[[!hasAppVariables]]">
          <p class="no-vars">There's no variables for environment: [[environment]]</p>
        </template>
        <template is="dom-if" if="[[hasAppVariables]]">
          <ul class="list app-vars" aria-role="list">
            <template is="dom-repeat" items="[[appVariables]]" sort="_varSort" observe="enabled" id="repeater">
              <li data-enabled\$="[[item.enabled]]" aria-role="listitem">
                <span class="var-name">[[item.variable]]</span>
                <span class="var-value">[[_computeValueLabel(item.value, maskedValues)]]</span>
              </li>
            </template>
          </ul>
        </template>
        <template is="dom-if" if="[[hasSysVariables]]">
          <h2>System variables</h2>
          <ul class="list sys-vars" aria-role="list">
            <template is="dom-repeat" items="[[systemVariables]]">
              <li aria-role="listitem" data-enabled="">
                <span class="var-name">[[item.variable]]</span>
                <span class="var-value">[[_computeValueLabel(item.value, maskedValues)]]</span>
              </li>
            </template>
          </ul>
        </template>
      </div>
      <div class="buttons">
        <paper-button on-click="_toggleValues">Toggle visibility</paper-button>
        <paper-button on-click="_fireEdit">Edit variables</paper-button>
      </div>
    </div>`;
  }

  static get properties() {
    return {
      /**
       * List of application variables (stored in the data store + in memory)
       * @type {Array<Object>}
       */
      appVariables: Array,
      /**
       * List of system variables to display.
       * @type {Array<Object>}
       */
      systemVariables: Array,
      /**
       * Computed value, true if the element has application variables
       */
      hasAppVariables: {
        type: Boolean,
        computed: '_computeHasVars(appVariables.*)',
        value: false
      },
      /**
       * Computed value, true if the element has system variables
       */
      hasSysVariables: {
        type: Boolean,
        computed: '_computeHasVars(systemVariables.*)',
        value: false
      },
      /**
       * When set it renders values masked under non-meaningful character
       */
      maskedValues: Boolean
    };
  }

  static get observers() {
    return [
      '_computeVarsData(variables.*)'
    ];
  }

  _computeVarsData(record) {
    const appVars = [];
    const sysVars = [];
    const vars = record && record.base;
    if (vars && vars.length) {
      for (let i = vars.length - 1; i >= 0; i--) {
        const item = Object.assign({}, vars[i]);
        if (vars[i].sysVar) {
          sysVars[sysVars.length] = item;
        } else {
          appVars[appVars.length] = item;
        }
      }
    }
    this.systemVariables = sysVars.length ? sysVars : undefined;
    this.appVariables = appVars.length ? appVars : undefined;
  }

  /**
   * Sort function for dom-repeat for vars
   * @param {Object} a
   * @param {Object} b
   * @return {Number}
   */
  _varSort(a, b) {
    if (a.enabled === b.enabled) {
      return 0;
    }
    if (a.enabled < b.enabled) {
      return 1;
    }
    return -1;
  }
  /**
   * Computes value for `has*Variables` properties.
   * @param {Object} record Polymer's change record
   * @return {Boolean}
   */
  _computeHasVars(record) {
    return !!(record && record.base && record.base.length);
  }
  /**
   * Creates a list of application variables only (application + in mem vars)
   * @param {Object} record Polymer's change record
   * @return {Array<Object>} A list with filtered out system variables
   */
  _computeAppVars(record) {
    const vars = record && record.base;
    if (!vars || !vars.length) {
      return;
    }
    const result = [];
    for (let i = vars.length - 1; i >= 0; i--) {
      if (vars[i].sysVar) {
        continue;
      }
      result[result.length] = Object.assign({}, vars[i]);
    }
    return result;
  }
  /**
   * Creates a list of system variables.
   * @param {Object} record Polymer's change record
   * @return {Array<Object>} A list with system variables only.
   */
  _computeSysVars(record) {
    const vars = record && record.base;
    if (!vars || !vars.length) {
      return;
    }
    const result = [];
    for (let i = vars.length - 1; i >= 0; i--) {
      if (!vars[i].sysVar) {
        continue;
      }
      result[result.length] = Object.assign({}, vars[i]);
    }
    return result;
  }

  _fireEdit() {
    this.dispatchEvent(new CustomEvent('open-variables-editor', {
      bubbles: true,
      composed: true
    }));
    this.opened = false;
  }

  _computeValueLabel(value, maskedValues) {
    if (!value) {
      return;
    }
    if (maskedValues) {
      const len = value.length;
      const arr = new Array(len);
      return arr.fill('•', 0, len).join('');
    }
    return value;
  }

  _toggleValues() {
    this.maskedValues = !this.maskedValues;
  }
  /**
   * Fired when the user requested to edit variables for selected environemnt.
   *
   * @event open-variables-editor
   */
}
window.customElements.define('variables-preview-overlay', VariablesPreviewOverlay);
