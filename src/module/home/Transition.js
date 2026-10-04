import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;

  border-right: 4px solid
    ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  const payload = props.payload || {};

  return (
    <Cell isExpense={payload.type === "EXPENSE"}>
      <span>{payload.desc || "No description"}</span>
      <span>Rs. {payload.amount || 0}</span>
    </Cell>
  );
};

const TransactionsComponent = (props) => {
  const transactions = props.transactions || [];

  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(transactions);

  const filterData = (text) => {
    const searchValue = (text || "").trim().toLowerCase();

    if (!searchValue) {
      updateTxn(transactions);
      return;
    }

    const txn = transactions.filter((payload) => {
      const description = (payload?.desc || "").toLowerCase();

      return description.includes(searchValue);
    });

    updateTxn(txn);
  };

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions, searchText]);

  return (
    <Container>
      Transactions

      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => updateSearchText(e.target.value)}
      />

      {filteredTransaction.map((payload, index) => (
        <TransactionCell
          key={payload?.id || index}
          payload={payload}
        />
      ))}
    </Container>
  );
};

export default TransactionsComponent;
