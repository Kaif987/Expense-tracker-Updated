import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useExpenseContext } from '../Hooks/useExpenseContext'
import { useUserContext } from '../Hooks/useUserContext'
import Popup from './Popup'


export default function ExpenseItem({ item }) {
  const [open, setOpen] = useState(false)
  const { user } = useUserContext()
  const { dispatch } = useExpenseContext()

  const deleteExpense = async (id) => {
    console.log(id)


    const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      headers: {
        "Authorization": `Bearer ${user}`
      },
      method: "DELETE",
    })

    const json = await res.json()
    console.log(json)

    if (res.ok) {
      dispatch({ type: "DELETE_FROM_EXPENSE_LIST", payload: id })
      toggle()
    }

    // console.log(json)

  }

  const toggle = () => {
    setOpen(prev => !prev)
  }

  const relativeTime = moment(item.updatedAt).fromNow()

  const dateString = item.date;
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  console.log(formattedDate);


  return (
    <>
      <tr className='border border-black '>
        <td className='border border-black text-center py-2 capitalize'>{item.name}</td>
        <td className='border border-black text-center py-2 capitalize'>{item.category}</td>
        <td className='border border-black text-center py-2 capitalize'>{formattedDate}</td>
        <td className='border border-black text-center py-2 capitalize before:content-["INR"] before:mr-1'>{item.amount}</td>
        <td className='border border-black text-center py-2 capitalize'>{relativeTime}</td>
        <td className='border text-center py-2 flex h-full gap-3'>
          <Link to={`/edit/${item._id}`}>
            <MdModeEditOutline className='w-6 h-6 hover:cursor-pointer' />
          </Link>
          <RiDeleteBin5Fill className='text-red-600 w-6 h-6 hover:cursor-pointer' onClick={toggle} />
        </td>
      </tr>
      {open && <Popup toggle={toggle} deleteExpense={() => deleteExpense(item._id)} />}
    </>
  )
}
