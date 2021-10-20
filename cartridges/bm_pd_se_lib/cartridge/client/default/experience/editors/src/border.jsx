import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import deepmerge from 'deepmerge';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import Input from '@salesforce/design-system-react/components/input';
import ColorPicker from '@salesforce/design-system-react/components/color-picker';
import Spinner from '@salesforce/design-system-react/components/spinner';

import './border.scss';

const container = document.createElement('div');
const styles = ['none', 'solid', 'dashed', 'dotted'];
const border = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  ALL: 'all'
};

const defaultValues = {
  activeBorder: 'all',
  borders: {
    all: {
      style: 'none',
      width: 0,
      color: '#000000'
    },
    top: {
      style: 'none',
      width: 0,
      color: '#000000'
    },
    right: {
      style: 'none',
      width: 0,
      color: '#000000'
    },
    bottom: {
      style: 'none',
      width: 0,
      color: '#000000'
    },
    left: {
      style: 'none',
      width: 0,
      color: '#000000'
    }
  }
};

class PDBorderWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBorder: defaultValues.activeBorder,
      disabled: false,
      icons: null,
      loading: true,
      borders: defaultValues.borders
    };

    subscribe('sfcc:ready', ({ config, value }) => {
      this.setState({
        loading: false,
        icons: config.assets,
        activeBorder: value ? value.activeBorder : defaultValues.activeBorder,
        borders: value ? value.borders : defaultValues.borders
      });
    });

    subscribe('sfcc:value', value => {});
    subscribe('sfcc:required', value => {});
    subscribe('sfcc:disabled', disabled => {
      this.setState({ disabled });
    });
  }

  handleBorderSelection = activeBorder => {
    const { borders } = this.state;

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { activeBorder, borders }
    });

    this.setState({ activeBorder });
  };

  handleStyleSelection = style => {
    const { activeBorder, borders } = this.state;

    const updatedBorders = deepmerge(borders, {
      [activeBorder]: {
        style
      }
    });

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { activeBorder, borders: updatedBorders }
    });

    this.setState({ borders: updatedBorders });
  };

  handleWidthSelection = width => {
    const { activeBorder, borders } = this.state;

    const updatedBorders = deepmerge(borders, {
      [activeBorder]: {
        width
      }
    });

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { activeBorder, borders: updatedBorders }
    });

    this.setState({ borders: updatedBorders });
  };

  handleColorSelection = (color = 'transparent') => {
    const { activeBorder, borders } = this.state;

    const updatedBorders = deepmerge(borders, {
      [activeBorder]: {
        color
      }
    });

    emit({ type: 'sfcc:interacted' });

    emit({
      type: 'sfcc:value',
      payload: { activeBorder, borders: updatedBorders }
    });

    this.setState({ borders: updatedBorders });
  };

  render() {
    const { activeBorder, disabled, icons, loading, borders } = this.state;

    return (
      <>
        {loading ? (
          <Spinner size="small" variant="base" assistiveText={{ label: 'Small spinner' }} />
        ) : (
          <IconSettings iconPath={icons}>
            <div className="slds-grid">
              <div className="border-widget">
                <div className="border-widget_top">
                  <button
                    className={classNames('slds-button', 'slds-button_icon-container', 'slds-button_icon', {
                      'slds-button_icon-border': activeBorder === border.TOP
                    })}
                    disabled={disabled}
                    onClick={() => this.handleBorderSelection(border.TOP)}
                    title="Top Border"
                  >
                    <i className="fas fa-border-top fa-lg"></i>
                    <span className="slds-assistive-text">Top Border</span>
                  </button>
                </div>
                <div className="border-widget_middle">
                  <button
                    className={classNames('slds-button', 'slds-button_icon-container', 'slds-button_icon', {
                      'slds-button_icon-border': activeBorder === border.LEFT
                    })}
                    disabled={disabled}
                    onClick={() => this.handleBorderSelection(border.LEFT)}
                    title="Left Border"
                  >
                    <i className="fas fa-border-left fa-lg"></i>
                    <span className="slds-assistive-text">Left Border</span>
                  </button>
                  <button
                    className={classNames('slds-button', 'slds-button_icon-container', 'slds-button_icon', {
                      'slds-button_icon-border': activeBorder === border.ALL
                    })}
                    disabled={disabled}
                    onClick={() => this.handleBorderSelection(border.ALL)}
                    title="All Borders"
                  >
                    <i className="fas fa-border-outer fa-lg"></i>
                    <span className="slds-assistive-text">All Borders</span>
                  </button>
                  <button
                    className={classNames('slds-button', 'slds-button_icon-container', 'slds-button_icon', {
                      'slds-button_icon-border': activeBorder === border.RIGHT
                    })}
                    disabled={disabled}
                    onClick={() => this.handleBorderSelection(border.RIGHT)}
                    title="Right Border"
                  >
                    <i className="fas fa-border-right fa-lg"></i>
                    <span className="slds-assistive-text">Right Border</span>
                  </button>
                </div>
                <div className="border-widget_bottom">
                  <button
                    className={classNames('slds-button', 'slds-button_icon-container', 'slds-button_icon', {
                      'slds-button_icon-border': activeBorder === border.BOTTOM
                    })}
                    disabled={disabled}
                    onClick={() => this.handleBorderSelection(border.BOTTOM)}
                    title="Bottom Border"
                  >
                    <i className="fas fa-border-bottom fa-lg"></i>
                    <span className="slds-assistive-text">Bottom Border</span>
                  </button>
                </div>
              </div>
              <div className="slds-grid slds-grid_vertical slds-m-left_large">
                <div className="slds-form-element">
                  <label className="slds-form-element__label" htmlFor="style">
                    Style
                  </label>
                  <div className="slds-form-element__control">
                    <div className="slds-select_container">
                      <select
                        className="slds-select"
                        disabled={disabled}
                        id="style"
                        onChange={e => this.handleStyleSelection(e.target.value)}
                        value={borders[activeBorder].style}
                      >
                        {styles.map(style => (
                          <option key={style} value={style}>
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <Input
                  defaultValue={0}
                  disabled={disabled}
                  id="width"
                  label="Width"
                  fixedTextRight="px"
                  min={0}
                  onChange={(event, data) => this.handleWidthSelection(parseInt(data.value))}
                  step={1}
                  type="number"
                  variant="base"
                  value={borders[activeBorder].width}
                />
                <ColorPicker
                  disabled={disabled}
                  events={{
                    onChange: (e, { color }) => this.handleColorSelection(color)
                  }}
                  labels={{ label: 'Color' }}
                  menuPosition="relative"
                  value={borders[activeBorder].color}
                />
              </div>
            </div>
          </IconSettings>
        )}
      </>
    );
  }
}
document.body.appendChild(container);

ReactDOM.render(<PDBorderWidget />, container);
