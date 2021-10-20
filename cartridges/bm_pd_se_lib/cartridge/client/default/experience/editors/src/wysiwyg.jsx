import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "@salesforce/design-system-react/components/spinner";
import { Editor } from "@tinymce/tinymce-react";

const container = document.createElement("div");

class PDEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config: {
                branding: false,
                height: 400,
                menubar: false,
                statusbar: false,
                plugins: ["lists", "directionality", "hr", "code"],
                toolbar:
                    "styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist | hr | ltr rtl",
                style_formats_merge: true,
                style_formats: [
                    { title: 'Vertical Align', 
                        items: [                        
                        { title: 'Top', inline: 'span', styles: {top: '20%'}},
                        { title: 'Middle', inline: 'span', styles: {top: '50%'}},
                        { title: 'Bottom', inline: 'span', styles: {top: '80%'}}
                        ]
                    },
                    {
                        title: "Displays",
                        items: [
                            { title: "Display 1", block: "div", classes: "display-1" },
                            { title: "Display 2", block: "div", classes: "display-2" },
                            { title: "Display 3", block: "div", classes: "display-3" },
                            { title: "Display 4", block: "div", classes: "display-4" }
                        ]
                    }
                ]
            },
            disabled: false,
            loading: true,
            content: ""
        };

        subscribe("sfcc:ready", ({ config, value }) => {
            if (!value) {
                value = { content: "" };
            }
            this.setState({
                config: { ...this.state.config, ...config },
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

    handleChange = (content, editor) => {
        emit({ type: "sfcc:interacted" });

        emit({
            type: "sfcc:value",
            payload: { content }
        });

        this.setState({ content });
    };

    render() {
        const { config, disabled, loading, content } = this.state;

        return (
            <>
                {loading ? (
                    <Spinner size="small" variant="base" assistiveText={{ label: "Small spinner" }} />
                ) : (
                    <Editor
                        init={config}
                        disabled={disabled}
                        value={content}
                        onEditorChange={this.handleChange}
                        onChange={this.handleChange}
                        onPaste={this.handleChange}
                        onKeyUp={this.handleChange}
                    />
                )}
            </>
        );
    }
}

document.body.appendChild(container);

ReactDOM.render(<PDEditor />, container);
