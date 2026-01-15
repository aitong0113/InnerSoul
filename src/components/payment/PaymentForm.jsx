import { useState } from "react";
import Card from "../common/Card/Card";
import Button from "../common/Button/Button";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      cardNumber,
      name,
    };

    console.log("Payment Data:", paymentData);
  };

  return (
    <Card>
      <h3>Payment</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Card Number</label>
          <input
            type="text"
            className="form-control"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="mb-3">
          <label>Name on Card</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <Button>Pay Now</Button>
      </form>
    </Card>
  );
};

export default PaymentForm;
