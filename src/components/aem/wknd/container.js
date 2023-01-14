import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
import { ContainerV1, ContainerV1IsEmptyFn } from "@adobe/aem-core-components-react-spa"
import "../aem-responsive-grid.css";

MapTo("wknd/components/container")(ContainerV1, { isEmpty: ContainerV1IsEmptyFn });
export const WKNDContainer = withMappable(ContainerV1, { isEmpty: ContainerV1IsEmptyFn });
