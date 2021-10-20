import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '@salesforce/design-system-react/components/spinner';
import BreakpointToggle from './components/breakpoint-toggle';

const directionOptions = [
  { id: 'row', label: 'Horizontal' },
  { id: 'row-reverse', label: 'Horizontal Reversed' },
  { id: 'column', label: 'Vertical' },
  { id: 'column-reverse', label: 'Vertical Reversed' }
];

const horizontalAlignmentOptions = [
  { id: 'start', label: 'Left' },
  { id: 'center', label: 'Center' },
  { id: 'end', label: 'Right' },
  { id: 'between', label: 'Equal space between columns' },
  { id: 'around', label: 'Equal space around columns' }
];

const verticalAlignmentOptions = [
  { id: 'start', label: 'Top' },
  { id: 'center', label: 'Center' },
  { id: 'end', label: 'Bottom' },
  { id: 'baseline', label: 'Baseline' },
  { id: 'stretch', label: 'Stretch' }
];

const defaultBrealpoints = {
  active: 'lg',
  lg: { direction: 'row', horizontal: 'start', vertical: 'start' },
  md: { direction: 'row', horizontal: 'start', vertical: 'start' },
  sm: { direction: 'row', horizontal: 'start', vertical: 'start' },
  xs: { direction: 'row', horizontal: 'start', vertical: 'start' }
};

const container = document.createElement('div');

class PDResponsiveColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      loading: true,
      breakpoints: defaultBrealpoints
    };

    subscribe('sfcc:ready', ({ value }) => {
      if (!value) {
        value = defaultBrealpoints;

        emit({
          type: 'sfcc:value',
          payload: { ...value }
        });
      }
      this.setState({ loading: false, breakpoints: value });
    });

    subscribe('sfcc:value', value => {});
    subscribe('sfcc:required', value => {});
    subscribe('sfcc:disabled', disabled => {
      this.setState({ disabled });
    });
  }

  handleChange = value => {
    const breakpoints = { ...this.state.breakpoints };
    breakpoints.active = value;

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { ...breakpoints }
    });

    this.setState({ breakpoints });
  };

  handleSelection = (key, value) => {
    const breakpoints = { ...this.state.breakpoints };
    breakpoints[this.state.breakpoints.active][key] = value;

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { ...breakpoints }
    });

    this.setState({ breakpoints });
  };

  render() {
    const { disabled, loading, breakpoints } = this.state;

    return (
      <>
        {loading ? (
          <Spinner size="small" variant="base" assistiveText={{ label: 'Small spinner' }} />
        ) : (
          <>
            <BreakpointToggle activeBreakpoint={breakpoints.active} handleChange={this.handleChange} />
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="direction">
                Direction
              </label>
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select
                    className="slds-select"
                    disabled={disabled}
                    id="direction"
                    onChange={e => this.handleSelection('direction', e.target.value)}
                    value={breakpoints[breakpoints.active].direction}
                  >
                    {directionOptions.map(({ id, label }) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="horizontal">
                Horizontal Alignment
              </label>
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select
                    className="slds-select"
                    disabled={disabled}
                    id="horizontal"
                    onChange={e => this.handleSelection('horizontal', e.target.value)}
                    value={breakpoints[breakpoints.active].horizontal}
                  >
                    {horizontalAlignmentOptions.map(({ id, label }) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="vertical">
                Vertical Alignment
              </label>
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select
                    className="slds-select"
                    disabled={disabled}
                    id="vertical"
                    onChange={e => this.handleSelection('vertical', e.target.value)}
                    value={breakpoints[breakpoints.active].vertical}
                  >
                    {verticalAlignmentOptions.map(({ id, label }) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
document.body.appendChild(container);

ReactDOM.render(<PDResponsiveColumn />, container);
