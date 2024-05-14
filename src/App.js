import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

function App() {
  const [itemName, setItemName] = useState("");
  const [itemAmt, setItemAmt] = useState("");
  const [dataList, setDataList] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('dataList'));
    return storedTasks || [];
  });

  useEffect(() => {
    localStorage.setItem('dataList', JSON.stringify(dataList));
  }, [dataList]);

  const addItem = () => {
    if (!itemName || !itemAmt) {
      // Show SweetAlert for validation failure
      swal("Validation Error", "Please fill in all fields", "error");
      return;
    }
    const newItem = { itemName, itemAmt };
    setDataList(prevTaskList => [...prevTaskList, newItem]);
    swal("Item added Successfully..", "You clicked the button!", "success");
    setItemName("");
    setItemAmt("");
  }

  const clearAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will delete all items",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Okay"
    }).then(function (result) {
      if (result.isConfirmed) {
        setDataList([]);
        swal("Deleted Successfully!", "You clicked the button!", "success");
      }
    });
  };
  
  return (
    <>
      <section className='container-fluid position-fixed' style={{ backgroundColor: "#f1f3f6", height: '80vh' }}>
        <div className='container bg-white mt-4 rounded' style={{ boxShadow: '0px 1px 1px 0px grey' }}>
          <h3 className='text-center'>Expenses Tracker</h3>
          <div className='row form-group'>
            <label className='fw-bold'>Item Name: </label>
            <div className='col-md-6'>
              <input type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Enter Item Name' className='form-control' />
            </div>
          </div>
          <div className='row form-group'>
            <label className='fw-bold'>Item Amount: </label>
            <div className='col-md-6'>
              <input type='number' value={itemAmt} onChange={(e) => setItemAmt(e.target.value)} placeholder='Enter Item Amount' className='form-control' />
            </div>
          </div>
          <div className='mt-2'>
            <button onClick={addItem} className='btn btn-primary m-1'>Add Item</button>
            <button onClick={clearAll} className='btn btn-primary m-1'>Clear All</button>
          </div>
        </div>
        <div className='container rounded bg-white mt-2'>
          {dataList.map((data, index) => <div key={index} className='row border'>
            <div className='col-md-2'>
              <h3>
                {data.itemName}:
              </h3>
            </div>
            <div className='col-md-2'>
              <h3>
              ₹ {data.itemAmt}
              </h3>
            </div>
          </div>)}
        </div>
        <div className='row'>
          <div className='col-md-4'>
        
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
