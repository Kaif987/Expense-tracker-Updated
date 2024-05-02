import React from 'react'

export default function TotalExpense({ expense }) {

    const wantExpense = expense.filter(item => item.category === 'want').reduce((total, filterExpense) => total + filterExpense.amount, 0)
    const needExpense = expense.filter(item => item.category === 'need').reduce((total, filterExpense) => total + filterExpense.amount, 0)
    const investmentExpense = expense.filter(item => item.category === 'investment').reduce((total, filterExpense) => total + filterExpense.amount, 0)

    return (
        <div className='w-full col-span-4'>
            <h1 className='font-semibold text-2xl'>Total Expense</h1>
            <table className=' rounded-md mt-6 border border-black  overflow-x-auto'>
                <thead className='text-gray-700 border border-black' >
                    <tr>
                        <th className='font-semibold py-3 '>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody className='border border-black'>
                    <tr className='border border-black'>
                        <td>Want</td>
                        <td>{wantExpense}</td>
                    </tr>
                    <tr className='border border-black'>
                        <td>Need</td>
                        <td>{needExpense}</td>
                    </tr>
                    <tr className='border border-black'>
                        <td>Investment</td>
                        <td>{investmentExpense}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
