import { InvoiceItemStyle } from "./StyledComponents"
import ArrowRight from "./assets/icon-arrow-right.svg"
import { useEffect, useState, useRef } from "react"

const InvoiceItem = ({id, clientName, paymentDue, status, totalAmount}) => {

    const[deviceWidth, setDeviceWidth] = useState();
    const isMounted = useRef(true)
    useEffect(() => {
        
        if(isMounted){
        setDeviceWidth(window.innerWidth)
        window.addEventListener("resize", ()=> {
            setDeviceWidth(window.innerWidth)
            })
        }
        return () => {
            isMounted.current = false;
        }
    }, [])

    return (
        <>
            <InvoiceItemStyle className="invoiceItem">
                <p className="invoiceId">{id}</p>
                <p className="clientName">{clientName}</p>
                <div className="dueContainer">
                    <p>Due {paymentDue}</p>
                    <h3>${totalAmount}</h3>
                </div>
                {status === "paid" && 
                    <div className="paidButton">
                        <div className="circlePaid"></div>
                        <p>Paid</p>
                    </div>
                }
                {status === "pending" && 
                    <div className="paidButton" style={{background:"rgba(255, 143, 0, 0.2)"}}>
                        <div className="circlePaid" style={{background:"rgba(255, 143, 0, 1)"}}></div>
                        <p style={{color: "rgba(255, 143, 0, 1)"}}>Pending</p>
                    </div>
                }
                {status === "draft" && 
                    <div className="paidButton" style={{background:"rgba(151, 151, 151, 0.2)"}}>
                        <div className="circlePaid draftCircle" style={{background:"rgba(55, 59, 83, 1)"}}></div>
                        <p className="draftBtn" style={{color:"rgba(55, 59, 83, 1)"}}>Draft</p>
                    </div>
                }
                {isMounted &&
                deviceWidth > 767 &&
                    <img src={ArrowRight} alt="Arrow right icon"/>
                }
                
            </InvoiceItemStyle>
        </>
    )
}

export default InvoiceItem
