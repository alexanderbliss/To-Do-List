$(document).ready(readyNow);

var editing = false;
var editingId;

function readyNow() {
    console.log('js and JQ sourced')
    //click handelers
    getList();
    // $('.complete').on('click', completeClick);
    $('.container').on('click', '.edit', editList);
    $('.container').on('click', '.remove', deleteClick)
    $('.sub').on('click', function () {
        console.log('in submit button');
        var taskIn = $('#taskIn').val();
        var dateIn = $('#dateIn').val();
        var completeIn = false;
        var notesIn = $('#notesIn').val();


        //object to send to server.
        var postList = {
            task: taskIn,
            date: dateIn,
            complete: completeIn,
            notes: notesIn
        };
        $('#taskIn').empty();
        $('#dateIn').empty();
        $('#notesIn').empty();
        if (editing) {
            editing = false;
            updateList(postList);
        }
        else {
            saveList(postList);
            console.log(postList);

        }
    });//end of submit function
}//end of readyNow


function editList() {
    console.log('edit clicked');

    editing = true;
    editingId = $(this).data('id');

    $('.header').text('Editing item');
    var existingData = $(this).closest('tr').data('list');
    $('#taskIn').val(existingData.task);
    $('#dateIn').val(existingData.date);
    $('#notesIn').val(existingData.description);//aka notes.
}


function saveList(postList) {
    console.log('in save list');
    var listId = $(this).data('id');
    $.ajax({
        method: "POST",
        url: '/toDo',
        data: postList
    }).done(function (responce) {
        console.log('responce', responce);
        getList()
    }).fail(function (error) {
        console.log(error);
    })
}

//Get requerst to get database to dom.
function getList() { //getting List data append in done
    console.log('in getList');
    // ajax call to server to get List
    $.ajax({
        type: 'GET',
        url: '/toDo',
    }).done(function (response) {
        console.log(response);
        var list = response;
        console.log(list);
        appendToDom(list);
    }).fail(function (error) {
        alert('something went wrong in getList');
    });
}


//function to append database to dom
function appendToDom(array) {
    console.log('in array');
    $('.container').empty();
    for (var i = 0; i < array.length; i++) {
        list = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('list', list);
        $tr.append('<td>' + list.task + '</td>');
        $tr.append('<td>' + list.date + '</td>');
        $tr.append('<td>' + list.description + '</td>');
        if (list.completed == true) {
            $tr.append('<td>Job Done</td>');
        }
        else {
            $tr.append('<td><button class="complete">Completed</button></td>');
        }
        $tr.append('<td><button class="edit" data-id="' + list.id + '">Edit</button></td>');
        $tr.append('<td><button class="remove" data-id="' + list.id + '">Remove</button></td>');
        $('.container').append($tr);
    }
}

//delete requerst and function.

function deleteClick() {
    console.log('in delete clicked.');
    var listId = $(this).data('id');
    console.log(listId);
    // window.comfirm('Are you sure you want to remove this task');
    // if (confirm('press a button' === true)){
    $.ajax({
        method: "DELETE",
        url: '/toDo/' + listId
    }).done(function (responce) {
        console.log('responce', responce);
        getList()
    }).fail(function (error) {
        console.log(error);
    })
}
// }

function updateList() {
    console.log('in edit click');
    var listId = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: '/toDo/' + listId
    }).done(function (responce) {
        getList()
        console.log('responce', responce);


    })

}