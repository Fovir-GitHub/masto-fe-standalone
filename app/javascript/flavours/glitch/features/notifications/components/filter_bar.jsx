import PropTypes from "prop-types";
import { PureComponent } from "react";

import { defineMessages, injectIntl, FormattedMessage } from "react-intl";

import { Icon } from "flavours/glitch/components/icon";

const tooltips = defineMessages({
  mentions: { id: "notifications.filter.mentions", defaultMessage: "Mentions" },
  favourites: { id: "notifications.filter.favourites", defaultMessage: "Favorites" },
  boosts: { id: "notifications.filter.boosts", defaultMessage: "Boosts" },
  polls: { id: "notifications.filter.polls", defaultMessage: "Poll results" },
  follows: { id: "notifications.filter.follows", defaultMessage: "Follows" },
  statuses: { id: "notifications.filter.statuses", defaultMessage: "Updates from people you follow" },
});

class FilterBar extends PureComponent {

  static propTypes = {
    selectFilter: PropTypes.func.isRequired,
    selectedFilter: PropTypes.string.isRequired,
    advancedMode: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
  };

  onClick (notificationType) {
    return () => this.props.selectFilter(notificationType);
  }

  render () {
    const { selectedFilter, advancedMode, intl } = this.props;
    const renderedElement = !advancedMode ? (
      <div className='notification__filter-bar'>
        <button
          className={selectedFilter === "all" ? "active" : ""}
          onClick={this.onClick("all")}
        >
          <FormattedMessage
            id='notifications.filter.all'
            defaultMessage='All'
          />
        </button>
        <button
          className={selectedFilter === "mention" ? "active" : ""}
          onClick={this.onClick("mention")}
        >
          <FormattedMessage
            id='notifications.filter.mentions'
            defaultMessage='Mentions'
          />
        </button>
      </div>
    ) : (
      <div className='notification__filter-bar'>
        <button
          className={selectedFilter === "all" ? "active" : ""}
          onClick={this.onClick("all")}
        >
          <FormattedMessage
            id='notifications.filter.all'
            defaultMessage='All'
          />
        </button>
        <button
          className={selectedFilter === "mention" ? "active" : ""}
          onClick={this.onClick("mention")}
          title={intl.formatMessage(tooltips.mentions)}
        >
          <Icon id={selectedFilter === "mention" ? "arrow-bend-double-up-left-filled" : "arrow-bend-double-up-left"} />
        </button>
        <button
          className={selectedFilter === "favourite" ? "active" : ""}
          onClick={this.onClick("favourite")}
          title={intl.formatMessage(tooltips.favourites)}
        >
          <Icon id={selectedFilter === "favourite" ? "star-filled" : "star"} />
        </button>
        <button
          className={selectedFilter === "reblog" ? "active" : ""}
          onClick={this.onClick("reblog")}
          title={intl.formatMessage(tooltips.boosts)}
        >
          <Icon id={selectedFilter === "reblog" ? "rocket-launch-filled" : "rocket-launch"} />
        </button>
        <button
          className={selectedFilter === "poll" ? "active" : ""}
          onClick={this.onClick("poll")}
          title={intl.formatMessage(tooltips.polls)}
        >
          <Icon id={selectedFilter === "poll" ? "chart-bar-horizontal-filled" : "chart-bar-horizontal"} />
        </button>
        <button
          className={selectedFilter === "status" ? "active" : ""}
          onClick={this.onClick("status")}
          title={intl.formatMessage(tooltips.statuses)}
        >
          <Icon id={selectedFilter === "status" ? "chat-circle-dots-filled" : "chat-circle-dots"} />
        </button>
        <button
          className={selectedFilter === "follow" ? "active" : ""}
          onClick={this.onClick("follow")}
          title={intl.formatMessage(tooltips.follows)}
        >
          <Icon id={selectedFilter === "follow" ? "user-plus-filled" : "user-plus"} />
        </button>
      </div>
    );
    return renderedElement;
  }

}

export default injectIntl(FilterBar);
