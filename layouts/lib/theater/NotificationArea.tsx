/**
 * Created by ssaboo on 2/29/16.
 */
import React from "react";

import Close from "@liquid101/util/button/Close";

class NofitificationArea extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    deleteOne(error) {
        return {
            type: "CLEAR_ERRORS",
            error,
        };
    }
    clearErrors = (error) => {
        const { dispatch } = this.props;
        dispatch(this.deleteOne(error));
    };

    renderErrResponse(error) {
        if (!error.err) return null;
        return <div>{error.err.statusText}&#xA0;</div>;
    }
    renderErrBody(error) {
        if (!error.body) return null;
        return (
            <div>
                {error.body.message}&#xA0;
                {error.body.error_description}&#xA0;
            </div>
        );
    }

    renderErrJson(error) {
        if (!error.json) return null;
        return (
            <div>
                {error.json.code}&#xa0;
                {error.json.error_description}&#xA0;
                {error.json.message}&#xA0;
                {error.json.statusText}&#xA0;
            </div>
        );
    }

    render() {
        const { errors } = this.props;

        if (!errors.items.length) return null;

        return (
            <div className="validation-area notification-area">
                {errors.items.length
                    ? errors.items.map((error, index) => {
                          return (
                              <div key={index} className="md-toolbar-tools ">
                                  <div className="error-message">
                                      <div>
                                          {error.status}&#xa0;{error.statusText}
                                      </div>
                                      {this.renderErrResponse(error)}
                                      {this.renderErrBody(error)}
                                      {this.renderErrJson(error)}
                                  </div>

                                  <span className="flex-override"></span>

                                  <Close
                                      className="close"
                                      onClick={this.clearErrors.bind(
                                          this,
                                          error
                                      )}
                                  >
                                      ×
                                  </Close>
                              </div>
                          );
                      })
                    : null}
            </div>
        );
    }
}

/*NofitificationArea.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
};*/

export default NofitificationArea;

/**
 * Created by ssaboo on 5/7/16.
 */
