import React from "react";

const Payment = () => {
  const payments = [
    {
      id: 1,
      patient: "Maria Deo",
      amount: "$120",
      method: "Card",
      date: "22 Dec 2021",
      status: "Paid",
    },
    {
      id: 2,
      patient: "Snan Deo",
      amount: "$80",
      method: "Cash",
      date: "23 Dec 2021",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Martin Deo",
      amount: "$150",
      method: "UPI",
      date: "25 Dec 2021",
      status: "Failed",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Payment History</h2>

      {/* Table Header */}
      <div className="grid grid-cols-5 text-gray-500 text-sm font-medium pb-3 border-b">
        <span>Patient</span>
        <span>Amount</span>
        <span>Method</span>
        <span>Date</span>
        <span>Status</span>
      </div>

      {/* Table Rows */}
      <div className="divide-y">
        {payments.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center py-4"
          >
            <span className="font-medium text-gray-700">
              {item.patient}
            </span>

            <span>{item.amount}</span>

            <span>{item.method}</span>

            <span>{item.date}</span>

            <span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  item.status === "Paid"
                    ? "bg-green-100 text-green-600"
                    : item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;