import nprogress from "nprogress";
import type { ClientModule } from "@docusaurus/types";

nprogress.configure({ showSpinner: false });

const delay = 200;

const clientModule: ClientModule = {
  onRouteUpdate({ location, previousLocation }) {
    if (previousLocation && location.pathname !== previousLocation.pathname) {
      const progressBarTimeout = window.setTimeout(() => {
        nprogress.start();
      }, delay);
      return () => window.clearTimeout(progressBarTimeout);
    }
    return undefined;
  },
  onRouteDidUpdate() {
    nprogress.done();
  },
};

export default clientModule;
