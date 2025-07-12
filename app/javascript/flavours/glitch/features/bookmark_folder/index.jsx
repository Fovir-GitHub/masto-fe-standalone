import PropTypes from 'prop-types';

import { injectIntl, FormattedMessage } from 'react-intl';

import { Helmet } from 'react-helmet';

import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { connect } from 'react-redux';

import { debounce } from 'lodash';

import { fetchBookmarkedStatuses, expandBookmarkedStatuses } from 'flavours/glitch/actions/bookmarks';
import { addColumn, removeColumn, moveColumn } from 'flavours/glitch/actions/columns';
import ColumnHeader from 'flavours/glitch/components/column_header';
import { LoadingIndicator } from 'flavours/glitch/components/loading_indicator';
import StatusList from 'flavours/glitch/components/status_list';
import BundleColumnError from 'flavours/glitch/features/ui/components/bundle_column_error';
import Column from 'flavours/glitch/features/ui/components/column';
import { getStatusList } from 'flavours/glitch/selectors';

const mapStateToProps = (state, props) => {
  const key = `bookmarks:${props.params.folderId}`;
  return {
    folder: state.getIn(['bookmarkFolders', props.params.folderId]),
    statusIds: getStatusList(state, key),
    isLoading: state.getIn(['status_lists', key, 'isLoading'], true),
    hasMore: !!state.getIn(['status_lists', key, 'next']),
  };
};

class BookmarkFolder extends ImmutablePureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    statusIds: ImmutablePropTypes.list.isRequired,
    intl: PropTypes.object.isRequired,
    columnId: PropTypes.string,
    multiColumn: PropTypes.bool,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  UNSAFE_componentWillMount () {
    this.props.dispatch(fetchBookmarkedStatuses(this.props.params.folderId));
  }
  
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { folderId } = nextProps.params;
  
    if (folderId !== this.props.params.folderId) {
  
      this.props.dispatch(fetchBookmarkedStatuses(folderId));

    }
  }

  handlePin = () => {
    const { columnId, dispatch } = this.props;

    if (columnId) {
      dispatch(removeColumn(columnId));
    } else {
      dispatch(addColumn('BOOKMARK_FOLDER', { folderId: this.props.params.folderId }));
    }
  };

  handleMove = (dir) => {
    const { columnId, dispatch } = this.props;
    dispatch(moveColumn(columnId, dir));
  };

  handleHeaderClick = () => {
    this.column.scrollTop();
  };

  setRef = c => {
    this.column = c;
  };

  handleLoadMore = debounce(() => {
    this.props.dispatch(expandBookmarkedStatuses(this.props.params.folderId));
  }, 300, { leading: true });

  render () {
    const { statusIds, columnId, multiColumn, folder, hasMore, isLoading, params } = this.props;
    const { folderId } = params;
    const pinned = !!columnId;
    const name = folder ? folder.get('name') : folderId;

    const emptyMessage = <FormattedMessage id='empty_column.bookmarked_statuses.folder' defaultMessage="You don't have any bookmarked posts in this folder yet. When you ad one, it will show up here." />;
    
    if (typeof folder === 'undefined') {
      return (
        <Column>
          <div className='scrollable'>
            <LoadingIndicator />
          </div>
        </Column>
      );
    } else if (folder === false) {
      return (
        <BundleColumnError multiColumn={multiColumn} errorType='routing' />
      );
    }

    return (
      <Column bindToDocument={!multiColumn} ref={this.setRef} label={name}>
        <ColumnHeader
          icon='bookmark'
          title={name}
          onPin={this.handlePin}
          onMove={this.handleMove}
          onClick={this.handleHeaderClick}
          pinned={pinned}
          multiColumn={multiColumn}
          showBackButton
        />

        <StatusList
          trackScroll={!pinned}
          statusIds={statusIds}
          scrollKey={`bookmarked_statuses:${folderId}-${columnId}`}
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={this.handleLoadMore}
          emptyMessage={emptyMessage}
          bindToDocument={!multiColumn}
          fromBookmarks
        />

        <Helmet>
          <title>{name}</title>
          <meta name='robots' content='noindex' />
        </Helmet>
      </Column>
    );
  }

}

export default connect(mapStateToProps)(injectIntl(BookmarkFolder));
