import React from "react";

const Form = (props) => {
  console.log(props);
  return (
    <form>
      <input
        type="text"
        value={props.value}
        placeholder="City name"
        onChange={props.change}
      />
      <button>Search</button>
    </form>
  );
};

export default Form;
