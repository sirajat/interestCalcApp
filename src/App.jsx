import { useState } from "react";
import "./App.css";
import { TextField, Button, Stack } from "@mui/material";

function App() {
  const [interest, setInterest] = useState("");
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [year, setYear] = useState("");

  // Error States
  const [errorPrincipal, setErrorPrincipal] = useState(false);
  const [errorInterest, setErrorInterest] = useState(false);
  const [errorYear, setErrorYear] = useState(false);

  const CheckValidate = (inputTag) => {
    const { name, value } = inputTag;
    console.log(name, value);

    if (name === "principal") {
      setPrincipal(value);
      if (!!value.match(/^\d*\.?\d*$/)) {
        setErrorPrincipal(false);
      } else {
        setErrorPrincipal(true);
      }
    }

    if (name === "rate") {
      setRate(value);
      if (!!value.match(/^\d*\.?\d*$/)) {
        setErrorInterest(false);
      } else {
        setErrorInterest(true);
      }
    }

    if (name === "year") {
      setYear(value);
      if (!!value.match(/^\d*\.?\d*$/)) {
        setErrorYear(false);
      } else {
        setErrorYear(true);
      }
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault(); // prevent default form submission
    if (principal && rate && year) {
      setInterest((principal * rate * year) / 100);
    } else {
      alert("Please fill all fields.");
    }
  };

  const Reset = () => {
    setInterest("");
    setPrincipal("");
    setRate("");
    setYear("");
    setErrorPrincipal(false);
    setErrorInterest(false);
    setErrorYear(false);
  };

  return (
    <div
      style={{ width: "100%", minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <div style={{ width: "600px" }} className="bg-light rounded p-5">
        <h3 className="text-center rounded p-1">Simple Interest Calculator</h3>
        <p className="text-center rounded p-1">
          Calculate your simple interest easily!
        </p>
        <div className="bg-warning p-4 rounded text-center">
          <h1 className="rounded">₹{interest}</h1>
        </div>
        <form className="mt-5" onSubmit={handleCalculate}>
          <TextField
            className="w-100"
            id="outlined-principal"
            label="Principal Amount in ₹"
            variant="outlined"
            name="principal"
            onChange={(e) => CheckValidate(e.target)}
            value={principal}
          />
          {errorPrincipal && (
            <span className="text-danger">Invalid Principal Amount</span>
          )}

          <TextField
            className="w-100 mt-3"
            id="outlined-rate"
            label="Interest Rate (%)"
            variant="outlined"
            name="rate"
            onChange={(e) => CheckValidate(e.target)}
            value={rate}
          />
          {errorInterest && (
            <span className="text-danger">Invalid Interest Rate</span>
          )}

          <TextField
            className="w-100 mt-3"
            id="outlined-year"
            label="Number of Years"
            variant="outlined"
            name="year"
            onChange={(e) => CheckValidate(e.target)}
            value={year}
          />
          {errorYear && (
            <span className="text-danger">Invalid Number of Years</span>
          )}

          <Stack direction="row" spacing={2} className="mt-4">
            <Button
              type="submit"
              variant="contained"
              disabled={errorPrincipal || errorInterest || errorYear}
            >
              Calculate
            </Button>
            <Button type="button" variant="outlined" onClick={Reset}>
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
