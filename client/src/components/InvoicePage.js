import Header from "./Header"
import ArrowLeft from "./assets/icon-arrow-left.svg"
import InvoiceForm from "./InvoiceForm"
import { InvoicePageHeader, InvoicePageMain, ButtonContainer } from "./StyledComponents"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'


const InvoicePage = ({match}) => {
    const [invoiceData, setInvoiceData] = useState([])
    const [editInvoiceOverlay, setEditInvoiceOverlay] = useState()
    const [deviceWidth, setDeviceWidth] = useState()
    const [confirmationOverlay, setConfirmationOverlay] = useState(false)
    let history = useHistory();
    

    useEffect(() => {
        
        setDeviceWidth(window.innerWidth)
        window.addEventListener("resize", ()=> {
            setDeviceWidth(window.innerWidth)
        })
        axios.get("/api")
        .then(res => {
            let helperArr = res.data.filter(item => item.id === match.params.id)
            setInvoiceData(helperArr[0])
            
        })
        
    },[match.params.id])

    

    
    
    const handleDelete = () => {
        axios({
            url: '/api/delete',
            method: "POST",
            data: {
                id: match.params.id
            }
        })
        .then(res => {
            console.log(res.data.msg)
            history.push("/")
        })
    }

    const handleStatus = () => {
        axios({
            url: '/api/status',
            method: "POST",
            data: {
                id: match.params.id
            }
        })
        .then(res => {
            console.log(res.data.msg)
        })
    }
    const closeOverlay = () => {setEditInvoiceOverlay(false)}

    return (
        <>
            <Header/>
            <div className="goBackBtn">
                <Link to="/">
                <img style={{marginRight:"10px"}} src={ArrowLeft} alt="Arrow left icon"/>
                <strong>Go back</strong>
                </Link>
            </div>
            {invoiceData &&
            <InvoicePageHeader className="invoicePageHeader">
                <p>Status</p>
                {invoiceData.status === "paid" && 
                    <div className="paidButton">
                        <div className="circlePaid"></div>
                        <p>Paid</p>
                    </div>
                }
                {invoiceData.status === "pending" && 
                    <div className="paidButton" style={{background:"rgba(255, 143, 0, 0.2)"}}>
                        <div className="circlePaid" style={{background:"rgba(255, 143, 0, 1)"}}></div>
                        <p style={{color: "rgba(255, 143, 0, 1)"}}>Pending</p>
                    </div>
                }
                {invoiceData.status === "draft" && 
                    <div className="paidButton" style={{background:"rgba(151, 151, 151, 0.2)"}}>
                        <div className="circlePaid draftCircle" style={{background:"rgba(55, 59, 83, 1)"}}></div>
                        <p className="draftBtn" style={{color:"rgba(55, 59, 83, 1)"}}>Draft</p>
                    </div>
                }
                 {deviceWidth >= 768 &&
            <ButtonContainer className="buttonContainer">
                <button onClick={()=>setEditInvoiceOverlay(true)} className="editBtn">Edit</button>
                <button onClick={()=>setConfirmationOverlay(true)} className="deleteBtn">Delete</button>
                <button onClick={handleStatus} className="markPaid">Mark as paid</button>
            </ButtonContainer>
            }       
            

            </InvoicePageHeader>
            }
            {invoiceData.senderAddress &&
            <InvoicePageMain className="invoicePageMain">
                <div className="invoiceDescription">
                    <h3>#{invoiceData.id}</h3>
                    <p>{invoiceData.description}</p>
                </div>
                <div className="ownAddress">
                    <p>{invoiceData.senderAddress.street}</p>
                    <p>{invoiceData.senderAddress.city}</p>
                    <p>{invoiceData.senderAddress.postCode}</p>
                    <p>{invoiceData.senderAddress.country}</p>
                </div>
                <div className="metaDataContainer">
                    <div className="invoiceDate">
                    <p>Invoice Date</p>
                    <h3>{invoiceData.createdAt}</h3>
                    </div>
                    <div className="billTo">
                        <p>Bill to</p>
                        <h3>{invoiceData.clientName}</h3>
                    </div>
                    <div className="paymentDue">
                        <p>Payment due</p>
                        <h3>{invoiceData.paymentDue && invoiceData.paymentDue.substring(0,10)}</h3>
                    </div>
                    <div className="clientData">
                        <p>{invoiceData.clientAddress.street}</p>
                        <p>{invoiceData.clientAddress.city}</p>
                        <p>{invoiceData.clientAddress.postCode}</p>
                        <p>{invoiceData.clientAddress.country}</p>
                    </div>
                    <div className="sentTo">
                        <p>Sent to</p>
                        <h3>{invoiceData.clientEmail}</h3>
                    </div>

                </div>
                <div className="billContainer">
                    {deviceWidth > 767 &&
                    <div className="billDescriptionContainer">
                        <p>Item Name</p>
                        <div className="billDescriptionPrice">
                            <p>QTY.</p>
                            <p>Price</p>
                            <p>Total</p>
                        </div>
                    </div>
                    }
                    
                    {invoiceData.items.map(item => {
                        return <div className="billItem" key={item.name}>
                        <h3>{item.name}</h3>
                        {deviceWidth > 767 ?
                        
                        <div className="billItemPrice">
                        <p>{item.quantity}</p>
                        <p>${item.price}</p>
                        <h3>${item.total}</h3>
                        </div>:
                        <div className="billItemPrice">
                        <p>{item.quantity} x ${item.price}</p>
                        <h3>${item.total}</h3>
                    </div>}
                        </div>
                    }
                )}
                  
                <div className="totalAmountContainer">
                    <p>Grand Total</p>
                    <h2>${invoiceData.total}</h2>
                </div>
                    
                </div>
            </InvoicePageMain>
            }
            {deviceWidth < 768 &&
            <ButtonContainer className="buttonContainer">
                <button onClick={()=>setEditInvoiceOverlay(true)} className="editBtn">Edit</button>
                <button onClick={()=>setConfirmationOverlay(true)} className="deleteBtn">Delete</button>
                <button className="markPaid">Mark as paid</button>
            </ButtonContainer>
            } 
            {editInvoiceOverlay &&
                <div className="overlayWrapper">
                <Header/>
                    <div className="whiteWrapper">
                <div className="goBackBtn" onClick={()=>setEditInvoiceOverlay(false)}>
                
                <img style={{marginRight:"10px"}} src={ArrowLeft} alt="Arrow left icon"/>
                <strong>Go back</strong>
                
                </div>
                {invoiceData && 
                
                <h1 className="overlayHeader">Edit #{invoiceData.id}</h1>
                }
                {invoiceData &&
            
                <InvoiceForm incomingData={invoiceData} editOverlay={true} closeOverlay={closeOverlay}/>
                }
                
                </div>
                </div>

            
            } 
            {confirmationOverlay &&     
            <div className="confirmationOverlay">
                <div className="confirmationContainer">
                    <h2>Confirm deletion</h2>
                    <p>Are you sure you want to delete invoice #{match.params.id}?</p>
                    <p>This action can't be undone</p>
                    <div className="confirmButtons">
                        <button onClick={()=>setConfirmationOverlay(false)} className="cancelDelete">Cancel</button>
                        <button onClick={handleDelete} className="confirmDelete">Delete</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default InvoicePage
