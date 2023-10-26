import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

function VerifyPayment() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentRequestId = queryParams.get("payment_request_id");
    const paymentId = queryParams.get("payment_id");
    const paymentStatus = queryParams.get("payment_status");

    const navigate = useNavigate()

    const updateOrder = async () => {
        if (!paymentRequestId || !paymentId || !paymentStatus) {
            return
        }
        try {
            const updateData = {
                payment_request_id: paymentRequestId,
                payment_id: paymentId,
                paymentStatus: paymentStatus
            }
            const res = await fetch("/api/update-order-payment", {
                method: "PATCH",
                body: JSON.stringify(updateData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (e) {
            console.log(e)
        }
        navigate("/orders")
    }

    useEffect(() => {
        updateOrder()
    }, [])

    return (
        <>
            <div className="container text-center">
                <div className="loader"></div>
                <div className="transaction-style">
                    Transaction in process. Please do not reload!
                </div>
            </div>
        </>
    )
}

export default VerifyPayment