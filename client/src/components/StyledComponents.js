import styled from "styled-components"

const HeaderStyle = styled.div`
    background: #252945;
    height: 75px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    overflow: hidden;
    z-index: 10;
    .logoWrapper{
        background: #7C5DFA;
        width: 75px;
        height: 75px;
        position: relative;
        border-radius: 0 20px 20px 0;
        img{
            position: absolute;
            top: 24px;
            left: 22px;
            z-index: 10;
        }
        .logoInner{
            background: #9277FF;
            position: absolute;
            top: 50%;
            left: 0;
            width: 75px;
            height: 37.5px;
            border-radius: 20px 0 20px 0;
        }

    }
    .darkModeToggle{
        margin:  0 15px 0 auto;
        height: 25px;
        width: 25px;
        align-self: center;
        cursor: pointer;
    }
    .line{
        height: 100%;
        width: 1px;
        background: #888EB0;
        opacity: 0.5;
        margin: 0 20px;
    }
    .avatarImg{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        align-self: center;
        margin-right: 20px;
        cursor: pointer;
    }
    @media(min-width:1024px){
      position: fixed;
      left: 0;
      top: 0;
      min-height: 500px;
      height: 100%;
      width: 103px;
      flex-direction: column;
      border-radius: 0 20px 20px 0;
      .logoWrapper{
          width: 103px;
          height: 103px;
          img{
              top: 33%;
              left: 33%;
              transform: scale(1.5)
          }
          .logoInner{
              width: 103px;
              height: 51.5px;
          }
      }
      .line{
          width: 100%;
          height: 1px;
          margin: 0;
      }
      .darkModeToggle{
          margin: auto 0 30px 0;
          width: 30px;
          height: 30px;
          
      }
      .avatarImg{
          margin: 30px 0 30px 0;
          width: 50px;
          height: 50px;
      }



    }

`

const InvoiceHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 100px 0 50px 0;
    p{
        color: #888EB0;
    }
    .filter{
        color: black;
        font-weight: bold;
        cursor: pointer;
    }
    .dropdownContainer{
        position: relative;
        .dropdownMenu{
            position: absolute;
            top: 40px;
            width: 150px;
            box-shadow: 0 4px 7px #888EB0;
            background: white;
            border-radius: 10px;
            form{
                line-height: 1.5;
                padding: 10px;
                input{
                    margin-right: 5px;
                }
                
            }
        }
    }
    .newInvoice{
        background: #7C5DFA;
        display: flex;
        align-items: center;
        width: 90px;
        color: white;
        border-radius: 40px;
        cursor: pointer;

        .iconContainer{
            background: white;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px;
        }
        p{
            font-weight: bold;
            font-size: 12px;
            margin-left: 5px;
            color: white;
        }
    }

`
const InvoiceItemStyle = styled.div`
    background: white;
    width: 90%;
    margin: 10px 5%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    
    .invoiceId{
        font-weight: bold;
        padding: 10px;
        color: black;
    }
    .clientName{
        color: #888EB0;
        padding: 10px;
        font-size: 14px;
        justify-self: center;
    }
    .dueContainer{
        padding: 10px;
        h3{
            color: black;
        }
        p{
            color: #888EB0;
            margin-bottom: 10px;
            font-size: 14px;
        }
    }
    .paidButton{
        padding: 10px;
        background: rgba(51, 214, 159, 0.2);
        color: #33D69F;
        width: 100px;
        height: 40px;
        font-weight: bold;
        font-size: 14px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: center; 
        .circlePaid{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgb(51, 214, 159);
            margin-right: 10px;
        }
    }
   
    @media(min-width: 768px){
        display: flex;
        justify-content: space-around;
        height: 72px;
    
        .dueContainer{
            display: flex;
            align-items: center;
            margin-left: auto;
            justify-content: space-between;
            min-width: 260px;
            p{
                margin: 0 15px 0 0;

            }
        }
        .paidButton{
            margin-left: auto;
            margin-right: 10px;
        }
    }
    @media(min-width: 1024px){
        width: 75%;
        margin-left: 12.5%;
    }
