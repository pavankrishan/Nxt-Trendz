import React, {useState, useContext} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  let total = 0
  cartList.forEach(item => {
    total += item.price * item.quantity
  })

  const handleCheckout = () => {
    setIsPopupOpen(true)
    setOrderPlaced(false)
    setSelectedPayment('')
  }

  const handleConfirmOrder = () => {
    setOrderPlaced(true)
  }

  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          <span className="order-total-label">Order Total:</span> Rs {total}/-
        </h1>
        <p className="total-items">{cartList.length} Items in cart</p>
        <button
          type="button"
          className="checkout-button"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>

      <Popup open={isPopupOpen} modal overlayClassName="popup-overlay">
        <div className="popup-content">
          <h2 className="popup-title">Payment Options</h2>

          <div className="payment-options">
            <label>
              <input type="radio" name="payment" disabled /> Card
            </label>
            <label>
              <input type="radio" name="payment" disabled /> Net Banking
            </label>
            <label>
              <input type="radio" name="payment" disabled /> UPI
            </label>
            <label>
              <input type="radio" name="payment" disabled /> Wallet
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={selectedPayment === 'COD'}
                onChange={() => setSelectedPayment('COD')}
              />
              Cash on Delivery
            </label>
          </div>

          <div className="order-summary">
            <p>Items: {cartList.length}</p>
            <p>Total Price: ₹{total}</p>
          </div>

          <button
            className="confirm-button"
            disabled={selectedPayment !== 'COD'}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>

          {orderPlaced && (
            <p className="confirm-msg">
              Your order has been placed successfully
            </p>
          )}
        </div>
      </Popup>
    </>
  )
}

export default CartSummary
