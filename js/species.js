$(document).ready(function () {
    fillTable();
    fillList();

    $('#specietable').on('refresh.bs.table', function (params) {
        fillTable();
    });
   
    $('#species-list').on('change', function () {
    $('#edit-species-id').val($('#species-list').val());
    $.ajax({
        url: "http://81.2.241.234:8080/species/" + $('#species-list').val()
    })
       .done(function (rslt) {
       $('#edit-species-name').val(rslt.name);
       $('#edit-species-description').val(rslt.description);
       })
    });
 
});   
var fillList = function () {
        // Remove current options
        $('#species-list').html('');
        // Add the empty option with the empty message
        $('#species-list').append('<option value="">' + 'Choose a species...' + '</option>');
    //legördülõ lista feltöltése
    $.ajax({
        url: "http://81.2.241.234:8080/species/",
        data: "?start=0&count=0&orderfield=id&orderdirection=ASC"
    }).done(function (rslt) {
       var html = [];
       $.each(rslt, function (i, val) {
           $('#species-list').append('<option value="' + val.id + '">' + val.id +";" + val.name +";"+ val.description + ' </option>');
       })
       })
   };



var createspecie = function () {
    var editName = $('#create-species-name').val();
    var editDesc = $('#create-species-description').val();
        $.ajax({
            url: "http://81.2.241.234:8080/species/",
            method: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: 
            { 
                name: editName,
                desc: editDesc 
            }
        }).done(function (message) {
            fillList();
            fillTable();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fillList();
            fillTable();
        })
     };
     
var postspecie = function () {
    var editId = $('#species-list').val();
    var editName = $('#edit-species-name').val();
    var editDesc = $('#edit-species-description').val();
        $.ajax({
            url: "http://81.2.241.234:8080/species/" + editId,
            method: "PUT",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: 
            { 
                id: editId,
                name: editName,
                desc: editDesc 
            }
        }).done(function (message) {
            fillList();
            fillTable();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fillList();
            fillTable();
        })
     };

var torolspecie = function () {
    var editId = $('#species-list').val();
    var editName = $('#edit-species-name').val();
    var editDesc = $('#edit-species-description').val();
        $.ajax({
            url: "http://81.2.241.234:8080/species/" + editId,
            method: "DELETE",
            contentType: "application/json",
            dataType: "json"
        }).done(function (message) {
            fillList();
            fillTable();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            fillList();
            fillTable();
        });
       $('#edit-species-name').val('');
       $('#edit-species-description').val('');
    };
    
var fillTable = function () {
    $.ajax({
        url: "http://81.2.241.234:8080/species/",
        data: "?start=0&count=0&orderfield=id&orderdirection=ASC"
    })
  .done(function (rslt) {
      var html = [];
      $.each(rslt, function (i, val) {
          html.push({
              "id": val.id,
              "name": val.name,
              "description": val.description
          });
      })
      $('#specietable').bootstrapTable('load', html);
  });
}