import React, { useEffect, useState } from "react";
import "daisyui/dist/full.css";

const API_URL = "http://localhost:3020/blockchain";

const App: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "warning" | null>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
        setToastType(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToastMessage(message);
    setToastType(type);
  };

  const getData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const { data } = await response.json();
      setData(data);
      showToast("Data fetched successfully", "success");
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast("Failed to fetch data", "error");
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      await getData();
      showToast("Data updated successfully", "success");
    } catch (error) {
      console.error("Error updating data:", error);
      showToast("Failed to update data", "error");
    }
  };

  const verifyData = async () => {
    try {
      const response = await fetch(`${API_URL}/verify`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const { isValid } = await response.json();
      setIsDataValid(isValid);
      if (isValid) showToast("Data integrity verified", "success");
      else showToast("Data is tampered by someone!", "error");
    } catch (error) {
      console.error("Error verifying data:", error);
      showToast("Failed to verify data integrity", "error");
    }
  };

  const restoreData = async () => {
    try {
      const response = await fetch(`${API_URL}/restore`, { method: "POST" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const { data } = await response.json();
      setData(data);
      setIsDataValid(null);
      showToast("Data restored successfully", "success");
    } catch (error) {
      console.error("Error restoring data:", error);
      showToast("Failed to restore data", "error");
    }
  };

  const tamperData = async () => {
    try {
      const response = await fetch(`${API_URL}/tamper`, { method: "POST" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      showToast("Data tampered for testing", "warning");
    } catch (error) {
      console.error("Error tampering data:", error);
      showToast("Failed to tamper data", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-5 bg-gray-100 p-5">
      {toastMessage && (
        <div className={`alert alert-${toastType} fixed top-5 right-5`}>
          <div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="text-3xl font-bold">Saved Data</div>
      <input
        className="input input-bordered input-primary w-full max-w-xs"
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <div className="flex space-x-2">
        <button className="btn btn-primary" onClick={updateData}>
          Update Data
        </button>
        <button className="btn btn-secondary" onClick={verifyData}>
          Verify Data
        </button>
        <button className="btn btn-accent" onClick={restoreData}>
          Restore Data
        </button>
        <button className="btn btn-warning" onClick={tamperData}>
          Tamper Data
        </button>
      </div>
      {isDataValid !== null && (
        <div className="text-xl">
          Data is <span className={isDataValid ? "text-green-500" : "text-red-500"}>{isDataValid ? "valid" : "invalid"}</span>
        </div>
      )}
    </div>
  );
};

export default App;
