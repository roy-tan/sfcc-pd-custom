import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '@salesforce/design-system-react/components/spinner';
import BreakpointToggle from './components/breakpoint-toggle';

import './spacing.scss';

const defaultBreakpoints = {
  active: 'lg',
  lg: {
    margin: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    },
    padding: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    }
  },
  md: {
    margin: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    },
    padding: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    }
  },
  sm: {
    margin: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    },
    padding: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    }
  },
  xs: {
    margin: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    },
    padding: {
      top: '',
      right: '',
      bottom: '',
      left: ''
    }
  }
};

const container = document.createElement('div');

const SpacingInput = props => {
  return <input className="spacing-input" type="number" placeholder="-" min="0" max="5" step="1" {...props} />;
};

class PDSpacing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      loading: true,
      breakpoints: defaultBreakpoints
    };

    subscribe('sfcc:ready', ({ value }) => {
      if (!value || !value.active) {
        value = defaultBreakpoints;
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

  handleChange = (value, type, position) => {
    const { breakpoints } = this.state;
    breakpoints[breakpoints.active][type][position] = value;

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { ...breakpoints }
    });

    this.setState({ breakpoints });
  };

  handleBreakpointChange = value => {
    const breakpoints = { ...this.state.breakpoints };
    breakpoints.active = value;

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
            <div className="slds-m-bottom_x-small">
              <BreakpointToggle activeBreakpoint={breakpoints.active} handleChange={this.handleBreakpointChange} />
            </div>
            <div className="spacing-widget">
              <div className="spacing-widget_margin">
                <div className="spacing-widget_top">
                  <span className="section-label">margin</span>
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'margin', 'top')}
                    value={breakpoints[breakpoints.active].margin.top}
                  />
                </div>
                <div className="spacing-widget_middle">
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'margin', 'left')}
                    value={breakpoints[breakpoints.active].margin.left}
                  />
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'margin', 'right')}
                    value={breakpoints[breakpoints.active].margin.right}
                  />
                </div>
                <div className="spacing-widget_bottom">
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'margin', 'bottom')}
                    value={breakpoints[breakpoints.active].margin.bottom}
                  />
                </div>
              </div>
              <div className="spacing-widget_padding">
                <div className="spacing-widget_top">
                  <span className="section-label">padding</span>
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'padding', 'top')}
                    value={breakpoints[breakpoints.active].padding.top}
                  />
                </div>
                <div className="spacing-widget_middle">
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'padding', 'left')}
                    value={breakpoints[breakpoints.active].padding.left}
                  />
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'padding', 'right')}
                    value={breakpoints[breakpoints.active].padding.right}
                  />
                </div>
                <div className="spacing-widget_bottom">
                  <SpacingInput
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target.value, 'padding', 'bottom')}
                    value={breakpoints[breakpoints.active].padding.bottom}
                  />
                </div>
              </div>
              <div className="spacing-widget_content">
                <span className="content-label">content</span>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
document.body.appendChild(container);

ReactDOM.render(<PDSpacing />, container);
