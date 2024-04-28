import React from 'react'

export default function Popup({toggle, deleteExpense}) {
  return (
    <>
        <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={toggle}
        ></div>
        <div className='absolute text-center top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 border-2 border-black bg-gray-200 p-4 rounded-md '>
            <h3>Are you sure you want to delete this Expense?</h3>
            <div className='flex justify-end mt-6 gap-3'>
                <button onClick={toggle} className="bg-red-500 text-white rounded-sm px-2 py-1 text hover:border-2 hover:bg-red-700" >No</button>
                <button onClick={deleteExpense} className="bg-green-600 text-white rounded-sm px-4 py-1 hover:border-2 hover:bg-green-700" >Yes, Delete!</button>
            </div>
        </div>
    </>
  )
}
