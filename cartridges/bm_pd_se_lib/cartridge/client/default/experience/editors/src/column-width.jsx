import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '@salesforce/design-system-react/components/spinner';
import BreakpointToggle from './components/breakpoint-toggle';

const widthOptions = [
  { id: '1', label: '1/12' },
  { id: '2', label: '2/12' },
  { id: '3', label: '3/12' },
  { id: '4', label: '4/12' },
  { id: '5', label: '5/12' },
  { id: '6', label: '6/12' },
  { id: '7', label: '7/12' },
  { id: '8', label: '8/12' },
  { id: '9', label: '9/12' },
  { id: '10', label: '10/12' },
  { id: '11', label: '11/12' },
  { id: '12', label: '12/12' },
  { id: 'none', label: 'None' }
];

const defaultBrealpoints = {
  active: 'lg',
  lg: '12',
  md: '12',
  sm: '12',
  xs: '12'
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

  handleWidthSelection = value => {
    const breakpoints = { ...this.state.breakpoints };
    breakpoints[this.state.breakpoints.active] = value;

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
              <label className="slds-form-element__label" htmlFor="width">
                Width
              </label>
              <div className="slds-form-element__control">
                <div className="slds-select_container">
                  <select
                    className="slds-select"
                    disabled={disabled}
                    id="width"
                    onChange={e => this.handleWidthSelection(e.target.value)}
                    value={breakpoints[breakpoints.active]}
                  >
                    {widthOptions.map(({ id, label }) => (
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
