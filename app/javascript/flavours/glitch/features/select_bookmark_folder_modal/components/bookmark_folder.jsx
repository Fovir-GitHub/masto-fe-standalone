import PropTypes from 'prop-types';

import { FormattedMessage, injectIntl } from 'react-intl';

import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { connect } from 'react-redux';

import { bookmark } from 'flavours/glitch/actions/interactions';
import { closeModal } from 'flavours/glitch/actions/modal';
import { RadioButton } from 'flavours/glitch/components/radio_button';

const mapStateToProps = (state, { statusId }) => ({
  status: state.getIn(['statuses', statusId]),
});

const mapDispatchToProps = (dispatch, { folder }) => ({
  onChange: (status, router) => {
    dispatch(bookmark(status, folder ? folder.get('id') : null, router)).then(() => {
      dispatch(closeModal({
        modalType: 'SELECT_BOOKMARK_FOLDER',
      }));
    }).catch(() => {});
  },
});

class BookmarkFolder extends ImmutablePureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    status: ImmutablePropTypes.map.isRequired,
    folder: ImmutablePropTypes.map,
    statusId: PropTypes.string.isRequired,
    statusFolderId: PropTypes.string,
    intl: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    added: false,
  };

  handleChange = () => {
    const { onChange, status } = this.props;
    onChange(status, this.context.router.history);
  };

  render () {
    const { folder, statusFolderId } = this.props;

    return (
      <div className='bookmark-folder'>
        <div className='bookmark-folder__wrapper'>
          <RadioButton
            name='folder_id'
            value={statusFolderId || ''}
            label={folder ? folder.get('name') : <FormattedMessage id='bookmark_folders.uncategorized' defaultMessage='Uncategorized' />}
            checked={statusFolderId === (folder ? folder.get('id') : null)}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BookmarkFolder));
