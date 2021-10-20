import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from '@salesforce/design-system-react/components/color-picker';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import Spinner from '@salesforce/design-system-react/components/spinner';

const container = document.createElement('div');

const swatchColors = [
  '#e3abec',
  '#c2dbf7',
  '#9fd6ff',
  '#9de7da',
  '#9df0c0',
  '#fff099',
  '#fed49a',
  '#d073e0',
  '#86baf3',
  '#5ebbff',
  '#44d8be',
  '#3be282',
  '#ffe654',
  '#ffb758',
  '#bd35bd',
  '#5779c1',
  '#5679c0',
  '#00aea9',
  '#3cba4c',
  '#f5bc25',
  '#f99221',
  '#580d8c',
  '#001970',
  '#0a2399',
  '#0b7477',
  '#0b6b50',
  '#b67e11',
  '#b85d0d',
  '#ffffff',
  '#000000',
  ''
];

class PDColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      icons: null,
      loading: true,
      value: ''
    };

    subscribe('sfcc:ready', ({ config, value }) => {
      if (!value) {
        value = { color: '' };
      }
      this.setState({ loading: false, icons: config.assets, value: value.color });
    });

    subscribe('sfcc:value', value => {});
    subscribe('sfcc:required', value => {});
    subscribe('sfcc:disabled', disabled => {
      this.setState({ disabled });
    });
  }

  handleChange = (color = 'transparent') => {
    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { color }
    });

    this.setState({ value: color });
  };

  render() {
    const { disabled, icons, loading, value } = this.state;

    return (
      <div>
        {loading ? (
          <Spinner size="small" variant="base" assistiveText={{ label: 'Small spinner' }} />
        ) : (
          <IconSettings iconPath={icons}>
            <ColorPicker
              disabled={disabled}
              events={{
                onChange: (e, { color }) => {
                  this.handleChange(color);
                }
              }}
              swatchColors={swatchColors}
              menuPosition="relative"
              value={value}
            />
          </IconSettings>
        )}
      </div>
    );
  }
}
document.body.appendChild(container);

ReactDOM.render(<PDColorPicker />, container);
