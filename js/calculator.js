var calc_me_str = ""
var calc_me_tmp = ""
const display = document.querySelector('.display')
const calc_val = document.getElementById('equal')
const calc_clear = document.getElementById('ac')
const num_buttons = document.querySelectorAll('.calc_number')

let enter_key = (e) => {
    if (e.key === "Escape") {
        clear_calculator()
        return true
    };
    if (e.key === "Enter" || e.key === "=") {
        calc_me()
        return true
    };
    if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4"
        || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8"
        || e.key === "9" || e.key === "0"
    ) {
        if (!calc_me_tmp && calc_me_str && calc_me_str.charAt(calc_me_str.length-1) != "+" && calc_me_str.charAt(calc_me_str.length-1) != "-" && calc_me_str.charAt(calc_me_str.length-1) != "/" && calc_me_str.charAt(calc_me_str.length-1) != "*") {
            calc_me_str = calc_me_str + "+"
        }
        calc_me_tmp = calc_me_tmp + e.key
        display.value = calc_me_str + calc_me_tmp
    }
    if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+") {
        check_calc(e.key)
        return true
    }
};
document.addEventListener("keydown", enter_key);
calc_val.addEventListener('click', () => {
    calc_me()
})
function calc_me() {
    calc_me_str = calc_me_str + calc_me_tmp
    calc_me_tmp = ""
    check_calc()
    let calc_value = calc_me_str
    calc_value = calc_value.replace("++", "+")
    calc_value = calc_value.replace("--", "+")
    if (calc_value.includes("/*") || calc_value.includes("*/")) {
        calc_value = 0
    }
    let calc = eval(calc_value)
    display.placeholder = calc
    display.value = ""
    calc_me_str = String(calc)
}
calc_clear.addEventListener('click', () => {
    clear_calculator()
})
function clear_calculator() {
    calc_me_str = ""
    calc_me_tmp = ""
    display.value = ""
    display.placeholder = "0"
}

function check_calc(e = "") {
    if (calc_me_str.endsWith("+") || calc_me_str.endsWith("-") || calc_me_str.endsWith("/") || calc_me_str.endsWith("*")) {
        calc_me_str = calc_me_str.slice(0, -1)
    }
    calc_me_str = calc_me_str + calc_me_tmp + e
    display.value = calc_me_str
    calc_me_tmp = ""
}

num_buttons.forEach(node => {

    node.addEventListener('click', (e) => {

        if (node.innerText == "+/-") {
            if (calc_me_tmp.charAt(0) != "-") {
                calc_me_tmp = calc_me_tmp.replace("+", "")
                calc_me_tmp = "-" + calc_me_tmp
            }
            else if (calc_me_tmp.charAt(0) != "+") {
                calc_me_tmp = calc_me_tmp.replace("-", "+")
            }
            display.value = calc_me_str + calc_me_tmp
            return true
        }
        else if (node.innerText == "+" || node.innerText == "-" || node.innerText == "/" || node.innerText == "*") {
            check_calc(node.innerText)
            return true
        }

        if (!calc_me_tmp && calc_me_str && calc_me_str.charAt(calc_me_str.length-1) != "+" && calc_me_str.charAt(calc_me_str.length-1) != "-" && calc_me_str.charAt(calc_me_str.length-1) != "/" && calc_me_str.charAt(calc_me_str.length-1) != "*") {
            calc_me_str = calc_me_str + "+"
        }
        calc_me_tmp = calc_me_tmp + node.innerText
        display.value = calc_me_str + calc_me_tmp

    })

})