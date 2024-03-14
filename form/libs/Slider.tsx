import * as React from "react";

import { Slider as MDSlider } from "react-toolbox/lib/slider";

import Field from "./Field";

class Slider extends Field {
    constructor(props) {
        super(props);
    }

    applyChange = (e?) => {
        this.setState({ value: parseInt(e) });
        this.onChange({ target: { value: e } });

        if (!this.props.apply) {
            this.setStoreValue(parseInt(e));
        }
    };

    state = {
        value: Slider.getStoreValue(this.props)
    };

    static getDerivedStateFromProps(nextProps) {
        const { min } = nextProps;

        let value = Slider.getStoreValue(nextProps);
        if (value === null || value === "") {
            value = min ? min : 0;
        } else value = parseInt(value);
        return { value };
    }

    getInputValue() {
        return this.state.value;
    }
    render() {
        const { min, max, step, label } = this.props;

        return (
            <div>
                <label>
                    {label} - {this.state.value}
                </label>
                <MDSlider
                    ref="input"
                    value={this.state.value}
                    min={min ? min : 0}
                    max={max ? max : 10}
                    step={step ? step : 1}
                    onChange={this.applyChange.bind(this)}
                    disabled={this.props.editable === false}
                    pinned={this.props.config && this.props.config.pinned}
                    snaps={this.props.config && this.props.config.snaps}
                ></MDSlider>
            </div>
        );
    }
}

export default Slider;
