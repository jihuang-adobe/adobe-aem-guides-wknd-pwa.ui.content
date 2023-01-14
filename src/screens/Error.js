import { Theme } from "../theme";

import { 
  GraphQLSetupError,
  setupErrorMessage,
  GlobalEndpointError,
  globalEndpointMessage 
} from "../utils";

export default function ErrorScreen({ error }) {
  try {
    return (
      <div className="content">
        <h1>Error</h1>
        <pre style={styles.pre}>{error.toString()}</pre>
        {error.toString() === GraphQLSetupError && <span>{setupErrorMessage}</span>}
        {error.toString() === GlobalEndpointError && <span>{globalEndpointMessage}</span>}
      </div>
    );
  } catch (e) {
    return <div>Error with the Error</div>
  }
}

const styles = {
  pre: {
    border: "1px solid rgba(255, 255, 255, .1)",
    borderRadius: "4px",
    padding: "1rem",
    width: "120ch",
    whiteSpace: "normal",
  },
  a: {
    color: Theme.colors.text
  }
}