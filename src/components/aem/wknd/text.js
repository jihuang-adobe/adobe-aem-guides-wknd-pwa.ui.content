import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
import { TextV2, TextV2IsEmptyFn } from "@adobe/aem-core-components-react-base";

MapTo("wknd/components/text")(TextV2, { isEmpty: TextV2IsEmptyFn });
export const WKNDText = withMappable(TextV2, { isEmpty: TextV2IsEmptyFn });