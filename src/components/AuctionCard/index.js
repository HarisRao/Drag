import React, { useEffect, useState } from "react";
import classes from "./AuctionCard.module.css";
import moment from "moment";

const AuctionCard = ({ startTime, endTime }) => {
  const startMoment = moment(startTime);
  const endMoment = moment(endTime);
  const now = "2023-09-21T07:08:00.000Z";
  const nowTime = moment(now);
  const durationMs = endMoment.diff(nowTime);
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const [bidValue, setBidValue] = useState("");

  const diffMs = startMoment.diff(nowTime);

  if (diffMs > 0) {
    const duration = moment.duration(diffMs); // convert difference to moment duration
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    console.log(
      `Auction starts in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`
    );
  } else {
    console.log("Auction has already started.");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      //   socket.emit('removeAuctionCard', { startTime, endTime });
      console.log("aucion has been ended");
    }
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const duration = moment.duration(timeLeft);

    const hours = duration.hours().toString().padStart(2, "0");
    const minutes = duration.minutes().toString().padStart(2, "0");
    const seconds = duration.seconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleBidPlaced = () => {
    if (timeLeft <= 120000) {
      const newTimeLeft = timeLeft + 120000;
      setTimeLeft(newTimeLeft);
      // emit event to notify other clients of the time extension
      //   socket.emit('auctionTimeExtended', { startTime, endTime, newTimeLeft });
    }
  };

  const handleBidInputPlaced = (e) => {
    e.preventDefault();
    if (bidValue > 0 && timeLeft <= 120000) {
      const newTimeLeft = timeLeft + 120000;
      setTimeLeft(newTimeLeft);
      // emit event to notify other clients of the time extension
      //   socket.emit('auctionTimeExtended', { startTime, endTime, newTimeLeft });
    } else {
      console.log("bid placed successfully");
    }
    // clear the input field after the bid is placed
    setBidValue("");
  };

  return (
    <div>
      <h3>Car Auction</h3>
      {/* <p>{timeLeft <= 0 ? "pending" : formatTimeLeft()}</p> */}
      <p>{formatTimeLeft()}</p>
      <p onClick={handleBidPlaced}>Place Bid</p>
      <form onSubmit={handleBidInputPlaced}>
        <input
          type="number"
          placeholder="Enter bid amount"
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
        />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
};

export default AuctionCard;
