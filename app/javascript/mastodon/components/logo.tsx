export const WordmarkLogo: React.FC = () => (
  <svg viewBox='0 0 261 66' className='logo logo--wordmark' role='img'>
    <title>Mastodon</title>
    <use xlinkHref='/logo-symbol-wordmark.svg#logo-symbol-wordmark' />
  </svg>
);

export const SymbolLogo: React.FC = () => (
  <img src='/logo-icon.svg' alt='Mastodon' className='logo logo--icon' />
);
