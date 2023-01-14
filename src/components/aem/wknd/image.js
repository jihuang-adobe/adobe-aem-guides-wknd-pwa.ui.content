import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
import { ImageV2, ImageV2IsEmptyFn } from "@adobe/aem-core-components-react-base";

MapTo("wknd/components/image")(ImageV2, { isEmpty: ImageV2IsEmptyFn });
export const WKNDImage = withMappable(ImageV2, { isEmpty: ImageV2IsEmptyFn });