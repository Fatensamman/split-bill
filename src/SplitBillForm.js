import { useState } from "react";
import Button from "./Button";

export default function SplitBillForm({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPay, setWhoIsPay] = useState("user");
  function handleSubmitFunction(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPay === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitFunction}>
      <h2>Split a bill with {friend.name}</h2>
      <label>💸 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🚶‍♀️ Your exprnse</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>👭 {friend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>😊 Who is paying the bill</label>
      <select value={whoIsPay} onChange={(e) => setWhoIsPay(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
