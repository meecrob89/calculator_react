import { styled } from "goober";
import { useState, useEffect } from "react";

function Calculator() {
    const [ value, setValue ] = useState("0");
    const regexJustNumbers = /^[0-9,.]*$/;
    function handleKeyDown(e) {
        regexJustNumbers.test(e.key) ? setValue(value + e.key) : setValue(value);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
    
    return (
        <Main>
            <Hdr>CalCulator</Hdr>
            <Nums>
                <Inpt value={value}/>
            </Nums>
            <Nums>
                <BtnWidth onClick={() => {setValue(0)}}>C</BtnWidth>
                <Operator >%</Operator>
                <Operator onClick={() => {setValue(value + "÷")}} >÷</Operator>
            </Nums>
            <Nums>
                <Btn onClick={() => value == "0" ? setValue("7") : setValue(value + "6")}>7</Btn>
                <Btn onClick={() => value == "0" ? setValue("8") : setValue(value + "6")}>8</Btn>
                <Btn onClick={() => value == "0" ? setValue("9") : setValue(value + "9")}>9</Btn>
                <Operator onClick={() => {setValue(value + "x")}} >x</Operator>
            </Nums>
            <Nums>
                <Btn onClick={() => value == "0" ? setValue("4") : setValue(value + "4")}>4</Btn>
                <Btn onClick={() => value == "0" ? setValue("5") : setValue(value + "5")}>5</Btn>
                <Btn onClick={() => value == "0" ? setValue("6") : setValue(value + "6")}>6</Btn>
                <Operator onClick={() => setValue(value + "-")}>-</Operator>
            </Nums>
            <Nums>
                <Btn onClick={() => value == "0" ? setValue("1") : setValue(value + "1")}>1</Btn>
                <Btn onClick={() => value == "0" ? setValue("2") : setValue(value + "2")}>2</Btn>
                <Btn onClick={() => value == "0" ? setValue("3") : setValue(value + "3")}>3</Btn>
                <Operator onClick={() => {setValue(value + "+")}}>+</Operator>
            </Nums>   
            <Nums>
                <BtnWidth onClick={() => value.startsWith("0") ? setValue(value) : setValue(value + "0")}>0</BtnWidth>
                <Btn onClick={() => value.includes(".") ? setValue(value) : setValue(value + ".")}>.</Btn>
                <Operator >=</Operator>
            </Nums>
        </Main>
    );
}

const Main = styled("div")`
padding: 30px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 25px;
width: 100%; 
height: 100%;
`;

const Hdr = styled("h1")`
margin-top: 15px;
display: flex;
justify-content: center;
font-size: 32px;
margin-bottom: 15px;
`;

const Inpt = styled("input")`
width: 288px;
height: 55px;
border-radius: 5px;
font-size: 48px;
margin-bottom: "7px";
text-align: right;
border: none;
`;

const Btn = styled("button")`
color: white;
width: 70px;
height: 55px;
border: 1px;
border-radius: 5px;
background-color: navy;
font-size: 20px;
font-weight: bold;
&:hover {
    opacity: 0.5;
}
`;

const Operator = styled(Btn)`
background-color: orange;
color: black;
`;

const BtnWidth = styled(Btn)`
width: 145px;
`;

const Nums = styled("div")`
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
margin-top: 5px;
`;

export default Calculator;