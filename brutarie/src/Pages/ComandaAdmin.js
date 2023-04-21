import React from "react";
import { Table } from "react-bootstrap";

const ComandaAdmin = (props) => {
  return (
    <Table
      stripped
      bordered
      hover
      style={{ marginRight: "0%", marginLeft: "0%" }}
    >
      <thead>
        <tr>
          <th></th>
          <th>Nume Client</th>
          <th>Numar telefon</th>
          <th>Email</th>
          <th>Data plasarii</th>
          <th>Pret total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>{props.order.userID.name + " " + props.order.userID.fname}</td>
          <td>{props.order.userID.phone_number}</td>
          <td>{props.order.userID.email}</td>
          <td>{props.order.orderDate}</td>
          <td>{props.order.totalPrice}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Adresa livrare</td>

          <td colSpan={5}>
            {props.order.shippingInfo.address +
              " " +
              props.order.shippingInfo.state +
              " " +
              props.order.shippingInfo.postalCode}
          </td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Produse</td>
          <td colSpan={5}>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {props.order.items.map((produs) => {
                return produs.productName + " x " + produs.quantity + "\n";
              })}
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ComandaAdmin;
