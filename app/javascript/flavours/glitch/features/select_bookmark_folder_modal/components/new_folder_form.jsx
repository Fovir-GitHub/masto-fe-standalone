import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { defineMessages, injectIntl } from 'react-intl';

import { connect } from 'react-redux';

import { changeBookmarkFolderEditorName, submitBookmarkFolderEditor } from 'flavours/glitch/actions/bookmark_folders';
import { IconButton } from 'flavours/glitch/components/icon_button';

const messages = defineMessages({
  label: { id: 'bookmark_folders.new.name_placeholder', defaultMessage: 'New folder name' },
  title: { id: 'bookmark_folders.new.create', defaultMessage: 'Add folder' },
});

const mapStateToProps = state => ({
  value: state.getIn(['bookmarkFolderEditor', 'name']),
  disabled: state.getIn(['bookmarkFolderEditor', 'isSubmitting']),
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeBookmarkFolderEditorName(value)),
  onSubmit: () => dispatch(submitBookmarkFolderEditor(true)),
});

class NewFolderForm extends PureComponent {

  static propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  };

  handleClick = () => {
    this.props.onSubmit();
  };

  render () {
    const { value, disabled, intl } = this.props;

    const label = intl.formatMessage(messages.label);
    const title = intl.formatMessage(messages.title);

    return (
      <form className='column-inline-form' onSubmit={this.handleSubmit}>
        <label>
          <span style={{ display: 'none' }}>{label}</span>

          <input
            className='setting-text'
            value={value}
            disabled={disabled}
            onChange={this.handleChange}
            placeholder={label}
          />
        </label>

        <IconButton
          disabled={disabled || !value}
          icon='plus'
          title={title}
          onClick={this.handleClick}
        />
      </form>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NewFolderForm));
