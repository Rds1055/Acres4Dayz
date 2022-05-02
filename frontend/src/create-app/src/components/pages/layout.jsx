import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
export const Layout = ({account, setAccount}) => {
  const navigate = useNavigate();
  return <>
    <nav className="navbar text-white bg-dark mb-2">
      <div className="container-fluid row">
        <div className="col">
          <nav className="navbar justify-content-left">
            {account != undefined && <Link to="/settings" >Settings</Link>}
            
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-center">
            <h1>Acres4Dayz</h1>
          </nav>
        </div>
        <div className="col">
          <nav className="navbar justify-content-end">
            {account == undefined &&<Link to="/login" >Login/Register</Link> }
            {account != undefined &&
              <div>
                <Link to="/create-listing" >Create Listing</Link>
                
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
