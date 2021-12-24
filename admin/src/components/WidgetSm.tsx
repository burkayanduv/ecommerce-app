import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userRequest } from '../shared/functions/requestMethods';
import { IReduxState, IUser } from '../shared/interfaces';

export default function WidgetSm() {
  const [users, setUsers] = useState<IUser[]>([]);

  const { currentUser } = useSelector((state: IReduxState) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('users/?new=true');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [currentUser?.accessToken]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button type="button" className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
