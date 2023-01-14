import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
import { TeaserV1, TeaserV1IsEmptyFn } from "@adobe/aem-core-components-react-base";

MapTo("wknd/components/teaser")(TeaserV1, { isEmpty: TeaserV1IsEmptyFn });
export const WKNDTeaser = withMappable(TeaserV1, { isEmpty: TeaserV1IsEmptyFn });