$(document).ready(function () {
    fillTable();
    fillList();

    $('#herotable').on('refresh.bs.table', function (params) {
        fillTable();
    });
   
    $('#heroes-list').on('change', function () {
    $('#edit-hero-id').val($('#heroes-list').val());
    $.ajax({
        url: "http://81.2.241.234:8080/hero/" + $('#heroes-list').val()
    })
       .done(function (rslt) {
       $('#edit-hero-name').val(rslt.name);
       $('#edit-hero-description').val(rslt.description);
       })
    });
 
});   
var fillList = function () {
        // Remove current options
        $('#heroes-list').html('');
        // Add the empty option with the empty message
        $('#heroes-list').append('<option value="">' + 'Choose a hero...' + '</option>');
    //legördülõ lista feltöltése
    $.ajax({
        url: "http://81.2.241.234:8080/hero/",
        data: "?start=0&count=0&orderfield=id&orderdirection=ASC"
    }).done(function (rslt) {
       var html = [];
       $.each(rslt, function (i, val) {
           $('#heroes-list').append('<option value="' + val.id + '">' + val.id +";" + val.name +";"+ val.description + ' </option>');
       })
       })
   };



var createhero = function () {
    var editName = $('#create-hero-name').val();
    var editDesc = $('#create-hero-description').val();
        $.ajax({
            url: "http://81.2.241.234:8080/hero/",
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
     
var posthero = function () {
    var editId = $('#heroes-list').val();
    var editName = $('#edit-hero-name').val();
    var editDesc = $('#edit-hero-description').val();
        $.ajax({
            url: "http://81.2.241.234:8080/hero/" + editId,
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

var torolhero = function () {
    var editId = $('#heroes-list').val();
    var editName = $('#edit-hero-name').val();
    var editDesc = $('#edit-hero-description').val();
        $.ajax({
            url: "http://81.2.241.234:8080/hero/" + editId,
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
    };
    
var fillTable = function () {
    $.ajax({
        url: "http://81.2.241.234:8080/hero/",
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
      $('#herotable').bootstrapTable('load', html);
  });
}