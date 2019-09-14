/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/VariablesPreviewOverlay.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html} from 'lit-element';

import {VariablesConsumerMixin} from '@advanced-rest-client/variables-consumer-mixin/variables-consumer-mixin.js';

import {ArcOverlayMixin} from '@advanced-rest-client/arc-overlay-mixin/arc-overlay-mixin.js';

import {varsSort, valueLabel} from './utils.js';

export {VariablesPreviewOverlay};

declare namespace UiElements {

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
   */
  class VariablesPreviewOverlay extends
    VariablesConsumerMixin(
    ArcOverlayMixin(
    Object)) {
    readonly hasAppVariables: any;
    readonly hasSysVariables: any;

    /**
     * List of application variables (stored in the data store + in memory)
     */
    appVariables: Array<object|null>|null;

    /**
     * List of system variables to display.
     */
    systemVariables: Array<object|null>|null;

    /**
     * When set it renders values masked under non-meaningful character
     */
    maskedValues: boolean|null|undefined;

    /**
     * Enables compatibility with Anypoint platform
     */
    compatibility: boolean|null|undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _variablesHandler(e: any): void;
    _fireEdit(): void;
    _toggleValues(): void;
    _headerTemplate(): any;
    _emptyInfoTemplate(): any;
    _appVarsTemplate(): any;
    _sysVarsTemplate(): any;
    render(): any;
  }
}