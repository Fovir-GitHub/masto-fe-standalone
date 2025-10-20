import * as React from "react";

import { Icon } from "./icon";

const formatNumber = (num: number): number | string => (num > 40 ? "40+" : num);

interface Props {
  id: string,
  count: number,
  issueBadge: boolean,
  className: string,
}
export const IconWithBadge: React.FC<Props> = ({
  id,
  count,
  issueBadge,
  className,
}) => (
  <div className="gts-icon-with-badge">
    <Icon id={id} className={className} />
    {count > 0 && (
      <span className="gts-icon-with-badge__badge">{formatNumber(count)}</span>
    )}
    {issueBadge && <div className="gts-icon-with-badge__issue-badge" />}
  </div>
);
