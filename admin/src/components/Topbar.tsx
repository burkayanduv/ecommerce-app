import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import avatarIcon from '../shared/constants/icons/avatar_icon.png';

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ecommerce admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div
            className="topbarIconContainer"
            onClick={() => {
              dispatch(logout());
              navigate(`/`, { replace: true });
            }}
          >
            <Settings />
          </div>
          <img src={avatarIcon} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
