import React, { Component } from "react";
import ReactDOM from "react-dom";
import Spinner from "@salesforce/design-system-react/components/spinner";

const container = document.createElement("div");

class PDColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            config: null,
            loading: true,
            selectedRecommender: "",
            recommenders: []
        };

        subscribe("sfcc:ready", async ({ config, value }) => {
            const recommenders = await this.retrieveRecommenders(config);

            if (!value) {
                value = { recommender: "" };
            }
            this.setState({ loading: false, config, selectedRecommender: value.recommender, recommenders });
        });

        subscribe("sfcc:value", value => {});
        subscribe("sfcc:required", value => {});
        subscribe("sfcc:disabled", disabled => {
            this.setState({ disabled });
        });
    }

    retrieveAccessToken = (url, config) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`https://${url.host}/dw/oauth2/access_token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `grant_type=urn%3Ademandware%3Aparams%3Aoauth%3Agrant-type%3Aclient-id%3Adwsid%3Adwsecuretoken&client_id=${config.clientid}`
                });

                const body = await response.json();

                resolve(body.access_token);
            } catch (err) {
                reject(err);
            }
        });
    };

    retrieveRecommenders = config => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = new URL(document.baseURI);
                const accessToken = await this.retrieveAccessToken(url, config);
                const response = await fetch(
                    `https://${url.host}/s/-/dw/data/v19_3/sites/${config.siteid}/ai/recommender_names`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );

                const body = await response.json();
                const recommenders = [];
                body.recommenders.forEach(recommender => {
                    if (
                        !config.recommenderTypes ||
                        (config.recommenderTypes && config.recommenderTypes.includes(recommender.recommenderType))
                    ) {
                        recommenders.push(recommender.name);
                    }
                });

                resolve(recommenders);
            } catch (err) {
                reject(err);
            }
        });
    };

    handleChange = recommender => {
        emit({ type: "sfcc:interacted" });

        emit({
            type: "sfcc:value",
            payload: { recommender }
        });

        this.setState({ selectedRecommender: recommender });
    };

    render() {
        const { disabled, loading, recommenders, selectedRecommender } = this.state;

        return (
            <div>
                {loading ? (
                    <Spinner size="small" variant="base" assistiveText={{ label: "Small spinner" }} />
                ) : (
                    <div className="slds-form-element">
                        <div className="slds-form-element__control">
                            <div className="slds-select_container">
                                <select
                                    className="slds-select"
                                    disabled={disabled}
                                    id="recommenders"
                                    onChange={e => this.handleChange(e.target.value)}
                                    value={selectedRecommender}
                                >
                                    <option key="select-a-recommender" value="">
                                        Select a Recommender
                                    </option>
                                    {recommenders.map(rec => (
                                        <option key={rec} value={rec}>
                                            {rec}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
document.body.appendChild(container);

ReactDOM.render(<PDColorPicker />, container);
