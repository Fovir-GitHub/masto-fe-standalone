import PropTypes from 'prop-types';

import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import { Helmet } from 'react-helmet';

import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchBookmarkFolders } from 'flavours/glitch/actions/bookmark_folders';
import ColumnBackButtonSlim from 'flavours/glitch/components/column_back_button_slim';
import { LoadingIndicator } from 'flavours/glitch/components/loading_indicator';
import ScrollableList from 'flavours/glitch/components/scrollable_list';
import Column from 'flavours/glitch/features/ui/components/column';
import ColumnLink from 'flavours/glitch/features/ui/components/column_link';
import ColumnSubheading from 'flavours/glitch/features/ui/components/column_subheading';

import NewFolderForm from '../select_bookmark_folder_modal/components/new_folder_form';

const messages = defineMessages({
  heading: { id: 'column.bookmark_folders', defaultMessage: 'Bookmark folders' },
  subheading: { id: 'bookmark_folders.subheading', defaultMessage: 'Your bookmark folders' },
});

const getOrderedBookmarkFolders = createSelector([state => state.get('bookmarkFolders')], folders => {
  if (!folders) {
    return folders;
  }

  return folders.toList().filter(item => !!item).sort((a, b) => a.get('name').localeCompare(b.get('name')));
});

const mapStateToProps = state => ({
  folders: getOrderedBookmarkFolders(state),
});

class BookmarkFolders extends ImmutablePureComponent {

  static propTypes = {
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    folders: ImmutablePropTypes.list,
    intl: PropTypes.object.isRequired,
    multiColumn: PropTypes.bool,
  };

  UNSAFE_componentWillMount () {
    this.props.dispatch(fetchBookmarkFolders());
  }

  render () {
    const { intl, folders, multiColumn } = this.props;

    if (!folders) {
      return (
        <Column>
          <LoadingIndicator />
        </Column>
      );
    }

    const children = [
      <ColumnLink key='all' to='/bookmarks' icon='bookmark' text={<FormattedMessage id='bookmark_folders.all' defaultMessage='All bookmarks' />} />,
    ];

    for (const folder of folders) {
      children.push(<ColumnLink key={folder.get('id')} to={`/bookmarks/${folder.get('id')}`} icon='folder' text={folder.get('name')} />)
    }

    return (
      <Column bindToDocument={!multiColumn} icon='bars' heading={intl.formatMessage(messages.heading)}>
        <ColumnBackButtonSlim />

        <NewFolderForm />

        <ColumnSubheading text={intl.formatMessage(messages.subheading)} />
        <ScrollableList
          scrollKey='bookmark_folders'
          bindToDocument={!multiColumn}
        >
          {children}
        </ScrollableList>

        <Helmet>
          <title>{intl.formatMessage(messages.heading)}</title>
          <meta name='robots' content='noindex' />
        </Helmet>
      </Column>
    );
  }

}

export default connect(mapStateToProps)(injectIntl(BookmarkFolders));
