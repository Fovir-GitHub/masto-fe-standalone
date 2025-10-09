import PropTypes from "prop-types";
import { PureComponent } from "react";
import { createPortal } from "react-dom";

import { FormattedMessage, injectIntl, defineMessages } from "react-intl";

import classNames from "classnames";

import { Icon } from "flavours/glitch/components/icon";
import { IconButton } from 'flavours/glitch/components/icon_svg_button';

const messages = defineMessages({
  show: { id: "column_header.show_settings", defaultMessage: "Show settings" },
  hide: { id: "column_header.hide_settings", defaultMessage: "Hide settings" },
  moveLeft: { id: "column_header.moveLeft_settings", defaultMessage: "Move column to the left" },
  moveRight: { id: "column_header.moveRight_settings", defaultMessage: "Move column to the right" },
});

class ColumnHeader extends PureComponent {

  static contextTypes = {
    router: PropTypes.object,
    identity: PropTypes.object,
  };

  static propTypes = {
    intl: PropTypes.object.isRequired,
    title: PropTypes.node,
    icon: PropTypes.string,
    active: PropTypes.bool,
    multiColumn: PropTypes.bool,
    extraButton: PropTypes.node,
    showBackButton: PropTypes.bool,
    children: PropTypes.node,
    pinned: PropTypes.bool,
    placeholder: PropTypes.bool,
    onPin: PropTypes.func,
    onMove: PropTypes.func,
    onClick: PropTypes.func,
    appendContent: PropTypes.node,
    collapseIssues: PropTypes.bool,
  };

  state = {
    collapsed: true,
    animating: false,
  };

  handleToggleClick = (e) => {
    e.stopPropagation();
    this.setState({ collapsed: !this.state.collapsed, animating: true });
  };

  handleTitleClick = () => {
    this.props.onClick?.();
  };

  handleMoveLeft = () => {
    this.props.onMove(-1);
  };

  handleMoveRight = () => {
    this.props.onMove(1);
  };

  handleBackClick = () => {
    const { router } = this.context;

    if (router.history.location?.state?.fromMastodon) {
      router.history.goBack();
    } else {
      router.history.push("/");
    }
  };

  handleTransitionEnd = () => {
    this.setState({ animating: false });
  };

  handlePin = () => {
    if (!this.props.pinned) {
      this.context.router.history.replace("/");
    }

    this.props.onPin();
  };

  render () {
    const { router } = this.context;
    const { title, icon, active, children, pinned, multiColumn, extraButton, showBackButton, intl: { formatMessage }, placeholder, appendContent, collapseIssues } = this.props;
    const { collapsed, animating } = this.state;

    const wrapperClassName = classNames("column-header__wrapper", {
      "active": active,
    });

    const buttonClassName = classNames("column-header", {
      "active": active,
    });

    const collapsibleClassName = classNames("column-header__collapsible", {
      "collapsed": collapsed,
      "animating": animating,
    });

    const collapsibleButtonClassName = classNames("column-header__button", {
      "active": !collapsed,
    });

    let extraContent, pinButton, moveButtons, backButton, collapseButton;

    if (children) {
      extraContent = (
        <div key='extra-content' className='column-header__collapsible__extra'>
          {children}
        </div>
      );
    }

    if (multiColumn && pinned) {
      pinButton = (<IconSVGButton key='pin-button' onClick={this.handlePin} className='column-header__footer-button' label='Unpin' icon='push-pin-slash'/>)

      moveButtons = (
        <div key='move-buttons' className='column-header__footer-arrows'>
          <button title={formatMessage(messages.moveLeft)} aria-label={formatMessage(messages.moveLeft)} className='column-header__footer-button' onClick={this.handleMoveLeft}><IconSVG id='caret-left' /></button>
          <button title={formatMessage(messages.moveRight)} aria-label={formatMessage(messages.moveRight)} className='column-header__footer-button' onClick={this.handleMoveRight}><IconSVG id='caret-right' /></button>
        </div>
      );
    } else if (multiColumn && this.props.onPin) {
      pinButton = (<IconSVGButton key='pin-button' onClick={this.handlePin} className='column-header__footer-button' label='Pin' icon='push-pin'/>)
    }

    if (!pinned && ((multiColumn && router.history.location?.state?.fromMastodon) || showBackButton)) {
      backButton = (
        <button onClick={this.handleBackClick} className='column-header__back-button'>
          <IconSVG id='arrow-left' className='column-back-button__icon' fixedWidth />
          <FormattedMessage id='column_back_button.label' defaultMessage='Back' />
        </button>
      );
    }
    
    const columnHeaderFooter = (
      <div className='column-header__footer'>
        {pinButton} {moveButtons}
      </div>
    )

    const collapsedContent = [
      extraContent,
    ];

    if (multiColumn) {
      collapsedContent.push(columnHeaderFooter);
    }

    if (this.context.identity.signedIn && (children || (multiColumn && this.props.onPin))) {
      collapseButton = (
        <button
          className={collapsibleButtonClassName}
          title={formatMessage(collapsed ? messages.show : messages.hide)}
          aria-label={formatMessage(collapsed ? messages.show : messages.hide)}
          onClick={this.handleToggleClick}
        >
          <div className='gts-icon-with-badge'>
            <IconSVG id='slider-horizontal' />
            {collapseIssues && <i className='gts-icon-with-badge__issue-badge' />}
          </div>
        </button>
      );
    }

    const hasTitle = icon && title;

    const component = (
      <div className={wrapperClassName}>
        <h1 className={buttonClassName}>
          {hasTitle && (
            <button onClick={this.handleTitleClick}>
              <IconSVG id={icon} fixedWidth className='column-header__icon' />
              {title}
            </button>
          )}

          {!hasTitle && backButton}

          <div className='column-header__buttons'>
            {hasTitle && backButton}
            {extraButton}
            {collapseButton}
          </div>
        </h1>

        <div className={collapsibleClassName} tabIndex={collapsed ? -1 : null} onTransitionEnd={this.handleTransitionEnd}>
          <div className='column-header__collapsible-inner'>
            {(!collapsed || animating) && collapsedContent}
          </div>
        </div>

        {appendContent}
      </div>
    );

    if (multiColumn || placeholder) {
      return component;
    } else {
      // The portal container and the component may be rendered to the DOM in
      // the same React render pass, so the container might not be available at
      // the time `render()` is called.
      const container = document.getElementById("tabs-bar__portal");
      if (container === null) {
        // The container wasn't available, force a re-render so that the
        // component can eventually be inserted in the container and not scroll
        // with the rest of the area.
        this.forceUpdate();
        return component;
      } else {
        return createPortal(component, container);
      }
    }
  }

}

export default injectIntl(ColumnHeader);
