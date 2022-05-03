import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
export const Layout = ({account, setAccount}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return <>
    <nav className="navbar text-white bg-dark mb-2">
      <div className="container-fluid row">
        <div className="col">
          <nav className="navbar justify-content-left">
            {account != undefined && location.pathname != '/settings' && <Link className="btn btn-primary" to="/settings" >Settings</Link>}

          </nav>
        </div>
        <div className="col">
          <nav className="navbar navbar-dark bg-dark justify-content-center">
            <Link className="navbar-brand h1 fs-1" href='#' to={'/'}>Acres4Dayz</Link>
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-end">
            {account == undefined && location.pathname != "/login" &&<Link className="btn btn-primary" to="/login" >Login/Register</Link> }
            {account != undefined &&
              <div>
                {location.pathname != "/createPost" && <Link className="btn btn-primary me-4" to="/createPost" >Create Listing</Link>}

                <button
                  type="button"
                  className="btn btn-md bg-primary text-white"
                  onClick={() => {
                    setAccount(undefined);
                    navigate('/');
                  }}>
                    Logout
                </button>
              </div>

              }
          </nav>
        </div>
      </div>
    </nav>
  </>;
}
