import { useContext } from "react"
import { BudgetStateContext } from "../context/BudgetContext"
import { ExpenseDetails } from "./ExpenseDetails";

export const ExpenseList = () => {

    const {expenses} = useContext(BudgetStateContext);
    const isEmpty = expenses.length === 0;

    return (
        <div className="mt-10">
            {isEmpty? <p className="text-gray-600 text-2x1 font-bold">No hay gastos </p>:(
                <>
                    <p className="text-gray-600 text-2x1 font-bold">Lista de gastos</p>
                    {expenses.map((expense, index) => <ExpenseDetails key={index} expense={expense} />)}
                </>
            ) }
        </div>
    )
}    