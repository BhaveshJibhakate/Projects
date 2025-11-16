import './form.css'
function Form() {
  return (
    <div className=" form-container">
      <form onSubmit={(e)=>e.preventDefault()}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="enter your name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="enter your email" />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" placeholder="enter your city" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" placeholder="enter your phone" />
        </div>
        <div className='button-container'>
            <button>Submit</button>
            <button>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
