import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { userRequest } from '../shared/functions/requestMethods';
import { IOrder, IReduxState } from '../shared/interfaces';

export default function WidgetLg() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const { currentUser } = useSelector((state: IReduxState) => state.user);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get('orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getOrders();
  }, [currentUser?.accessToken]);

  const Button = useCallback(
    ({ type }) => (
      <button type="button" className={`widgetLgButton ${type}`}>
        {type}
      </button>
    ),
    []
  );
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <thead className="widgetLgTr">
          <tr>
            <td className="widgetLgTh">Customer</td>
            <td className="widgetLgTh">Date</td>
            <td className="widgetLgTh">Amount</td>
            <td className="widgetLgTh">Status</td>
          </tr>
        </thead>
        {orders.map((order) => (
          <tbody className="widgetLgTr" key={order._id}>
            <tr>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
