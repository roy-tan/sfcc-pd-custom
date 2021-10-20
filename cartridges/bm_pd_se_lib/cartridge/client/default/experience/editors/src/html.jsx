import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "@salesforce/design-system-react/components/spinner";
import AceEditor from "react-ace";
import brace from "brace";

import "brace/mode/html";
import "brace/ext/language_tools";
import "brace/theme/monokai";

const container = document.createElement("div");
document.body.className = "line-numbers";

class PDEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            loading: true,
            content: ""
        };

        subscribe("sfcc:ready", ({ value }) => {
            if (!value) {
                value = { content: "" };
            }

            this.setState({
                loading: false,
                content: value.content
            });
        });

        subscribe("sfcc:value", value => {});
        subscribe("sfcc:required", value => {});
        subscribe("sfcc:disabled", disabled => {
            this.setState({ disabled });
        });
    }

    handleChange = content => {
        emit({ type: "sfcc:interacted" });

        emit({
            type: "sfcc:value",
            payload: { content }
        });

        this.setState({ content });
    };

    render() {
        const { disabled, loading, content } = this.state;

        return (
            <>
                {loading ? (
                    <Spinner size="small" variant="base" assistiveText={{ label: "Small spinner" }} />
                ) : (
                    <AceEditor
                        mode="html"
                        theme="monokai"
                        onChange={this.handleChange}
                        fontSize={14}
                        value={content}
                        readOnly={disabled}
                        tabSize={2}
                        showPrintMargin={false}
                    />
                )}
            </>
        );
    }
}

document.body.appendChild(container);

ReactDOM.render(<PDEditor />, container);
