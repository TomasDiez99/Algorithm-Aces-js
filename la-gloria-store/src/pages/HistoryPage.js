import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/global.css"
import "../styles/history-page.css"
import { fetchMultiAttempt } from "../utils"
import { forApi } from "../urlManager"

function HistoryPage() {
  const params = useParams()
  const email = params.clientEmail
  const [shoppingCarts, setShoppingCarts] = useState([])
  const [expandedRows, setExpandedRows] = useState([])
  const [orderDetailProductPairs, setOrderDetailProductPairs] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchShoppingCarts = async () => {
      try {
        const response = await fetch(`https://algorithm-aces.vercel.app/rest/shopping-carts/history/${email}`)
        const data = await response.json()
        setShoppingCarts(data)
      } catch (error) {
        navigate("/error")
      }
    }

    fetchShoppingCarts()
  }, [email])

  const handleRowClick = async (index, shoppingCartId) => {
    if (expandedRows.includes(index)) {
      setExpandedRows([])
    } else {
      const newExpandedRows = [index]
      setExpandedRows(newExpandedRows)
      await retrieveOrderDetailData(shoppingCartId)
    }
  }

  const retrieveOrderDetailData = async (shoppingCartId) => {
    try {
      const url = forApi(`order-details/shopping-cart/${shoppingCartId}`)
      console.log(url)
      //const response = await fetchMultiAttempt({url});
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const pairs = await getOrderDetailProductPairs(data)
        setOrderDetailProductPairs(pairs)
      } else {
        console.log("Error history")
        navigate("/errorPWA")
      }
    } catch (error) {
      navigate("/error")
    }
  }

  const getOrderDetailProductPairs = async (data) => {
    const pairs = await Promise.all(
      data.map(async (orderDetail) => {
        return await createOrderDetailProductPair(orderDetail)
      }),
    )
    return pairs
  }

  const createOrderDetailProductPair = async (orderDetail) => {
    const product = await getProduct(orderDetail.product_id)
    return [orderDetail, product]
  }

  const getProduct = async (productId) => {
    try {
      const url = forApi(`products/id/${productId}`)
      const response = await fetchMultiAttempt({ url })
      if (response.ok) {
        const json = await response.json()
        return json.data
      } else {
        navigate("/error")
      }
    } catch (error) {
      navigate("/error")
    }
  }

  return (
    <div className="history-page-wrapper"> 
      <div className="history-page-container pt-5">
        <h1 className="text-center history-title">Shopping History</h1>
        <div className="table-wrapper">
          <table className="table history-table">
            <thead className="history-table-header">
              <tr>
                <th>Date</th>
                <th>Total Price</th>
                <th>See Details</th>
              </tr>
            </thead>
            <tbody>
              {shoppingCarts.map((cart, index) => (
                <React.Fragment key={cart.id}>
                  <tr className="history-row">
                    <td>{cart.date}</td>
                    <td>${cart.total_price}</td>
                    <td>
                      <button
                        className="btn btn-sm history-expand-button"
                        aria-label="See order details button"
                        onClick={() => handleRowClick(index, cart.id)}
                      >
                        {expandedRows.includes(index) ? "-" : "+"}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(index) && (
                    <tr>
                      <td colSpan="3">
                        <div className="order-details">
                          <table className="details-table">
                            <thead className="details-table-header">
                              <tr>
                                <th>Product Amount</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orderDetailProductPairs
                                .filter(([orderDetail]) => orderDetail.shopping_cart_id === cart.id)
                                .map(([orderDetail, product]) => (
                                  <tr key={orderDetail.id} className="details-row">
                                    <td>{orderDetail.product_amount}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage

