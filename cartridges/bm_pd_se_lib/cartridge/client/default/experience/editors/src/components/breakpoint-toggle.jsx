import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faTabletAlt, faDesktop } from '@fortawesome/pro-solid-svg-icons';

const BreakpointToggle = ({ activeBreakpoint, handleChange }) => (
  <fieldset className="slds-form-element">
    <legend className="slds-form-element__label">Breakpoints</legend>
    <div className="slds-form-element__control">
      <div className="slds-radio_button-group">
        <span className="slds-button slds-radio_button">
          <input
            type="radio"
            name="breakpoint"
            id="lg"
            value="lg"
            onChange={e => handleChange(e.target.value)}
            checked={activeBreakpoint === 'lg'}
          />
          <label className="slds-radio_button__label" htmlFor="lg">
            <span className="slds-radio_faux">
              <FontAwesomeIcon icon={faDesktop} />
            </span>
          </label>
        </span>
        <span className="slds-button slds-radio_button">
          <input
            type="radio"
            name="breakpoint"
            id="md"
            value="md"
            onChange={e => handleChange(e.target.value)}
            checked={activeBreakpoint === 'md'}
          />
          <label className="slds-radio_button__label" htmlFor="md">
            <span className="slds-radio_faux">
              <FontAwesomeIcon icon={faTabletAlt} />
            </span>
          </label>
        </span>
        <span className="slds-button slds-radio_button">
          <input
            type="radio"
            name="breakpoint"
            id="sm"
            value="sm"
            onChange={e => handleChange(e.target.value)}
            checked={activeBreakpoint === 'sm'}
          />
          <label className="slds-radio_button__label" htmlFor="sm">
            <span className="slds-radio_faux">
              <FontAwesomeIcon icon={faMobileAlt} rotation={90} />
            </span>
          </label>
        </span>
        <span className="slds-button slds-radio_button">
          <input
            type="radio"
            name="breakpoint"
            id="xs"
            value="xs"
            onChange={e => handleChange(e.target.value)}
            checked={activeBreakpoint === 'xs'}
          />
          <label className="slds-radio_button__label" htmlFor="xs">
            <span className="slds-radio_faux">
              <FontAwesomeIcon icon={faMobileAlt} />
            </span>
          </label>
        </span>
      </div>
    </div>
  </fieldset>
);

BreakpointToggle.propTypes = {
  activeBreakpoint: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default BreakpointToggle;
