let current = '';
let previous = '';
let result;
textbox = document.getElementById('calculation');

function calculate()
{
    current = textbox.value;
        switch(savedop){
            case '+': result = Number(current) + Number(previous);
            break;
            case '-': result = Number(current) - Number(previous);
            break;
            case '*': result = Number(current) * Number(previous);
            break;
            case '/': result = Number(previous) / Number(current);
            break;
        
        }
        textbox.value = result;
        textbox.placeholder = 0;

    
}

function appendno(no)
{
    textbox.value += no;
}

function operation(op)
{
     previous = textbox.value;
     savedop =  op;
     textbox.value = '';
     textbox.placeholder = op;
}
function zeroing(){
    textbox.value = '';
    current = 0;
}