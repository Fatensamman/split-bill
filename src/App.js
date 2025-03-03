import { useState } from "react";
import SplitBillForm from "./SplitBillForm";
import FormToAddFriend from "./FormToAddFriend";
import Button from "./Button";
import FriendList from "./FriendList";

const initialFriends = [
  {
    id: 118836,
    name: "Hiba",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -10,
  },
  {
    id: 933372,
    name: "Lama",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 30,
  },
  {
    id: 499476,
    name: "Yazan",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelection(friend) {
    setShowAddFriend(false);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  function onClickAddFriend() {
    setShowAddFriend((show) => !show);
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormToAddFriend onAddFriend={handleAddFriend} />}
        <Button onClickFunction={onClickAddFriend}>
          {showAddFriend ? "CLose" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBillForm friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}
