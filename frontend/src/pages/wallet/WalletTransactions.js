import React, {useState} from 'react'
import "./WalletTransactions.scss"
import ReactPaginate from 'react-paginate';

const WalletTransactions = ({transactions, user}) => {
  
  
  
      // Begin Paginate 
    const itemsPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);
  
    const endOffset = itemOffset + itemsPerPage;
   
    const currentItems = transactions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(transactions.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % transactions.length;
      setItemOffset(newOffset);
    };
  
  
  
  
  return (
      <div className='wallet-transactions'>
        <div className='--underline'></div>
        <br />
        <h3>Transactions</h3>
        <div className='table'>
          {
            transactions.length === 0 ? (
              <p>No Transaction Found</p>
            ) : (
              <table>
                <thead>
                   <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Ref Account</th>
                    <th>Description</th>
                    <th>Status</th>
                    
                   </tr>
                </thead>
                <tbody>
                  {
                    currentItems.map((currentItem, index) => {
                      const {_id, createdAt, amount, sender, receiver, description, status} = currentItem
                      return (
                        <tr key={_id}>
                           <td>{itemOffset + index + 1}</td>
                           <td>{new Date(createdAt).toLocaleString()}</td>
                           <td>{_id}</td>
                           <td>{"$"}{amount}</td>
                           <td>{sender === user.email ? 'Debit' : 'Credit'}</td>
                           <td>{sender === user.email ? receiver : sender}</td>
                            <td>{description}</td>
                           <td>{status}</td>
                           
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            )
          }
        </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />
      </div>
  )
}

export default WalletTransactions;