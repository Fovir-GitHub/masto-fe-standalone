import * as React from "react";

import classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  id: string,
  className?: string,
  fixedWidth?: boolean,
  children?: never,
}

export const Icon: React.FC<Props> = ({
  id,
  className,
  fixedWidth,
  title,
  ...other
}) => (
  <svg className={classNames("gts-icon", className)} {...other}>
    {title && <title>{title}</title>}
    <use href={`/icons.svg#${id}`} />
  </svg>
);
