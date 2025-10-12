function _autoUnfoldCW(spoiler_text, settings) {
  if (!settings.getIn(["content_warnings", "auto_unfold"])) {
    return false;
  }

  const skip_unfold_regex = settings.getIn(["content_warnings", "filter"]);

  if (!skip_unfold_regex) {
    return true;
  }

  let regex = null;

  try {
    regex = new RegExp(skip_unfold_regex.trim(), "i");
  } catch (e) {
    // Bad regex, skip filters
    return true;
  }

  return !regex.test(spoiler_text);
}

export function autoHideCW(settings, spoiler_text) {
  return !_autoUnfoldCW(spoiler_text, settings);
}

export function autoUnfoldCW(settings, status) {
  if (!status) {
    return false;
  }

  return _autoUnfoldCW(status.get("spoiler_text"), settings);
}
