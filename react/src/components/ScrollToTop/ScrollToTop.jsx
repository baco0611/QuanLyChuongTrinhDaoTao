import { RouterProvider } from "react-router-dom";
import router from "../../router";

function ScrollToTop() {
    const history = useHistory();

    useEffect(() => {
      const unlisten = history.listen(() => {
        window.scrollTo(0, 0);
      });
  
      return () => {
        unlisten(); 
      };
    }, [history]);
  
    return <RouterProvider router={router}/>;
}

export default ScrollToTop