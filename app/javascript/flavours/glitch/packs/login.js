import 'packs/public-path';
import Rails from '@rails/ujs';
import 'flavours/glitch/styles/login.scss';

Rails.start();

//  This ensures that webpack compiles our images.
require.context('../images', true);
