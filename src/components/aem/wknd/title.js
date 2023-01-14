import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
import { TitleV2, TitleV2IsEmptyFn } from "@adobe/aem-core-components-react-base";

MapTo("wknd/components/title")(TitleV2, { isEmpty: TitleV2IsEmptyFn });
export const WKNDTitle = withMappable(TitleV2, { isEmpty: TitleV2IsEmptyFn });