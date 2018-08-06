import React from 'react';

const TableItem = (props) => { 
  let {name, email, member_since, loyalty_member_since, loyalty_point, lifetime_total } = props.item;
  return (
    <tr>
      <td className="col-xs-4">{name || email}</td>
      <td className="col-xs-2">{member_since}</td>
      <td className="col-xs-2">{loyalty_member_since}</td>
      <td className="col-xs-2">{loyalty_point}</td>
      <td className="col-xs-2">Rp. {lifetime_total}</td>
    </tr>
  )
};

export default TableItem;