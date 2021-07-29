/*
File: script.js
GUI Assignment: Homework 3
Jacob Ouellet, UMass Lowell Computer Science, jacob_ouellet@student.uml.edu
Copyright (c) 2021 by Jacob Ouellet. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Jacob Ouellet on July 29, 2021 at 4:12 PM
*/

// class that contains methods pertaining to the Table Parameters
class Table_Params{

    // constructor for class. Class contains values row_start, row_end, column_start, column_end
    constructor(rowStart, rowEnd, columnStart, columnEnd) {
        this.row_start = rowStart;
        this.row_end = rowEnd;
        this.column_start = columnStart;
        this.column_end = columnEnd;
    }

    // take the row and column values and multiply together to build the calculation table
    calculate_table(){
        const x_axis = [];
        const y_axis = [];
        const results = []; // results of each computation in linear array
        var i;
        
        // init each array with the range
        if(this.row_end < this.row_start){  // if the row end index is smaller than the start index then init the array backwards
            i = this.row_start;
            while(i >= this.row_end){ // while i (row start) is not less than row_end add each value between the row start and end to the x axis list
                x_axis.push(i);
                i--;
            }
        }
        else{  // if start index is larger than the end index then count upwards like normal
            i = this.row_start;
            while(i <= this.row_end){ // while i (row start) is not greater than row_end add each value between the row start and end to the x axis list
                x_axis.push(i);
                i++;
            }
        }

        if(this.column_end < this.column_start){ // if the column end index is smaller than the start index then init the array backwards
            i = this.column_start;
            var j = x_axis.length;
            while(i >= this.column_end){
                y_axis.push(i); // add the column value to the y axis 
                for(var x = 0; x < j; x++){ // for each value in the row (x_axis) multiply it by the current column we just got and add each resulting value to the result array 
                    results.push(i * x_axis[x])
                }
                i--;
            }
        }
        else{ // if start index is larger than the end index then count upwards like normal
            i = this.column_start;
            var j = x_axis.length;
            while(i <= this.column_end){
                y_axis.push(i); // add the column value to the y axis 
                for(var x = 0; x < j; x++){
                    results.push(i * x_axis[x]) // for each value in the row (x_axis) multiply it by the current column we just got and add each resulting value to the result array 
                }
                i++;
            }
        }
        return this._construct_html_table(x_axis, y_axis, results); // returns the html formatted table with the x axis y axis and results for each row col pair
    }

    // builds the html text for the table
    _construct_html_table(x_axis, y_axis, results){
        var text = '<tr><td></td>'; // first table column/row is empty so emprt <td></td>
        for(var x = 0; x < x_axis.length; x++){ // add all the x_axis elements to the first row in the table
            text += '<td>' + x_axis[x] + '</td>';
        }
        text += '</tr>';    // close the first row
        
        var offset = x_axis.length; // offset used to seperate the values in the results array since it is a linear array not 2d
        var result_index = 0;
        for(var y = 0; y < y_axis.length; y++){ // now add each row starting with the y axis (column index) and all its coresponding calulation from result array
            text += '<tr>';
            text += '<td>' + y_axis[y] + '</td>';   // add in the y axis (first column value)
            while(result_index < offset){   // add in all the calulation values for that row from the result table
                text += '<td>' + results[result_index] + '</td>';
                result_index++;
            }
            result_index = offset;  // increment the result index up to get the next row of table calulations
            offset = offset + x_axis.length;
            text += '</tr>';    // close the row
        }
        return text;    // return the text html table
    }

    // make sure the parameters are valid
    validate_input(){

        if(isNaN(this.row_start)){  // check if its not a number
            return "Error: Row start index is not a number";
        }
        else if(this.row_start > 9999 || this.row_start < -9999){ // make sure the index is between -9999 and 9999
            return "Error: Row start index must be between 9999 and -9999.";
        }

        if(isNaN(this.row_end)){ // check if its not a number
            return "Error: Row end index is not a number";
        }
        else if(this.row_end > 9999 || this.row_end < -9999){ // make sure the index is between -9999 and 9999
            return "Error: Row end index must be between 9999 and -9999.";
        }

        if(isNaN(this.column_start)){ // check if its not a number
            return "Error: Column start index is not a number";
        }
        else if(this.column_start > 9999 || this.column_start < -9999){ // make sure the index is between -9999 and 9999
            return "Error: Column start index must be between 9999 and -9999.";
        }

        if(isNaN(this.column_end)){ // check if its not a number
            return "Error: Column end index is not a number";
        }else if(this.column_end > 9999 || this.column_end < -9999){ // make sure the index is between -9999 and 9999
            return "Error: Column end index must be between 9999 and -9999.";
        }

        var row_dif = Math.abs(this.row_start - this.row_end); // get the number of integers between start and end
        if(row_dif < -200 || row_dif > 200){    // check if the number of integer difference is below 200
            return "Error: the difference between row start index and row end index can't exceed 200 numbers: Currently at " + row_dif;
        }
    
        var col_dif = Math.abs(this.column_start - this.column_end); // get the number of integers between start and end
        if(col_dif < -200 || col_dif > 200){    // check if the number of integer difference is below 200
            return "Error: the difference between column start index and column end index can't exceed 200 numbers: Currently at " + col_dif;
        }
        return "";  // if its valid return empty string
    }
}

function process_table(){
    // get the error message text box
    var error_msg = document.getElementById("errormsg");

    // get each value from the form for the table indexes
    var row_start = parseInt(document.getElementById('rowstart').value);
    var row_end = parseInt(document.getElementById('rowend').value);
    var column_start = parseInt(document.getElementById('columnstart').value);
    var column_end = parseInt(document.getElementById('columnend').value);

    // construct the table object
    table_layout = new Table_Params(row_start, row_end, column_start, column_end);

    // validate the table parameters
    var validate_msg = table_layout.validate_input()
    if(validate_msg == ""){
        error_msg.innerText = validate_msg  // if it passes all the checks clear the error message
        var table = document.getElementById('multTable'); // get the table from the page
        table.innerHTML = table_layout.calculate_table();   // put the html table into the page
    }
    else{
        error_msg.innerText = validate_msg; // if the parameters aren't valid update the error message at the page
    }
}
