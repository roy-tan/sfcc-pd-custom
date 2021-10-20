import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '@salesforce/design-system-react/components/spinner';
import Slider from '@salesforce/design-system-react/components/slider';

const container = document.createElement('div');

class PDEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      loading: true,
      value: 0,
      config: {}
    };

    subscribe('sfcc:ready', ({ config, value }) => {
      if (!value) {
        value = { value: 0 };
      }

      this.setState({
        loading: false,
        config,
        value: value.value
      });
    });

    subscribe('sfcc:value', value => {});
    subscribe('sfcc:required', value => {});
    subscribe('sfcc:disabled', disabled => {
      this.setState({ disabled });
    });
  }

  handleChange = value => {
    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { value }
    });

    this.setState({ value });
  };

  render() {
    const { disabled, loading, value, config } = this.state;

    return (
      <>
        {loading ? (
          <Spinner size="small" variant="base" assistiveText={{ label: 'Small spinner' }} />
        ) : (
          <Slider
            disabled={disabled}
            value={value}
            onChange={(e, { value }) => this.handleChange(parseInt(value))}
            {...config}
          />
        )}
      </>
    );
  }
}

document.body.appendChild(container);

ReactDOM.render(<PDEditor />, container);