`
const InvoicePageHeader = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    margin-left: 5%;
    margin-top: 50px;
    background: white;
    height: 100px;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    .paidButton{
        padding: 10px;
        background: rgba(51, 214, 159, 0.2);
        color: #33D69F;
        width: 100px;
        height: 40px;
        font-weight: bold;
        font-size: 14px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: center; 
        .circlePaid{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgb(51, 214, 159);
            margin-right: 10px;
        }
        
    }
    @media(min-width: 768px){
        .paidButton{
            margin-left: 20px;
        }
    }
    @media(min-width: 1024px){
        width: 70%;
        margin-left: 15%;
    }
`
const InvoicePageMain = styled.div`
    width: 90%;
    background: white;
    margin-left: 5%;
    margin-top: 30px;
    border-radius: 10px;
    padding: 20px;
    p{
        color: #888EB0;
    }
    .invoiceDescription{
        padding: 20px 0 20px 10px;
    }
    .ownAddress{
        padding: 10px;
        margin: 20px 0;
    }
    .metaDataContainer{
        display: grid;
        padding: 10px;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: 50% 50%;
        h3{
            margin-top: 8px;
        }

    }
    .billContainer{
        background: rgba(249, 250, 254, 1);
        width: 100%;
        margin-left: 0%;
        min-height: 100px;
        border-radius: 10px;
        .billItem{
            padding: 30px;
            .billItemPrice{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                p{
                    font-weight: bold;
                }
                
            }
        }
        .totalAmountContainer{
            display: flex;
            height: 80px;
            background: rgba(55, 59, 83, 1);
            color: white;
            align-items: center;
            justify-content: space-evenly;
            border-radius: 0 0 10px 10px;
        }

    }
    @media(min-width: 768px){
        display: grid;
        grid-template-rows: 0.5fr 1.5fr;
        grid-template-columns: 1fr 1fr;
        .ownAddress{
            justify-self: flex-end;
        }
        .metaDataContainer{
            grid-area: 2/1/3/3;
            grid-template-columns: repeat(3,1fr);
            grid-template-rows: 1fr 1fr;
            .sentTo{
                grid-area: 1/3/2/4;
            }
        }
        .billContainer{
            grid-area: 3/1/4/3;
           

            .billDescriptionContainer{
                padding: 30px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .billDescriptionPrice{
                    display: flex;
                    margin-left: auto;
                    width: 60%;
                    justify-content: flex-end;
                    p{
                        width: 150px;
                        text-align: right;
                    }
                    
                }
            }
            .billItem{
                display: flex;
                justify-content: flex-start;
                .billItemPrice{
                    margin-left:auto;
                    width: 60%;
                    justify-content: flex-end;
                    p{
                       width: 150px;
                       text-align: right;
                    }
                    h3{
                        width: 150px;
                        text-align: right;
                    }
                }

            }
            .totalAmountContainer{
                justify-content: space-between;
                padding: 50px;
            }
        }

    }
    @media(min-width: 1024px){
        width: 70%;
        margin-left: 15%;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 90px;
    align-items: center;
    background: white;
    margin-top: 50px;
    justify-content: space-evenly;
    button{
        border: none;
        height: 50px;
        border-radius: 50px;
        font-weight:bold;
    }
    .editBtn{
        background: rgba(249, 250, 254, 1);
        width: 75px;
        color: rgba(126, 136, 195, 1);
        border-radius: 50px;
    }
    .deleteBtn{
        background: rgba(236, 87, 87, 1);
        width: 90px;
        color: white;
    }
    .markPaid{
        background: rgba(124, 93, 250, 1);
        width: 150px;
        color: white;
    }
    .discardBtn{
        background: #F9FAFE;
        color: #7E88C3;
        width: 100px;
    }
    .saveDraft{
        background: #373B53;
        color: #888EB0;
        width: 140px;
        margin-left: auto;
    }
    @media(min-width: 768px){
        margin-top: 0;
        justify-content: flex-start;
        button{
            margin-right: 10px;
        }
        .editBtn{
            margin-left: auto;
        }
    }
    @media(min-width:1024px){
        .discardBtn{
            margin-left: 120px;
        }
    }
`

const InvoiceFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 5%;
    background: white;
    padding-bottom: 200px;
    
    h1{
        font-size: 20px;
        color: #777F98;
    }
    h2{
        font-size: 14px;
        color: #7C5DFA;
        margin-top: 40px;
        margin-bottom: 1em;

    }
    input{
        height: 45px;
        margin-bottom: 15px;
        border: 1px solid #DFE3FA;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        padding: 10px;
        :focus{
            outline: none;
        }
    }
    label{
        margin-bottom: 10px;
        font-size: 14px;
        color: #7E88C3;
    }
    >div{
        display: flex;
        flex-direction: column;
        .cityPostcode{
            display: grid;
            grid-template-rows: 0.5fr 1fr 0.5fr 1fr;
            grid-template-columns: 1fr 1fr;
            input{
                min-width: 100px;
            }
            .cityInput{
                grid-area: 2/1/3/2;
            }
            .countryLabel{
                grid-area: 3/1/4/3;
            }
            .countryInput{
                grid-area: 4/1/5/3;
            }
        }
    }
    .itemList{
        margin-top: 50px;
        .itemContainer{
            display: flex;
            flex-direction: column;

            .itemData{
                display: grid;
                grid-template-rows: 0.5fr 1fr;
                grid-template-columns: repeat(4, 1fr);
                align-items: center;
                grid-gap: 10px;
                p{
                    color: #888EB0;
                    font-weight: bold;
                }
                input{
                    min-width: 65px;
                }
                .labelTotal{
                    grid-area: 1/3/2/5;
                }
                img{
                    cursor: pointer;
                }
        }
        }
    }
    .addNewItem{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #F9FAFE;
        border: none;
        border-radius: 50px;
        font-weight: bold;
        color: #7E88C3;
    }
    @media(min-width: 768px){
        >div .cityPostcode{
            grid-template-rows: 0.5fr 1fr;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 15px;
            .cityInput{
                grid-area: 2/1/3/2;
            }
            .countryLabel{
                grid-area: 1/3/2/4;
                
            }
            .countryInput{
                grid-area: 2/3/3/4;

            }

        }
    }
    @media(min-width: 1024px){
        width: 75%;
        margin-left: 15%;
    }
`

export { HeaderStyle, InvoiceHeader, InvoiceItemStyle, InvoicePageHeader, InvoicePageMain, ButtonContainer, InvoiceFormStyle }