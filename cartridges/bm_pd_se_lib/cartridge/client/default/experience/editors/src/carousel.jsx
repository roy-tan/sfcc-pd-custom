import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import Spinner from '@salesforce/design-system-react/components/spinner';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import Input from '@salesforce/design-system-react/components/input';
import BreakpointToggle from './components/breakpoint-toggle';

const defaultBrealpoints = {
  active: 'lg',
  lg: {
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false
  },
  md: {
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false
  },
  sm: {
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false
  },
  xs: {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false
  }
};

const container = document.createElement('div');

class PDResponsiveColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      icons: null,
      loading: true,
      breakpoints: defaultBrealpoints
    };

    subscribe('sfcc:ready', ({ config, value }) => {
      if (!value) {
        value = defaultBrealpoints;

        emit({
          type: 'sfcc:value',
          payload: { ...value }
        });
      }
      this.setState({ icons: config.assets, loading: false, breakpoints: value });
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
    const { disabled, icons, loading, breakpoints } = this.state;

    return (
      <>
        {loading ? (
          <Spinner size="small" variant="base" assistiveText={{ label: 'Small spinner' }} />
        ) : (
          <IconSettings iconPath={icons}>
            <BreakpointToggle activeBreakpoint={breakpoints.active} handleChange={this.handleChange} />
            <Input
              id="slides-to-show"
              disabled={disabled}
              className="slds-m-vertical_small"
              label="# of Slides to Show"
              onChange={(event, data) => {
                this.handleSelection('slidesToShow', parseInt(data.value));
              }}
              value={breakpoints[breakpoints.active].slidesToShow}
              variant="counter"
              minValue={1}
              maxValue={5}
            />
            <Input
              id="slides-to-scroll"
              disabled={disabled}
              className="slds-m-bottom_small"
              label="# of Slides to Scroll"
              onChange={(event, data) => {
                this.handleSelection('slidesToScroll', parseInt(data.value));
              }}
              value={breakpoints[breakpoints.active].slidesToScroll}
              variant="counter"
              minValue={1}
              maxValue={5}
            />
            <Checkbox
              id="center-mode"
              disabled={disabled}
              checked={breakpoints[breakpoints.active].centerMode}
              className="slds-m-bottom_small"
              labels={{ label: 'Enable Center Mode' }}
              onChange={e => this.handleSelection('centerMode', e.target.checked)}
            />
            <Checkbox
              id="infinite"
              disabled={disabled}
              className="slds-m-bottom_small"
              checked={breakpoints[breakpoints.active].infinite}
              labels={{ label: 'Enable Infinite Scroll' }}
              onChange={e => this.handleSelection('infinite', e.target.checked)}
            />
            <Checkbox
              id="autoplay"
              disabled={disabled}
              className="slds-m-bottom_small"
              checked={breakpoints[breakpoints.active].autoplay}
              labels={{ label: 'Enable Autoplay' }}
              onChange={e => this.handleSelection('autoplay', e.target.checked)}
            />
            <Input
              id="autoplay-speed"
              disabled={disabled}
              className="slds-m-bottom_small"
              label="Autoplay Speed"
              onChange={(event, data) => {
                this.handleSelection('autoplaySpeed', parseInt(data.value) * 1000);
              }}
              value={breakpoints[breakpoints.active].autoplaySpeed / 1000}
              variant="counter"
              minValue={1}
            />
            <Checkbox
              id="arrows"
              disabled={disabled}
              className="slds-m-bottom_small"
              checked={breakpoints[breakpoints.active].arrows}
              labels={{ label: 'Display Arrows' }}
              onChange={e => this.handleSelection('arrows', e.target.checked)}
            />
            <Checkbox
              id="dots"
              disabled={disabled}
              className="slds-m-bottom_small"
              checked={breakpoints[breakpoints.active].dots}
              labels={{ label: 'Enable Pagination' }}
              onChange={e => this.handleSelection('dots', e.target.checked)}
            />
          </IconSettings>
        )}
      </>
    );
  }
}
document.body.appendChild(container);

ReactDOM.render(<PDResponsiveColumn />, container);
