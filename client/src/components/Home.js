import Header from "./Header"
import InvoiceForm from "./InvoiceForm"
import { Link } from "react-router-dom"
import axios from "axios"
import { InvoiceHeader } from "./StyledComponents"
import ArrowDown from "./assets/icon-arrow-down.svg"
import ArrowLeft from "./assets/icon-arrow-left.svg"
import PlusIcon from "./assets/icon-plus.svg"
import { useState, useEffect } from "react";
import InvoiceItem from "./InvoiceItem"
import IllustrationEmpty from "./assets/illustration-empty.svg"
const Home = () => {

    const [filterMenu, setFilterMenu] = useState(false)
    const [backupData, setBackupData] = useState([])
    const [invoiceData, setInvoiceData] = useState([])
    const [deviceWidth, setDeviceWidth] = useState()
    const [editInvoiceOverlay, setEditInvoiceOverlay] = useState(false)




    useEffect(() => {
        alert("Welcome, this is a demo of an invoice app. While the main functionalities are present, please refrain from inserting any personal or sensitive data. Every user of this site will have access to it!")
        setDeviceWidth(window.innerWidth)
        window.addEventListener("resize", () => {
            setDeviceWidth(window.innerWidth)
        })
        getData()

    }, [])

    const handleChange = () => {

        let checkedInputs = document.querySelectorAll("input:checked");
        let helperArr = [];
        [...checkedInputs].forEach(item => helperArr.push(item.id))
        let filteredData = backupData.filter(invoice => helperArr.includes(invoice.status))
        setInvoiceData(filteredData)

    }

    const closeOverlay = () => { setEditInvoiceOverlay(false) }

    const getData = () => {

        axios.get("/api")
            .then(res => {
                setInvoiceData(res.data)
                setBackupData(res.data)
                console.log("Data retrieved successfully")
            })

    }


    return (
        <>
            <Header />
            <InvoiceHeader>
                <div>
                    <h2>Invoices</h2>
                    {deviceWidth && deviceWidth < 768 ?
                        <p>{invoiceData.length} invoices</p> :
                        <p>There are {invoiceData.length} total invoices</p>

                    }
                </div>
                <div className="dropdownContainer">

                    {deviceWidth < 768 ?
                        <p className="filter" onClick={() => setFilterMenu(!filterMenu)}>Filter <img src={ArrowDown} alt="arrow down icon" /></p> :
                        <p className="filter" onClick={() => setFilterMenu(!filterMenu)}>Filter by status <img src={ArrowDown} alt="arrow down icon" /></p>}

                    {filterMenu &&
                        <div className="dropdownMenu">

                            <form onChange={handleChange}>

                                <input defaultChecked={true} type="checkbox" name="checkbox" id="draft" />Draft<br />
                                <input defaultChecked={true} type="checkbox" name="checkbox" id="pending" />Pending<br />
                                <input defaultChecked={true} type="checkbox" id="paid" />Paid
                        </form>
                        </div>}
                </div>
                <div onClick={() => setEditInvoiceOverlay(true)} className="newInvoice">
                    <div className="iconContainer">
                        <img src={PlusIcon} alt="plus icon" />
                    </div>
                    <p>New</p>
                </div>
            </InvoiceHeader>
            {invoiceData.length > 0 ?
                invoiceData.map(item => {
                    return <Link to={`/invoice/${item.id}`} key={item.id}><InvoiceItem id={item.id} clientName={item.clientName} paymentDue={item.paymentDue && item.paymentDue.substring(0, 10)}
                        totalAmount={item.total} status={item.status} /></Link>
                }) :
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <img style={{ marginBottom: "50px" }} src={IllustrationEmpty} alt="Illustration for no invoices" />
                    <h2>There is nothing here</h2>
                    <p>Create a new invoice by clicking the <strong>New</strong> button</p>
                </div>
            }
            {editInvoiceOverlay &&
                <div className="overlayWrapper">
                    <Header />
                    <div className="whiteWrapper" >
                        <div className="goBackBtn" onClick={() => setEditInvoiceOverlay(false)}>

                            <img style={{ marginRight: "10px" }} src={ArrowLeft} alt="Arrow left icon" />
                            <strong>Go back</strong>

                        </div>

                        <h1 className="overlayHeader">New Invoice</h1>

                        <InvoiceForm editOverlay={false} closeOverlay={closeOverlay} />

                    </div>
                </div>


            }
        </>
    )
}

export default Home
