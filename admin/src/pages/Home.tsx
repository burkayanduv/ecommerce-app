import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo';
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import { userRequest } from '../shared/functions/requestMethods';
import { IReduxState } from '../shared/interfaces';

export default function Home() {
  const [userStats, setUserStats] = useState<any>([]);

  const { currentUser } = useSelector((state: IReduxState) => state.user);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');
        res.data.map((item: { total: number; _id: number }) =>
          setUserStats((prev: any) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total }
          ])
        );
      } catch (err) {
        console.error(err);
      }
    };
    getStats();
  }, [MONTHS, currentUser?.accessToken]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
