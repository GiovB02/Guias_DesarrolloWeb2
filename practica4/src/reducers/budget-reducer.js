const initialBudget =()=>{
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget? parseFloat(localStorageBudget):0;
}

const localStorageExpenses=()=>{
    const localStorageExpenses = localStorage.getItem("expenses");
    return localStorageExpenses? JSON.parse(localStorageExpenses):[];
}

export const initialState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: "",
    currentCategory: "",
};

export const budgetReducer = (state, action) => {

    switch (action.type) {
        case "add-budget":
            const totalExpenses = state.expenses.reduce((total, exp) => total + exp.amount, 0);
            if (totalExpenses > state.budget) {
        return { ...state, errorMessage: "No puedes gastar más de lo que tienes en el presupuesto." };
    }
            return { ...state, budget: action.payload.budget };
        case "show-modal":
            return { ...state, modal: true };
        case "close-modal":
            return { ...state, modal: false, editingId: "" };
        case "add-expense":
            return {
            ...state,
            expenses: [...state.expenses, { ...action.payload.expense, id: new Date().getTime() }],
            modal: false,
            };
        case "remove-expense":
            return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
            };
        case "get-expense-by-id":
            return { ...state, editingId: action.payload.id, modal: true };
        case "update-expense":
            return {
            ...state,
            expenses: state.expenses.map(expense =>
                expense.id === action.payload.expense.id ? action.payload.expense : expense
            ),
            modal: false,
            editingId: "",
            };
        case "add-filter-category":
                return {
                    ...state,
                    currentCategory: action.payload
                };
        case "reset-app":
            return {
                budget: 0, // Se reinicia el presupuesto
                modal: false, // Se cierra cualquier modal abierto
                expenses: [], // Se eliminan los gastos
                editingId: "", 
                currentCategory: "",
            };

                    
        default:
            return state;
        }
    };