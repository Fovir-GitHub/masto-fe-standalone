import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchBookmarkFolders } from 'flavours/glitch/actions/bookmark_folders';
import { makeGetStatus } from 'flavours/glitch/selectors';

import BookmarkFolder from './components/bookmark_folder';
import NewFolderForm from './components/new_folder_form';

const getOrderedBookmarkFolders = createSelector([state => state.get('bookmarkFolders')], folders => {
  if (!folders) {
    return folders;
  }

  return folders.toList().filter(item => !!item).sort((a, b) => a.get('name').localeCompare(b.get('name')));
});

const makeMapStateToProps = () => {
  const getStatus = makeGetStatus();

  const mapStateToProps = (state, { statusId }) => ({
    folders: getOrderedBookmarkFolders(state),
    status: getStatus(state, { id: statusId }),
  });

  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => ({
  onInitialize () {
    dispatch(fetchBookmarkFolders());
  }
});

class SelectBookmarkFolderModal extends ImmutablePureComponent {

  static propTypes = {
    statusId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    onInitialize: PropTypes.func.isRequired,
    folders: ImmutablePropTypes.list.isRequired,
  };

  componentDidMount () {
    const { onInitialize } = this.props;
    onInitialize();
  }

  render () {
    const { folders, status } = this.props;

    return (
      <div className='modal-root__modal select-bookmark-folder'>
        <NewFolderForm />

        <div className='select-bookmark-folder__folders'>
          <BookmarkFolder statusId={status.get('id')} statusFolderId={status.get('bookmark_folder')} />
          {folders.map(folder => <BookmarkFolder key={folder.get('id')} folder={folder} statusId={status.get('id')} statusFolderId={status.get('bookmark_folder')} />)}
        </div>
      </div>
    );
  }

}

export default connect(makeMapStateToProps, mapDispatchToProps)(injectIntl(SelectBookmarkFolderModal));
