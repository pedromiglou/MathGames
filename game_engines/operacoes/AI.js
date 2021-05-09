function solve(numbers, goal, probabilityOfNotPlaying) {
    if (Math.random() < probabilityOfNotPlaying) return null;
    var x1 = numbers[0];
    var x2 = numbers[1];
    var x3 = numbers[2];

    var distributions = [[x1,x2,x3],[x1,x3,x2],[x2,x1,x3],[x2,x3,x1],[x3,x1,x2],[x3,x2,x1]];

    var solution = null;
    distributions.find((distribution) => {
        x1 = distribution[0];
        x2 = distribution[1];
        x3 = distribution[2];
        if ((x1+x2)+x3===goal) solution = "(" + String(x1) + "+" + String(x2) + ")+" + String(x3);
        if ((x1+x2)-x3===goal) solution = "(" + String(x1) + "+" + String(x2) + ")-" + String(x3);
        if ((x1+x2)*x3===goal) solution = "(" + String(x1) + "+" + String(x2) + ")*" + String(x3);
        if ((x1+x2)/x3===goal) solution = "(" + String(x1) + "+" + String(x2) + ")/" + String(x3);
        if ((x1-x2)+x3===goal) solution = "(" + String(x1) + "-" + String(x2) + ")+" + String(x3);
        if ((x1-x2)-x3===goal) solution = "(" + String(x1) + "-" + String(x2) + ")-" + String(x3);
        if ((x1-x2)*x3===goal) solution = "(" + String(x1) + "-" + String(x2) + ")*" + String(x3);
        if ((x1-x2)/x3===goal) solution = "(" + String(x1) + "-" + String(x2) + ")/" + String(x3);
        if ((x1*x2)+x3===goal) solution = "(" + String(x1) + "*" + String(x2) + ")+" + String(x3);
        if ((x1*x2)-x3===goal) solution = "(" + String(x1) + "*" + String(x2) + ")-" + String(x3);
        if ((x1*x2)*x3===goal) solution = "(" + String(x1) + "*" + String(x2) + ")*" + String(x3);
        if ((x1*x2)/x3===goal) solution = "(" + String(x1) + "*" + String(x2) + ")/" + String(x3);
        if ((x1/x2)+x3===goal) solution = "(" + String(x1) + "/" + String(x2) + ")+" + String(x3);
        if ((x1/x2)-x3===goal) solution = "(" + String(x1) + "/" + String(x2) + ")-" + String(x3);
        if ((x1/x2)*x3===goal) solution = "(" + String(x1) + "/" + String(x2) + ")*" + String(x3);
        if ((x1/x2)/x3===goal) solution = "(" + String(x1) + "/" + String(x2) + ")/" + String(x3);
    });
    return solution;
    
}

//click the button in the html test file
function buttonClick() {
    var numbers = document.getElementById("onlyInput").value;

    numbers = numbers.split(",");
    numbers = [Number(numbers[0]), Number(numbers[1]), Number(numbers[2])]; //numbers between 1 and 6

    console.log(solve(numbers,2,0));
}