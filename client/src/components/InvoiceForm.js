import { InvoiceFormStyle, ButtonContainer } from "./StyledComponents"
import IconDelete from "./assets/icon-delete.svg"
import IconPlus from "./assets/icon-plus.svg"
import { useRef } from "react"
import axios from "axios"

const InvoiceForm = ({ incomingData, editOverlay, closeOverlay }) => {

    const senderStreetRef = useRef()
    const senderCityRef = useRef()
    const senderCountryRef = useRef()
    const senderPostcodeRef = useRef()
    const clientStreetRef = useRef()
    const clientCityRef = useRef()
    const clientCountryRef = useRef()
    const clientPostcodeRef = useRef()
    const clientEmailRef = useRef()
    const clientNameRef = useRef()
    const paymentTermsRef = useRef()
    const descriptionRef = useRef()
    const createdAtRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataList = getData()
        const itemList = getItemList()
        dataList.items = itemList || [];
        let sum = 0;
        dataList.items.forEach(item => {
            sum += parseFloat(item.total)
        })
        dataList.total = sum
        axios({
            url: '/api/update',
            method: "POST",
            data: dataList
        })
            .then(res => {
                console.log(res.data.msg)
                closeOverlay()
            })
    }
    const handleDraft = (e) => {
        e.preventDefault();

        const dataList = getData()
        const itemList = getItemList()
        dataList.items = itemList || [];
        let sum = 0;
        dataList.items.forEach(item => {
            sum += parseFloat(item.total)
        })
        dataList.total = sum
        dataList.status = "draft"

        axios({
            url: '/api/save',
            method: "POST",
            data: dataList
        })
            .then(res => {
                console.log(res.data.msg)
                closeOverlay();
            })

    }
    const handleDiscard = (e) => {
        e.preventDefault();
        closeOverlay()
    }
    const handleSave = (e) => {
        e.preventDefault();
        const invoiceForm = document.querySelectorAll("input");
        let controlArr = [];
        [...invoiceForm].forEach(input => {
            !input.value && controlArr.push(input)
        })
        if (controlArr.length > 0) {
            alert("All fields must be filled to save. Fill missing fields or save as draft!")
        } else {
            const dataList = getData()
            const itemList = getItemList()
            dataList.items = itemList || [];
            let sum = 0;
            dataList.items.forEach(item => {
                sum += parseFloat(item.total)
            })
            dataList.total = sum
            dataList.status = "pending"

            axios({
                url: '/api/save',
                method: "POST",
                data: dataList
            })
                .then(res => {
                    console.log(res.data.msg)
                    closeOverlay();
                })

        }
    }

    const createId = () => {
        function getIdLetters(length, characters) {
            var result = '';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const id = getIdLetters(2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ") + getIdLetters(4, "1234567890")
        return id

    }

    const getItemList = () => {
        let itemData = []

        const itemList = document.getElementById("itemList");
        [...itemList.childNodes].forEach(item => itemData.push({}))
        const itemNames = document.querySelectorAll(".itemName");
        const itemQty = document.querySelectorAll(".itemQty");
        const itemPrice = document.querySelectorAll(".itemPrice");
        for (let i = 0; i < itemNames.length; i++) {
            itemData[i].name = itemNames[i].value
        }
        for (let i = 0; i < itemQty.length; i++) {
            itemData[i].quantity = itemQty[i].value
        }
        for (let i = 0; i < itemPrice.length; i++) {
            itemData[i].price = itemPrice[i].value
        }
        for (let i = 0; i < itemList.childElementCount; i++) {
            itemData[i].total = parseFloat(itemData[i].price) * parseInt(itemData[i].quantity)
        }

        return itemData
    }


    const getData = () => {
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            result.toDateString()
            return result;
        }

        const data = {
            id: incomingData ? incomingData.id : createId(),
            createdAt: createdAtRef.current.value,
            clientName: clientNameRef.current.value,
            clientEmail: clientEmailRef.current.value,
            paymentTerms: paymentTermsRef.current.value,
            description: descriptionRef.current.value,
            status: incomingData ? incomingData.status : "pending",
            paymentDue: addDays(createdAtRef.current.value, parseInt(paymentTermsRef.current.value)),
            senderAddress: {
                street: senderStreetRef.current.value,
                city: senderCityRef.current.value,
                postCode: senderPostcodeRef.current.value,
                country: senderCountryRef.current.value
            },
            clientAddress: {
                street: clientStreetRef.current.value,
                city: clientCityRef.current.value,
                postCode: clientPostcodeRef.current.value,
                country: clientCountryRef.current.value
            }

        }

        return data
    }

    const handleNewItem = (e) => {
        e.preventDefault();
        console.log("Moin")
        const itemList = document.getElementById("itemList")
        const newItem = document.createElement("div")
        newItem.classList = "itemContainer newItemContainer"
        newItem.innerHTML = `
                            <label htmlFor="itemName">Item Name</label>
                            <input class="itemName" type="text"/>
                            <div class="itemData">
                                <label htmlFor="itemQty">Qty.</label>
                                <label htmlFor="price">Price</label>
                                <label class="labelTotal" htmlFor="total">Total</label>
                                <input min="1" max="1000" class="itemQty" type="number"/>
                                <input min="1" max="100000" class="itemPrice" type="number"/>
                                <p class="itemTotalPrice"></p>
                                <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fill-rule="nonzero"/></svg>
                            </div>
                        </div>
        `

        itemList.appendChild(newItem)
        

    }


    return (
        <>


            <InvoiceFormStyle className="invoiceForm" action="edit invoice">
                <div className="billFrom">
                    <h2>Bill from</h2>
                    <label htmlFor="streetAddress">Street Address</label>
                    <input ref={senderStreetRef} defaultValue={incomingData && incomingData.senderAddress.street} type="text" />
                    <div className="cityPostcode">
                        <label htmlFor="city">City</label>
                        <input ref={senderCityRef} defaultValue={incomingData && incomingData.senderAddress.city} type="text" className="cityInput" />
                        <label htmlFor="postCode">Post Code</label>
                        <input ref={senderPostcodeRef} defaultValue={incomingData && incomingData.senderAddress.postCode} type="text" name="postCode" id="postCode" />
                        <label className="countryLabel" htmlFor="country">Country</label>
                        <input ref={senderCountryRef} defaultValue={incomingData && incomingData.senderAddress.country} type="text" className="countryInput" />
                    </div>
                </div>
                <div className="billTo">
                    <h2>Bill to</h2>
                    <label htmlFor="clientName">Client's Name</label>
                    <input ref={clientNameRef} defaultValue={incomingData && incomingData.clientName} type="text" id="clientName" />
                    <label htmlFor="clientEmail">Client's Email</label>
                    <input ref={clientEmailRef} defaultValue={incomingData && incomingData.clientEmail} type="text" id="clientEmail" />
                    <label htmlFor="streetAddress">Street Address</label>
                    <input ref={clientStreetRef} defaultValue={incomingData && incomingData.clientAddress.street} type="text" id="streetAddress" />
                    <div className="cityPostcode">
                        <label htmlFor="city">City</label>
                        <input ref={clientCityRef} defaultValue={incomingData && incomingData.clientAddress.city} type="text" className="cityInput" />
                        <label htmlFor="postCode">Post Code</label>
                        <input ref={clientPostcodeRef} defaultValue={incomingData && incomingData.clientAddress.postCode} type="text" />
                        <label className="countryLabel" htmlFor="country">Country</label>
                        <input ref={clientCountryRef} className="countryInput" defaultValue={incomingData && incomingData.clientAddress.country} type="text" />
                    </div>
                    <label htmlFor="invoiceDate">Invoice Date</label>
                    <input ref={createdAtRef} defaultValue={incomingData && incomingData.createdAt} type="date" />
                    <label htmlFor="paymentTerms">Payment Terms</label>
                    <input ref={paymentTermsRef} defaultValue={incomingData && incomingData.paymentTerms} type="number" min="1" max="365" />
                    <label htmlFor="projectDescription">Project/Description</label>
                    <input ref={descriptionRef} defaultValue={incomingData && incomingData.description} type="text" />
                </div>


                <h1>Item List</h1>
                <div className="itemList" id="itemList">
                    {incomingData &&
                        incomingData.items.map(item => {
                            return <div className="itemContainer" key={item.name}>
                                <label htmlFor="itemName">Item Name</label>
                                <input className="itemName" defaultValue={item.name} type="text" />
                                <div className="itemData">
                                    <label htmlFor="itemQty">Qty.</label>
                                    <label htmlFor="price">Price</label>
                                    <label className="labelTotal" htmlFor="total">Total</label>
                                    <input min="1" max="1000" className="itemQty" defaultValue={item.quantity} type="number" />
                                    <input min="1" max="100000" className="itemPrice" defaultValue={item.price} type="number" />
                                    <p className="itemTotalPrice">{item.total}</p>
                                    <img onClick={(e) => e.target.parentNode.parentNode.remove()} src={IconDelete} alt="icon delete" />
                                </div>
                            </div>
                        })}
                </div>


                <button className="addNewItem" onClick={handleNewItem}>
                    <img src={IconPlus} alt="icon plus" />
                    <p>Add New Item</p>
                </button>




            </InvoiceFormStyle>

            {editOverlay ?
                <div className="footerButton">
                    <div className="buttonContainer">
                        <button onClick={handleDiscard} className="cancelButton">Cancel</button>
                        <button className="saveChanges" onClick={handleSubmit}>Save Changes</button>
                    </div>
                </div> :
                <div className="footerButton" style={{ borderRadius: "0 0 20px 0" }}>
                    <ButtonContainer className="buttonContainer" style={{ borderRadius: "0 0 20px 0" }}>
                        <button onClick={handleDiscard} className="discardBtn">Discard</button>
                        <button onClick={handleDraft} className="saveDraft">Save as draft</button>
                        <button onClick={handleSave} className="saveChanges" >Send & Save</button>
                    </ButtonContainer>
                </div>}

        </>
    )
}

export default InvoiceForm
