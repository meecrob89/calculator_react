import { type } from "@testing-library/user-event/dist/type";
import { styled } from "goober";
import { useState, useEffect, useCallback } from "react";

function Calculator() {
    const [ value, setValue ] = useState("0");
    const regexJustNumbers = /^[0-9]*$/;
    const regexOperators = /^[\+\-\*\/\.\,\%]$/;

    function count() {
        const numbersArray = [];
        const operatorsArray = [];
        let temporaryNumber = "";
        for (let i = 0; i < value.length; i++) {
            switch(value[i]) {
                // pokud je symbol v řetězci operátor, pushujeme ho do pole s operátory
                case "+":
                case "-":
                case "*":
                case "/":
                    operatorsArray.push(value[i]);
                    // dočasné uložení hodnoty kvůli zamezení rozdělení několikaciferného čísla
                    if (temporaryNumber) {
                        numbersArray.push(temporaryNumber);
                        temporaryNumber = "";
                    }
                    break;
                // pokud je symbol v řetězci číslo, nebo desetinná tečka, pushujeme ho do pole s čísly
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":
                case ".":
                    // přidá dočasně uložené číslo do pole čísel
                    temporaryNumber += parseFloat(value[i]);
                        if (i === value.length - 1) {
                            numbersArray.push(temporaryNumber);
                        }
                    break;
            }
        }
        // změna datového typu čísel na Numbers
        let numbers = numbersArray.map(x => parseFloat(x));
    
        const resultArray = [];
        // vloží čísla již s datovým typem Number do pole společně s operátory
        for (let i = 0; i < numbers.length; i++) {
            resultArray.push((numbers[i]))
                if (operatorsArray[i])
                resultArray.push(operatorsArray[i])
        }
        // spočítá příklad a převede hodnotu inputu zpět na String
        let result = 0;
        for (let i = 0; i < resultArray.length; i++) {
            let item = resultArray[i];
            switch(item) {
                case "+":
                result += parseFloat(resultArray[i + 1]);
                break;
                case "-":
                result -= parseFloat(resultArray[i + 1]);
                break;
                case "*":
                result *= parseFloat(resultArray[i + 1]);
                break;
                case "/":
                result /= parseFloat(resultArray[i + 1]);
                break;
                default:
                if (i === 0) {
                    result = parseFloat(item);
                }
                break;
            }
            setValue(String(result));
        }
    }

    const handleKeyDown = useCallback( (e) => {
        // pokud uživatel stiskne čárku, přepíše se na tečku
        if (e.key == ",") {
            setValue(value + ".");
            return
        }
        // pokud je hodnota 0 a uživatel stiskne číslo, hodnota se přepíše pouze na číslo a nula nezůstane na začátku řetězce
        if (value == "0" && regexJustNumbers.test(e.key)) {
            setValue(e.key);
            return
        }
        // implementace funkčnosti mazání klávesou backspace
        else if (e.key == "Backspace" && value.length > 1) {
            setValue(value.substring(0, value.length - 1));
            return
        }
        // pokud je řetězec pouze jednomístný, mazání textu nastaví hodnotu na 0
        else if  (e.key == "Backspace" && value.length == 1) {
            setValue("0");
            return
        }
        else if  ((regexJustNumbers.test(value[value.length - 1])) && (regexOperators.test(e.key)) ||
            // poslední znak je operátor a uživatel stiskl číslo
            (regexOperators.test(value[value.length - 1])) && (regexJustNumbers.test(e.key)) || 
            // poslední znak je číslo a uživatel stiskl číslo
            (regexJustNumbers.test(value[value.length - 1])) && (regexJustNumbers.test(e.key))) {
                setValue(value + e.key)
                return
            }
            // poslední znak je operátor a uživatel stiskl operátor
        else if (regexOperators.test(value[value.length - 1]) && regexOperators.test(e.key)) {
            setValue(value.substring(0, value.length - 1) + e.key)
            return
        } else if (e.key == "Enter") {
            count();
        }
        },[value]);
        
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);
    
    return (
        <Main>
            <Hdr>Calculator</Hdr>
            <Nums>
                <Inpt value={value}/>
            </Nums>
            <Nums>
                <BtnWidth onClick={() => {window.location.reload()}}>C</BtnWidth>
                <Operator onClick={() => regexOperators.test(value[value.length - 1]) ? setValue(value.substring(0, value.length - 1) + "%") : setValue(value + "%")}>%</Operator>
                <Operator onClick={() => regexOperators.test(value[value.length - 1]) ? setValue(value.substring(0, value.length - 1) + "/") : setValue(value + "/")}>÷</Operator>
            </Nums>
            <Nums>
                <Btn onClick={() => value == "0" ? setValue("7") : setValue(value + "6")}>7</Btn>
                <Btn onClick={() => value == "0" ? setValue("8") : setValue(value + "6")}>8</Btn>
                <Btn onClick={() => value == "0" ? setValue("9") : setValue(value + "9")}>9</Btn>
                <Operator onClick={() => regexOperators.test(value[value.length - 1]) ? setValue(value.substring(0, value.length - 1) + "*") : setValue(value + "*")}>x</Operator>
            </Nums>
            <Nums>
                <Btn onClick={() => value == "0" ? setValue("4") : setValue(value + "4")}>4</Btn>
                <Btn onClick={() => value == "0" ? setValue("5") : setValue(value + "5")}>5</Btn>
                <Btn onClick={() => value == "0" ? setValue("6") : setValue(value + "6")}>6</Btn>
                <Operator onClick={() => regexOperators.test(value[value.length - 1]) ? setValue(value.substring(0, value.length - 1) + "-") : setValue(value + "-")}>-</Operator>
            </Nums>
            <Nums>
                <Btn onClick={() => value == "0" ? setValue("1") : setValue(value + "1")}>1</Btn>
                <Btn onClick={() => value == "0" ? setValue("2") : setValue(value + "2")}>2</Btn>
                <Btn onClick={() => value == "0" ? setValue("3") : setValue(value + "3")}>3</Btn>
                <Operator onClick={() => regexOperators.test(value[value.length - 1]) ? setValue(value.substring(0, value.length - 1) + "+") : setValue(value + "+")}>+</Operator>
            </Nums>   
            <Nums>
                <BtnWidth onClick={() => value.startsWith("0") ? setValue(value) : setValue(value + "0")}>0</BtnWidth>
                <Btn onClick={() => value.includes(".") ? setValue(value) : setValue(value + ".")}>.</Btn>
                <Operator onClick={count}>=</Operator>
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
height: 70px;
border: 1px;
border-radius: 20px;
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

/*

for (let i = 0; i < valueInArray.length/2; i++) {
            if (valueInArray[i] == "+" ||
                valueInArray[i] == "-" ||
                valueInArray[i] == "*" ||
                valueInArray[i] == "/") {
                operatorsArray.push(valueInArray[i])
            }
        }
        const numbers = (numbersArray.map(num => parseFloat(num)));
        //console.log("operátory: " + operatorsArray);
        //console.log("čísla: " + numbersArray);
        let example = [];
        for (let i = 0; i < numbers.length; i++) {
            example.push(numbersArray[i] + operatorsArray[i]);
        }

*/